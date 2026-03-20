// src/app/fitur/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const FEATURES_DETAIL: Record<string, any> = {
   "audit-teknikal": {
      title: "Audit SEO Teknikal Mendalam",
      tagline: "Temukan dan perbaiki masalah teknis yang menghambat ranking Anda.",
      description: "Layanan audit teknikal kami memeriksa lebih dari 50 parameter SEO on-page mulai dari meta tags, struktur heading, hingga konfigurasi server untuk memastikan website Anda ramah bagi mesin pencari.",
      benefits: [
         "Analisis struktur URL dan arsitektur situs.",
         "Pemeriksaan meta title, description, dan h-tags yang hilang.",
         "Identifikasi error 404 dan broken links secara otomatis.",
         "Audit file robots.txt dan sitemap.xml.",
         "Validasi SSL/HTTPS dan keamanan website."
      ]
   },
   "pagespeed": {
      title: "Optimasi Performa & PageSpeed",
      tagline: "Tingkatkan kecepatan website Anda dan Core Web Vitals.",
      description: "Google memprioritaskan website yang cepat. Kami menganalisis waktu muat, LCP, FID, dan CLS website Anda serta memberikan panduan konkret untuk optimasi gambar dan skrip.",
      benefits: [
         "Skor performa berdasarkan Google PageSpeed Insights.",
         "Rekomendasi optimasi ukuran gambar tanpa mengurangi kualitas.",
         "Analisis render-blocking resources (JS & CSS).",
         "Pemeriksaan server Response Time (TTFB).",
         "Tips setup caching dan kompresi Gzip/Brotli."
      ]
   },
   "kualitas-konten": {
      title: "Analisis Kualitas Konten AI",
      tagline: "Pastikan konten Anda relevan, unik, dan berotoritas tinggi.",
      description: "Konten adalah raja. Alat kami menggunakan teknologi AI untuk menganalisis kepadatan keyword, keunikan konten, dan keterbacaan agar sesuai dengan standar E-E-A-T Google.",
      benefits: [
         "Cek kepadatan kata kunci (keyword density) yang optimal.",
         "Analisis keterbacaan (Readability Score).",
         "Saran topik tambahan untuk meningkatkan otoritas konten.",
         "Deteksi konten duplikat internal.",
         "Optimasi peletakan target kata kunci di paragraf pertama."
      ]
   },
   "local-seo": {
      title: "Audit Local SEO & GMB",
      tagline: "Dominasi pencarian lokal di area bisnis Anda.",
      description: "Bagi bisnis fisik, muncul di Google Maps adalah kewajiban. Kami membantu mengaudit profil bisnis Anda agar muncul di hasil pencarian lokal Indonesia.",
      benefits: [
         "Audit sinkronisasi nama, alamat, dan telepon (NAP).",
         "Optimasi profil Google Business Profile.",
         "Analisis ulasan (review) dan rating kompetitor.",
         "Saran keyword lokal (misal: 'terdekat', 'Jakarta').",
         "Pemeriksaan embedding Google Maps di website."
      ]
   },
   "ranking-monitor": {
      title: "Pemantauan Ranking Kata Kunci",
      tagline: "Pantau posisi website Anda setiap hari di Google.",
      description: "Jangan menebak-nebak posisi Anda. Pantau pergerakan ranking untuk ribuan kata kunci target secara real-time dan terorganisir per wilayah.",
      benefits: [
         "Pelacakan posisi harian otomatis.",
         "History pergerakan ranking dalam grafik visual.",
         "Perbandingan posisi dengan kompetitor utama.",
         "Notifikasi saat ranking naik atau turun drastis.",
         "Laporan mingguan otomatis ke email Anda."
      ]
   },
   "backlink": {
      title: "Analisis Profil Backlink",
      tagline: "Bangun otoritas domain Anda dengan link berkualitas.",
      description: "Otoritas domain sangat bergantung pada kualitas backlink. Kami membedah siapa saja yang memberikan link ke website Anda dan mengidentifikasi link beracun.",
      benefits: [
         "Penghitungan skor Domain Authority (DA).",
         "Identifikasi backlink baru dan yang hilang (lost links).",
         "Analisis anchor text yang beragam.",
         "Deteksi spammy links yang perlu di-disavow.",
         "Analisis strategi link building kompetitor."
      ]
   }
};

export default async function FiturDetailPage({ params }: { params: Promise<{ slug: string }> }) {
   const { slug } = await params;
   const feature = FEATURES_DETAIL[slug];

   if (!feature) {
      notFound();
   }

   return (
      <div className="min-h-screen bg-white">
         <div className="pt-32 pb-20 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <nav className="flex mb-8 text-sm font-medium text-slate-400">
                  <Link href="/" className="hover:text-blue-600">Home</Link>
                  <span className="mx-2 text-slate-300">/</span>
                  <span className="text-slate-900">Fitur</span>
                  <span className="mx-2 text-slate-300">/</span>
                  <span className="text-blue-600 font-bold capitalize">{slug.replace("-", " ")}</span>
               </nav>
               <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">{feature.title}</h1>
               <p className="text-xl text-blue-600 font-medium max-w-3xl leading-relaxed">{feature.tagline}</p>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
               <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Mengapa Fitur Ini Penting?</h2>
                  <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                     {feature.description}
                  </p>
                  
                  <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white">
                     <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm italic">★</span>
                        Apa yang akan Anda dapatkan?
                     </h3>
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {feature.benefits.map((benefit: string, i: number) => (
                           <li key={i} className="flex gap-4">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">✓</div>
                              <span className="text-slate-300 text-sm leading-relaxed">{benefit}</span>
                           </li>
                        ))}
                     </ul>
                  </div>

                  <div className="mt-16 space-y-8">
                     <h3 className="text-2xl font-bold text-slate-900">FAQ Fitur</h3>
                     <div className="space-y-6">
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                           <h4 className="font-bold text-slate-900 mb-2">Berapa lama proses scan berlangsung?</h4>
                           <p className="text-sm text-slate-600">Biasanya kurang dari 30 detik untuk audit teknikal standar, tergantung pada kompleksitas website Anda.</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                           <h4 className="font-bold text-slate-900 mb-2">Apakah laporan bisa diunduh ke PDF?</h4>
                           <p className="text-sm text-slate-600">Ya, untuk pengguna paket Pro dan Agency, semua hasil analisis dapat diekspor secara instan ke format PDF yang profesional.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-8">
                     <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-200">
                        <h4 className="text-xl font-bold mb-4 italic">Coba Fitur Ini Sekarang!</h4>
                        <p className="text-blue-100 text-sm mb-8 leading-relaxed">
                           Mulai audit pertama Anda dalam hitungan detik. Gratis untuk 5 scan pertama per bulan.
                        </p>
                        <Link href="/register" className="block w-full text-center bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all">Daftar Akun Gratis</Link>
                     </div>

                     <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-xl group">
                        <h4 className="text-lg font-bold text-slate-900 mb-6">Fitur Lainnya</h4>
                        <div className="space-y-4">
                           {Object.keys(FEATURES_DETAIL).filter(k => k !== slug).map(key => (
                              <Link key={key} href={`/fitur/${key}`} className="block p-4 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 font-medium text-sm border border-transparent hover:border-slate-100 transition-all">
                                 {FEATURES_DETAIL[key].title} 
                                 <span className="block text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest leading-none">Detail Fitur →</span>
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export async function generateStaticParams() {
   return Object.keys(FEATURES_DETAIL).map((slug) => ({
      slug,
   }));
}
