// src/app/changelog/page.tsx
export default function ChangelogPage() {
   const updates = [
      {
         version: "v1.3.0",
         date: "17 Mar 2026",
         badge: "Baru",
         badgeColor: "bg-green-100 text-green-700",
         items: [
            "Export laporan PDF profesional dengan branding SEO Scanner",
            "Skor Local SEO khusus bisnis Indonesia",
            "Roadmap aksi 3 bulan otomatis berdasarkan hasil scan",
         ],
      },
      {
         version: "v1.2.0",
         date: "1 Mar 2026",
         badge: "Update",
         badgeColor: "bg-blue-100 text-blue-700",
         items: [
            "Dashboard histori scan 3 bulan terakhir",
            "Analisis Core Web Vitals (LCP, FID, CLS)",
            "Deteksi schema markup & structured data",
         ],
      },
      {
         version: "v1.1.0",
         date: "10 Feb 2026",
         badge: "Update",
         badgeColor: "bg-blue-100 text-blue-700",
         items: [
            "Scan kompetitor — bandingkan SEO website kamu vs kompetitor",
            "Perbaikan akurasi deteksi meta description",
            "Notifikasi email saat scan selesai",
         ],
      },
      {
         version: "v1.0.0",
         date: "1 Jan 2026",
         badge: "Launch",
         badgeColor: "bg-gray-100 text-gray-700",
         items: [
            "SEO Scanner by Bang Bisnis resmi diluncurkan 🎉",
            "Scan SEO otomatis dengan 50+ parameter",
            "Skor 5 dimensi: SEO, Trust, Konten, Performa, Local SEO",
            "Daftar issues dengan rekomendasi aksi",
         ],
      },
   ];

   return (
      <div className="min-h-screen bg-white">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header */}
            <div className="mb-14">
               <span className="inline-flex items-center gap-2 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 bg-gray-50 mb-6">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Update terbaru: 17 Mar 2026
               </span>
               <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  Yang Baru
               </h1>
               <p className="text-gray-500">
                  Semua update, perbaikan, dan fitur baru SEO Scanner by Bang
                  Bisnis.
               </p>
            </div>

            {/* Timeline */}
            <div className="relative">
               {/* Vertical line */}
               <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100 ml-[7px]"></div>

               <div className="space-y-12">
                  {updates.map((update, i) => (
                     <div key={update.version} className="relative pl-8">
                        {/* Dot */}
                        <div
                           className={`absolute left-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${i === 0 ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                           <span className="font-bold text-gray-900">
                              {update.version}
                           </span>
                           <span
                              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${update.badgeColor}`}
                           >
                              {update.badge}
                           </span>
                           <span className="text-xs text-gray-400">
                              {update.date}
                           </span>
                        </div>

                        <ul className="space-y-2">
                           {update.items.map((item) => (
                              <li
                                 key={item}
                                 className="flex items-start gap-2.5 text-sm text-gray-600"
                              >
                                 <svg
                                    width="14"
                                    height="14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                    className="text-green-500 mt-0.5 flex-shrink-0"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M4.5 12.75l6 6 9-13.5"
                                    />
                                 </svg>
                                 {item}
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
            </div>

            {/* Coming Soon */}
            <div className="mt-16 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
               <p className="text-sm font-medium text-gray-900 mb-2">
                  🚀 Coming Soon
               </p>
               <ul className="text-sm text-gray-400 space-y-1">
                  <li>Integrasi API untuk developer</li>
                  <li>Chrome Extension SEO Scanner</li>
                  <li>Bulk scan — scan banyak URL sekaligus</li>
                  <li>Integrasi Google Search Console</li>
               </ul>
            </div>
         </div>
      </div>
   );
}
