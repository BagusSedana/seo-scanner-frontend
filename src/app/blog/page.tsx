import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Blog SEO Utama — Tips & Strategi Ranking #1 di Google 2026",
   description: "Kumpulan artikel, panduan teknikal, dan rahasia SEO terbaru untuk mendominasi hasil pencarian Google. Pelajari cara optimasi gratis di sini.",
   alternates: { canonical: "https://scanner.bangbisnis.id/blog" },
};

const POSTS = [
   {
      slug: "panduan-seo-teknikal-2026",
      title: "Panduan SEO Teknikal 2026: Mengapa Kecepatan Saja Tidak Cukup",
      excerpt: "Banyak yang mengira PageSpeed adalah segalanya. Namun di 2026, Core Web Vitals dan AI-ready schema menjadi penentu utama.",
      date: "18 Mar 2026",
      category: "SEO Teknikal",
      icon: (
         <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
         </svg>
      )
   },
   {
      slug: "cara-riset-keyword-ai",
      title: "Cara Riset Keyword di Era Search Generative Experience (SGE)",
      excerpt: "Search Engine sudah berubah. Pelajari cara menemukan 'intent' pengguna yang tidak bisa dideteksi oleh tool riset keyword biasa.",
      date: "15 Mar 2026",
      category: "Riset Keyword",
      icon: (
         <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
         </svg>
      )
   },
   {
      slug: "pentingnya-backlink-berkualitas",
      title: "Kualitas vs Kuantitas: Rahasia Membangun Backlink Otoritas",
      excerpt: "Satu backlink dari situs berita besar jauh lebih berharga daripada 1000 backlink spam. Inilah cara mendapatkannya secara organik.",
      date: "10 Mar 2026",
      category: "Link Building",
      icon: (
         <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
         </svg>
      )
   }
];

export default function BlogPage() {
   return (
      <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-4xl mb-20 text-center mx-auto">
               <span className="inline-block px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold mb-6 border border-blue-100 uppercase tracking-widest shadow-sm">
                  ✨ Wawasan & Strategi Dominasi
               </span>
               <h1 className="text-5xl sm:text-7xl font-semibold text-slate-900 mb-8 tracking-tight leading-[1.05]">
                  Wawasan Utama <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">SEO Scanner</span>
               </h1>
               <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">
                  Pelajari strategi terbaru untuk meningkatkan traffic organik dan mendominasi halaman pertama Google Search secara sistematis.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {POSTS.map((post) => (
                   <Link 
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-700 flex flex-col"
                   >
                      <div className="aspect-[2/1] bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-1000">
                         {post.icon}
                      </div>
                      <div className="p-6 sm:p-8 flex-grow">
                         <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-600 px-2 py-1 bg-blue-50 rounded-md border border-blue-100 shadow-sm">
                               {post.category}
                            </span>
                            <span className="text-xs text-slate-400 font-semibold">{post.date}</span>
                         </div>
                         <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-[1.3] tracking-tight">
                            {post.title}
                         </h2>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">
                            {post.excerpt}
                         </p>
                         <div className="mt-auto flex items-center text-sm font-semibold text-slate-900 group-hover:gap-2 transition-all tracking-tight underline decoration-blue-500 decoration-0 group-hover:decoration-2 underline-offset-4">
                            Baca Selengkapnya
                            <svg className="ml-1 w-4 h-4 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                         </div>
                      </div>
                   </Link>
               ))}
            </div>

            {/* CTA Section */}
            <div className="mt-32 p-16 sm:p-24 bg-blue-600 rounded-[4rem] text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(37,99,235,0.4)]">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-50"></div>
               <div className="relative z-10 max-w-2xl mx-auto">
                  <h2 className="text-4xl sm:text-6xl font-semibold mb-8 relative z-10 tracking-tight leading-[1.05]">
                     Ingin Website Anda Rank #1?
                  </h2>
                  <p className="text-blue-100 text-xl font-semibold mb-14 max-w-xl mx-auto relative z-10 opacity-90">
                     Gunakan tool SEO Scanner kami untuk menemukan kesalahan teknikal yang menghambat ranking Anda.
                  </p>
                  <Link 
                     href="/" 
                     className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-semibold text-lg hover:scale-105 transition-all shadow-2xl active:scale-95"
                  >
                     Mulai Scan Gratis Sekarang
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
