// src/app/panduan-seo/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Panduan SEO Indonesia Lengkap untuk Pemula hingga Expert",
   description:
      "Pelajari SEO dari nol hingga mahir. 6 bab panduan praktis berbahasa Indonesia: on-page SEO, technical SEO, local SEO, link building, riset keyword, dan lebih.",
   alternates: { canonical: "https://scanner.bangbisnis.id/panduan-seo" },
   openGraph: {
      title: "Panduan SEO Indonesia Lengkap | SEO Scanner by Bang Bisnis",
      description:
         "Pelajari SEO dari nol hingga mahir. 6 bab panduan praktis berbahasa Indonesia, 100% gratis.",
      url: "https://scanner.bangbisnis.id/panduan-seo",
   },
};


const CHAPTERS = [
   {
      no: "01",
      title: "Apa itu SEO?",
      desc: "Memahami cara kerja mesin pencari, algoritma Google, dan mengapa SEO penting untuk bisnis di Indonesia.",
      topics: [
         "Cara kerja Google crawler",
         "On-page vs Off-page SEO",
         "SEO vs SEM: mana yang lebih baik?",
         "Timeline hasil SEO yang realistis",
      ],
      time: "10 menit",
   },
   {
      no: "02",
      title: "Riset Kata Kunci",
      desc: "Temukan kata kunci yang tepat untuk target audiens Indonesia dengan volume pencarian tinggi dan persaingan yang bisa dijangkau.",
      topics: [
         "Tools riset keyword gratis & berbayar",
         "Long-tail keyword untuk UMKM",
         "Analisis search intent",
         "Mapping keyword ke halaman",
      ],
      time: "15 menit",
   },
   {
      no: "03",
      title: "Optimasi On-Page",
      desc: "Panduan lengkap mengoptimasi setiap elemen halaman agar mudah dibaca mesin pencari dan pengguna.",
      topics: [
         "Struktur heading H1–H6",
         "Optimasi title tag & meta description",
         "Internal linking yang efektif",
         "Optimasi gambar & alt text",
      ],
      time: "20 menit",
   },
   {
      no: "04",
      title: "Technical SEO",
      desc: "Aspek teknis yang sering diabaikan tapi sangat berpengaruh terhadap peringkat dan crawlability.",
      topics: [
         "Core Web Vitals (LCP, FID, CLS)",
         "Sitemap XML & robots.txt",
         "Schema markup & structured data",
         "HTTPS & keamanan website",
      ],
      time: "25 menit",
   },
   {
      no: "05",
      title: "SEO Lokal Indonesia",
      desc: "Strategi khusus untuk bisnis yang menarget kota atau wilayah tertentu di Indonesia.",
      topics: [
         "Google My Business optimization",
         "Citation building di direktori lokal",
         "Review management",
         "Keyword geo-targeting",
      ],
      time: "15 menit",
   },
   {
      no: "06",
      title: "Link Building",
      desc: "Cara mendapatkan backlink berkualitas dari website Indonesia yang relevan dan terpercaya.",
      topics: [
         "Guest posting di media Indonesia",
         "HARO & digital PR",
         "Broken link building",
         "Strategi outreach yang efektif",
      ],
      time: "20 menit",
   },
];

export default function PanduanSEOPage() {
   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            {/* Header */}
            <div className="mb-12 text-center">
               <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
               >
                  ← Beranda
               </Link>
               <div className="mt-6 inline-block bg-green-50 border border-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                  Panduan Lengkap
               </div>
               <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Panduan SEO Indonesia
                  <br />
                  <span className="text-green-600">
                     untuk Pemula hingga Expert
                  </span>
               </h1>
               <p className="text-gray-500 max-w-xl mx-auto">
                  Pelajari SEO dari nol hingga mahir. Panduan praktis berbahasa
                  Indonesia, disesuaikan dengan ekosistem digital lokal.
               </p>
               <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400">
                  <span>📖 6 bab</span>
                  <span>⏱️ ~105 menit</span>
                  <span>🆓 100% gratis</span>
               </div>
            </div>

            {/* Chapters */}
            <div className="space-y-4">
               {CHAPTERS.map((ch) => (
                  <div
                     key={ch.no}
                     className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
                  >
                     <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                           {ch.no}
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-start justify-between gap-4 mb-2">
                              <h2 className="font-bold text-gray-900">
                                 {ch.title}
                              </h2>
                              <span className="text-xs text-gray-400 flex-shrink-0">
                                 ⏱️ {ch.time}
                              </span>
                           </div>
                           <p className="text-sm text-gray-500 mb-4">
                              {ch.desc}
                           </p>
                           <div className="flex flex-wrap gap-2">
                              {ch.topics.map((t) => (
                                 <span
                                    key={t}
                                    className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full"
                                 >
                                    {t}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* CTA */}
            <div className="mt-10 bg-gray-900 rounded-2xl p-8 text-white text-center">
               <h2 className="text-xl font-bold mb-2">Sudah siap praktik?</h2>
               <p className="text-gray-400 text-sm mb-5">
                  Scan website kamu sekarang dan terapkan panduan ini langsung.
               </p>
               <Link
                  href="/dashboard/scan"
                  className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors"
               >
                  Mulai Scan Gratis →
               </Link>
            </div>
         </div>
      </div>
   );
}
