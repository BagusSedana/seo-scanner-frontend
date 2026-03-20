// src/app/kalkulator-roi/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function KalkulatorROIPage() {
   const [visitors, setVisitors] = useState(1000);
   const [convRate, setConvRate] = useState(2);
   const [avgOrder, setAvgOrder] = useState(300000);
   const [seoIncrease, setSeoIncrease] = useState(50);
   const [seoCost, setSeoCost] = useState(2000000);

   const result = useMemo(() => {
      const extraVisitors = (visitors * seoIncrease) / 100;
      const extraConversions = (extraVisitors * convRate) / 100;
      const extraRevenue = extraConversions * avgOrder;
      const annualRevenue = extraRevenue * 12;
      const annualCost = seoCost * 12;
      const roi = ((annualRevenue - annualCost) / annualCost) * 100;
      const payback = annualCost > 0 ? annualCost / extraRevenue : 0;
      return {
         extraVisitors,
         extraConversions,
         extraRevenue,
         annualRevenue,
         annualCost,
         roi,
         payback,
      };
   }, [visitors, convRate, avgOrder, seoIncrease, seoCost]);

   const fmt = (n: number) =>
      new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
         maximumFractionDigits: 0,
      }).format(n);

   const fmtNum = (n: number) =>
      new Intl.NumberFormat("id-ID").format(Math.round(n));

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-10">
               <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
               >
                  ← Beranda
               </Link>
               <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
                  Kalkulator ROI SEO
               </h1>
               <p className="text-gray-500 text-sm">
                  Hitung potensi keuntungan investasi SEO untuk bisnis kamu.
               </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
               {/* Input */}
               <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
                  <h2 className="font-semibold text-gray-900">
                     Data Bisnis Kamu
                  </h2>

                  {[
                     {
                        label: "Traffic organik saat ini (per bulan)",
                        value: visitors,
                        setValue: setVisitors,
                        min: 100,
                        max: 1000000,
                        step: 100,
                        prefix: "",
                        suffix: "pengunjung",
                     },
                     {
                        label: "Konversi rate",
                        value: convRate,
                        setValue: setConvRate,
                        min: 0.1,
                        max: 20,
                        step: 0.1,
                        prefix: "",
                        suffix: "%",
                     },
                     {
                        label: "Rata-rata nilai order (AOV)",
                        value: avgOrder,
                        setValue: setAvgOrder,
                        min: 10000,
                        max: 50000000,
                        step: 10000,
                        prefix: "Rp",
                        suffix: "",
                     },
                     {
                        label: "Target peningkatan traffic dari SEO",
                        value: seoIncrease,
                        setValue: setSeoIncrease,
                        min: 10,
                        max: 500,
                        step: 10,
                        prefix: "",
                        suffix: "%",
                     },
                     {
                        label: "Biaya SEO per bulan",
                        value: seoCost,
                        setValue: setSeoCost,
                        min: 100000,
                        max: 100000000,
                        step: 100000,
                        prefix: "Rp",
                        suffix: "",
                     },
                  ].map((field) => (
                     <div key={field.label}>
                        <label className="block text-sm text-gray-600 mb-1">
                           {field.label}
                        </label>
                        <div className="flex items-center gap-3">
                           <input
                              type="range"
                              min={field.min}
                              max={field.max}
                              step={field.step}
                              value={field.value}
                              onChange={(e) =>
                                 field.setValue(Number(e.target.value))
                              }
                              className="flex-1 accent-green-600"
                           />
                           <span className="text-sm font-semibold text-gray-900 w-32 text-right">
                              {field.prefix}
                              {fmtNum(field.value)}
                              {field.suffix}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Result */}
               <div className="space-y-4">
                  <div
                     className={`rounded-2xl p-6 text-white ${result.roi >= 0 ? "bg-gradient-to-br from-green-600 to-green-800" : "bg-gradient-to-br from-red-600 to-red-800"}`}
                  >
                     <p className="text-sm text-green-100 mb-1">
                        Estimasi ROI Tahunan
                     </p>
                     <p className="text-5xl font-bold">
                        {Math.round(result.roi)}%
                     </p>
                     <p className="text-sm text-green-100 mt-2">
                        {result.roi >= 100
                           ? "Investasi sangat menguntungkan 🚀"
                           : result.roi >= 0
                             ? "Investasi menguntungkan ✅"
                             : "Perlu optimasi strategi ⚠️"}
                     </p>
                  </div>

                  {[
                     {
                        label: "Tambahan pengunjung/bulan",
                        value: `+${fmtNum(result.extraVisitors)} pengunjung`,
                        color: "text-blue-600",
                     },
                     {
                        label: "Tambahan konversi/bulan",
                        value: `+${fmtNum(result.extraConversions)} transaksi`,
                        color: "text-purple-600",
                     },
                     {
                        label: "Tambahan revenue/bulan",
                        value: fmt(result.extraRevenue),
                        color: "text-green-600",
                     },
                     {
                        label: "Total revenue tambahan/tahun",
                        value: fmt(result.annualRevenue),
                        color: "text-green-700",
                     },
                     {
                        label: "Total biaya SEO/tahun",
                        value: fmt(result.annualCost),
                        color: "text-gray-700",
                     },
                     {
                        label: "Payback period",
                        value: `${Math.ceil(result.payback)} bulan`,
                        color: "text-orange-600",
                     },
                  ].map((item) => (
                     <div
                        key={item.label}
                        className="bg-white border border-gray-200 rounded-xl px-5 py-3.5 flex items-center justify-between"
                     >
                        <span className="text-sm text-gray-500">
                           {item.label}
                        </span>
                        <span className={`text-sm font-bold ${item.color}`}>
                           {item.value}
                        </span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-4">
               <p className="text-xs text-yellow-700">
                  ⚠️ <strong>Disclaimer:</strong> Kalkulator ini memberikan
                  estimasi berdasarkan asumsi rata-rata. Hasil aktual dapat
                  berbeda tergantung industri, kompetisi, kualitas konten, dan
                  faktor lainnya. Gunakan sebagai panduan awal, bukan jaminan.
               </p>
            </div>
         </div>
      </div>
   );
}
