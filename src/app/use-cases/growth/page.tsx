// src/app/use-cases/growth/page.tsx
import { UseCasePage } from "@/components/UseCasePage";

export default function GrowthPage() {
   return (
      <UseCasePage
         emoji="📈"
         title="High-Growth Startups"
         subtitle="Skala Trafik Organik Anda Tanpa Batas"
         description="Startup dengan pertumbuhan cepat butuh fondasi SEO yang kuat untuk mendukung skalabilitas. SEOscanner membantu Anda mengotomasi audit teknikal sehingga tim engineering bisa fokus pada fitur, sementara SEO tetap terjaga."
         problems={[
            "Trafik stagnan meskipun produk terus berkembang",
            "Technical debt yang mengganggu indeksasi halaman baru",
            "Kesalahan deployment yang merusak ranking (SEO Regression)",
            "Data silo antara tim marketing dan engineering",
            "Skalabilitas konten yang tidak dibarengi optimasi on-page",
            "Struktur URL yang tidak fleksibel untuk ekspansi fitur",
         ]}
         solutions={[
            {
               icon: "🚀",
               title: "Automated SEO Audit",
               desc: "Otomasi pengecekan harian untuk memastikan setiap update fitur tidak merusak skor SEO Anda.",
            },
            {
               icon: "🛡️",
               title: "Regression Testing",
               desc: "Deteksi dini penurunan skor atau hilangnya meta tag penting segera setelah deployment.",
            },
            {
               icon: "📊",
               title: "Data-Driven Insights",
               desc: "Laporan mendalam yang menghubungkan performa teknikal dengan potensi pertumbuhan trafik.",
            },
            {
               icon: "🔌",
               title: "Seamless Integration",
               desc: "Alur kerja yang dirancang untuk sinkronisasi antara kebutuhan marketing dan keterbatasan dev.",
            },
            {
               icon: "🌐",
               title: "Scalability Check",
               desc: "Pastikan arsitektur website Anda mampu menangani jutaan halaman tanpa hambatan crawling.",
            },
            {
               icon: "💡",
               title: "Priority Roadmap",
               desc: "Fokus pada 20% perbaikan yang memberikan 80% dampak pada pertumbuhan organic.",
            },
         ]}
         results={[
            {
               metric: "350%",
               label: "Rata-rata pertumbuhan trafik dalam 12 bulan",
            },
            {
               metric: "10x",
               label: "Kecepatan deteksi error dibanding audit manual",
            },
            {
               metric: "< 1s",
               label: "Waktu yang dibutuhkan untuk scan hal/baru",
            },
         ]}
         testimonial={{
            text: "SEOscanner adalah 'guardrail' bagi tim kami. Kami bisa merilis fitur baru setiap minggu tanpa takut ranking Google kami anjlok karena kesalahan teknis kecil.",
            name: "Irwan Prasetyo",
            company: "CTO, DigitalScale.co",
         }}
      />
   );
}
