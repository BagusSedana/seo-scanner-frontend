// src/app/kebijakan-privasi/page.tsx
import Link from "next/link";

export default function KebijakanPrivasiPage() {
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
                  Kebijakan Privasi
               </h1>
               <p className="text-sm text-gray-400">
                  Terakhir diperbarui: 1 Januari 2025
               </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6">
               {[
                  {
                     title: "Data yang Kami Kumpulkan",
                     items: [
                        "Nama dan alamat email saat registrasi",
                        "Domain website yang Anda scan",
                        "Data penggunaan layanan (waktu scan, frekuensi, fitur yang digunakan)",
                        "Informasi perangkat dan browser secara anonim",
                        "Informasi pembayaran (diproses pihak ketiga, kami tidak menyimpan data kartu)",
                     ],
                  },
                  {
                     title: "Bagaimana Kami Menggunakan Data",
                     items: [
                        "Menyediakan dan meningkatkan layanan SEOscanner",
                        "Mengirimkan laporan scan dan notifikasi akun",
                        "Analisis penggunaan untuk pengembangan produk",
                        "Mendeteksi dan mencegah penyalahgunaan layanan",
                        "Komunikasi pemasaran (dapat di-unsubscribe kapan saja)",
                     ],
                  },
                  {
                     title: "Penyimpanan & Keamanan Data",
                     items: [
                        "Data disimpan di server yang berlokasi di Singapore (AWS)",
                        "Enkripsi SSL/TLS untuk semua transmisi data",
                        "Password disimpan dalam bentuk hash bcrypt",
                        "Akses data dibatasi hanya untuk karyawan yang berwenang",
                        "Backup otomatis setiap 24 jam",
                     ],
                  },
                  {
                     title: "Hak Pengguna",
                     items: [
                        "Hak mengakses data pribadi Anda",
                        "Hak meminta koreksi data yang tidak akurat",
                        "Hak menghapus akun dan semua data terkait",
                        "Hak menolak pemrosesan data untuk pemasaran",
                        "Hak portabilitas data (ekspor dalam format JSON/CSV)",
                     ],
                  },
                  {
                     title: "Cookies & Tracking",
                     items: [
                        "Kami menggunakan cookies esensial untuk autentikasi sesi",
                        "Google Analytics untuk analisis traffic anonim",
                        "Tidak ada iklan tracking atau pixel pihak ketiga",
                        "Anda dapat menonaktifkan cookies non-esensial",
                     ],
                  },
               ].map((section) => (
                  <div key={section.title}>
                     <h2 className="text-base font-semibold text-gray-900 mb-3">
                        {section.title}
                     </h2>
                     <ul className="space-y-2">
                        {section.items.map((item) => (
                           <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-gray-600"
                           >
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                              {item}
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}

               <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                     Pertanyaan tentang privasi? Hubungi kami di{" "}
                     <a
                        href="mailto:privacy@SEOscanner"
                        className="text-green-600 hover:underline"
                     >
                        privacy@SEOscanner
                     </a>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
