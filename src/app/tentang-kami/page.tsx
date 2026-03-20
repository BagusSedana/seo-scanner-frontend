// src/app/tentang-kami/page.tsx
import React from "react";

export default function TentangKamiPage() {
   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <div className="relative pt-32 pb-24 bg-slate-950 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
               <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Misi Kami: Mendemokratisasi SEO untuk Semua Bisnis</h1>
               <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  SEO Checkup lahir dari visi sederhana: memberikan alat audit SEO kelas dunia yang mudah dipahami bagi UMKM dan pemilik bisnis di Indonesia.
               </p>
            </div>
         </div>

         {/* Content Section */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
               <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Cerita Kami</h2>
                  <div className="prose prose-lg text-slate-600 max-w-none space-y-4">
                     <p>
                        Dimulai pada awal 2024, tim kami melihat kesenjangan besar antara alat SEO yang sangat mahal dan kebutuhan agensi lokal yang terus tumbuh. Banyak agensi di Indonesia menggunakan alat luar negeri yang belum tentu optimal untuk pasar lokal Indonesia.
                     </p>
                     <p>
                        Kami memutuskan untuk membangun solusi lokal dengan teknologi global. Dengan algoritma yang disesuaikan dengan perilaku pencarian di Indonesia, SEO Checkup membantu ribuan website naik ke halaman satu Google setiap bulannya.
                     </p>
                     <p>
                        Hari ini, SEO Checkup telah dipercaya oleh lebih dari 500+ agensi digital dan ribuan pemilik bisnis di seluruh Indonesia.
                     </p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                     <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                     <div className="text-slate-600 font-medium">Agensi Digital</div>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                     <div className="text-4xl font-bold text-slate-900 mb-2">10k+</div>
                     <div className="text-slate-600 font-medium">Domain Diaudit</div>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                     <div className="text-4xl font-bold text-slate-900 mb-2">98%</div>
                     <div className="text-slate-600 font-medium">Kepuasan Klien</div>
                  </div>
                  <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
                     <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                     <div className="text-slate-600 font-medium">Bantuan Teknis</div>
                  </div>
               </div>
            </div>

            {/* Values Section */}
            <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white mb-32">
               <h2 className="text-3xl font-bold mb-16 text-center">Nilai-Nilai Utama Kami</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                     { 
                        title: "Integritas Data", 
                        desc: "Kami menyajikan data audit mentah apa adanya. Kejujuran data adalah fondasi dari setiap perbaikan strategi SEO yang sukses." 
                     },
                     { 
                        title: "Kesederhanaan", 
                        desc: "Kami percaya SEO yang teknis bisa disampaikan dengan bahasa yang manusiawi sehingga semua orang bisa mengerti." 
                     },
                     { 
                        title: "Inovasi Berkelanjutan", 
                        desc: "Algoritma Google selalu berubah. Kami berkomitmen untuk terus mengupdate sistem kami setiap minggu agar tetap relevan." 
                     }
                  ].map((val, i) => (
                     <div key={i} className="space-y-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">{i+1}</div>
                        <h4 className="text-xl font-bold">{val.title}</h4>
                        <p className="text-slate-400 leading-relaxed text-sm">{val.desc}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
               <h2 className="text-3xl font-bold text-slate-900 mb-6">Siap Mengoptimalkan Website Anda?</h2>
               <p className="text-slate-600 mb-10 text-lg">Bergabunglah dengan ribuan agensi lainnya yang telah beralih ke SEO Checkup.</p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="/register" className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl transition-all">Mulai Sekarang — Gratis</a>
                  <a href="/pricing" className="w-full sm:w-auto px-10 py-4 border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all">Lihat Paket Harga</a>
               </div>
            </div>
         </div>
      </div>
   );
}
