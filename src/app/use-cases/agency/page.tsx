// src/app/use-cases/agency/page.tsx
import { UseCasePage } from "@/components/UseCasePage";

export default function AgencyPage() {
   return (
      <UseCasePage
         emoji="🏢"
         title="Agency Digital"
         subtitle="Skalakan layanan SEO kamu tanpa tambah tim"
         description="Untuk digital agency yang melayani banyak klien sekaligus, SEOscanner membantu mengotomasi audit, menghasilkan laporan profesional, dan membuktikan nilai layanan kamu ke klien."
         problems={[
            "Audit manual per klien memakan waktu berjam-jam",
            "Susah membuktikan ROI SEO ke klien",
            "Tidak punya tools audit sekelas enterprise",
            "Laporan audit terlihat tidak profesional",
            "Sulit handle banyak klien secara bersamaan",
            "Onboarding klien baru memakan terlalu banyak waktu",
         ]}
         solutions={[
            {
               icon: "⚡",
               title: "Audit Massal",
               desc: "Scan puluhan website klien dalam menit, bukan jam. Hemat waktu tim kamu secara signifikan.",
            },
            {
               icon: "📄",
               title: "Export PDF",
               desc: "Generate laporan audit branded yang bisa langsung dikirim ke klien. Profesional dan detail.",
            },
            {
               icon: "👥",
               title: "Multi-user",
               desc: "Satu akun Agency untuk seluruh tim. Atur akses per anggota tim dengan mudah.",
            },
            {
               icon: "🏷️",
               title: "White Label",
               desc: "Laporan dengan logo dan nama agency kamu. Klien tidak perlu tahu tools yang kamu pakai.",
            },
            {
               icon: "📈",
               title: "Progress Tracking",
               desc: "Bandingkan skor SEO klien dari waktu ke waktu. Buktikan hasil kerja kamu dengan data.",
            },
            {
               icon: "🔔",
               title: "Scheduled Audit",
               desc: "Atur audit rutin otomatis per minggu/bulan dan terima notifikasi jika ada perubahan signifikan.",
            },
         ]}
         results={[
            {
               metric: "10x",
               label: "Lebih cepat proses audit dibanding manual",
            },
            {
               metric: "40%",
               label: "Retensi klien meningkat berkat laporan data-driven",
            },
            { metric: "3 jam", label: "Waktu dihemat per klien per bulan" },
         ]}
         testimonial={{
            text: "Dulu audit 1 klien butuh 3–4 jam. Sekarang dengan SEOscanner, 30 menit sudah selesai lengkap dengan laporan PDF. Kami bisa terima 2x lebih banyak klien dengan tim yang sama.",
            name: "Budi Santoso",
            company: "Kreasi Digital Agency, Jakarta",
         }}
      />
   );
}
