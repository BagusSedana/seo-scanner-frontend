// src/app/use-cases/ecommerce/page.tsx
import { UseCasePage } from "@/components/UseCasePage";

export default function EcommercePage() {
   return (
      <UseCasePage
         emoji="🛍️"
         title="E-Commerce"
         subtitle="Datangkan lebih banyak pembeli dari pencarian organik"
         description="Website e-commerce memiliki ratusan hingga ribuan halaman produk yang perlu dioptimasi. SEOscanner membantu kamu menemukan masalah teknis dan konten yang menghambat penjualan organik."
         problems={[
            "Halaman produk tidak muncul di pencarian Google",
            "Duplicate content karena variasi produk yang mirip",
            "Structured data produk tidak terpasang dengan benar",
            "Kecepatan halaman lambat karena banyak gambar produk",
            "Tidak ada breadcrumb dan navigasi yang SEO-friendly",
            "Canonical tag salah di halaman kategori dan filter",
         ]}
         solutions={[
            {
               icon: "🏷️",
               title: "Product Schema",
               desc: "Deteksi masalah structured data produk: harga, stok, rating yang tidak muncul di Google.",
            },
            {
               icon: "🖼️",
               title: "Image SEO",
               desc: "Audit semua gambar produk untuk alt text, ukuran, dan format yang optimal.",
            },
            {
               icon: "⚡",
               title: "Core Web Vitals",
               desc: "Pastikan LCP, FID, CLS dalam batas ideal agar produkmu mudah ditemukan dan dibeli.",
            },
            {
               icon: "🔗",
               title: "Canonical Audit",
               desc: "Deteksi masalah canonical di halaman kategori, filter, dan variasi produk.",
            },
            {
               icon: "📱",
               title: "Mobile Commerce",
               desc: "Audit pengalaman belanja mobile end-to-end, dari product page hingga checkout.",
            },
            {
               icon: "🗺️",
               title: "Sitemap Produk",
               desc: "Pastikan semua halaman produk aktif terindeks dan tidak ada halaman 404 tersembunyi.",
            },
         ]}
         results={[
            {
               metric: "+89%",
               label: "Peningkatan impressi produk di Google Search",
            },
            {
               metric: "2.4x",
               label: "Peningkatan klik organik ke halaman produk",
            },
            {
               metric: "-34%",
               label: "Penurunan bounce rate setelah optimasi kecepatan",
            },
         ]}
         testimonial={{
            text: "Kami punya 5.000+ produk dan tidak tahu mana yang bermasalah secara SEO. SEOscanner membantu kami memprioritaskan mana yang harus diperbaiki duluan. Revenue organik naik 40% dalam 3 bulan.",
            name: "Kevin Hartanto",
            company: "FashionKita.id, Bandung",
         }}
      />
   );
}
