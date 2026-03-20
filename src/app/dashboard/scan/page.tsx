// src/app/dashboard/scan/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/lib/api";
import { useAuthStore } from "@/store/auth";

const SEO_DIMENSIONS = [
   {
      icon: "🔍",
      label: "On-Page Analysis",
      desc: "Title tags, meta descriptions, heading hierarchy, and keywords.",
      color: "bg-blue-50 border-blue-100",
   },
   {
      icon: "⚡",
      label: "Performance",
      desc: "Page speed, Core Web Vitals, and resource optimization.",
      color: "bg-slate-50 border-slate-100",
   },
   {
      icon: "🔒",
      label: "Security & Tech",
      desc: "HTTPS, robots.txt, sitemaps, and SSL verification.",
      color: "bg-blue-50 border-blue-100",
   },
   {
      icon: "📱",
      label: "Experience",
      desc: "Mobile responsiveness, tap targets, and accessibility.",
      color: "bg-slate-50 border-slate-100",
   },
   {
      icon: "🌐",
      label: "Digital Footprint",
      desc: "Schema markup, Open Graph, and social meta data.",
      color: "bg-blue-50 border-blue-100",
   },
];

const SEO_TIPS = [
   {
      icon: "💡",
      title: "Optimasi Title Tag",
      desc: "Gunakan 50–60 karakter untuk mencegah pemotongan di hasil pencarian Google.",
   },
   {
      icon: "📝",
      title: "Meta Description",
      desc: "Deskripsi yang relevan dan menarik meningkatkan CTR hingga 30%.",
   },
   {
      icon: "🖼️",
      title: "Alt Text Gambar",
      desc: "Sangat krusial untuk crawling mesin pencari dan aksesibilitas pengguna.",
   },
   {
      icon: "🔗",
      title: "Internal Linking",
      desc: "Membantu mesin pencari memahami struktur dan otoritas halaman Anda.",
   },
];

export default function ScanPage() {
   const [url, setUrl] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const router = useRouter();
   const { user, setAuth, token } = useAuthStore();

   const scanLeft = (user?.scan_limit ?? 3) - (user?.scans_this_month ?? 0);
   const scanPercent = user
      ? Math.round((user.scans_this_month / user.scan_limit) * 100)
      : 0;

   const refreshUser = async () => {
      try {
         const res = await API.get("/auth/me");
         if (res.data && token) setAuth(res.data, token);
      } catch {}
   };

   const handleScan = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!url.trim()) return;

      const domain = url
         .replace("https://", "")
         .replace("http://", "")
         .replace("www.", "")
         .split("/")[0]
         .trim();

      setLoading(true);
      setError("");

      try {
         const res = await API.post("/scan", { domain, use_ai: false });
         const scanId = res.data?.scan_id;
         await refreshUser();
         if (scanId) {
            router.push(`/hasil/${scanId}`);
         } else {
            setError("Scan selesai tapi ID tidak ditemukan.");
         }
      } catch (err: unknown) {
         const axiosError = err as { response?: { data?: { detail?: string | { message?: string }; message?: string } } };
         const msg =
            axiosError?.response?.data?.detail && typeof axiosError.response.data.detail === "object"
               ? axiosError.response.data.detail.message
               : (axiosError?.response?.data?.detail as string) ||
                 axiosError?.response?.data?.message ||
                 "Gagal melakukan scan. Coba lagi.";
         setError(msg || "Gagal melakukan scan.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Page Header */}
            <div className="mb-12">
               <h1 className="text-4xl font-medium text-gray-900 tracking-tight">SEO Checkup Scanner</h1>
               <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  Audit website perusahaan Anda secara instan — 50+ parameter strategis, 5 dimensi
                  data, hasil dalam hitungan detik.
               </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
               {/* LEFT: Form + Loading Steps */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Scan Quota */}
                  <div className="bg-white border border-slate-100 rounded-[2rem] px-8 py-6 flex items-center justify-between shadow-sm">
                     <div>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1.5">
                           Sisa scan bulan ini
                        </p>
                        <p className="text-lg font-medium text-gray-900">
                           {scanLeft} <span className="text-slate-300 font-normal">/ {user?.scan_limit ?? 3}</span>
                           <span
                              className={`ml-4 text-[10px] font-medium px-3 py-1 rounded-full uppercase tracking-wider ${
                                 user?.tier === "pro"
                                    ? "bg-blue-50 text-blue-600 border border-blue-100"
                                    : user?.tier === "agency"
                                       ? "bg-blue-600 text-white"
                                       : "bg-slate-100 text-slate-500"
                              }`}
                           >
                              {user?.tier === "pro"
                                 ? "Pro"
                                 : user?.tier === "agency"
                                   ? "Agency"
                                   : "Gratis"}
                           </span>
                        </p>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="w-40">
                           <div className="bg-slate-50 rounded-full h-1.5 overflow-hidden">
                              <div
                                 className={`h-1.5 rounded-full transition-all duration-1000 ${
                                    scanPercent >= 90
                                       ? "bg-red-500"
                                       : scanPercent >= 70
                                          ? "bg-blue-400"
                                          : "bg-blue-600"
                                 }`}
                                 style={{
                                    width: `${Math.min(scanPercent, 100)}%`,
                                 }}
                              />
                           </div>
                           <p className="text-[10px] text-slate-400 mt-2 font-medium text-right uppercase tracking-[0.05em]">
                              {scanPercent}% Digunakan
                           </p>
                        </div>
                        {user?.tier === "free" && (
                           <Link
                              href="/pricing"
                              className="text-xs bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 whitespace-nowrap active:scale-95"
                           >
                              Upgrade Sekarang
                           </Link>
                        )}
                     </div>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
                           <svg
                              width="20"
                              height="20"
                              fill="none"
                              stroke="#2563eb"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
                              />
                           </svg>
                        </div>
                        <div>
                           <h2 className="font-medium text-slate-900 text-base tracking-tight">
                              Scan Website Baru
                           </h2>
                           <p className="text-xs text-slate-400 tracking-wide">
                              Masukkan URL untuk memulai audit bisnis
                           </p>
                        </div>
                     </div>

                     <form onSubmit={handleScan}>
                        <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-2.5">
                           URL Website Perusahaan
                        </label>
                        <div className="flex gap-4">
                           <div className="relative flex-1">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                                 🌐
                              </span>
                              <input
                                 type="text"
                                 value={url}
                                 onChange={(e) => setUrl(e.target.value)}
                                 placeholder="contoh.com atau https://contoh.com"
                                 required
                                 disabled={loading || scanLeft <= 0}
                                 className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-10 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all disabled:bg-slate-50 disabled:text-slate-300 font-medium text-slate-900"
                              />
                           </div>
                           <button
                              type="submit"
                              disabled={loading || scanLeft <= 0}
                              className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
                           >
                              {loading ? (
                                 <>
                                    <svg
                                       className="animate-spin flex-shrink-0"
                                       width="14"
                                       height="14"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                    >
                                       <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                       />
                                       <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                       />
                                    </svg>
                                    Scanning...
                                 </>
                              ) : (
                                 "Mulai Analisis"
                              )}
                           </button>
                        </div>

                        {error && (
                           <div className="mt-4 flex items-start gap-2.5 text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5">
                              <svg
                                 width="14"
                                 height="14"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 viewBox="0 0 24 24"
                                 className="mt-0.5 flex-shrink-0"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                 />
                              </svg>
                              <p className="text-xs font-medium">{error}</p>
                           </div>
                        )}

                        {scanLeft <= 0 && (
                           <div className="mt-4 flex items-start gap-2.5 text-orange-600 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3.5">
                              <svg
                                 width="14"
                                 height="14"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 viewBox="0 0 24 24"
                                 className="mt-0.5 flex-shrink-0"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                 />
                              </svg>
                              <p className="text-xs font-medium">
                                 Kuota scan terbatas.{" "}
                                 <Link
                                    href="/pricing"
                                    className="font-bold underline"
                                 >
                                    Upgrade paket SEO Checkup
                                 </Link>{" "}
                                 untuk audit tidak terbatas.
                              </p>
                           </div>
                        )}
                     </form>

                     {/* Loading Steps */}
                     {loading && (
                        <div className="mt-8 pt-8 border-t border-slate-50">
                           <div className="space-y-4">
                              {[
                                 "Mengambil data perusahaan...",
                                 "Menganalisis 50+ parameter strategis...",
                                 "Menghitung skor 5 dimensi utama...",
                                 "Menyusun roadmap rekomendasi data...",
                              ].map((step, i) => (
                                 <div
                                    key={step}
                                    className="flex items-center gap-3"
                                 >
                                    <svg
                                       className="animate-spin text-blue-600 flex-shrink-0"
                                       width="14"
                                       height="14"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       style={{ animationDelay: `${i * 0.2}s` }}
                                    >
                                       <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                       />
                                       <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                       />
                                    </svg>
                                    <span className="text-xs text-slate-400 font-medium tracking-wide">
                                       {step}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Quick Examples */}
                     {!loading && (
                        <div className="mt-8 pt-8 border-t border-slate-50">
                           <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-4">
                              Rekomendasi Analisis:
                           </p>
                           <div className="flex flex-wrap gap-2.5">
                              {[
                                 "bisnis-sukses.id",
                                 "traveloka.com",
                                 "gojek.com",
                                 "bukalapak.com",
                              ].map((site) => (
                                 <button
                                    key={site}
                                    type="button"
                                    onClick={() => setUrl(`https://${site}`)}
                                    className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-4 py-2 rounded-full hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all font-medium"
                                 >
                                    {site}
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Apa yang dianalisis */}
                  <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                     <h3 className="text-xl font-medium text-gray-900 mb-2 tracking-tight">
                        5 Dimensi Analisis SEO Checkup
                     </h3>
                     <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                        Setiap dimensi menghasilkan skor akurasi dan rekomendasi strategis
                        untuk perusahaan Anda.
                     </p>
                     <div className="grid sm:grid-cols-2 gap-4">
                        {SEO_DIMENSIONS.slice(0, 4).map((dim) => (
                           <div
                              key={dim.label}
                              className={`flex items-start gap-4 p-5 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-1 ${dim.color}`}
                           >
                              <span className="text-2xl flex-shrink-0">
                                 {dim.icon}
                              </span>
                              <div>
                                 <p className="text-base font-medium text-gray-900 tracking-tight">
                                    {dim.label}
                                 </p>
                                 <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                                    {dim.desc}
                                 </p>
                              </div>
                           </div>
                        ))}
                        {/* 5th item full width */}
                        <div
                           className={`flex items-start gap-4 p-5 rounded-2xl border sm:col-span-2 transition-all hover:shadow-md hover:-translate-y-1 ${SEO_DIMENSIONS[4].color}`}
                        >
                           <span className="text-2xl flex-shrink-0">
                              {SEO_DIMENSIONS[4].icon}
                           </span>
                           <div>
                              <p className="text-base font-medium text-gray-900 tracking-tight">
                                 {SEO_DIMENSIONS[4].label}
                              </p>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                                 {SEO_DIMENSIONS[4].desc}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* RIGHT: Sidebar */}
               <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                     {[
                        { icon: "⚡", label: "3–10 detik", desc: "Scan" },
                        { icon: "📊", label: "50+", desc: "Metrik" },
                        { icon: "🔒", label: "Privat", desc: "Aman" },
                     ].map((item) => (
                        <div
                           key={item.label}
                           className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm"
                        >
                           <span className="text-xl block mb-2">
                              {item.icon}
                           </span>
                           <p className="text-[11px] font-medium text-gray-900 tracking-tight">
                              {item.label}
                           </p>
                           <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1 font-medium">{item.desc}</p>
                        </div>
                     ))}
                  </div>

                  {/* Tips SEO */}
                  <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                     <div className="flex items-center gap-3 mb-6">
                        <span className="text-xl">📍</span>
                        <h3 className="font-medium text-slate-900 text-base tracking-tight">
                           Wawasan Strategis
                        </h3>
                     </div>
                     <div className="space-y-6">
                        {SEO_TIPS.map((tip) => (
                           <div
                              key={tip.title}
                              className="flex items-start gap-3"
                           >
                              <span className="text-base flex-shrink-0">
                                 {tip.icon}
                              </span>
                              <div>
                                 <p className="text-sm font-medium text-gray-900 leading-tight">
                                    {tip.title}
                                 </p>
                                 <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-normal">
                                    {tip.desc}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Upgrade CTA */}
                  {user?.tier === "free" && (
                     <div className="bg-[#0a1120] rounded-[2rem] p-8 text-white shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                           <span className="text-xl">🚀</span>
                           <p className="text-lg font-medium tracking-tight">
                              SEO Checkup Pro
                           </p>
                        </div>
                        <p className="text-sm text-slate-400 mb-8 leading-relaxed font-normal">
                           Unlock fitur perusahaan: 30 scan/bulan, AI-powered insights, dan export laporan PDF premium.
                        </p>
                        <ul className="space-y-3 mb-10">
                           {[
                              "30 scan setiap bulan",
                              "Rekomendasi berbasis AI",
                              "Laporan PDF kustom",
                              "Audit data lanjutan",
                           ].map((f) => (
                              <li
                                 key={f}
                                 className="flex items-center gap-3 text-sm text-slate-300 font-normal"
                              >
                                 <svg
                                    width="14"
                                    height="14"
                                    fill="none"
                                    stroke="#2563eb"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M5 13l4 4L19 7"
                                    />
                                 </svg>
                                 {f}
                              </li>
                           ))}
                        </ul>
                        <Link
                           href="/pricing"
                           className="block w-full bg-blue-600 text-white text-sm py-4 rounded-2xl text-center font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                        >
                           Upgrade Sekarang →
                        </Link>
                     </div>
                  )}

                  {/* History Shortcut */}
                  <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                     <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl">🕒</span>
                        <p className="text-base font-medium text-gray-900 tracking-tight">
                           Laporan Terakhir
                        </p>
                     </div>
                     <p className="text-sm text-slate-400 mb-8 leading-relaxed font-normal">
                        Tinjau kembali hasil audit sebelumnya dan amati perkembangan data Anda.
                     </p>
                     <Link
                        href="/dashboard/history"
                        className="block w-full border border-slate-100 text-slate-600 text-sm py-4 rounded-2xl text-center font-medium hover:bg-slate-50 transition-all active:scale-95"
                     >
                        Buka Histori
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
