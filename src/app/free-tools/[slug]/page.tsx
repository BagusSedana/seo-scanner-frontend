"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import API from "@/lib/api";

const formatTitle = (slug: string) => {
   return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const TOOL_DESCRIPTIONS: Record<string, string> = {
   "title-tag": "Simulasikan bagaimana Tag Judul (Title Tag) website Anda muncul di hasil pencarian Google (SERP). Tool ini mengevaluasi panjang karakter secara akurat agar judul tidak terpotong, memastikan relevansi kata kunci maksimal, dan meningkatkan CTR (Click-Through Rate).",
   "meta-description": "Analisis kedalaman, relevansi, dan panjang karakter dari Meta Description halaman Anda. Meta Description yang optimal (120-160 karakter) berfungsi layaknya mini-iklan gratis di mesin pencari yang memikat audiens untuk langsung mengklik tautan Anda.",
   "h1-extractor": "Ekstrak dan evaluasi seluruh struktur heading (H1 hingga H6) pada halaman web Anda. Tool ini mendeteksi apakah Anda memiliki tag H1 ganda yang membingungkan bot Google, serta menganalisa hierarki konten Anda dari sisi SEO on-page.",
   "keyword-density-analyzer": "Temukan persentase dan frekuensi kemunculan kata kunci target dalam artikel Anda secara presisi. Fitur ini membantu Anda menghindari penalti 'Keyword Stuffing' dari Google sekaligus menjaga keseimbangan LSI (Latent Semantic Indexing) agar tetap natural.",
   "serp-preview-tool": "Lihat hasil visual dari cuplikan (snippet) halaman website Anda di hasil pencarian secara real-time. Membantu Anda mengoptimasi penulisan judul dan deskripsi meta sebelum halaman Anda benar-benar di-index oleh mesin pencari.",
   "sitemap-validator": "Periksa struktur file sitemap.xml Anda untuk mendeteksi error sintaks, broken links, atau halaman usang. Sitemap yang sehat memastikan crawler Google dapat menelusuri dan meng-index seluruh arsitektur halaman bisnis Anda dengan sempurna.",
   "robots-txt-generator": "Validasi file robots.txt Anda untuk memberikan pedoman rayapan (crawl directives) yang tepat kepada Googlebot. Pastikan halaman admin/internal diblokir dan halaman publik krusial diizinkan (Allowed) tanpa hambatan sama sekali.",
   "canonical-tag-checker": "Cek resolusi penanda URL kanonikal pada setiap halaman Anda untuk mencegah isu Duplikasi Konten di mata Google. Sangat esensial untuk website e-commerce yang memiliki filter parameter produk URL yang saling tumpang tindih.",
   "redirect-checker": "Telusuri chain pengalihan status (HTTP 301, 302, dsb) dari URL rujukan Anda secara mendalam. Rantai redirect yang terlalu panjang membuang 'Crawl Budget' bot, menurunkan loading, dan berdampak parah pada PageRank URL final.",
   "http-header-analyzer": "Inspeksi server response header seperti Cache-Control, X-Robots-Tag, dan tipe konten secara terperinci. Memastikan server mengirimkan balasan 200 OK dengan metrik sekuritas web dan standar optimasi teknis modern.",
   "image-optimizer-test": "Deteksi gambar over-ize yang tidak memiliki tag Alt atau tak menggunakan kompresi WebP modern yang berpotensi melambatkan page speed Anda. Merupakan landasan utama untuk SEO pencarian gambar dan metrik Core Web Vitals.",
   "mobile-friendly-tester": "Simulasikan rendering elemen halaman (viewport, tap targets) pada layar mobile responsif. Google telah menerapkan 'Mobile-First Indexing' mutlak, sehingga optimasi mobile adalah pra-syarat untuk masuk 10 besar SERP.",
   "core-web-vitals-checker": "Ukur data sintetik terkait kinerja Core Web Vitals (Largest Contentful Paint, First Input Delay, dan Cumulative Layout Shift). Transisi user-experience (UX) web yang mulus adalah metrik *ranking factor* dominan Google saat ini.",
   "minification-checker": "Cek susunan resource file eksternal (JS, CSS, HTML) untuk memverifikasi rasio minifikasinya. Penghapusan komentar kode dan whitespace berlebih akan merampingkan beban file payload hingga 70%, menciptakan speed rendering secepat kilat.",
   "broken-link-checker": "Temukan secara akurat tautan internal atau eksternal yang terputus (Error 404/500) pada satu dokumen spesifik. Tautan mati menciptakan Dead End bagi mesin crawler, merusak navigasi pengunjung, serta menurunkan Domain Trust Score otomatis.",
   "backlink-anchor-analyzer": "Analisis profil persentase anchor text (teks jangkar) tautan yang masuk/keluar dari halaman Anda. Jaga distribusi variasi kata kunci agar tetap proporsional untuk terhindar dari saringan pembaruan algoritma Google Penguin (Link Spam).",
   "ai-content-detector": "Hitung probabilitas sebuah paragraf di-generate oleh kecerdasan buatan (LLM seperti ChatGPT/Claude) atau direkayasa manusia secara murni. Bantu seimbangkan keorian konten agar tidak di-_flag_ oleh pembaruan Helpful Content Google.",
   "readability-score": "Skoring seberapa mudah teks laman dapat dicerna audiens massal menggunakan patokan Flesch-Kincaid secara otomatis. Tingkat keterbacaan yang tinggi sukses menekan rasio Bounce Rate pencarian dan melesatkan Dwell Time sesi aktif pengguna."
};

const FAQ_DATA = [
   {
      q: "Apakah data hasil analisis disimpan di server?",
      a: "Tidak. Data analisis yang diproses melalui Free Tools ini bersifat real-time dan langsung dikirimkan ke browser Anda tanpa disimpan di database kami, menjaga kerahasiaan metrik web Anda."
   },
   {
      q: "Seberapa akurat alat SEO ini dibanding Google Search Console?",
      a: "Crawler kami mengambil data berdasarkan simulasi akses langsung (live-fetch) yang sama seperti cara Googlebot merayapi situs Anda. Ini menjadikannya alat komparasi seketika yang sangat presisi sebelum data GSC Anda diperbarui setiap minggunya."
   },
   {
      q: "Apakah ada batasan penggunaan harian?",
      a: "Untuk halaman Free Tools, Anda dapat melakukan puluhan pemindaian gratis per harinya tanpa mendaftar. Jika Anda butuh crawling ribuan halaman internal secara kontinu, silakan pilih Paket Agensi kami."
   }
];


export default function DynamicFreeToolPage({ params }: { params: Promise<{ slug: string }> }) {
   const resolvedParams = use(params);
   const slug = resolvedParams.slug;
   const [url, setUrl] = useState("");
   const [loading, setLoading] = useState(false);
   const [result, setResult] = useState<any>(null);
   const [error, setError] = useState("");
   const [openFaq, setOpenFaq] = useState<number | null>(0);

   const title = formatTitle(slug);
   const description = TOOL_DESCRIPTIONS[slug] || "Jalankan simulasi dan analisis seketika untuk domain Anda dengan serangkaian algoritma SEO profesional kelas enterprise.";

   const handleAnalyze = async (e: React.FormEvent) => {
      e.preventDefault();
      let submitUrl = url.trim();
      if (!submitUrl) return;
      if (!/^https?:\/\//i.test(submitUrl)) {
         submitUrl = `https://${submitUrl}`;
      }

      setLoading(true);
      setError("");
      setResult(null);
      try {
         const res = await API.post(`/api/tools/${slug}`, { url: submitUrl });
         setResult(res.data);
         // Scroll to result smoothly
         setTimeout(() => {
            document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
         }, 200);
      } catch (err: any) {
         setError(err.response?.data?.detail || "Terjadi kesalahan. Pastikan URL dapat diakses.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-[#FDFDFD] font-sans flex flex-col pt-24 overflow-x-hidden">
         
         {/* HERO SECTION DEKSTOP & MOBILE */}
         <div className="relative overflow-hidden w-full bg-slate-900 border-b border-slate-800">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 flex flex-col lg:flex-row items-center gap-12">
               
               {/* Left: Text Content */}
               <div className="flex-1 text-center lg:text-left">
                  <Link href="/free-tools" className="inline-flex items-center text-blue-400 hover:text-white mb-8 text-sm font-semibold tracking-wide uppercase transition-colors">
                     <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                     </svg>
                     Koleksi SEO Tools
                  </Link>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                     {title} <span className="text-blue-500">Gratis.</span>
                  </h1>
                  
                  <p className="text-slate-300 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
                     {description}
                  </p>

                  <div className="hidden lg:flex flex-wrap gap-4 items-center">
                     <span className="flex items-center gap-2 text-slate-400 text-sm font-semibold bg-white/5 py-2 px-4 rounded-full border border-white/10">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Real-time Data
                     </span>
                     <span className="flex items-center gap-2 text-slate-400 text-sm font-semibold bg-white/5 py-2 px-4 rounded-full border border-white/10">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Tanpa Registrasi
                     </span>
                     <span className="flex items-center gap-2 text-slate-400 text-sm font-semibold bg-white/5 py-2 px-4 rounded-full border border-white/10">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Keamanan 100%
                     </span>
                  </div>
               </div>

               {/* Right: Analyzer Form Card */}
               <div className="w-full lg:w-[480px]">
                  <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100/10 relative overflow-hidden">
                     <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-50/50 rounded-full blur-2xl pointer-events-none"></div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-2 relative z-10">Mulai Analisis</h3>
                     <p className="text-slate-500 font-medium mb-6 relative z-10">Ketik URL target untuk menjalankan crawler.</p>
                     
                     <form onSubmit={handleAnalyze} className="relative z-10 flex flex-col gap-4">
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🌐</span>
                           <input 
                              type="text" 
                              required
                              placeholder="contoh: bangbisnis.web.id" 
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              className="w-full pl-11 pr-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none font-semibold text-slate-900"
                           />
                        </div>
                        <button 
                           type="submit" 
                           disabled={loading}
                           className="w-full py-4.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-xl shadow-blue-600/30 flex justify-center items-center h-[56px]"
                        >
                           {loading ? (
                              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                           ) : "Jalankan Crawler Sekarang"}
                        </button>
                     </form>

                     {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-semibold text-sm text-center">
                           ⚠️ {error}
                        </div>
                     )}
                  </div>
               </div>

            </div>
         </div>

         <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="result-section">
            
            {/* RESULT PANEL */}
            {result && (
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-20">
                  <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                     
                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 border-b border-slate-100 pb-8">
                        <div>
                           <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Diagnostic Report</h2>
                           <p className="text-slate-500 font-medium mt-1">Sistem berhasil membedah kerangka {url}</p>
                        </div>
                        {result.status && (
                           <div className={`px-6 py-2.5 rounded-full text-base font-bold border-2 ${
                              result.status === "good" ? "bg-green-50 text-green-600 border-green-200 shadow-[0_0_20px_rgba(74,222,128,0.2)]" :
                              result.status === "warning" ? "bg-yellow-50 text-yellow-600 border-yellow-200" :
                              "bg-red-50 text-red-600 border-red-200"
                           }`}>
                              STATUS: {result.status.toUpperCase()}
                           </div>
                        )}
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(result).filter(([k]) => k !== 'status').map(([key, value]) => (
                           <div key={key} className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 hover:border-blue-200 hover:bg-white transition-all hover:shadow-lg group">
                              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">{key.replace(/_/g, " ")}</p>
                              <div className="text-lg font-semibold text-slate-800 break-all">
                                 {typeof value === "object" ? (
                                    <pre className="text-sm bg-slate-900 text-green-400 p-4 rounded-xl overflow-x-auto shadow-inner">{JSON.stringify(value, null, 2)}</pre>
                                 ) : String(value)}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            )}

            {/* PRODUCT HIGHLIGHTS OR EXTRA FEATURES GRID */}
            <div className="mb-24">
               <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">Mengapa Menggunakan {title}?</h2>
                  <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Kami merancang alat ini untuk meletakkan kekuatan Enterprise SEO di tangan bisnis UMKM dan Kreator Lokal secara gratis.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { 
                        icon: "🚀", 
                        title: "Analitik Berkecepatan Cahaya", 
                        desc: "Didukung oleh framework cloud-native yang mengeksekusi ekstraksi DOM dokumen HTML dan mem-bypass proteksi standar dalam hitungan detik."
                     },
                     { 
                        icon: "🛡️", 
                        title: "100% Aman & Tanpa Log", 
                        desc: "Semua pemrosesan data dilakukan dari sisi server virtual (VPC) dan langsung dibuang. Kami tidak melacak atau menyimpan URL pencarian aset bisnis Anda."
                     },
                     { 
                        icon: "💡", 
                        title: "Wawasan Siap Pakai", 
                        desc: "Daripada menyajikan angka mentah, algoritma metrik kami memberikan klasifikasi (Good/Warning/Critical) agar Anda tahu area mana yang harus dieksekusi segera."
                     }
                  ].map((feat, i) => (
                     <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] text-left hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-4xl mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center">{feat.icon}</div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h4>
                        <p className="text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* FAQ SECTION */}
            <div className="max-w-4xl mx-auto mb-20 bg-white p-10 sm:p-14 rounded-[3rem] shadow-xl border border-slate-100">
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-10 text-center">Frequently Asked Questions</h2>
               <div className="space-y-4">
                  {FAQ_DATA.map((faq, index) => (
                     <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                        <button
                           onClick={() => setOpenFaq(openFaq === index ? null : index)}
                           className="w-full text-left px-6 py-5 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
                        >
                           <span className="font-bold text-slate-800 pr-8">{faq.q}</span>
                           <motion.svg
                              animate={{ rotate: openFaq === index ? 180 : 0 }}
                              className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                           >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                           </motion.svg>
                        </button>
                        <AnimatePresence>
                           {openFaq === index && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="overflow-hidden"
                              >
                                 <div className="px-6 py-5 text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                                    {faq.a}
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  ))}
               </div>
            </div>

            {/* FULL AUDIT CTA */}
            <section className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-10 sm:p-20 relative overflow-hidden shadow-2xl border border-blue-500/30">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)]"></div>
               <div className="max-w-3xl mx-auto text-center relative z-10">
                  <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-blue-100 text-sm font-bold uppercase tracking-widest mb-6 border border-white/20 backdrop-blur-md">Skala Enterprise Level</span>
                  <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">Berhenti Menebak, Mulai Mendominasi.</h3>
                  <p className="text-blue-100/80 mb-10 leading-relaxed text-xl sm:text-2xl font-medium max-w-2xl mx-auto">
                     Anda butuh lebih dari 1 metrik? Pindai seluruh kelemahan website kompetitor dan konversi hasil menjadi PDF White-Label hanya dalam 1 klik.
                  </p>
                  <Link href="/" className="inline-flex items-center gap-3 bg-white text-blue-800 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-[0_20px_50px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(255,255,255,0.5)] active:scale-95">
                     Jadwalkan Full Audit Gratis
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </Link>
               </div>
            </section>

         </div>
         <Footer />
      </div>
   );
}
