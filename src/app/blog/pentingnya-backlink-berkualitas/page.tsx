import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Kualitas vs Kuantitas: Rahasia Membangun Backlink Otoritas — Blog SEO Scanner",
   description: "Jangan terjebak dengan ribuan backlink spam. Pelajari cara membangun profil backlink berkualitas tinggi melalui Digital PR dan konten relevan.",
};

export default function BacklinkSEOPage() {
   return (
      <div className="min-h-screen bg-white pt-24 pb-20 font-sans">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex mb-8 text-sm font-medium text-slate-400">
               <Link href="/blog" className="hover:text-slate-600 transition-colors">Blog Utama</Link>
               <span className="mx-2">/</span>
               <span className="text-slate-600">Link Building</span>
            </nav>

            {/* Article Header */}
            <header className="mb-16">
               <h1 className="text-4xl sm:text-6xl font-semibold text-slate-900 mb-8 tracking-tight leading-tight">
                  Kualitas vs Kuantitas: Rahasia Membangun <span className="text-blue-600">Backlink Otoritas</span>
               </h1>
               <div className="flex items-center gap-4 text-slate-500 font-medium pb-12 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl text-blue-600 font-semibold border border-slate-200">BS</div>
                  <div>
                     <p className="text-slate-900 font-semibold">Budi SEO</p>
                     <p className="text-sm">Dipublikasikan: 10 Maret 2026 • 10 Menit Membaca</p>
                  </div>
               </div>
            </header>

            {/* Main Content */}
            <article className="prose prose-slate prose-lg max-w-none mb-20 text-slate-700">
               <p className="lead text-xl text-slate-600 mb-8 font-medium">
                  Masih membeli paket 1000 backlink seharga 100 ribu? Berhentilah sebelum website Anda diblokir selamanya oleh Google.
               </p>
               <h2 className="text-3xl font-semibold text-slate-900 mt-12 mb-6 tracking-tight">1. Mengapa Satu Link Berkualitas Lebih Baik dari Seribu Sampah</h2>
               <p className="mb-6">
                  Algoritma Google sekarang sangat cerdas dalam mendeteksi link farm. Satu link dari situs berita nasional atau blog industri yang relevan memiliki bobot 100x lipat lebih besar daripada ribuan link dari blog zombie.
               </p>
               <h2 className="text-3xl font-semibold text-slate-900 mt-12 mb-6 tracking-tight">2. Strategi Digital PR dan Riset Orisinal</h2>
               <p className="mb-6">
                  Cara terbaik mendapatkan backlink di 2026 adalah melalui Digital PR. Buatlah riset data yang orisinal, infografik yang berguna, atau studi kasus unik yang membuat orang lain ingin mengutip website Anda sebagai sumber referensi. Inilah cara paling aman dan efektif.
               </p>
               <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 my-10 font-medium italic text-blue-900">
                  "Backlink yang paling kuat bukan yang Anda beli, tapi yang Anda dapatkan karena konten Anda memang layak dikutip."
               </div>
               <h2 className="text-3xl font-semibold text-slate-900 mt-12 mb-6 tracking-tight">3. Relevansi adalah Oksigen SEO</h2>
               <p className="mb-6">
                  Link dari website masak ke website teknologi tidak akan memberikan banyak nilai. Pastikan profil backlink Anda terlihat natural dan berasal dari industri yang saling berkaitan. Ini adalah sinyal kepercayaan terkuat bagi sistem anti-spam Google.
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
