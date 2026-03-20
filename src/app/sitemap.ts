// src/app/sitemap.ts
import { MetadataRoute } from "next";

const BASE = "https://scanner.bangbisnis.id";

export default function sitemap(): MetadataRoute.Sitemap {
   return [
      {
         url: BASE,
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 1,
      },
      {
         url: `${BASE}/scan`,
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.9,
      },
      {
         url: `${BASE}/pricing`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.8,
      },
      {
         url: `${BASE}/panduan-seo`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.8,
      },
      {
         url: `${BASE}/checklist-seo`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.8,
      },
      {
         url: `${BASE}/kalkulator-roi`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.7,
      },
      {
         url: `${BASE}/blog`,
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.7,
      },
      {
         url: `${BASE}/use-cases/umkm`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.6,
      },
      {
         url: `${BASE}/use-cases/agency`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.6,
      },
      {
         url: `${BASE}/use-cases/ecommerce`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.6,
      },
      {
         url: `${BASE}/use-cases/restoran`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.6,
      },
      {
         url: `${BASE}/use-cases/properti`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.6,
      },
      {
         url: `${BASE}/login`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.5,
      },
      {
         url: `${BASE}/register`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.5,
      },
      {
         url: `${BASE}/bantuan`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.4,
      },
      {
         url: `${BASE}/syarat-ketentuan`,
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 0.3,
      },
      {
         url: `${BASE}/kebijakan-privasi`,
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 0.3,
      },
      {
         url: `${BASE}/cookies`,
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 0.3,
      },
      {
         url: `${BASE}/lisensi`,
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 0.3,
      },
   ];
}
