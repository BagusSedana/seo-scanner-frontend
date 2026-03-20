import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Panduan SEO Teknikal 2026: Mengapa Kecepatan Saja Tidak Cukup — Blog SEO Scanner",
   description: "Baca panduan lengkap mengenai SEO Teknikal di 2026: INP, Data Terstruktur AI, dan Security Headers. Tingkatkan ranking Google Anda.",
};

export default function TechnicalSEOPage() {
   return (
      <div className="min-h-screen bg-white pt-24 pb-20 font-sans">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex mb-8 text-sm font-medium text-slate-400">
               <Link href="/blog" className="hover:text-slate-600 transition-colors">Blog Utama</Link>
               <span className="mx-2">/</span>
               <span className="text-slate-600">SEO Teknikal</span>
            </nav>

            {/* Article Header */}
            <header className="mb-16">
               <h1 className="text-4xl sm:text-6xl font-semibold text-slate-900 mb-8 tracking-tight leading-tight">
                  Panduan SEO <span className="text-blue-600">Teknikal 2026</span>: Mengapa Kecepatan Saja Tidak Cukup
               </h1>
               <div className="flex items-center gap-4 text-slate-500 font-medium pb-12 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl text-blue-600 font-semibold border border-slate-200">PS</div>
                  <div>
                     <p className="text-slate-900 font-semibold">Pratama SEO</p>
                     <p className="text-sm">Dipublikasikan: 18 Maret 2026 • 10 Menit Membaca</p>
                  </div>
               </div>
            </header>

            {/* Main Content */}
            <article className="prose prose-slate prose-lg max-w-none mb-20 text-slate-700">
               <p className="lead text-xl text-slate-600 mb-8 font-medium">
                  Dunia SEO telah berubah drastis dalam setahun terakhir. Jika pada 2024 kita berbicara tentang PageSpeed, di 2026 kita berbicara tentang <strong>Semantic Technicality</strong> dan <strong>AI Discoverability</strong>.
               </p>
               <h2 className="text-3xl font-semibold text-slate-900 mt-12 mb-6 tracking-tight">1. Core Web Vitals: Interaction to Next Paint (INP)</h2>
               <p className="mb-6">
                  Google tidak lagi hanya peduli pada seberapa cepat gambar Anda dimuat. INP sekarang menjadi metrik utama yang mengukur seberapa responsif halaman Anda terhadap interaksi pengguna. Website yang terasa "laggy" saat diklik tombolnya akan sulit mendapatkan ranking #1.
               </p>
               <h2 className="text-3xl font-semibold text-slate-900 mt-12 mb-6 tracking-tight">2. Schema Markup yang Siap untuk AI</h2>
               <p className="mb-6">
                  AI search engine seperti ChatGPT Search dan Google SGE memerlukan data terstruktur yang sangat spesifik. Penggunaan JSON-LD schema bukan lagi opsional. Anda harus mendefinisikan hubungan entitas (entities) di dalam kode Anda agar AI paham apa yang Anda tawarkan.
               </p>
               <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 my-10 font-medium italic text-blue-900">
                  "SEO Teknikal di 2026 adalah tentang membangun infrastruktur yang bisa dibaca oleh mesin tanpa mengorbankan pengalaman pengguna manusia."
               </div>
               <h2 className="text-3xl font-semibold text-slate-900 mt-12 mb-6 tracking-tight">3. HTTPS & Security Headers</h2>
               <p className="mb-6">
                  Keamanan bukan hanya tentang gembok hijau. Header keamanan seperti HSTS, CSP, dan X-Frame-Options sekarang menjadi sinyal kepercayaan yang kuat bagi algoritma Google. Website tanpa proteksi dasar ini akan dianggap berisiko tinggi bagi pengguna.
               </p>
            </article>

            {/* Sharing / Footer */}
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center">
               <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">Edukasi Saja Tidak Cukup.</h3>
               <p className="text-slate-500 font-medium mb-8">
                  Ambil tindakan sekarang. Scan website Anda dan lihat apa yang perlu diperbaiki secara teknikal untuk mulai naik ke ranking #1.
               </p>
               <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-xl shadow-blue-900/10">
                     Mulai Audit SEO Gratis
                  </Link>
                  <Link href="/blog" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                     Kembali ke List Blog
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
