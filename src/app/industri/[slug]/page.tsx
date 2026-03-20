// src/app/industri/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const INDUSTRIES_DETAIL: Record<string, any> = {
   "ecommerce": {
      title: "Solusi SEO untuk E-commerce",
      tagline: "Tingkatkan trafik organik ke halaman produk Anda.",
      description: "Toko online memiliki tantangan SEO yang unik. Kami membantu Anda mengoptimalkan ribuan halaman produk secara otomatis untuk meningkatkan konversi dan visibilitas di Google Shopping.",
      points: [
         "Optimasi meta tags untuk halaman kategori dan produk.",
         "Analisis cuplikan kaya (Rich Snippets) untuk harga dan stok.",
         "Edukasi arsitektur website e-commerce yang ramah SEO.",
         "Audit kecepatan muat halaman produk yang berat."
      ]
   },
   "agensi": {
      title: "Platform SEO untuk Agensi Digital",
      tagline: "Kelola puluhan klien dengan satu dashboard audit.",
      description: "Hemat waktu tim agensi Anda dengan laporan audit SEO otomatis yang bisa dikustomisasi (White-Label). Fokus pada strategi, biarkan kami yang melakukan audit teknisnya.",
      points: [
         "Laporan PDF dengan logo agensi Anda.",
         "Multi-project management dalam satu akun.",
         "Analisis kompetitor klien secara mendalam.",
         "History audit bulanan untuk tracking progress klien."
      ]
   },
   "saas": {
      title: "SEO untuk Startup Teknologi & SaaS",
      tagline: "Dominasi kata kunci pencarian dalam niche teknologi Anda.",
      description: "Startup SaaS butuh pertumbuhan cepat. Kami membantu Anda mengaudit blog dan landing pagenya agar relevan dengan audiens B2B dan teknis.",
      points: [
         "Optimasi pillar pages dan topic clusters.",
         "Analisis teknikal untuk single-page application (SPA).",
         "Pemeriksaan internal linking untuk sebaran otoritas page.",
         "Strategy content marketing untuk konversi trial."
      ]
   },
   "bisnis-lokal": {
      title: "SEO untuk Bisnis Lokal & UMKM",
      tagline: "Ditemukan oleh pelanggan di sekitar lokasi Anda.",
      description: "Bantu pelanggan lokal menemukan toko atau layanan Anda dengan optimasi profil bisnis lokal dan audit kata kunci berbasis wilayah.",
      points: [
         "Audit profil Google Business Profile lengkap.",
         "Saran kata kunci lokal yang spesifik wilayah.",
         "Analisis kemunculan di peta (Google Maps).",
         "Optimasi landing page untuk konversi via WhatsApp."
      ]
   },
   "healthcare": {
      title: "SEO untuk Layanan Kesehatan",
      tagline: "Membangun kepercayaan dengan otoritas konten medis.",
      description: "SEO kesehatan sangat ketat (YMYL). Kami membantu website klinik atau rumah sakit Anda memenuhi standar E-E-A-T Google agar aman dan berperingkat tinggi.",
      points: [
         "Audit konten berbasis standar medis.",
         "Optimasi profil dokter dan tenaga medis.",
         "Keamanan data pasien dan SSL audit.",
         "Local SEO untuk pencarian klinik terdekat."
      ]
   },
   "properti": {
      title: "SEO untuk Industri Properti",
      tagline: "Tampilkan listing properti Anda di hasil pencarian teratas.",
      description: "Industri properti sangat kompetitif secara visual. Kami mengaudit website real estate Anda agar listing unit lebih cepat terindeks dan ditemukan calon pembeli.",
      points: [
         "Optimasi gambar listing properti yang berat.",
         "Struktur data (Schema) khusus properti.",
         "SEO berbasis lokasi perumahan/apartemen.",
         "Lead capture audit untuk form minat."
      ]
   },
   "pendidikan": {
      title: "SEO untuk Institusi Pendidikan",
      tagline: "Tingkatkan pendaftaran siswa dengan visibilitas online.",
      description: "Bantu calon siswa menemukan sekolah atau kursus Anda. Kami mengaudit halaman pendaftaran dan blog edukasi untuk menarik audiens yang tepat.",
      points: [
         "Optimasi keyword informatif (educational keywords).",
         "Audit halaman landing pendaftaran (Admission).",
         "Strategi otoritas domain melalui publikasi akademik.",
         "Local SEO untuk area kampus/sekolah."
      ]
   },
   "manufaktur": {
      title: "SEO B2B untuk Industri Manufaktur",
      tagline: "Hubungkan pabrik Anda dengan pembeli korporat.",
      description: "Search intent di industri manufaktur sangat spesifik. Kami membantu website B2B Anda agar muncul saat pembeli mencari spesifikasi produk industri.",
      points: [
         "Optimasi keyword teknis dan suku cadang.",
         "Audit halaman spesifikasi produk (Datasheet).",
         "Strategi SEO untuk target pasar global/ekspor.",
         "Kecepatan website untuk akses dari berbagai perangkat."
      ]
   }
};

export default async function IndustriDetailPage({ params }: { params: Promise<{ slug: string }> }) {
   const { slug } = await params;
   const industry = INDUSTRIES_DETAIL[slug];

   if (!industry) {
      notFound();
   }

   return (
      <div className="min-h-screen bg-white">
         <div className="pt-32 pb-24 bg-slate-900 overflow-hidden relative">
             {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 transform translate-x-1/4"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
               <div className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  Solusi Industri
               </div>
               <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl">{industry.title}</h1>
               <p className="text-xl text-slate-300 max-w-2xl leading-relaxed italic">{industry.tagline}</p>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">Pentingnya SEO dalam Sektor Ini</h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                     {industry.description}
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                     {industry.points.map((p: string, i: number) => (
                        <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-lg hover:border-blue-100">
                           <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-1">✓</div>
                           <p className="text-slate-700 font-medium">{p}</p>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="space-y-12">
                  <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200">
                     <h3 className="text-xl font-bold text-slate-900 mb-6">Cerita Sukses</h3>
                     <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                        "Berkat audit berkala dari SEO Checkup, website kami dalam industri {slug} berhasil naik dari halaman 5 ke halaman 1 Google hanya dalam waktu 3 bulan. Konversi naik hingga 150%!"
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
                        <div>
                           <p className="text-sm font-bold text-slate-900">Direktur Pemasaran</p>
                        <div className="text-xs text-slate-500 capitalize">Startup {slug} Terkemuka</div>
                     </div>
                  </div>
               </div>

               <div className="bg-blue-600 p-10 rounded-3xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Siap untuk Ranking #1?</h3>
                  <p className="text-blue-100 mb-8">Dapatkan laporan audit SEO gratis untuk website {slug} Anda hari ini.</p>
                  <Link href="/register" className="block w-full text-center bg-white text-blue-600 font-bold py-4 rounded-xl hover:scale-105 transition-transform">Mulai Audit Gratis</Link>
               </div>
            </div>
         </div>

         {/* Other Industries */}
         <div className="mt-32 pt-24 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center uppercase tracking-widest text-sm">Industri Lainnya</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {Object.keys(INDUSTRIES_DETAIL).filter(k => k !== slug).map(key => (
                     <Link key={key} href={`/industri/${key}`} className="p-6 bg-white border border-slate-200 rounded-2xl text-center hover:border-blue-600 hover:shadow-xl transition-all group">
                        <span className="block text-sm font-bold text-slate-700 group-hover:text-blue-600 capitalize">{key.replace("-", " ")}</span>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}

export async function generateStaticParams() {
   return Object.keys(INDUSTRIES_DETAIL).map((slug) => ({
      slug,
   }));
}
