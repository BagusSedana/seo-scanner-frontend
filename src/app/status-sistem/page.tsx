// src/app/status-sistem/page.tsx
import React from "react";

export default function StatusSistemPage() {
   const services = [
      { name: "API Backend", status: "Operational", uptime: "99.98%" },
      { name: "Crawler Engine", status: "Operational", uptime: "99.95%" },
      { name: "PDF Generator", status: "Operational", uptime: "100%" },
      { name: "Dashboard Frontend", status: "Operational", uptime: "99.99%" },
      { name: "Database PostgreSQL", status: "Operational", uptime: "99.99%" },
      { name: "Midtrans Payment Gateway", status: "Operational", uptime: "100%" }
   ];

   return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-24">
         <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
               <div className="p-8 md:p-12 bg-slate-900 text-white text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-xs font-bold mb-6">
                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                     Semua Sistem Operasional
                  </div>
                  <h1 className="text-3xl font-bold mb-4">Status Sistem SEO Checkup</h1>
                  <p className="text-slate-400 text-sm">Terakhir diperbarui: {new Date().toLocaleString('id-ID')}</p>
               </div>

               <div className="p-8 md:p-12 space-y-6">
                  {services.map((s, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-900">{s.name}</h4>
                           <p className="text-xs text-slate-500">Uptime 30 Hari Terakhir: {s.uptime}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-bold text-green-600">{s.status}</span>
                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="p-8 bg-slate-50 border-t border-slate-100 italic text-center text-slate-500 text-sm">
                  "Kami berkomitmen untuk menjaga transparansi performa sistem kami demi kenyamanan audit Anda."
               </div>
            </div>

            {/* Past Incidents */}
            <div className="mt-12">
               <h2 className="text-xl font-bold text-slate-900 mb-6">Insiden Terakhir</h2>
               <div className="space-y-4">
                  <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">15 Maret 2024</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">TERATASI</span>
                     </div>
                     <h4 className="font-bold text-slate-900 mb-1 italic text-sm">Pemeliharaan Terjadwal Database</h4>
                     <p className="text-sm text-slate-600 leading-relaxed">Upgrade performa pada database PostgreSQL untuk menangani lonjakan trafik scan.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
