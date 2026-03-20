// src/app/lisensi/page.tsx
import Link from "next/link";

export default function LisensiPage() {
   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-10">
               <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
               >
                  ← Kembali
               </Link>
               <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
                  Lisensi
               </h1>
               <p className="text-sm text-gray-400">
                  Informasi lisensi perangkat lunak dan konten SEOscanner
               </p>
            </div>

            <div className="space-y-5">
               <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h2 className="font-semibold text-gray-900 mb-3">
                     Lisensi Layanan
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                     SEOscanner adalah perangkat lunak proprietary. Penggunaan
                     layanan ini diberikan melalui lisensi terbatas,
                     non-eksklusif, tidak dapat dipindahtangankan, dan dapat
                     dicabut. Anda tidak diizinkan untuk menyalin, memodifikasi,
                     mendistribusikan, atau membuat karya turunan dari layanan
                     ini.
                  </p>
               </div>

               <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h2 className="font-semibold text-gray-900 mb-4">
                     Open Source yang Digunakan
                  </h2>
                  <div className="space-y-3">
                     {[
                        {
                           name: "Next.js",
                           version: "15.x",
                           license: "MIT",
                           author: "Vercel",
                        },
                        {
                           name: "React",
                           version: "19.x",
                           license: "MIT",
                           author: "Meta",
                        },
                        {
                           name: "Tailwind CSS",
                           version: "4.x",
                           license: "MIT",
                           author: "Tailwind Labs",
                        },
                        {
                           name: "Zustand",
                           version: "5.x",
                           license: "MIT",
                           author: "pmndrs",
                        },
                        {
                           name: "Axios",
                           version: "1.x",
                           license: "MIT",
                           author: "Matt Zabriskie",
                        },
                        {
                           name: "FastAPI",
                           version: "0.115.x",
                           license: "MIT",
                           author: "Sebastián Ramírez",
                        },
                        {
                           name: "Python",
                           version: "3.12",
                           license: "PSF",
                           author: "Python Software Foundation",
                        },
                     ].map((lib) => (
                        <div
                           key={lib.name}
                           className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                        >
                           <div>
                              <span className="text-sm font-medium text-gray-900">
                                 {lib.name}
                              </span>
                              <span className="text-xs text-gray-400 ml-2">
                                 v{lib.version}
                              </span>
                           </div>
                           <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400">
                                 {lib.author}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                                 {lib.license}
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h2 className="font-semibold text-gray-900 mb-2">
                     Hak Cipta
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                     © 2025 SEOscanner. Seluruh konten, desain, logo, dan kode
                     proprietary adalah hak cipta SEOscanner. Dilarang keras
                     mereproduksi, mendistribusikan, atau menggunakan konten ini
                     tanpa izin tertulis.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
