import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "SEO untuk E-commerce 2026: Cara Mendominasi Google & Meningkatkan Sales",
   description: "Panduan lengkap strategi SEO e-commerce 2026. Pelajari optimasi halaman produk, skema markup, dan cara mengalahkan kompetitor besar di Google.",
};

export default function EcommerceSEOPage() {
   return (
      <div className="min-h-screen bg-white pt-24 pb-20">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex mb-8 text-sm font-medium text-slate-400">
               <Link href="/blog" className="hover:text-slate-600 transition-colors">Blog</Link>
               <span className="mx-2">/</span>
               <span className="text-slate-600">E-commerce</span>
            </nav>

            {/* Article Header */}
            <header className="mb-16">
               <h1 className="text-4xl sm:text-6xl font-semibold text-slate-900 mb-8 tracking-tight leading-tight">
                  Strategi SEO <span className="text-blue-600">E-commerce 2026</span>: Cara Mendominasi Google Search
               </h1>
               <div className="flex items-center gap-4 text-slate-500 font-medium">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl text-blue-600">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                  </div>
                  <div>
                     <p className="text-slate-900 font-semibold">Tim Pakar SEO</p>
                     <p className="text-sm">Diperbarui: 19 Maret 2026 • 12 Menit Membaca</p>
                  </div>
               </div>
            </header>

            {/* Main Content */}
            <article className="prose prose-slate prose-lg max-w-none">
               <p className="lead text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                  Di tahun 2026, SEO untuk e-commerce bukan lagi sekadar memasukkan kata kunci ke dalam deskripsi produk. Dengan hadirnya AI Search, Anda harus memastikan website Anda dapat dipahami oleh mesin dan dipercaya oleh manusia.
               </p>

               <h2 className="text-3xl font-semibold text-slate-900 mt-16 mb-6">1. Optimasi Halaman Produk untuk AI Search</h2>
               <p className="mb-6">
                  Google SGE (Search Generative Experience) sekarang lebih sering menampilkan perbandingan produk secara langsung. Agar produk Anda muncul di ringkasan AI, pastikan:
               </p>
               <ul className="list-disc pl-6 mb-8 space-y-3">
                  <li><strong>Deskripsi Unik:</strong> Jangan gunakan deskripsi default dari supplier. Tulis ulang dengan fokus pada manfaat pengguna.</li>
                  <li><strong>Data Terstruktur (Schema.xml):</strong> Gunakan <code>Product</code> schema lengkap dengan rating, harga, and ketersediaan stok.</li>
                  <li><strong>Gambar Berkualitas Tinggi:</strong> Gunakan alt-text yang deskriptif untuk membantu AI memahami konteks gambar.</li>
               </ul>

               <div className="bg-blue-50 border-l-4 border-blue-500 p-8 my-12 rounded-r-2xl">
                  <h3 className="text-blue-900 font-semibold mb-2">💡 Tips Pro:</h3>
                  <p className="text-blue-800 font-medium italic">
                     "Gunakan Tool Meta Tag Generator kami untuk membuat title tag yang menarik klik (High CTR) namun tetap aman dari pinalti Google."
                  </p>
               </div>

               <h2 className="text-3xl font-semibold text-slate-900 mt-16 mb-6">2. Kecepatan Loading adalah Kunci Konversi</h2>
               <p className="mb-6">
                  Setiap detik keterlambatan dapat menurunkan konversi hingga 20%. Di 2026, Core Web Vitals menjadi faktor penentu ranking yang semakin ketat. Gunakan CDN and optimasi gambar otomatis untuk memastikan website Anda dimuat dalam waktu kurang dari 2 detik.
               </p>

               <h2 className="text-3xl font-semibold text-slate-900 mt-16 mb-6">3. Membangun Otoritas (E-E-A-T)</h2>
               <p className="mb-6">
                  Google memprioritaskan website yang memiliki Experience, Expertise, Authoritativeness, and Trustworthiness. Untuk e-commerce, ini berarti Anda harus memiliki ulasan pelanggan asli, halaman 'Tentang Kami' yang transparan, and kebijakan pengembalian yang jelas.
               </p>

               <div className="my-16 p-10 bg-slate-900 rounded-[3rem] text-white">
                  <h3 className="text-2xl font-semibold mb-6">Siap Meningkatkan Traffic E-commerce Anda?</h3>
                  <p className="text-slate-400 mb-8 font-medium">
                     Lakukan audit gratis sekarang and lihat apa yang menghambat website Anda untuk muncul di halaman pertama.
                  </p>
                  <Link href="/" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all">
                     Scan Website Sekarang
                  </Link>
               </div>
            </article>
         </div>
      </div>
   );
}
