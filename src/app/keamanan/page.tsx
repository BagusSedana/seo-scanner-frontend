// src/app/keamanan/page.tsx
import React from "react";

export default function KeamananPage() {
   return (
      <div className="min-h-screen bg-white pt-32 pb-24">
         <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
               <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Privasi & Keamanan</h2>
               <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Keamanan Data Anda Adalah Prioritas Kami</h1>
               <p className="text-lg text-slate-600 max-w-2xl mx-auto italic">
                  "Kami memahami bahwa data website Anda adalah aset berharga. Itulah mengapa kami mengimplementasikan standar keamanan industri untuk melindungi setiap bit informasi."
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
               <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Enkripsi Data End-to-End</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                     Semua transmisi data antara browser Anda dan server kami dienkripsi menggunakan protokol SSL/TLS 256-bit standar industri. Data sensitif di database kami juga dienkripsi saat istirahat (encryption at rest).
                  </p>
               </div>

               <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Kepatuhan Privasi (GDPR)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                     Kami mengikuti prinsip dasar GDPR dan UU Pelindungan Data Pribadi (UU PDP) Indonesia. Anda memiliki kendali penuh atas data Anda, termasuk hak untuk menghapus seluruh audit website Anda secara permanen.
                  </p>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center">
               <h2 className="text-2xl font-bold mb-8 italic">Transparansi Keamanan</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 border border-slate-800 rounded-2xl">
                     <div className="text-blue-500 font-bold mb-2">Pencadangan Harian</div>
                     <p className="text-slate-400 text-xs">Data Anda dicadangkan secara otomatis setiap hari di lokasi geografis yang terpisah.</p>
                  </div>
                  <div className="p-6 border border-slate-800 rounded-2xl">
                     <div className="text-blue-500 font-bold mb-2">Audit Keamanan Internal</div>
                     <p className="text-slate-400 text-xs">Tim teknis kami melakukan peninjauan kode dan audit keamanan server secara berkala.</p>
                  </div>
                  <div className="p-6 border border-slate-800 rounded-2xl">
                     <div className="text-blue-500 font-bold mb-2">Infrastructure Tepercaya</div>
                     <p className="text-slate-400 text-xs">Sistem kami berjalan di atas cloud provider kelas dunia dengan standar ISO 27001.</p>
                  </div>
               </div>
            </div>

            <div className="mt-20 p-8 border-l-4 border-blue-600 bg-slate-50 rounded-r-2xl">
               <h4 className="font-bold text-slate-900 mb-2">Laporkan Masalah Keamanan</h4>
               <p className="text-sm text-slate-600 leading-relaxed">
                  Jika Anda menemukan celah keamanan dalam sistem kami, kami sangat menghargai kontribusi Anda melalui program kependudukan bug kami. Silakan hubungi tim keamanan kami di <a href="mailto:gedebagussedanayoga28@gmail.com" className="text-blue-600 font-bold underline">gedebagussedanayoga28@gmail.com</a>.
               </p>
            </div>
         </div>
      </div>
   );
}
