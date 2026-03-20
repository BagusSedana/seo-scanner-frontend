"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const CATEGORIES = ["Semua Fitur", "On-Page SEO", "Technical SEO", "Performance", "Link Building", "AI & Content"];

const IconRenderer = ({ name }: { name: string }) => {
   switch (name) {
      case "On-Page SEO":
         return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
         );
      case "Technical SEO":
         return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
         );
      case "Performance":
         return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
         );
      case "Link Building":
         return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
         );
      case "AI & Content":
         return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
         );
      default:
         return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
         );
   }
};

const TOOLS = [
   {
      category: "On-Page SEO",
      name: "Title Tag Checker",
      desc: "Simulasikan tampilan title tag website Anda di Google SERP.",
      path: "/free-tools/title-tag"
   },
   {
      category: "On-Page SEO",
      name: "Meta Description Checker",
      desc: "Analisis panjang dan relevansi meta description.",
      path: "/free-tools/meta-description"
   },
   {
      category: "On-Page SEO",
      name: "H1-H6 Extractor",
      desc: "Ekstrak semua heading dari sebuah halaman untuk analisis hierarki.",
      path: "/free-tools/h1-extractor"
   },
   {
      category: "On-Page SEO",
      name: "Keyword Density Analyzer",
      desc: "Temukan persentase kata kunci yang digunakan dalam satu artikel.",
      path: "/free-tools/keyword-density-analyzer"
   },
   {
      category: "On-Page SEO",
      name: "SERP Preview Tool",
      desc: "Lihat hasil visual dari cuplikan hasil pencarian secara real-time.",
      path: "/free-tools/serp-preview-tool"
   },
   {
      category: "Technical SEO",
      name: "Sitemap Validator",
      desc: "Periksa sitemap.xml Anda dari error dan broken link.",
      path: "/free-tools/sitemap-validator"
   },
   {
      category: "Technical SEO",
      name: "Robots.txt Generator",
      desc: "Buat atau analisis file robots.txt untuk crawler Google.",
      path: "/free-tools/robots-txt-generator"
   },
   {
      category: "Technical SEO",
      name: "Canonical Tag Checker",
      desc: "Cek resolusi URL kanonikal untuk mencegah duplikasi konten.",
      path: "/free-tools/canonical-tag-checker"
   },
   {
      category: "Technical SEO",
      name: "Redirect Checker",
      desc: "Trace status chain redirect (301, 302, dsb) URL kustom.",
      path: "/free-tools/redirect-checker"
   },
   {
      category: "Technical SEO",
      name: "HTTP Header Analyzer",
      desc: "Inspeksi server response header seperti Cache-Control, X-Robots.",
      path: "/free-tools/http-header-analyzer"
   },
   {
      category: "Performance",
      name: "Image Optimizer Test",
      desc: "Deteksi gambar over-size yang menurunkan skor PageSpeed.",
      path: "/free-tools/image-optimizer-test"
   },
   {
      category: "Performance",
      name: "Mobile Friendly Tester",
      desc: "Uji rendering viewport di berbagai dimensi layar mobile.",
      path: "/free-tools/mobile-friendly-tester"
   },
   {
      category: "Performance",
      name: "Core Web Vitals Checker",
      desc: "Lihat LCP, FID, CLS website berdasarkan lab data.",
      path: "/free-tools/core-web-vitals-checker"
   },
   {
      category: "Performance",
      name: "Minification Checker",
      desc: "Cek file JS/CSS/HTML yang belum diminify untuk load lebih cepat.",
      path: "/free-tools/minification-checker"
   },
   {
      category: "Link Building",
      name: "Broken Link Checker",
      desc: "Cari broken outbound links (404) pada spesifik URL.",
      path: "/free-tools/broken-link-checker"
   },
   {
      category: "Link Building",
      name: "Backlink Anchor Analyzer",
      desc: "Analisis profil anchor text backlink yang mengarah ke site.",
      path: "/free-tools/backlink-anchor-analyzer"
   },
   {
      category: "AI & Content",
      name: "AI Content Detector",
      desc: "Hitung probabilitas teks di-generate oleh AI atau manusia.",
      path: "/free-tools/ai-content-detector"
   },
   {
      category: "AI & Content",
      name: "Readability Score",
      desc: "Uji seberapa mudah konten dibaca menggunakan indeks Flesch.",
      path: "/free-tools/readability-score"
   }
];

export default function FreeToolsPage() {
   const [activeCat, setActiveCat] = useState("Semua Fitur");
   const [searchQuery, setSearchQuery] = useState("");

   const filteredTools = TOOLS.filter((t) => {
      const matchCat = activeCat === "Semua Fitur" || t.category === activeCat;
      const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
   });

   return (
      <div className="min-h-screen bg-[#FDFDFD] font-sans antialiased flex flex-col pt-24">
         {/* Hero Header */}
         <section className="relative pt-12 pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6"
               >
                  <span className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold border border-blue-100 uppercase tracking-[0.2em] shadow-sm">
                     {TOOLS.length} Free SEO Utilities
                  </span>
               </motion.div>
               <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="text-5xl sm:text-7xl font-semibold text-slate-900 tracking-tighter mb-8 leading-[1.05]"
               >
                  Koleksi Tool SEO <br />
                  <span className="text-blue-600">Gratis Selamanya.</span>
               </motion.h1>
               <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-2xl mx-auto text-xl text-slate-500 font-medium mb-12 leading-relaxed"
               >
                  Audit on-page, teknikal, hingga backlink dengan presisi kelas enterprise. Tanpa bayar, tanpa kartu kredit.
               </motion.p>

               {/* Search Bar */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-xl mx-auto relative"
               >
                  <input 
                     type="text" 
                     placeholder="Cari tool SEO (contoh: Sitemap, Robot...)" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-semibold text-slate-900 shadow-sm"
                  />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                     <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                     </svg>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* Tools Directory */}
         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 flex-1 w-full">
            {/* Context Nav */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
               {CATEGORIES.map((cat) => (
                  <button
                     key={cat}
                     onClick={() => setActiveCat(cat)}
                     className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                        activeCat === cat 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                        : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {filteredTools.length > 0 ? (
                  filteredTools.map((tool, idx) => (
                     <Link href={tool.path || "#"} key={idx} className="group">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] hover:border-blue-200 transition-all duration-300 h-full flex flex-col">
                           <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                              <IconRenderer name={tool.category} />
                           </div>
                           <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors tracking-tight">
                              {tool.name}
                           </h3>
                           <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-2">
                              {tool.desc}
                           </p>
                        </div>
                     </Link>
                  ))
               ) : (
                  <div className="col-span-full py-20 text-center">
                     <p className="text-xl font-semibold text-slate-400">Tidak ada tool yang cocok dengan pencarian Anda.</p>
                  </div>
               )}
            </div>
         </section>

         {/* Footer CTA */}
         <section className="max-w-7xl mx-auto px-4 w-full pb-20">
            <div className="bg-blue-600 rounded-3xl p-12 sm:p-20 text-center text-white relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(37,99,235,0.4)]">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-50"></div>
               <h2 className="text-3xl sm:text-5xl font-semibold mb-6 relative z-10 tracking-tight leading-tight">Butuh Audit Sepintas Otomatis?</h2>
               <p className="text-blue-100 text-lg font-medium mb-10 max-w-xl mx-auto relative z-10 opacity-90">Pemindaian 5 dimensi ke seluruh aspek SEO website Anda dalam 10 detik.</p>
               <Link href="/" className="inline-block bg-white text-blue-600 px-10 py-5 rounded-2xl font-semibold text-lg hover:scale-105 transition-all shadow-2xl active:scale-95 relative z-10">Mulai Full Scan</Link>
            </div>
         </section>

         <Footer />
      </div>
   );
}
