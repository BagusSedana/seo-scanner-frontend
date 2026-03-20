// src/app/syarat-ketentuan/page.tsx
import Link from "next/link";

export default function SyaratKetentuanPage() {
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
                  Syarat & Ketentuan
               </h1>
               <p className="text-sm text-gray-400">
                  Terakhir diperbarui: 1 Januari 2025
               </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 prose prose-sm max-w-none">
               {[
                  {
                     title: "1. Penerimaan Syarat",
                     content:
                        "Dengan mengakses dan menggunakan layanan SEOscanner, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda tidak diizinkan menggunakan layanan kami.",
                  },
                  {
                     title: "2. Deskripsi Layanan",
                     content:
                        "SEOscanner menyediakan layanan audit SEO otomatis berbasis web yang menganalisis berbagai parameter teknis, on-page, dan off-page dari website yang dimasukkan pengguna. Hasil analisis bersifat informatif dan tidak menjamin peningkatan peringkat di mesin pencari.",
                  },
                  {
                     title: "3. Akun Pengguna",
                     content:
                        "Anda bertanggung jawab untuk menjaga kerahasiaan kredensial akun Anda. Anda setuju untuk segera memberitahu kami jika terjadi penggunaan tidak sah pada akun Anda. Kami tidak bertanggung jawab atas kerugian yang timbul akibat penggunaan tidak sah.",
                  },
                  {
                     title: "4. Penggunaan yang Diizinkan",
                     content:
                        "Anda diizinkan menggunakan layanan kami hanya untuk keperluan yang sah. Dilarang menggunakan layanan untuk memindai website tanpa izin, melakukan scraping massal, atau aktivitas yang melanggar hukum yang berlaku di Indonesia.",
                  },
                  {
                     title: "5. Batasan Scan",
                     content:
                        "Setiap paket memiliki batas jumlah scan per bulan. Scan yang tidak terpakai tidak dapat dipindahkan ke bulan berikutnya. Kami berhak membatasi atau menghentikan akses jika terjadi penyalahgunaan layanan.",
                  },
                  {
                     title: "6. Pembayaran & Pengembalian Dana",
                     content:
                        "Semua pembayaran bersifat final kecuali terdapat kegagalan teknis yang terbukti berasal dari sisi kami. Pengembalian dana dapat diajukan dalam 7 hari setelah pembelian jika layanan tidak dapat digunakan sama sekali.",
                  },
                  {
                     title: "7. Batasan Tanggung Jawab",
                     content:
                        "SEOscanner tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami, termasuk kehilangan data, pendapatan, atau peluang bisnis.",
                  },
                  {
                     title: "8. Perubahan Layanan",
                     content:
                        "Kami berhak mengubah, menangguhkan, atau menghentikan layanan kapan saja dengan atau tanpa pemberitahuan sebelumnya. Kami juga berhak mengubah syarat ini sewaktu-waktu dengan notifikasi melalui email.",
                  },
                  {
                     title: "9. Hukum yang Berlaku",
                     content:
                        "Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan melalui pengadilan yang berwenang di Indonesia.",
                  },
                  {
                     title: "10. Kontak",
                     content:
                        "Jika ada pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami di legal@SEOscanner.",
                  },
               ].map((section) => (
                  <div key={section.title} className="mb-6">
                     <h2 className="text-base font-semibold text-gray-900 mb-2">
                        {section.title}
                     </h2>
                     <p className="text-sm text-gray-600 leading-relaxed">
                        {section.content}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
