// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import AuthProvider from "@/components/AuthProvider";

const BASE_URL = "https://scanner.bangbisnis.id";

export const metadata: Metadata = {
   metadataBase: new URL(BASE_URL),
   title: "SEO Checkup - Audit SEO Website Anda Secara Instan",
   description: "SEO Checkup membantu Anda menganalisis performa SEO website secara mendalam dalam hitungan detik.",
   keywords: [
      "seo checkup",
      "data analytics",
      "seo scanner",
      "business intelligence",
      "reporting tool",
      "company data",
   ],
   authors: [{ name: "SEO Checkup", url: "https://scanner.bangbisnis.id" }],
   creator: "SEO Checkup",
   publisher: "SEO Checkup",
   robots: {
      index: true,
      follow: true,
      googleBot: {
         index: true,
         follow: true,
         "max-image-preview": "large",
         "max-snippet": -1,
      },
   },
   alternates: {
      canonical: BASE_URL,
   },
   openGraph: {
      type: "website",
      locale: "id_ID",
      url: BASE_URL,
      siteName: "SEO Checkup",
      title: "SEO Checkup - Audit SEO Website Anda Secara Instan",
      description:
         "SEO Checkup membantu Anda menganalisis performa SEO website secara mendalam dalam hitungan detik.",
      images: [
         {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "SEO Checkup - Audit SEO & Reporting",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "SEO Checkup - Audit SEO Website Anda Secara Instan",
      description:
         "SEO Checkup membantu Anda menganalisis performa SEO website secara mendalam dalam hitungan detik.",
      images: ["/og-image.png"],
      creator: "@seocheckup",
   },
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="id">
         <body className="bg-white text-gray-900 antialiased">
            <AuthProvider>
               {" "}
               {/* ← hydrate auth saat app load */}
               <NavbarWrapper />
               {children}
            </AuthProvider>
         </body>
      </html>
   );
}
