// src/app/seo-tools/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const TOOLS = [
   {
      id: "meta-gen",
      title: "Meta Tag Generator",
      desc: "Buat meta title dan description yang sempurna untuk Google.",
      icon: "🏷️",
      category: "SEO Dasar",
      status: "ready"
   },
   {
      id: "robots-gen",
      title: "Robots.txt Generator",
      desc: "Instruksi khusus untuk Googlebot dan crawler lainnya.",
      icon: "🤖",
      category: "Teknikal",
      status: "ready"
   },
   {
      id: "sitemap-gen",
      title: "XML Sitemap Generator",
      desc: "Bantu Google menemukan semua halaman website kamu.",
      icon: "🗺️",
      category: "Teknikal",
      status: "soon"
   },
   {
      id: "keyword-density",
      title: "Keyword Density Checker",
      desc: "Cek kepadatan kata kunci agar tidak dianggap spam.",
      icon: "🔍",
      category: "Konten",
      status: "soon"
   },
   {
      id: "canonical-check",
      title: "Canonical Tag Checker",
      desc: "Pastikan URL utama kamu terindeks dengan benar.",
      icon: "🔗",
      category: "Teknikal",
      status: "soon"
   },
   {
      id: "open-graph",
      title: "OG Tag Generator",
      desc: "Optimalkan tampilan link saat dishare di WhatsApp & Sosmed.",
      icon: "📱",
      category: "Social",
      status: "soon"
   },
   {
      id: "schema-gen",
      title: "JSON-LD Schema Gen",
      desc: "Dapatkan Rich Snippets (Bintang) di hasil pencarian Google.",
      icon: "✨",
      category: "Teknikal",
      status: "soon"
   },
   {
      id: "tap-target",
      title: "Mobile Tap Target",
      desc: "Cek apakah tombol kamu mudah diklik di HP.",
      icon: "👆",
      category: "Mobile",
      status: "soon"
   },
   {
      id: "hreflang-gen",
      title: "Hreflang Generator",
      desc: "Bantu Google memahami versi bahasa di website kamu.",
      icon: "🌍",
      category: "Teknikal",
      status: "soon"
   },
   {
      id: "alt-text-check",
      title: "Alt Text Checker",
      desc: "Pastikan semua gambar memiliki deskripsi yang SEO-friendly.",
      icon: "🖼️",
      category: "Konten",
      status: "soon"
   },
   {
      id: "link-counter",
      title: "Internal Link Counter",
      desc: "Analisa distribusi link internal dan eksternal halaman.",
      icon: "⛓️",
      category: "Teknikal",
      status: "soon"
   },
   {
      id: "favicon-gen",
      title: "Favicon Generator",
      desc: "Buat ikon browser yang pas untuk semua perangkat.",
      icon: "🎨",
      category: "Desain",
      status: "soon"
   },
   {
      id: "security-headers",
      title: "Security Headers Check",
      desc: "Cek keamanan website (HSTS, CSP, X-Frame-Options).",
      icon: "🛡️",
      category: "Teknikal",
      status: "soon"
   },
   {
      id: "redirect-check",
      title: "Redirect Checker",
      desc: "Cek status redirect 301 vs 302 untuk menjaga otoritas.",
      icon: "↪️",
      category: "Teknikal",
      status: "soon"
   },
   {
      id: "title-length",
      title: "Title Length Checker",
      desc: "Pastikan judul tidak terpotong di hasil pencarian.",
      icon: "📏",
      category: "SEO Dasar",
      status: "soon"
   },
   {
      id: "desc-length",
      title: "Meta Description Check",
      desc: "Pastikan deskripsi cukup panjang untuk menarik klik.",
      icon: "📝",
      category: "SEO Dasar",
      status: "soon"
   },
   {
      id: "ai-alt-gen",
      title: "AI Image Alt Generator",
      desc: "Gunakan AI untuk membuat deskripsi gambar otomatis.",
      icon: "🧠",
      category: "AI Tools",
      status: "soon"
   },
   {
      id: "slug-gen",
      title: "URL Slug Generator",
      desc: "Buat URL yang bersih dan mengandung kata kunci.",
      icon: "🔗",
      category: "SEO Dasar",
      status: "soon"
   },
   {
      id: "word-counter",
      title: "Word Counter Pro",
      desc: "Hitung jumlah kata dan waktu baca artikel kamu.",
      icon: "🔢",
      category: "Konten",
      status: "soon"
   },
   {
      id: "ssl-check",
      title: "SSL Certificate Check",
      desc: "Cek status masa berlaku sertifikat HTTPS kamu.",
      icon: "🔒",
      category: "Keamanan",
      status: "soon"
   },
   {
      id: "whois-lookup",
      title: "Domain Whois Lookup",
      desc: "Lihat informasi kepemilikan dan umur domain.",
      icon: "ℹ️",
      category: "Domain",
      status: "soon"
   },
   {
      id: "dns-check",
      title: "DNS Record Checker",
      desc: "Verifikasi A, CNAME, TXT, dan MX records domain.",
      icon: "📡",
      category: "Teknikal",
      status: "soon"
   },
   {
      id: "serp-preview",
      title: "SERP Preview Tool",
      desc: "Simulasikan tampilan halaman kamu di Google Search.",
      icon: "📺",
      category: "SEO Dasar",
      status: "soon"
   },
   {
      id: "keyword-wrap",
      title: "Keyword Wrapper",
      desc: "Ubah daftar keyword menjadi format Match Type Adwords.",
      icon: "🎁",
      category: "SEM",
      status: "soon"
   },
   {
      id: "case-converter",
      title: "Case Converter",
      desc: "Ubah tulisan menjadi UPPERCASE, lowercase, atau Title Case.",
      icon: "Aa",
      category: "Utility",
      status: "soon"
   },
   {
      id: "lorem-ipsum",
      title: "Lorem Ipsum Gen",
      desc: "Generate teks dummy untuk kebutuhan desain layout.",
      icon: "📜",
      category: "Desain",
      status: "soon"
   },
   {
      id: "qr-gen",
      title: "QR Code Generator",
      desc: "Buat QR Code untuk URL atau teks secara instan.",
      icon: "🔳",
      category: "Marketing",
      status: "soon"
   },
   {
      id: "broken-links",
      title: "Broken Link Finder",
      desc: "Temukan 404 error yang merusak user experience.",
      icon: "🚫",
      category: "Teknikal",
      status: "soon"
   },
   {
      id: "minify-js-css",
      title: "Code Minifier",
      desc: "Kecilkan ukuran file JS/CSS untuk mempercepat website.",
      icon: "⚡",
      category: "Developer",
      status: "soon"
   },
   {
      id: "page-outline",
      title: "Heading Outline Check",
      desc: "Cek struktur heading H1-H6 halaman website.",
      icon: "🏗️",
      category: "Konten",
      status: "soon"
   }
];

export default function SEOToolsPage() {
   const [activeTool, setActiveTool] = useState<string | null>(null);

   return (
      <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
               <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black mb-4 border border-blue-100 uppercase tracking-widest shadow-sm"
               >
                  ✨ 100% Free SEO Products
               </motion.span>
               <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl sm:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]"
               >
                  Boost Rankings with Our <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Premium SEO Tools</span>
               </motion.h1>
               <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-500 leading-relaxed font-medium"
               >
                  Kumpulan utility gratis untuk membantu optimasi teknikal website kamu. 
                  Sederhana, cepat, dan tanpa perlu login.
               </motion.p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {TOOLS.map((tool, idx) => (
                  <motion.div
                     key={tool.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: (idx % 3) * 0.1 }}
                     whileHover={{ y: -10, transition: { duration: 0.2 } }}
                     onClick={() => tool.status === 'ready' && setActiveTool(tool.id)}
                     className={`group relative p-10 bg-white border border-slate-200 rounded-[3rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all cursor-pointer ${tool.status === 'soon' ? 'opacity-80' : 'hover:border-green-300'}`}
                  >
                     <div className="text-4xl mb-8 bg-slate-50 w-20 h-20 flex items-center justify-center rounded-[2rem] group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                        {tool.icon}
                     </div>
                     <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-3 ml-1">
                        {tool.category} {tool.status === 'soon' && '• Coming Soon'}
                     </p>
                     <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                        {tool.title}
                     </h3>
                     <p className="text-base text-slate-500 leading-relaxed font-medium mb-8">
                        {tool.desc}
                     </p>
                     
                     {tool.status === 'ready' ? (
                        <div className="flex items-center text-sm font-black text-blue-600 group-hover:gap-3 transition-all">
                           Gunakan Sekarang 
                           <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                           </svg>
                        </div>
                     ) : (
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                           Coming Soon
                        </div>
                     )}
                  </motion.div>
               ))}
            </div>

            {/* Bottom CTA Section */}
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mt-32 p-12 sm:p-20 bg-slate-900 rounded-[4rem] text-center relative overflow-hidden group shadow-2xl"
            >
               {/* Decorative background elements */}
               <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2"></div>
               
               <div className="relative z-10 max-w-2xl mx-auto">
                  <h2 className="text-3xl sm:text-5xl font-black text-white mb-8 tracking-tight">
                     Join 10,000+ SEOs & Developers
                  </h2>
                  <p className="text-lg text-slate-400 font-medium mb-12">
                     Gunakan alat bantu SEO kami secara gratis selamanya. Dapatkan notifikasi saat fitur baru dirilis.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                     <Link 
                        href="/register" 
                        className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-500 hover:scale-105 transition-all shadow-xl shadow-blue-900/20"
                     >
                        Daftar Gratis Sekarang
                     </Link>
                     <Link 
                        href="/pricing" 
                        className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white border border-white/10 rounded-2xl font-black hover:bg-white/20 transition-all backdrop-blur-sm"
                     >
                        Lihat Paket Pro
                     </Link>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Modal Overlay / Tool Implementation Preview */}
         <AnimatePresence>
            {activeTool && (
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
                  onClick={() => setActiveTool(null)}
               >
                  <motion.div 
                     initial={{ scale: 0.9, y: 20 }}
                     animate={{ scale: 1, y: 0 }}
                     exit={{ scale: 0.9, y: 20 }}
                     className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden"
                     onClick={e => e.stopPropagation()}
                  >
                     {activeTool === "meta-gen" && <MetaGenerator onClose={() => setActiveTool(null)} />}
                     {activeTool === "robots-gen" && <RobotsGenerator onClose={() => setActiveTool(null)} />}
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}

function MetaGenerator({ onClose }: { onClose: () => void }) {
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");

   const code = `<title>${title || "Judul Halaman"}</title>\n<meta name="description" content="${desc || "Deskripsi halaman kamu..."}">`;

   return (
      <div className="p-10">
         <div className="flex justify-between items-start mb-8">
            <div>
               <h2 className="text-2xl font-black text-slate-900 mb-2">Meta Tag Generator</h2>
               <p className="text-sm text-slate-500 font-medium">Buat meta title & description standar Google.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
               <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
         </div>
         
         <div className="space-y-6">
            <div>
               <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Page Title ({title.length}/60)</label>
               <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                  placeholder="Contoh: Jasa SEO Jakarta Terbaik #1"
                  maxLength={70}
               />
            </div>
            <div>
               <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Meta Description ({desc.length}/155)</label>
               <textarea 
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  rows={3}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                  placeholder="Berikan ringkasan menarik tentang layanan atau konten halaman kamu..."
                  maxLength={180}
               />
            </div>
            
            <div className="bg-slate-900 p-6 rounded-[2rem] relative group border border-slate-800">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">HTML Preview</span>
               </div>
               <pre className="text-blue-400 text-sm font-mono overflow-auto whitespace-pre-wrap">
                  {code}
               </pre>
            </div>
         </div>
      </div>
   );
}

function RobotsGenerator({ onClose }: { onClose: () => void }) {
   const [allow, setAllow] = useState(true);
   const [sitemap, setSitemap] = useState("");

   const code = `User-agent: *\n${allow ? 'Allow: /' : 'Disallow: /'}\nSitemap: ${sitemap || 'https://domain.com/sitemap.xml'}`;

   return (
      <div className="p-10">
         <div className="flex justify-between items-start mb-8">
            <div>
               <h2 className="text-2xl font-black text-slate-900 mb-2">Robots.txt Generator</h2>
               <p className="text-sm text-slate-500 font-medium">Kontrol bagaimana mesin pencari merayapi situs Anda.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
               <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
         </div>
         
         <div className="space-y-6">
            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
               <div>
                  <p className="font-bold text-slate-900">Izinkan Semua Crawler?</p>
                  <p className="text-xs text-slate-400 font-medium whitespace-pre-wrap">Gunakan Allow: / untuk semua mesin pencari.</p>
               </div>
               <button 
                  onClick={() => setAllow(!allow)}
                  className={`w-14 h-8 rounded-full transition-all relative flex items-center shadow-inner ${allow ? 'bg-blue-600' : 'bg-slate-300'}`}
               >
                  <motion.div 
                     animate={{ x: allow ? 26 : 4 }}
                     className="w-6 h-6 bg-white rounded-full shadow-lg"
                  />
               </button>
            </div>
            
            <div>
               <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Sitemap URL (Opsional)</label>
               <input 
                  type="text" 
                  value={sitemap}
                  onChange={e => setSitemap(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium"
                  placeholder="https://website.com/sitemap.xml"
               />
            </div>
            
            <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Robots.txt Preview</span>
               </div>
               <pre className="text-blue-400 text-sm font-mono whitespace-pre">
                  {code}
               </pre>
            </div>
         </div>
      </div>
   );
}
