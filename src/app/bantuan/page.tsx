// src/app/bantuan/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const FAQS = [
   {
      category: "Penggunaan Umum",
      items: [
         {
            q: "Bagaimana cara mulai scan website?",
            a: "Daftar atau login ke akun Anda, masuk ke halaman Scan, masukkan URL website yang ingin diaudit, lalu klik 'Scan Sekarang'. Hasil akan muncul dalam 3–10 detik.",
         },
         {
            q: "Apakah saya perlu install sesuatu?",
            a: "Tidak. SEOscanner adalah tool berbasis web, tidak perlu instalasi apapun. Cukup akses melalui browser.",
         },
         {
            q: "Berapa lama proses scan berlangsung?",
            a: "Scan biasanya selesai dalam 3–10 detik tergantung ukuran dan kecepatan website yang dianalisis.",
         },
         {
            q: "Apakah data website saya disimpan?",
            a: "Hasil scan disimpan di akun Anda agar bisa diakses ulang. Kami tidak menyimpan konten website Anda, hanya data hasil analisis.",
         },
      ],
   },
   {
      category: "Paket & Pembayaran",
      items: [
         {
            q: "Apa perbedaan paket Gratis, Pro, dan Agency?",
            a: "Paket Gratis: 3 scan/bulan. Pro: 20 scan/bulan + AI insight + export PDF. Agency: 100 scan/bulan + multi-user + white label report.",
         },
         {
            q: "Apakah ada free trial untuk paket berbayar?",
            a: "Ya, kami menyediakan trial 7 hari untuk paket Pro tanpa perlu kartu kredit.",
         },
         {
            q: "Metode pembayaran apa yang diterima?",
            a: "Transfer bank (BCA, BNI, BRI, Mandiri), QRIS, GoPay, OVO, dan kartu kredit/debit Visa/Mastercard.",
         },
         {
            q: "Bisakah saya upgrade/downgrade paket kapan saja?",
            a: "Ya. Upgrade berlaku langsung, downgrade berlaku di awal siklus billing berikutnya.",
         },
      ],
   },
   {
      category: "Hasil Scan",
      items: [
         {
            q: "Apa yang dianalisis dalam setiap scan?",
            a: "50+ parameter mencakup On-Page SEO, Technical SEO, Performance (Core Web Vitals), Mobile Friendliness, dan Structured Data.",
         },
         {
            q: "Seberapa akurat hasil scannya?",
            a: "Kami menganalisis data real-time dari website Anda menggunakan kombinasi teknik crawling dan API eksternal. Akurasi ~90–95% dibandingkan tools enterprise.",
         },
         {
            q: "Apakah saya bisa scan website kompetitor?",
            a: "Ya, Anda bisa scan website apapun yang bisa diakses publik, termasuk website kompetitor.",
         },
         {
            q: "Bagaimana cara menginterpretasi skor?",
            a: "Skor 80–100: Sangat Baik. 60–79: Perlu perbaikan minor. 40–59: Perlu perbaikan signifikan. Di bawah 40: Kritis, perlu perhatian segera.",
         },
      ],
   },
];

export default function BantuanPage() {
   const [open, setOpen] = useState<string | null>(null);
   const [search, setSearch] = useState("");

   const filtered = FAQS.map((cat) => ({
      ...cat,
      items: cat.items.filter(
         (item) =>
            !search ||
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase()),
      ),
   })).filter((cat) => cat.items.length > 0);

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-10 text-center">
               <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
               >
                  ← Beranda
               </Link>
               <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
                  Pusat Bantuan
               </h1>
               <p className="text-gray-500 text-sm mb-6">
                  Temukan jawaban atas pertanyaan yang sering diajukan.
               </p>
               <div className="relative max-w-md mx-auto">
                  <svg
                     width="16"
                     height="16"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24"
                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
                     />
                  </svg>
                  <input
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder="Cari pertanyaan..."
                     className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  />
               </div>
            </div>

            <div className="space-y-6">
               {filtered.map((cat) => (
                  <div key={cat.category}>
                     <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        {cat.category}
                     </h2>
                     <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100">
                        {cat.items.map((item) => (
                           <div key={item.q}>
                              <button
                                 onClick={() =>
                                    setOpen(open === item.q ? null : item.q)
                                 }
                                 className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                              >
                                 <span className="text-sm font-medium text-gray-900">
                                    {item.q}
                                 </span>
                                 <svg
                                    width="16"
                                    height="16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    className={`flex-shrink-0 mt-0.5 transition-transform ${open === item.q ? "rotate-180" : ""}`}
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M19 9l-7 7-7-7"
                                    />
                                 </svg>
                              </button>
                              {open === item.q && (
                                 <div className="px-6 pb-4">
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                       {item.a}
                                    </p>
                                 </div>
                              )}
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>

            <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 text-center">
               <p className="font-semibold text-gray-900 mb-1">
                  Tidak menemukan jawaban?
               </p>
               <p className="text-sm text-gray-400 mb-4">
                  Tim support kami siap membantu kamu.
               </p>
               <Link
                  href="/support"
                  className="inline-block bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
               >
                  Hubungi Support →
               </Link>
            </div>
         </div>
      </div>
   );
}
