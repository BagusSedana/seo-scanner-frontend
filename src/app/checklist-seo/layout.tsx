// src/app/checklist-seo/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Checklist SEO Gratis — 29 Poin Audit SEO Website",
   description:
      "Checklist SEO lengkap 29 poin: on-page SEO, technical SEO, performa, dan konten. Centang satu per satu dan tahu persis skor SEO website kamu.",
   alternates: { canonical: "https://scanner.bangbisnis.id/checklist-seo" },
   openGraph: {
      title: "Checklist SEO Gratis 29 Poin | SEO Scanner by Bang Bisnis",
      description:
         "Audit SEO manual dengan 29 poin checklist: on-page, teknikal, performa, dan konten. 100% gratis.",
      url: "https://scanner.bangbisnis.id/checklist-seo",
   },
};

export default function ChecklistSEOLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return children;
}
