// src/app/karir/page.tsx
import React from "react";

export default function KarirPage() {
   const jobs = [
      { 
         title: "Senior SEO Specialist", 
         type: "Full-Time", 
         location: "BSD City / Hybrid", 
         desc: "Membangun strategi SEO teknikal dan on-page untuk klien enterprise kami." 
      },
      { 
         title: "Frontend Developer (React/Next.js)", 
         type: "Full-Time", 
         location: "BSD City / Remote", 
         desc: "Mengembangkan antarmuka dashboard audit SEO yang intuitif dan cepat." 
      },
      { 
         title: "Content Marketing Manager", 
         type: "Full-Time", 
         location: "BSD City / Hybrid", 
         desc: "Mengelola strategi konten blog dan edukasi SEO untuk pasar Indonesia." 
      },
      { 
         title: "Customer Success Officer", 
         type: "Contract", 
         location: "Remote", 
         desc: "Membantu klien memaksimalkan penggunaan platform SEO Checkup." 
      }
   ];

   return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
               <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Bergabunglah Bersama Kami</h2>
               <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Membangun Masa Depan SEO di Indonesia</h1>
               <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Kami selalu mencari talenta terbaik yang memiliki passion dalam teknologi, data, dan membantu bisnis lokal tumbuh melalui pemasaran digital.
               </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
               {[
                  { title: "Fleksibilitas Kerja", desc: "Pilih untuk bekerja dari kantor kami di BSD City atau dari rumah Anda sendiri." },
                  { title: "Pengembangan Karir", desc: "Budget tahunan untuk kursus, sertifikasi, dan konferensi internasional." },
                  { title: "Asuransi Kesehatan", desc: "Benefit kesehatan lengkap untuk Anda dan keluarga." }
               ].map((b, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                     <h4 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
                  </div>
               ))}
            </div>

            {/* Job Listings */}
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">Posisi Terbuka</h2>
            <div className="space-y-4">
               {jobs.map((job, i) => (
                  <div key={i} className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-200 hover:border-blue-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-xl">
                     <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                           <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase">{job.type}</span>
                        </div>
                        <p className="text-slate-500 text-xs font-medium">{job.location}</p>
                        <p className="text-slate-600 text-sm max-w-xl">{job.desc}</p>
                     </div>
                     <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all whitespace-nowrap">
                        Lamar Sekarang
                     </button>
                  </div>
               ))}
            </div>

            {/* Culture Note */}
            <div className="mt-32 text-center p-12 bg-blue-600 rounded-[3rem] text-white">
               <h2 className="text-2xl font-bold mb-4">Belum Menemukan Posisi yang Cocok?</h2>
               <p className="text-blue-100 mb-8 max-w-xl mx-auto italic">
                  "Kami selalu terbuka untuk talenta luar biasa. Kirimkan CV dan portofolio Anda ke hrd@seocheckup.id untuk database kami."
               </p>
               <a href="mailto:hrd@seocheckup.id" className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl hover:scale-105 transition-all">Hubungi Recruitment</a>
            </div>
         </div>
      </div>
   );
}
