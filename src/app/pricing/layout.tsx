// src/app/pricing/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Harga Paket SEO Scanner — Gratis, Pro, dan Agency",
   description:
      "Pilih paket SEO Scanner yang sesuai kebutuhan. Mulai gratis 3 scan/bulan. Upgrade ke Pro (Rp 99.000/bln) atau Agency untuk unlimited scan dan white-label PDF.",
   alternates: { canonical: "https://scanner.bangbisnis.id/pricing" },
   openGraph: {
      title: "Harga Paket SEO Scanner | Gratis, Pro & Agency",
      description:
         "Mulai gratis, upgrade kapan saja. Paket Pro Rp 99.000/bulan dengan 20 scan, export PDF, dan roadmap 3 bulan.",
      url: "https://scanner.bangbisnis.id/pricing",
   },
};

export default function PricingLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return children;
}
