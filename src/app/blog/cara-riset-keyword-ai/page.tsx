import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Cara Riset Keyword di Era Search Generative Experience (SGE) — Blog SEO Scanner",
   description: "Pelajari cara riset keyword terbaru di era AI and SGE. Fokus pada user intent, topic clustering, and optimasi Answer Box Google.",
};

export default function KeywordAISEOPage() {
   return (
      <div className="min-h-screen bg-white pt-24 pb-20 font-sans">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex mb-8 text-sm font-medium text-slate-400">
               <Link href="/blog" className="hover:text-slate-600 transition-colors">Blog Utama</Link>
               <span className="mx-2">/</span>
               <span className="text-slate-600">Riset Keyword</span>
            </nav>

            {/* Article Header */}
            <header className="mb-16">
               <h1 className="text-4xl sm:text-6xl font-semibold text-slate-900 mb-8 tracking-tight leading-tight">
                  Cara Riset <span className="text-blue-600">Keyword AI</span> di Era Search Generative Experience
               </h1>
               <div className="flex items-center gap-4 text-slate-500 font-medium pb-12 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl text-blue-600 font-semibold border border-slate-200">AM</div>
                  <div>
                     <p className="text-slate-900 font-semibold">Aditya Market</p>
                     <p className="text-sm">Dipublikasikan: 15 Maret 2026 • 10 Menit Membaca</p>
                  </div>
               </div>
            </header>

            {/* Main Content */}
            <article className="prose prose-slate prose-lg max-w-none mb-20 text-slate-700">
               <p className="lead text-xl text-slate-600 mb-8 font-medium">
                  Era mengetik kata kunci pendek di Google sudah mulai bergeser ke arah pencarian percakapan yang lebih panjang dan kompleks.
               </p>
               <h2 className="text-3xl font-semibold text-slate-900 mt-12 mb-6 tracking-tight">1. Berhenti Mengejar Volume, Mulai Mengejar Intent</h2>
               <p className="mb-6">
                  Volume pencarian 10.000 sebulan tidak ada gunanya jika intent-nya adalah "hanya mencari info". Di era AI, keyword dengan intent "transaksional" dan "komersial" jauh lebih berharga meskipun volumenya kecil. Fokuslah pada long-tail keywords yang menjawab pertanyaan spesifik.
               </p>
               <h2 className="text-3xl font-semibold text-slate-900 mt-12 mb-6 tracking-tight">2. Menganalisa Answer Box & AI Overviews</h2>
               <p className="mb-6">
                  Lihat apa yang dijawab oleh AI Google saat ini. Jika AI memberikan jawaban singkat, carilah celah informasi yang belum dijawab. Buatlah konten yang melengkapi jawaban AI tersebut agar pengguna tetap mengklik website Anda untuk informasi lebih mendalam.
               </p>
               <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 my-10 font-medium italic text-blue-900">
                  "Keyword di era AI bukan tentang kata, tapi tentang solusi atas masalah yang ditanyakan pengguna."
               </div>
               <h2 className="text-3xl font-semibold text-slate-900 mt-12 mb-6 tracking-tight">3. Penggunaan Tool AI untuk Klastering</h2>
               <p className="mb-6">
                  Gunakan tool AI untuk mengelompokkan ribuan keyword ke dalam topik-topik (topic clusters). Membangun otoritas topik jauh lebih efektif daripada mencoba ranking untuk satu kata kunci tunggal secara berulang-ulang.
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
