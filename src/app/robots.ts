// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
   return {
      rules: {
         userAgent: "*",
         allow: "/",
         disallow: ["/dashboard", "/profile"],
      },
      sitemap: "https://scanner.bangbisnis.id/sitemap.xml",
   };
}
