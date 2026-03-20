// src/app/kalkulator-roi/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Kalkulator ROI SEO — Hitung Potensi Keuntungan Investasi SEO",
   description:
      "Hitung potensi ROI investasi SEO bisnis kamu secara otomatis. Masukkan data traffic, konversi, dan biaya SEO untuk estimasi keuntungan tahunan.",
   alternates: { canonical: "https://scanner.bangbisnis.id/kalkulator-roi" },
   openGraph: {
      title: "Kalkulator ROI SEO Gratis | SEO Scanner by Bang Bisnis",
      description:
         "Hitung potensi keuntungan investasi SEO bisnis kamu. Estimasi ROI, payback period, dan tambahan revenue organik.",
      url: "https://scanner.bangbisnis.id/kalkulator-roi",
   },
};

export default function KalkulatorROILayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return children;
}
