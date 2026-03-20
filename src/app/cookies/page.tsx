// src/app/cookies/page.tsx
import Link from "next/link";

const COOKIE_TYPES = [
   {
      name: "Cookies Esensial",
      badge: "Selalu Aktif",
      badgeColor: "bg-green-100 text-green-700",
      desc: "Diperlukan agar website berfungsi dengan benar. Tidak dapat dinonaktifkan.",
      examples: [
         {
            name: "session_token",
            purpose: "Autentikasi sesi pengguna",
            duration: "7 hari",
         },
         {
            name: "csrf_token",
            purpose: "Perlindungan keamanan form",
            duration: "Per sesi",
         },
         {
            name: "user_pref",
            purpose: "Preferensi tampilan pengguna",
            duration: "1 tahun",
         },
      ],
   },
   {
      name: "Cookies Analitik",
      badge: "Opsional",
      badgeColor: "bg-blue-100 text-blue-700",
      desc: "Membantu kami memahami cara pengguna berinteraksi dengan layanan kami.",
      examples: [
         {
            name: "_ga",
            purpose: "Google Analytics — tracking visitor unik",
            duration: "2 tahun",
         },
         {
            name: "_gid",
            purpose: "Google Analytics — tracking sesi harian",
            duration: "24 jam",
         },
         {
            name: "hotjar_id",
            purpose: "Analisis perilaku pengguna (anonim)",
            duration: "1 tahun",
         },
      ],
   },
   {
      name: "Cookies Fungsional",
      badge: "Opsional",
      badgeColor: "bg-yellow-100 text-yellow-700",
      desc: "Meningkatkan pengalaman pengguna dengan mengingat pilihan dan preferensi.",
      examples: [
         {
            name: "lang_pref",
            purpose: "Bahasa yang dipilih pengguna",
            duration: "1 tahun",
         },
         {
            name: "last_scan",
            purpose: "URL terakhir yang discan",
            duration: "30 hari",
         },
      ],
   },
];

export default function CookiesPage() {
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
                  Kebijakan Cookies
               </h1>
               <p className="text-sm text-gray-400">
                  Terakhir diperbarui: 1 Januari 2025
               </p>
            </div>

            <div className="space-y-5">
               <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h2 className="font-semibold text-gray-900 mb-2">
                     Apa itu Cookies?
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                     Cookies adalah file teks kecil yang disimpan di browser
                     Anda saat mengunjungi website. Kami menggunakan cookies
                     untuk memastikan layanan berfungsi dengan baik,
                     menganalisis penggunaan, dan meningkatkan pengalaman
                     pengguna.
                  </p>
               </div>

               {COOKIE_TYPES.map((type) => (
                  <div
                     key={type.name}
                     className="bg-white border border-gray-200 rounded-2xl p-6"
                  >
                     <div className="flex items-center gap-3 mb-3">
                        <h2 className="font-semibold text-gray-900">
                           {type.name}
                        </h2>
                        <span
                           className={`text-xs px-2 py-0.5 rounded-full font-medium ${type.badgeColor}`}
                        >
                           {type.badge}
                        </span>
                     </div>
                     <p className="text-sm text-gray-500 mb-4">{type.desc}</p>
                     <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                           <thead>
                              <tr className="border-b border-gray-100">
                                 <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                                    Nama
                                 </th>
                                 <th className="text-left py-2 pr-4 text-gray-500 font-medium">
                                    Tujuan
                                 </th>
                                 <th className="text-left py-2 text-gray-500 font-medium">
                                    Durasi
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              {type.examples.map((c) => (
                                 <tr
                                    key={c.name}
                                    className="border-b border-gray-50 last:border-0"
                                 >
                                    <td className="py-2 pr-4 font-mono text-gray-700">
                                       {c.name}
                                    </td>
                                    <td className="py-2 pr-4 text-gray-500">
                                       {c.purpose}
                                    </td>
                                    <td className="py-2 text-gray-400">
                                       {c.duration}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               ))}

               <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h2 className="font-semibold text-gray-900 mb-2">
                     Cara Menonaktifkan Cookies
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                     Anda dapat mengatur browser untuk menolak semua cookies
                     atau memberi tahu saat cookies dikirim. Namun, beberapa
                     fitur layanan mungkin tidak berfungsi dengan baik jika
                     cookies dinonaktifkan.
                  </p>
                  <div className="flex flex-wrap gap-2">
                     {["Chrome", "Firefox", "Safari", "Edge"].map((b) => (
                        <span
                           key={b}
                           className="text-xs border border-gray-200 px-3 py-1.5 rounded-full text-gray-500"
                        >
                           {b}
                        </span>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
