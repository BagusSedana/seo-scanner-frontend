// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

interface ScanHistoryItem {
   scan_id: number;
   domain: string;
   total_score: number;
   status: string;
   critical: number;
   warning: number;
   scanned_at: string;
}

export default function DashboardPage() {
   const { user, setAuth, token } = useAuthStore();
   const [history, setHistory] = useState<ScanHistoryItem[]>([]);
   const [loadingHistory, setLoadingHistory] = useState(true);
   const [url, setUrl] = useState("");
   const [scanning, setScanning] = useState(false);
   const router = useRouter();

   const SCAN_LIMITS: Record<string, number> = {
      free: 10,
      pro: 100,
      agency: 1000,
   };

   // Calculate stats for the Progress Bar
   const totalLimit = (SCAN_LIMITS[user?.tier || "free"] || 2) + (user?.topup_scans || 0);
   const scanPercent = user ? Math.round((user.scans_this_month / totalLimit) * 100) : 0;
   const scansRemaining = Math.max(0, totalLimit - (user?.scans_this_month || 0));

   useEffect(() => {
      const init = async () => {
         try {
            const meRes = await API.get("/auth/me");
            if (meRes.data && token) setAuth(meRes.data, token);
         } catch {}

         try {
            const histRes = await API.get("/scans/history?limit=5");
            setHistory(histRes.data || []);
         } catch {
            setHistory([]);
         } finally {
            setLoadingHistory(false);
         }
      };
      init();
   }, [setAuth, token]);

   const handleScan = async (e: FormEvent) => {
      e.preventDefault();
      let submitUrl = url.trim();
      if (!submitUrl) return;
      if (!/^https?:\/\//i.test(submitUrl)) {
         submitUrl = `https://${submitUrl}`;
      }
      
      setScanning(true);
      try {
         const res = await API.post("/scan", { domain: submitUrl });
         if (res.data?.scan_id) {
            router.push(`/hasil/${res.data.scan_id}`);
         }
      } catch (err: any) {
         setScanning(false);
         alert(err.response?.data?.detail || "Terjadi kesalahan saat memulai scan.");
      }
   };

   return (
      <div className="min-h-screen bg-slate-50 font-sans pb-20">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="mb-10">
               <h1 className="text-3xl font-medium text-slate-900 tracking-tight mb-2">SEO Checkup Scanner</h1>
               <p className="text-sm text-slate-500">Audit website perusahaan Anda secara instan — 50+ parameter strategis, 5 dimensi data, hasil dalam hitungan detik.</p>
            </div>

            {/* Top Grid layout */}
            <div className="grid lg:grid-cols-4 gap-6 mb-6 items-stretch">
               <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-center shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sisa Scan Bulan Ini</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{scanPercent}% Digunakan</p>
                  </div>
                  <div className="flex items-end gap-3 mb-4">
                     <span className="text-3xl font-black text-slate-900 leading-none">{scansRemaining}</span>
                     <span className="text-sm font-medium text-slate-400 mb-1">/ {totalLimit}</span>
                     <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full uppercase tracking-widest mb-1.5 ml-2">
                        {user?.tier?.toUpperCase()}
                     </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${Math.min(scanPercent, 100)}%` }}></div>
                  </div>
               </div>

               <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
                  <div className="text-orange-500 mb-2 text-2xl">⚡</div>
                  <p className="text-sm font-bold text-slate-700">3-10 detik</p>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1">Scan</p>
               </div>
               
               <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center text-center shadow-sm">
                  <div className="text-blue-500 mb-2 text-2xl">📊</div>
                  <p className="text-sm font-bold text-slate-700">50+ Metrik</p>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1">Data</p>
               </div>
            </div>

            {/* Main Content Split */}
            <div className="grid lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 space-y-6">
                  {/* Scan Input Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-8 relative z-10">
                       <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl">
                          🔍
                       </div>
                       <div>
                           <h3 className="font-bold text-slate-900 text-lg">Scan Website Baru</h3>
                           <p className="text-sm text-slate-500 font-medium mt-0.5">Masukkan URL untuk memulai audit bisnis</p>
                       </div>
                    </div>
                    
                    <form onSubmit={handleScan} className="mb-8 relative z-10">
                       <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">URL Website Perusahaan</p>
                       <div className="flex flex-col sm:flex-row gap-3">
                          <input 
                             type="text" 
                             required
                             value={url}
                             onChange={(e) => setUrl(e.target.value)}
                             placeholder="🌐 bangbisnis.web.id atau https://contoh.com"
                             className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium text-slate-700"
                          />
                          <button 
                             type="submit" 
                             disabled={scanning}
                             className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50 min-w-[160px]"
                          >
                             {scanning ? 'Menganalisis...' : 'Mulai Analisis'}
                          </button>
                       </div>
                    </form>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 relative z-10">
                       <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1 sm:mt-0">Rekomendasi Analisis:</p>
                       <div className="flex flex-wrap gap-2">
                          {['toko-online.id', 'travel-jimb.com', 'kopi-senja.co.id', 'technesia.net'].map(r => (
                             <button key={r} onClick={() => setUrl(`https://${r}`)} type="button" className="text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors">
                                {r}
                             </button>
                          ))}
                       </div>
                    </div>
                  </div>

                  {/* 5 Dimensi Analisis */}
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm">
                     <h3 className="font-bold text-slate-900 text-lg mb-2">5 Dimensi Analisis SEO Checkup</h3>
                     <p className="text-sm text-slate-500 font-medium mb-8">Setiap dimensi menghasilkan skor akurasi dan rekomendasi strategis untuk perusahaan Anda.</p>
                     
                     <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 transition-transform hover:-translate-y-1">
                           <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 text-xl">🔍</div>
                           <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1.5">On-Page Analysis</h4>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Title tags, meta descriptions, heading hierarchy, and keywords.</p>
                           </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 transition-transform hover:-translate-y-1">
                           <div className="w-10 h-10 bg-orange-50 shadow-sm border border-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 text-xl">⚡</div>
                           <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Performance</h4>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Page speed, Core Web Vitals, and resource optimization.</p>
                           </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 transition-transform hover:-translate-y-1">
                           <div className="w-10 h-10 bg-amber-50 shadow-sm border border-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 text-yellow-500 text-xl">🔒</div>
                           <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Security & Tech</h4>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">HTTPS, robots.txt, sitemaps, and SSL verification.</p>
                           </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 transition-transform hover:-translate-y-1">
                           <div className="w-10 h-10 bg-slate-800 shadow-sm border border-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xl">📱</div>
                           <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Experience</h4>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Mobile responsiveness, tap targets, and accessibility.</p>
                           </div>
                        </div>
                        <div className="sm:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 transition-transform hover:-translate-y-1">
                           <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center flex-shrink-0 text-cyan-500 text-xl">🌐</div>
                           <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Digital Footprint</h4>
                              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Schema markup, Open Graph, and social meta data.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  {/* Wawasan Strategis Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="text-red-500 text-xl">📍</div>
                        <h3 className="font-bold text-slate-900">Wawasan Strategis</h3>
                     </div>
                     
                     <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                           <div className="text-yellow-500 text-lg mt-0.5">💡</div>
                           <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1">Optimasi Title Tag</h4>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">Gunakan 50-60 karakter untuk mencegah pemotongan di hasil pencarian Google.</p>
                           </div>
                        </div>
                        <div className="flex gap-4 items-start">
                           <div className="text-slate-400 text-lg mt-0.5">📝</div>
                           <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1">Meta Description</h4>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">Deskripsi yang relevan dan menarik meningkatkan CTR hingga 30%.</p>
                           </div>
                        </div>
                        <div className="flex gap-4 items-start">
                           <div className="text-emerald-500 text-lg mt-0.5">🖼️</div>
                           <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1">Alt Text Gambar</h4>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">Sangat krusial untuk crawling mesin pencari dan aksesibilitas pengguna.</p>
                           </div>
                        </div>
                        <div className="flex gap-4 items-start">
                           <div className="text-slate-400 text-lg mt-0.5">🔗</div>
                           <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1">Internal Linking</h4>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">Membantu mesin pencari memahami struktur dan otoritas halaman Anda.</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Laporan Terakhir Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-center">
                     <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 text-slate-400 text-2xl shadow-inner">🕒</div>
                     <h3 className="font-bold text-slate-900 mb-3 text-lg">Laporan Terakhir</h3>
                     <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed max-w-[200px] mx-auto">Tinjau kembali hasil audit sebelumnya dan amati perkembangan data Anda.</p>
                     
                     <Link href="/dashboard/history" className="block w-full py-3.5 rounded-xl border-2 border-slate-100 text-slate-600 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all font-bold text-sm">
                        Buka Histori
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
