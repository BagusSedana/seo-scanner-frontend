// src/app/kontak/page.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function KontakPage() {
   return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Hubungi Kami</h1>
               <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Tim kami siap membantu Anda mengoptimalkan visibilitas online bisnis Anda. Jangan ragu untuk menghubungi kami untuk pertanyaan teknis, kemitraan, atau dukungan.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               {/* Contact Cards */}
               <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                     <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
                     <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                        Untuk pertanyaan umum dan dukungan pelanggan, kirimkan email kepada kami.
                     </p>
                     <a href="mailto:gedebagussedanayoga28@gmail.com" className="text-blue-600 font-bold hover:underline">gedebagussedanayoga28@gmail.com</a>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                     <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp</h3>
                     <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                        Konsultasi cepat via WhatsApp tersedia selama jam kerja (09:00 - 18:00 WIB).
                     </p>
                     <a href="https://wa.me/6287701785344" className="text-green-600 font-bold hover:underline">+62 877-0178-5344</a>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                     <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2">Kantor</h3>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Badung, Kuta Selatan <br />
                        Bali, Indonesia.
                     </p>
                  </div>
               </div>

               {/* Contact Form */}
               <div className="lg:col-span-2 bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
                  <form className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                           <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none" placeholder="Masukkan nama Anda" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold text-slate-700">Email Bisnis</label>
                           <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none" placeholder="anda@perusahaan.com" />
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Subjek</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none">
                           <option>Dukungan Teknis</option>
                           <option>Partnership & Kolaborasi</option>
                           <option>Pertanyaan Penjualan</option>
                           <option>Lainnya</option>
                        </select>
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Pesan</label>
                        <textarea className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none h-40" placeholder="Apa yang bisa kami bantu?"></textarea>
                     </div>

                     <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all">
                        Kirim Pesan
                     </button>
                  </form>
               </div>
            </div>

            {/* FAQ Section in Contact */}
            <div className="mt-32">
               <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center uppercase tracking-widest">Pertanyaan Umum</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                     { q: "Berapa lama waktu respon tim support?", a: "Kami biasanya merespon dalam waktu kurang dari 24 jam pada hari kerja." },
                     { q: "Apakah ada paket khusus untuk agensi?", a: "Ya, kami memiliki paket Agency yang dirancang khusus untuk mengelola banyak proyek klien." },
                     { q: "Bagaimana cara refund jika layanan tidak sesuai?", a: "Anda dapat mengajukan refund dalam 7 hari setelah pembelian sesuai syarat dan ketentuan kami." },
                     { q: "Apakah data website saya aman?", a: "Keamanan data adalah prioritas kami. Semua data dienkripsi dan tidak pernah dibagikan kepada pihak ketiga." }
                  ].map((faq, i) => (
                     <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
