// src/app/(landing)/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";

export default function SEOCheckupLandingPage() {
   const [openFaq, setOpenFaq] = useState<number | null>(null);
   const [url, setUrl] = useState("");
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const handleScan = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!url) return toast.error("Masukkan URL website Anda");
      
      setLoading(true);
      try {
         // Clean URL
         let domain = url.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
         const res = await API.post("/scan", { domain });
         router.push(`/hasil/${res.data.scan_id}`);
      } catch (err: any) {
         toast.error(err.response?.data?.detail || "Gagal memulai scan");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900 antialiased overflow-x-hidden">
         {/* JSON-LD Schema */}
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify([
                  {
                     "@context": "https://schema.org",
                     "@type": "WebApplication",
                     name: "SEO Checkup",
                     url: "https://seo-scanner.bangbisnis.id",
                     applicationCategory: "BusinessApplication",
                     operatingSystem: "Web",
                     description: "Platform Audit SEO #1 di Indonesia. Tingkatkan peringkat website Anda di hasil pencarian Google dalam 30 detik.",
                     provider: {
                        "@type": "Organization",
                        name: "Bang Bisnis",
                     },
                  },
               ]),
            }}
         />

         <main className="flex-grow">
            {/* ── HERO SECTION (Blue Theme) ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative pt-24 pb-48 lg:pt-36 lg:pb-56 bg-blue-600 overflow-hidden text-white">
               {/* Subtle background patterns */}
               <div className="absolute inset-0 z-0">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                  {/* Glowing orbs */}
                  <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/40 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 mix-blend-screen"></div>
                  <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4 mix-blend-screen"></div>
               </div>

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
                     
                     <div className="lg:w-1/2">
                        <motion.div
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                        >
                           <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                           <span className="text-white text-xs font-bold tracking-tight uppercase">
                              Pembaruan AI Scanner v2.0
                           </span>
                        </motion.div>

                        <motion.h1
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.8, ease: "easeOut" }}
                           className="text-4xl sm:text-5xl lg:text-[4rem] font-black mb-8 leading-[1.1] tracking-tight"
                        >
                           Audit SEO Website <br /> & Laporan Cepat <br /> Mendominasi Google.
                        </motion.h1>

                        <motion.p
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.8, delay: 0.2 }}
                           className="text-lg sm:text-xl text-blue-100 mb-10 max-w-lg leading-relaxed font-normal"
                        >
                           Tingkatkan visibilitas organik dan peringkat pencarian bisnis Anda dengan hasil audit mendalam dalam hitungan detik.
                        </motion.p>

                        <motion.ul 
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.8, delay: 0.3 }}
                           className="space-y-4 mb-12"
                        >
                           {[
                              "Audit teknis, performa, dan backlink seketika",
                              "Laporan White-Label eksklusif untuk klien Anda",
                              "Analisis kompetitor berbasis AI yang akurat"
                           ].map((feature, i) => (
                              <li key={i} className="flex items-center gap-3 text-white font-medium">
                                 <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                 </svg>
                                 <span className="text-sm sm:text-base">{feature}</span>
                              </li>
                           ))}
                        </motion.ul>

                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.8, delay: 0.4 }}
                           className="flex flex-wrap items-center gap-4"
                        >
                           <Link 
                              href="/pricing"
                              className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-xl shadow-blue-900/20"
                           >
                              Pilih Paket SEO Anda
                           </Link>
                           <Link 
                              href="#how-it-works"
                              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors"
                           >
                              Lihat Semua Fitur
                           </Link>
                        </motion.div>
                     </div>

                     <div className="lg:w-1/2 w-full max-w-2xl">
                        {/* Dark Mockup Window */}
                        <motion.div
                           initial={{ opacity: 0, x: 40 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 1, delay: 0.2 }}
                           className="relative bg-[#0f111a] rounded-3xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden aspect-[4/3] flex flex-col"
                        >
                           {/* Browser Chrome */}
                           <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10 bg-white/5">
                              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                              <div className="ml-4 flex-1 h-6 bg-white/5 rounded-md"></div>
                           </div>
                           
                           {/* Mockup Content (Including SEO Scanner Form) */}
                           <div className="flex-1 p-8 sm:p-12 flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0f111a] to-[#0f111a]">
                              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                              <div className="w-full max-w-md relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                                 <h3 className="text-xl font-bold text-center text-white mb-2">Audit SEO Gratis Sekarang</h3>
                                 <p className="text-sm text-slate-400 text-center mb-6">Analisis ribuan titik data on-page dan performa sedetik saja.</p>
                                 <form onSubmit={handleScan} className="flex flex-col gap-4">
                                    <input 
                                       type="text" 
                                       placeholder="Masukkan URL (e.g. apple.com)" 
                                       value={url}
                                       onChange={(e) => setUrl(e.target.value)}
                                       className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all font-medium placeholder:text-slate-500"
                                    />
                                    <button 
                                       type="submit"
                                       disabled={loading}
                                       className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-white/10 disabled:opacity-50"
                                    >
                                       {loading ? 'Menganalisis...' : 'Mulai Audit SEO'}
                                    </button>
                                 </form>
                              </div>
                           </div>
                        </motion.div>
                     </div>

                  </div>
               </div>
            </motion.section>

            {/* ── SUCCESS METRICS SECTION (White Span) ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
               <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="text-left w-full md:w-auto">
                     <p className="text-lg font-medium text-slate-500 leading-tight">Digunakan oleh</p>
                     <p className="text-lg font-medium text-slate-800 leading-tight">Digital Marketer</p>
                  </div>
                  
                  <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-slate-100 text-center items-center">
                     <div className="px-4 py-4 md:py-0">
                        <p className="text-3xl font-medium text-slate-800 mb-1">10k+</p>
                        <p className="text-xs font-medium text-slate-500 tracking-wide uppercase">Website Diaudit</p>
                     </div>
                     <div className="px-4 py-4 md:py-0">
                        <p className="text-3xl font-medium text-slate-800 mb-1">92%</p>
                        <p className="text-xs font-medium text-slate-500 tracking-wide uppercase">Trafik Naik</p>
                     </div>
                     <div className="px-4 py-4 md:py-0">
                        <p className="text-3xl font-medium text-slate-800 mb-1">30</p>
                        <p className="text-xs font-medium text-slate-500 tracking-wide uppercase">Detik Skrining</p>
                     </div>
                     <div className="px-4 py-4 md:py-0">
                        <p className="text-3xl font-medium text-slate-800 mb-1">24/7</p>
                        <p className="text-xs font-medium text-slate-500 tracking-wide uppercase">Pemantauan</p>
                     </div>
                  </div>
               </div>
            </motion.section>

            {/* ── CLIENT MARQUEE SECTION ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-20 bg-white overflow-hidden border-b border-slate-100">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                  <p className="text-sm font-semibold text-slate-400 tracking-widest uppercase">
                     Dipercaya oleh pengusaha UMKM dan Agensi di Indonesia
                  </p>
               </div>
               
               <div className="relative flex overflow-x-hidden w-full">
                  <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                  
                  <motion.div 
                     animate={{ x: ["0%", "-50%"] }}
                     transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                     className="whitespace-nowrap flex items-center gap-20 py-4 w-max"
                  >
                     {[
                        { name: "TokoBuku Kita", logo: "📚" },
                        { name: "Bengkel Maju", logo: "🔧" },
                        { name: "Klinik Sehat", logo: "🏥" },
                        { name: "Apotek Kita", logo: "💊" },
                        { name: "Angkringan Mas", logo: "🍜" },
                        { name: "Bimbel ABC", logo: "🎓" },
                        // Duplicate for smooth infinite loop
                        { name: "TokoBuku Kita", logo: "📚" },
                        { name: "Bengkel Maju", logo: "🔧" },
                        { name: "Klinik Sehat", logo: "🏥" },
                        { name: "Apotek Kita", logo: "💊" },
                        { name: "Angkringan Mas", logo: "🍜" },
                        { name: "Bimbel ABC", logo: "🎓" },
                        // Triplicate
                        { name: "TokoBuku Kita", logo: "📚" },
                        { name: "Bengkel Maju", logo: "🔧" },
                        { name: "Klinik Sehat", logo: "🏥" },
                        { name: "Apotek Kita", logo: "💊" },
                        { name: "Angkringan Mas", logo: "🍜" },
                        { name: "Bimbel ABC", logo: "🎓" }
                     ].map((client, i) => (
                        <div key={i} className="flex items-center gap-3 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all cursor-default w-48 justify-center">
                           <span className="text-2xl font-black text-slate-800 tracking-tight">{client.name}</span>
                        </div>
                     ))}
                  </motion.div>
               </div>
            </motion.section>

            {/* ── KENAPA BUTUH SEO SECTION (Left/Right) ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-32 bg-white border-b border-slate-100" id="features">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                     <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                     >
                        <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-4 block">Tentang Platform Kami</span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8 leading-[1.15] tracking-tight">
                           Kenapa Bisnis Anda <br className="hidden sm:block" />
                           <span className="text-blue-600">Butuh SEO Checkup,</span> <br className="hidden sm:block" /> 
                           Bukan Sekedar Tools?
                        </h2>
                        <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                           Miliki kendali penuh atas data organik Anda. Laporan SEO Checkup disusun rapih berdasarkan prioritas perbaikan yang benar-benar memberikan dampak ranking.
                        </p>
                        <Link 
                           href="/dashboard/scan"
                           className="inline-flex px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors shadow-lg"
                        >
                           Mulai Optimasi Sekarang
                        </Link>
                     </motion.div>

                     <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                     >
                        {/* Timeline Line */}
                        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-200"></div>
                        
                        <div className="space-y-10 relative">
                           {[
                              { title: "Temukan Masalah Teknis", desc: "Scan otomatis mengecek struktur Tag H1-H6, sitemap, meta robts, dan tag rel=canonical dalam sekejap." },
                              { title: "Analisis Kecepatan (PageSpeed)", desc: "Metrik Core Web Vitals sangat penting untuk Google. Cek kecepatan LCP, FID & CLS bisnis Anda di sini." },
                              { title: "Kuasai Pencarian Lokal", desc: "Pastikan nama, alamat, dan nomor telepon bisnis Anda tervalidasi selaras untuk mendominasi Google Maps lokal." },
                              { title: "Pemantauan Backlink Berkelanjutan", desc: "Identifikasi profil backlink beracun dan pantau siapa yang memberikan Anda tautan otoritas tinggi terbaru." }
                           ].map((item, i) => (
                              <div key={i} className="flex gap-6 relative group hover:-translate-y-1 transition-transform cursor-pointer">
                                 {/* Timeline Check */}
                                 <div className="w-14 h-14 bg-white border border-slate-200 group-hover:border-blue-300 group-hover:shadow-md transition-all rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-sm relative">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                                       <span className="font-black text-sm">{i + 1}</span>
                                    </div>
                                 </div>
                                 <div className="pt-2">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </motion.div>
                  </div>
               </div>
            </motion.section>

            {/* ── ALAT SEO SECTION (4 Columns) ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-32 bg-white border-t border-slate-100">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
                     <div className="max-w-2xl">
                        <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-4 block">Alat Utama Kami</span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                           Alat Audit SEO <span className="text-blue-600">Terlengkap di Indonesia</span>
                        </h2>
                     </div>
                     <Link 
                        href="/free-tools"
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap"
                     >
                        Kumpulan Alat Gratis
                     </Link>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {[
                        { title: "Technical Audit", desc: "Telusuri link mati, redirect berulang, dan file disallow yang melanggar ketentuan peramban organik." },
                        { title: "Meta Analyzer", desc: "Tinjau panjang karakter, keterbacaan, serta rasio kemunculan kata kunci utama di bagian judul/deskripsi." },
                        { title: "Sitemap Validator", desc: "Pastikan susunan link XML Anda bersih dan siap merayap dengan baik oleh spider bot milik Google." },
                        { title: "Mobile & Security", desc: "Evaluasi rasio tampilan seluler serta sertifikat SSL dan kerentanan header HTTP dari pihak tidak bertanggungjawab." }
                     ].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                           <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                           </div>
                           <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                           <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.section>

            {/* ── PORTFOLIO SECTION -> FITUR UNGGULAN (Grid of 4) ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-24 bg-white border-b border-slate-100" id="portfolio">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center mb-16">
                     <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Fitur Unggulan Agensi</h2>
                     <Link href="/fitur-agensi" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium">
                        Pelajari Selengkapnya
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                     </Link>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     {[
                        { name: "Audit SEO Menyeluruh", type: "Menganalisis 50+ Metrik On-Page", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "text-blue-600", bg: "bg-blue-50" },
                        { name: "Extractor Tag H1 & Meta", type: "Tinjau Struktur Konten Kompetitor", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color: "text-teal-600", bg: "bg-teal-50" },
                        { name: "Sitemap XML Validator", type: "Pastikan URL Terindeks Valid", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "text-orange-600", bg: "bg-orange-50" },
                        { name: "Export PDF Laporan Klien", type: "Buat Audit Profesional Pakai Logo", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", color: "text-purple-600", bg: "bg-purple-50" }                     
                     ].map((item, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 flex items-start gap-6 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group">
                           <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/></svg>
                           </div>
                           <div className="flex-1">
                              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                              <p className="text-slate-500 font-medium leading-relaxed">{item.type}</p>
                           </div>
                           <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.section>

            {/* ── DARK SECTION: WHY CHOOSE US & BLUE CTA BOX ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-32 bg-[#111111] text-white overflow-hidden relative" id="why-us">
               {/* Grid Pattern */}
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
               
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="text-center max-w-3xl mx-auto mb-20">
                     <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Platform Pilihan</span>
                     <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight">Menjadi Andalan <span className="text-blue-500">Agensi Digital Se-Indonesia</span></h2>
                  </div>

                  {/* 4 Columns Top */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 border-b border-white/10 pb-20">
                     {[
                        { title: "Fokus pada Traffic Murni", desc: "Kami menyajikan data agar Anda bisa memfokuskan perbaikan ke area yang membuahkan organic click." },
                        { title: "Bebas Ekspor & Bagikan", desc: "Download tak terbatas dengan format PDF profesional, di-rebranding dengan logo nama perusahaan Anda." },
                        { title: "Harga Sangat Bersaing", desc: "Dapatkan kualitas audit setara software mahal dengan harga lokal yang sangat ekonomis per tahunnya." },
                        { title: "Server Cepat & Data Real-Time", desc: "Bebas delay analisis, scraping langsung berjalan di detik Anda memasukkan domain URL." }
                     ].map((item, i) => (
                        <div key={i} className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all"></div>
                           <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 font-black text-blue-400 text-xl shadow-inner shadow-white/5">
                              0{i+1}
                           </div>
                           <h3 className="text-xl font-bold text-white mb-4 leading-snug">{item.title}</h3>
                           <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                        </div>
                     ))}
                  </div>

                  {/* Big Blue CTA Box */}
                  <div className="bg-blue-600 rounded-[3rem] p-10 lg:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] border border-blue-500">
                     <div className="max-w-2xl">
                        <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
                           Pilih Paket Langganan SEO Checkup Anda!
                        </h3>
                        <p className="text-blue-100 text-lg sm:text-xl font-medium">
                           Mulai dapatkan klien luar biasa banyak dengan mencetak laporan audit putih berlogo agensi Anda sendiri setiap saat.
                        </p>
                     </div>
                     <Link 
                        href="/pricing"
                        className="px-8 py-5 bg-white text-blue-600 font-bold rounded-full text-lg whitespace-nowrap hover:scale-105 transition-transform shadow-xl shadow-black/10"
                     >
                        Upgrade ke Pro
                     </Link>
                  </div>
               </div>
            </motion.section>

            {/* ── TESTIMONIALS SECTION ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-32 bg-white border-b border-slate-100">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                     <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">Testimoni Tim Kami</span>
                     <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">Apa Kata Klien B2B Spesifik Kami</h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                     {[
                        { text: "Jujur laporannya sangat clear, desain PDF enak dipandang buat dikirim ke pitching calon tender. Langsung closing dua kali gara-gara data speed reportnya akurat.", author: "Faris Kurniawan", role: "CEO Agensi Digital" },
                        { text: "Bahasanya simpel gak bikin pusing klien awam pas dibaca. Terutama masalah Broken Link yang langsung nunjukin halaman spesifik buat di tackle hari gedenya.", author: "Diana Santi", role: "Freelance SEO Expert" },
                        { text: "Fitur white-label PDF ini jujur ngosongin kantong kalau langganan tools luar negeri. Sekarang pake SEO Checkup, harganya jauh dibawah dengan data audit yang identik kualitasnya.", author: "Reyhan Saputra", role: "Owner Bisnis IT" }
                     ].map((t, i) => (
                        <div key={i} className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                           <div className="flex gap-1 text-blue-500 mb-6">
                              {[1,2,3,4,5].map(s => <svg key={s} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                           </div>
                           <p className="text-slate-600 font-medium leading-relaxed italic mb-8">"{t.text}"</p>
                           <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                              <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden min-w-[3rem]">
                                 <Image src={`https://i.pravatar.cc/150?u=${i+10}`} alt="avatar" width={150} height={150} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-slate-900">{t.author}</h4>
                                 <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.section>

            {/* ── PRICING SECTION ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-32 bg-white relative overflow-hidden" id="pricing">
               <div className="text-center max-w-3xl mx-auto mb-24 px-4">
                  <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">Harga Langganan Terjangkau</span>
                  <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">Paket SEO Spesial</h2>
                  <p className="text-slate-500 mt-4 text-lg">Pilih dari kebutuhan kecil personal pengguna UMKM hingga skala agency yang menangani lebih dari belasan site per bulan.</p>
               </div>

               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                     
                     {/* Tier 1 */}
                     <div className="bg-white border border-slate-200 rounded-[2rem] p-10 hover:shadow-xl hover:border-blue-200 transition-all text-left flex flex-col">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Basic</h3>
                        <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">Bagi Anda yang hanya butuh tes cepat satu kali sesekali buat cek keadaan.</p>
                        <div className="text-slate-500 text-xs font-bold mb-1">Mulai dari</div>
                        <div className="flex items-baseline justify-start gap-1 text-slate-900 mb-8 border-b border-slate-100 pb-8">
                           <span className="text-sm font-bold">Rp</span>
                           <span className="text-5xl font-black tracking-tight" style={{ letterSpacing: "-0.05em" }}>0</span>
                           <span className="text-xs font-bold text-slate-400">/bln</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">Batasan 10 Scan Bulanan</span></div></li>
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">Analitik Website Terbuka Semua</span></div></li>
                           <li className="flex gap-3 text-slate-400 italic text-sm font-medium"><svg className="w-5 h-5 opacity-40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg> <div><del className="block">Agensi Logo (White Label)</del></div></li>
                           <li className="flex gap-3 text-slate-400 italic text-sm font-medium"><svg className="w-5 h-5 opacity-40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg> <div><del className="block">Export PDF Custom</del></div></li>
                        </ul>
                        <Link href="/register?plan=free" className="block w-full py-3.5 text-blue-600 font-bold bg-transparent text-center border-2 border-slate-200 rounded-full hover:border-blue-600 hover:bg-blue-50 transition-colors">Piih Paket Basic</Link>
                     </div>

                     {/* Tier 2 (Highlighted) */}
                     <div className="border-blue-600 ring-2 ring-blue-600 bg-white shadow-2xl shadow-blue-900/10 rounded-[2rem] p-10 relative scale-100 sm:scale-105 z-10 text-left flex flex-col">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
                           Paling Diminati
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Pro Webmaster</h3>
                        <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">Buka berbagai limitasi untuk mengaudit blog Anda setiap minggu dengan masif.</p>
                        <div className="text-slate-500 text-xs font-bold mb-1">Mulai dari</div>
                        <div className="flex items-baseline justify-start gap-1 text-slate-900 mb-8 border-b border-slate-100 pb-8">
                           <span className="text-sm font-bold">Rp</span>
                           <span className="text-5xl font-black tracking-tight" style={{ letterSpacing: "-0.05em" }}>89</span>
                           <span className="text-xl font-bold">.000</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">Batasan 100 Scan Bulanan</span><span className="block text-xs mt-0.5 opacity-60 font-normal">Frekuensi wajar</span></div></li>
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">Akses Ekstensi Fitur Lengkap</span></div></li>
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">Dapat Eksport Laporan PDF</span></div></li>
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">Prioritas Engine Scanner</span></div></li>
                           <li className="flex gap-3 text-slate-400 italic text-sm font-medium"><svg className="w-5 h-5 opacity-40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg> <div><del className="block">Agensi Logo</del></div></li>
                        </ul>
                        <Link href="/pricing?plan=pro" className="block w-full py-3.5 bg-blue-600 text-white font-bold text-center rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">Pilih Paket Pro Webmaster</Link>
                     </div>

                     {/* Tier 3 */}
                     <div className="bg-white border border-slate-200 rounded-[2rem] p-10 hover:shadow-xl hover:border-blue-200 transition-all text-left flex flex-col">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Agency</h3>
                        <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">Layanan premium melayani klien agency, branding laporan, dan prioritas sistem.</p>
                        <div className="text-slate-500 text-xs font-bold mb-1">Mulai dari</div>
                        <div className="flex items-baseline justify-start gap-1 text-slate-900 mb-8 border-b border-slate-100 pb-8">
                           <span className="text-sm font-bold text-slate-400">Rp</span>
                           <span className="text-5xl font-black tracking-tight" style={{ letterSpacing: "-0.05em" }}>229</span>
                           <span className="text-xl font-bold">.000</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">Hingga 1,000 Scan per Bulan</span></div></li>
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">Semua fitur Pro Webmaster</span></div></li>
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">PDF Report Tanpa Watermark (Sendiri)</span></div></li>
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">Prioritas Jalur Layanan Cepat</span></div></li>
                           <li className="flex gap-3 text-slate-600 text-sm font-medium"><svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> <div><span className="block">Akses API Khusus</span></div></li>
                        </ul>
                        <Link href="/pricing?plan=agency" className="block w-full py-3.5 text-blue-600 font-bold bg-transparent text-center border-2 border-slate-200 rounded-full hover:border-blue-600 hover:bg-blue-50 transition-colors">Pilih Paket Agency</Link>
                     </div>

                  </div>

                  {/* Add On Layanan Tambahan */}
                  <div className="mt-28 border-t border-slate-100 pt-20">
                     <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Layanan Tambahan (Add-ons)</h3>
                        <p className="text-slate-500 font-medium text-sm">Optimalkan website Anda dengan layanan tambahan yang dapat disesuaikan dengan kebutuhan spesifik bisnis.</p>
                     </div>
                     
                     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                           { title: "Top-Up Kuota Scan", desc: "Beli 5 kuota tambahan kapan saja tanpa batas waktu expired.", price: "Rp25.000 / 5 Scan", id: "addon-5" },
                           { title: "Top-Up 50 Kuota", desc: "Beli 50 kuota tambahan sekaligus dengan harga yang lebih hemat, tanpa batas waktu aktif.", price: "Rp150.000 / 50 Scan", id: "addon-50" },
                           { title: "API Akses Data", desc: "Koneksi token REST API untuk menarik metrik hasil scan via web Anda.", price: "Hubungi Kami", id: "addon-api" },
                           { title: "Konsultasi Priority", desc: "Dukungan jalur khusus melalui WhatsApp untuk optimasi manual.", price: "Mulai Rp500Rb", id: "addon-support" }
                        ].map((addon, i) => (
                           <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col relative group hover:border-blue-400 hover:shadow-lg transition-all text-left">
                              <h4 className="font-bold text-slate-900 mb-2">{addon.title}</h4>
                              <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-1">{addon.desc}</p>
                              
                              <div className="mt-auto pt-4 border-t border-slate-100">
                                 {addon.id === 'addon-api' || addon.id === 'addon-support' ? (
                                    <Link href="/contact" className="w-full block text-center py-2.5 bg-slate-50 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
                                       {addon.price}
                                    </Link>
                                 ) : (
                                    <button onClick={() => router.push(`/pricing`)} className="w-full text-center py-2.5 bg-blue-50 text-blue-600 font-bold text-xs rounded-xl hover:bg-blue-100 transition-colors border border-blue-100">
                                       Beli ({addon.price.split(' / ')[0]})
                                    </button>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>
                     
                     <div className="text-center mt-12 pb-8">
                        <p className="text-sm text-slate-600 font-medium">
                           Butuh fitur khusus atau bingung memilih paket? <Link href="/contact" className="text-blue-600 font-bold hover:underline">Konsultasikan dengan kami</Link>
                        </p>
                     </div>
                  </div>

               </div>
            </motion.section>

            {/* ── FAQ SECTION ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-24 bg-white border-b border-slate-100">
               <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                     <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">FAQ Audit</span>
                     <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Pertanyaan Teknis Sering Ditanya</h2>
                  </div>
                  
                  <div className="space-y-4">
                     {[
                        { q: "Apa saja poin evaluasi SEO Scanner saat bekerja merayap?", a: "Kami menggunakan indikator yang mendetail, mulai dari on-page element (H1-H6, title length), broken backlinks links di dalam server halaman itu sendiri, metrik sitemap XML, robots file, sampai SSL validation protocol hijau." },
                        { q: "Apakah scan-nya berat ke load traffic website saya?", a: "Satu kali request scan saja tidak akan memberatkan web anda lebih dari satu orang asli mengakses masuk ke landing page tujuan per browser biasa. Total safe per detiknya!" },
                        { q: "Apakah alat ini menggaransi masuk ke halaman nomor satu spesifik?", a: "Tentu saya tidak, karena SEO mencakup off-page organik real. Kami menyodorkan report checklist on-page yang tepat dengan standar metrik modern sehingga pondasi SEO Anda mantap tanpa keraguan isu sekecil apapun." },
                        { q: "Apa itu skema laporan agen atau Whitelabel?", a: "Jika beli di bagian Agency tier, user bisa taruh brand, nama company, serta warna kustom logo perusahaannya langsung di PDF output print agar terkesan dibangun sama kalian langsung kepada pembeli jasa SEO spesialis tim kalian." },
                        { q: "Apakah batas 1,000 Scan itu dari seluruh klien dirangkap satu lisensi?", a: "Benar, lisensi berlaku bagi limit akses engine scanner milik agensi Anda per bulannya. Kami menghitung penggunaan credit scan tanpa dibedakan oleh IP apa yang target disken di dashboard ini." }
                     ].map((item, i) => (
                        <div key={i} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors">
                           <button 
                                 onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                 className="w-full flex justify-between items-center p-6 text-left text-base sm:text-lg font-bold text-slate-900"
                              >
                                 {item.q}
                                 <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${openFaq === i ? 'bg-blue-600 text-white rotate-45' : 'bg-blue-50 text-blue-600'}`}>
                                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                 </span>
                              </button>
                              <AnimatePresence>
                                 {openFaq === i && (
                                    <motion.div
                                       initial={{ height: 0, opacity: 0 }}
                                       animate={{ height: 'auto', opacity: 1 }}
                                       exit={{ height: 0, opacity: 0 }}
                                       transition={{ duration: 0.3 }}
                                    >
                                       <div className="px-6 pb-6 text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-4">
                                          {item.a}
                                       </div>
                                    </motion.div>
                                 )}
                              </AnimatePresence>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.section>

            {/* ── FINAL CTA SECTION (Blue) ── */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="py-32 bg-blue-600 border-t border-blue-500">
               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tight">Siap Mendominasi <br /> Ranking Pertama Google?</h2>
                  <p className="text-xl text-blue-100 mb-12 font-medium max-w-2xl mx-auto">
                     Analisis website bisnis Anda, bongkar rahasia para pesaing dan mulailah proses perbaikan yang tepat sasaran sekarang juga di SEO Checkup.
                  </p>
                  <Link 
                     href="/register"
                     className="inline-flex px-10 py-5 bg-white text-blue-600 text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
                  >
                     Mulai Audit SEO Gratis
                  </Link>
                  <p className="mt-6 text-sm text-blue-200 font-medium">Bisa memuat data kompetitor secara aman dalam sedetik.</p>
               </div>
            </motion.section>
         </main>
         <Footer />
      </div>
   );
}
