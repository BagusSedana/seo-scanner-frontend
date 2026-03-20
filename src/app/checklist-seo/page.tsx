// src/app/checklist-seo/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const CHECKLIST = [
   {
      category: "On-Page SEO",
      icon: "🔍",
      items: [
         {
            id: "title",
            text: "Title tag antara 50–60 karakter dan mengandung keyword utama",
         },
         {
            id: "meta",
            text: "Meta description 150–160 karakter, menarik, ada call-to-action",
         },
         {
            id: "h1",
            text: "Hanya ada 1 tag H1 per halaman, mengandung keyword utama",
         },
         {
            id: "heading",
            text: "Struktur heading H2–H6 logis dan terorganisir",
         },
         { id: "keyword", text: "Keyword density 1–3%, tidak over-optimized" },
         {
            id: "url",
            text: "URL pendek, deskriptif, menggunakan tanda hubung (-)",
         },
         {
            id: "internal",
            text: "Ada minimal 3 internal link ke halaman relevan",
         },
         { id: "alt", text: "Semua gambar memiliki alt text yang deskriptif" },
      ],
   },
   {
      category: "Technical SEO",
      icon: "⚙️",
      items: [
         {
            id: "https",
            text: "Website menggunakan HTTPS (SSL certificate aktif)",
         },
         { id: "sitemap", text: "Sitemap XML tersedia di /sitemap.xml" },
         { id: "robots", text: "File robots.txt dikonfigurasi dengan benar" },
         { id: "canonical", text: "Canonical tag terpasang di semua halaman" },
         { id: "mobile", text: "Website mobile-friendly dan responsive" },
         {
            id: "speed",
            text: "Waktu loading < 3 detik (test dengan PageSpeed Insights)",
         },
         {
            id: "noindex",
            text: "Halaman yang tidak perlu di-index sudah di-noindex",
         },
         { id: "404", text: "Halaman 404 custom sudah dikonfigurasi" },
      ],
   },
   {
      category: "Performa",
      icon: "⚡",
      items: [
         { id: "lcp", text: "LCP (Largest Contentful Paint) < 2.5 detik" },
         { id: "fid", text: "FID (First Input Delay) < 100ms" },
         { id: "cls", text: "CLS (Cumulative Layout Shift) < 0.1" },
         {
            id: "compress",
            text: "Gambar dikompres dan menggunakan format WebP/AVIF",
         },
         { id: "lazy", text: "Gambar below-the-fold menggunakan lazy loading" },
         {
            id: "cache",
            text: "Browser caching dikonfigurasi untuk aset statis",
         },
         { id: "cdn", text: "Menggunakan CDN untuk distribusi aset" },
      ],
   },
   {
      category: "Konten",
      icon: "📝",
      items: [
         { id: "unique", text: "Semua konten unik, tidak ada duplikasi" },
         { id: "length", text: "Artikel informatif minimal 800+ kata" },
         { id: "updated", text: "Konten diperbarui secara rutin" },
         {
            id: "readability",
            text: "Konten mudah dibaca, paragraf pendek, ada sub-heading",
         },
         {
            id: "schema",
            text: "Schema markup terpasang (Article, Product, FAQ, dll)",
         },
         { id: "og", text: "Open Graph tags untuk berbagi di media sosial" },
      ],
   },
];

export default function ChecklistSEOPage() {
   const allItems = CHECKLIST.flatMap((c) => c.items.map((i) => i.id));
   const [checked, setChecked] = useState<Set<string>>(new Set());

   const toggle = (id: string) => {
      setChecked((prev) => {
         const next = new Set(prev);
         if (next.has(id)) {
            next.delete(id);
         } else {
            next.add(id);
         }
         return next;
      });
   };

   const totalDone = checked.size;
   const totalAll = allItems.length;
   const percent = Math.round((totalDone / totalAll) * 100);

   const getGrade = () => {
      if (percent >= 90)
         return { label: "Excellent!", color: "text-green-600" };
      if (percent >= 75) return { label: "Bagus!", color: "text-blue-600" };
      if (percent >= 50) return { label: "Cukup", color: "text-yellow-600" };
      return { label: "Perlu Perbaikan", color: "text-red-500" };
   };

   const grade = getGrade();

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-8">
               <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
               >
                  ← Beranda
               </Link>
               <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
                  Checklist SEO Gratis
               </h1>
               <p className="text-gray-500 text-sm">
                  Centang semua poin yang sudah kamu lakukan untuk mengetahui
                  skor SEO kamu.
               </p>
            </div>

            {/* Progress */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
               <div className="flex items-center justify-between mb-3">
                  <div>
                     <p className="text-sm text-gray-500">Progress Checklist</p>
                     <p className="text-2xl font-bold text-gray-900">
                        {totalDone}/{totalAll}{" "}
                        <span
                           className={`text-base font-semibold ${grade.color}`}
                        >
                           {grade.label}
                        </span>
                     </p>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                     {percent}%
                  </div>
               </div>
               <div className="bg-gray-100 rounded-full h-3">
                  <div
                     className={`h-3 rounded-full transition-all duration-500 ${
                        percent >= 90
                           ? "bg-green-500"
                           : percent >= 75
                             ? "bg-blue-500"
                             : percent >= 50
                               ? "bg-yellow-500"
                               : "bg-red-400"
                     }`}
                     style={{ width: `${percent}%` }}
                  />
               </div>
               <div className="flex justify-between mt-2">
                  <button
                     onClick={() => setChecked(new Set())}
                     className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                     Reset semua
                  </button>
                  <button
                     onClick={() => setChecked(new Set(allItems))}
                     className="text-xs text-green-600 hover:underline"
                  >
                     Tandai semua ✓
                  </button>
               </div>
            </div>

            {/* Checklist Categories */}
            <div className="space-y-4">
               {CHECKLIST.map((cat) => {
                  const catDone = cat.items.filter((i) =>
                     checked.has(i.id),
                  ).length;
                  return (
                     <div
                        key={cat.category}
                        className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                     >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                           <div className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              <h2 className="font-semibold text-gray-900 text-sm">
                                 {cat.category}
                              </h2>
                           </div>
                           <span className="text-xs text-gray-400">
                              {catDone}/{cat.items.length}
                           </span>
                        </div>
                        <div className="divide-y divide-gray-50">
                           {cat.items.map((item) => (
                              <label
                                 key={item.id}
                                 className="flex items-start gap-3 px-6 py-3.5 hover:bg-gray-50 cursor-pointer transition-colors"
                              >
                                 <input
                                    type="checkbox"
                                    checked={checked.has(item.id)}
                                    onChange={() => toggle(item.id)}
                                    className="mt-0.5 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 flex-shrink-0 cursor-pointer"
                                 />
                                 <span
                                    className={`text-sm transition-colors ${checked.has(item.id) ? "line-through text-gray-400" : "text-gray-700"}`}
                                 >
                                    {item.text}
                                 </span>
                              </label>
                           ))}
                        </div>
                     </div>
                  );
               })}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-gray-900 text-white rounded-2xl p-6 text-center">
               <p className="font-semibold mb-1">Mau audit otomatis?</p>
               <p className="text-sm text-gray-400 mb-4">
                  Scan website kamu dan kami cek semua poin ini secara otomatis
                  dalam detik.
               </p>
               <Link
                  href="/dashboard/scan"
                  className="inline-block bg-green-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-400 transition-colors text-sm"
               >
                  Scan Website Gratis →
               </Link>
            </div>
         </div>
      </div>
   );
}
