// src/app/use-cases/properti/page.tsx
import { UseCasePage } from "@/components/UseCasePage";

export default function PropertiPage() {
   return (
      <UseCasePage
         emoji="🏠"
         title="Properti & Kos"
         subtitle="Isi hunian dari pencarian organik, tanpa komisi platform"
         description="Bisnis properti dan kos-kosan sangat kompetitif. Daripada bergantung sepenuhnya pada platform listing berbayar, optimalkan website sendiri dan dapatkan leads organik tanpa biaya komisi."
         problems={[
            "Listing properti tidak muncul di pencarian Google",
            "Terlalu bergantung pada platform properti pihak ketiga",
            "Foto properti tidak dioptimasi untuk SEO",
            "Tidak ada schema markup untuk properti (RealEstateListing)",
            "Halaman lokasi tidak menarget keyword pencarian lokal",
            "Form inquiry/booking tidak dioptimasi untuk konversi",
         ]}
         solutions={[
            {
               icon: "🏡",
               title: "Property Schema",
               desc: "Pasang structured data RealEstateListing agar listing properti tampil kaya di hasil pencarian Google.",
            },
            {
               icon: "📍",
               title: "Geo Targeting",
               desc: "Optimasi halaman untuk keyword seperti 'kos dekat UNPAD' atau 'apartemen di Kemang Jakarta'.",
            },
            {
               icon: "🖼️",
               title: "Photo SEO",
               desc: "Audit dan optimasi semua foto properti untuk indeksasi Google Images yang maksimal.",
            },
            {
               icon: "📋",
               title: "Landing Page Audit",
               desc: "Analisis halaman listing dan pastikan struktur konten mendorong pengunjung untuk inquiry.",
            },
            {
               icon: "⚡",
               title: "Page Speed",
               desc: "Halaman properti dengan banyak foto sering lambat. Pastikan loading cepat agar tidak ditinggal calon penyewa.",
            },
            {
               icon: "🔍",
               title: "Keyword Lokal",
               desc: "Temukan keyword pencarian properti spesifik per area yang bisa kamu targetkan dengan konten.",
            },
         ]}
         results={[
            {
               metric: "+210%",
               label: "Peningkatan leads organik dari website sendiri",
            },
            {
               metric: "0%",
               label: "Komisi platform yang dibayarkan untuk leads organik",
            },
            {
               metric: "45 hari",
               label: "Rata-rata waktu unit terisi setelah optimasi SEO",
            },
         ]}
         testimonial={{
            text: "Dulu saya bayar mahal ke platform properti dan dapat leads yang tidak qualified. Setelah optimasi SEO website sendiri, leads yang masuk lebih serius dan konversinya jauh lebih tinggi.",
            name: "Ibu Rini Kusuma",
            company: "Kos Eksklusif Rini, Depok",
         }}
      />
   );
}
