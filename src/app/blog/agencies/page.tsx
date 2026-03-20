import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Solusi SEO untuk Agency: Skalakan Bisnis Anda dengan Audit Otomatis",
   description: "Maksimalkan efisiensi agency SEO Anda. Gunakan laporan white-label, monitoring multi-client, dan audit AI untuk memberikan hasil terbaik bagi klien Anda.",
};

export default function AgenciesSEOPage() {
   return (
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
               <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4 border border-blue-100 uppercase tracking-widest">
                  Solution for Growth
               </span>
               <h1 className="text-4xl sm:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight">
                  Berdayakan <span className="text-blue-600">SEO Agency</span> Anda dengan Tool Kelas Dunia
               </h1>
               <p className="text-xl text-slate-500 leading-relaxed font-medium">
                  Kelola ratusan klien secara efisien dengan laporan audit yang profesional dan data yang akurat.
               </p>
            </div>

            {/* Feature Grid for Agencies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
               <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">Laporan White-Label</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">
                     Berikan laporan audit SEO kepada klien Anda dengan logo dan brand agency Anda sendiri. Tampilan profesional yang meningkatkan kepercayaan klien.
                  </p>
                  <ul className="space-y-3 text-sm font-semibold text-slate-700">
                     <li className="flex items-center gap-2">✅ PDF Export Terotomatisasi</li>
                     <li className="flex items-center gap-2">✅ Kustomisasi Branding</li>
                     <li className="flex items-center gap-2">✅ Rekomendasi Perbaikan Praktis</li>
                  </ul>
               </div>

               <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                     </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">Multi-Client Dashboard</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">
                     Pantau kesehatan SEO semua klien Anda dalam satu dashboard terpadu. Dapatkan notifikasi jika ada masalah teknikal pada website klien.
                  </p>
                  <ul className="space-y-3 text-sm font-semibold text-slate-700">
                     <li className="flex items-center gap-2">✅ Bulk Monitoring</li>
                     <li className="flex items-center gap-2">✅ Alert System (Email/WA)</li>
                     <li className="flex items-center gap-2">✅ Perbandingan Kompetitor</li>
                  </ul>
               </div>
            </div>

            {/* Content Section */}
            <div className="bg-white p-12 sm:p-20 rounded-[4rem] border border-slate-100 shadow-2xl mb-24 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
               
               <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-8 tracking-tight">
                     Mengapa Agency SEO Memilih Tool Kami?
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     <div>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">
                           Kami memahami tantangan agency: Waktu terbatas, klien menuntut hasil, dan data yang harus akurat. Tool kami dirancang untuk memangkas waktu audit dari berjam-jam menjadi hitungan menit.
                        </p>
                        <ul className="space-y-4 font-semibold text-slate-800">
                           <li className="flex items-start gap-4">
                              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">1</span>
                              Data Real-Time yang ditarik langsung dari sistem Googlebot.
                           </li>
                           <li className="flex items-start gap-4">
                              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">2</span>
                              AI-Powered Analysis yang memberikan solusi cerdas, bukan hanya list error.
                           </li>
                        </ul>
                     </div>
                     <div className="bg-slate-50 p-8 rounded-3xl border border-dashed border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-4 italic">"Sangat Membantu Skalabilitas"</h4>
                        <p className="text-slate-500 font-medium mb-6">
                           "Sejak menggunakan tool ini, agency kami bisa menangani 3x lebih banyak klien tanpa harus menambah staf teknis tambahan. Laporan white-labelnya sangat disukai klien."
                        </p>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                           <div>
                              <p className="text-sm font-semibold text-slate-900 tracking-tight">Andi Pratama</p>
                              <p className="text-[10px] uppercase font-semibold text-blue-600 tracking-widest">Growth Lead @ SEO Agency ID</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
               <h2 className="text-3xl font-semibold text-slate-900 mb-8 tracking-tight">Siap Mempercepat Pertumbuhan Agency Anda?</h2>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/register" className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-500 transition-all shadow-xl shadow-blue-200">
                     Daftar Akun Agency
                  </Link>
                  <Link href="/pricing" className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all">
                     Lihat Paket Berlangganan
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
