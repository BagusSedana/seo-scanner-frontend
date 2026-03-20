// src/app/use-cases/restoran/page.tsx
import { UseCasePage } from "@/components/UseCasePage";

export default function RestoranPage() {
   return (
      <UseCasePage
         emoji="🍜"
         title="Restoran & Kuliner"
         subtitle="Isi meja dari pencarian Google Maps & lokal"
         description="Restoran dan bisnis kuliner sangat bergantung pada pencarian lokal. Saat seseorang mencari 'mie ayam enak di Bandung', apakah bisnis kamu yang muncul? SEOscanner memastikan website dan listing kamu siap."
         problems={[
            "Tidak muncul saat orang mencari 'restoran terdekat'",
            "Google My Business tidak dioptimasi dengan baik",
            "Website tidak mobile-friendly padahal 90% tamu pakai HP",
            "Menu tidak bisa diindeks mesin pencari",
            "Tidak ada structured data untuk restoran (LocalBusiness)",
            "Alamat dan jam buka tidak konsisten di berbagai platform",
         ]}
         solutions={[
            {
               icon: "📍",
               title: "Local SEO Audit",
               desc: "Cek konsistensi NAP (Name, Address, Phone) di seluruh platform online kamu.",
            },
            {
               icon: "🍽️",
               title: "Restaurant Schema",
               desc: "Pastikan schema LocalBusiness, Menu, dan Review terpasang benar agar tampil kaya di Google.",
            },
            {
               icon: "📱",
               title: "Mobile-First Audit",
               desc: "Audit penuh dari perspektif pengguna mobile — tampilan, kecepatan, dan kemudahan order.",
            },
            {
               icon: "⭐",
               title: "Review Signals",
               desc: "Analisis bagaimana rating dan review memengaruhi visibilitas di Google Maps.",
            },
            {
               icon: "🗺️",
               title: "Google Maps Ready",
               desc: "Checklist optimasi agar bisnis kuliner kamu muncul di 3-pack Google Maps.",
            },
            {
               icon: "🖼️",
               title: "Visual SEO",
               desc: "Optimasi gambar makanan — alt text, ukuran, dan struktur folder untuk maksimal indeksasi.",
            },
         ]}
         results={[
            {
               metric: "+156%",
               label: "Peningkatan kunjungan dari pencarian lokal",
            },
            {
               metric: "Top 3",
               label: "Rata-rata posisi di Google Maps dalam 3 bulan",
            },
            {
               metric: "4.2x",
               label: "Peningkatan klik ke halaman menu & reservasi",
            },
         ]}
         testimonial={{
            text: "Warung soto saya di Surabaya sekarang muncul di urutan pertama Google Maps. Setiap hari ada tamu baru yang bilang 'saya ketemu dari Google'. Omzet naik hampir 2x!",
            name: "Pak Hendra Wijaya",
            company: "Soto Pak Hendra, Surabaya",
         }}
      />
   );
}
