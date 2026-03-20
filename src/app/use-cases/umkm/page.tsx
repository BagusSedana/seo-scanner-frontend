// src/app/use-cases/umkm/page.tsx
import { UseCasePage } from "@/components/UseCasePage";

export default function UMKMPage() {
   return (
      <UseCasePage
         emoji="🛒"
         title="UMKM & Toko Online"
         subtitle="Bersaing dengan toko besar tanpa anggaran besar"
         description="Jutaan UMKM di Indonesia bersaing di Google setiap hari. Dengan SEOscanner, kamu bisa menemukan celah kompetisi, mengoptimasi toko online, dan mendatangkan pelanggan organik tanpa bayar iklan."
         problems={[
            "Toko online tidak muncul di Google saat dicari",
            "Kalah bersaing dengan marketplace besar (Tokopedia, Shopee)",
            "Tidak tahu mana yang harus diperbaiki duluan",
            "Budget terbatas untuk hire konsultan SEO",
            "Konten produk tidak dioptimasi untuk pencarian",
            "Foto produk tidak memiliki alt text",
         ]}
         solutions={[
            {
               icon: "🎯",
               title: "Audit Instan",
               desc: "Scan toko online kamu dalam 10 detik dan dapatkan daftar prioritas perbaikan yang actionable.",
            },
            {
               icon: "📊",
               title: "Skor 5 Dimensi",
               desc: "Pahami performa SEO dari berbagai aspek: teknikal, konten, performa, mobile, dan structured data.",
            },
            {
               icon: "🗺️",
               title: "Roadmap Perbaikan",
               desc: "Panduan langkah demi langkah yang bisa kamu kerjakan sendiri tanpa perlu keahlian teknis.",
            },
            {
               icon: "💰",
               title: "Hemat Biaya",
               desc: "Mulai gratis, tanpa perlu bayar konsultan SEO mahal. Invest di tools yang tepat.",
            },
            {
               icon: "📱",
               title: "Mobile Audit",
               desc: "80% pembeli online di Indonesia pakai HP. Pastikan toko kamu optimal di mobile.",
            },
            {
               icon: "🔍",
               title: "Keyword Lokal",
               desc: "Temukan kata kunci yang dipakai pembeli di kotamu untuk menemukan produkmu.",
            },
         ]}
         results={[
            {
               metric: "+127%",
               label: "Rata-rata peningkatan traffic organik dalam 6 bulan",
            },
            {
               metric: "3.2x",
               label: "Peningkatan konversi setelah optimasi SEO",
            },
            {
               metric: "Rp 0",
               label: "Biaya iklan yang bisa dihemat per bulan",
            },
         ]}
         testimonial={{
            text: "Sebelum pakai SEOscanner, toko batik saya hampir tidak terlihat di Google. Sekarang setelah 4 bulan, traffic organik naik 3x dan penjualan online ikut naik signifikan.",
            name: "Ibu Sari Dewi",
            company: "Batik Nusantara Jogja",
         }}
      />
   );
}
