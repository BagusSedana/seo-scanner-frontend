"use client";
import { useState } from "react";
import { getScoreColor } from "@/lib/utils";

interface Factor {
   name: string;
   status: "ok" | "warn" | "fail";
   detail: string;
}

interface Props {
   label: string;
   score: number;
   icon: string;
   description?: string;
   factors?: Factor[];
   relatedIssues?: import("@/lib/api").ScanIssue[];
}

export default function ScoreCard({
   label,
   score,
   icon,
   description,
   factors = [],
   relatedIssues = [],
}: Props) {
   const [open, setOpen] = useState(false);
   const color = getScoreColor(score);
   const bg =
      score >= 80
         ? "bg-green-500"
         : score >= 60
           ? "bg-yellow-500"
           : score >= 40
             ? "bg-orange-500"
             : "bg-red-500";

   return (
      <>
         <button
            onClick={() => setOpen(true)}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-green-300 transition-all text-left w-full group"
         >
            <div className="flex items-center justify-between mb-3">
               <span className="text-gray-500 text-sm font-medium">
                  {icon} {label}
               </span>
               <span className={`text-2xl font-bold ${color}`}>
                  {Math.round(score)}
               </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
               <div
                  className={`h-2 rounded-full transition-all duration-700 ${bg}`}
                  style={{ width: `${Math.min(score, 100)}%` }}
               />
            </div>
            <p className="text-xs text-gray-300 group-hover:text-green-500 mt-2 transition-colors">
               Klik untuk detail →
            </p>
         </button>

         {/* MODAL */}
         {open && (
            <div
               className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
               onClick={() => setOpen(false)}
            >
               <div
                  className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* MODAL HEADER */}
                  <div className="p-6 border-b border-gray-100">
                     <div className="flex items-start justify-between">
                        <div>
                           <h2 className="text-xl font-bold text-gray-900">
                              {icon} Score {label}
                           </h2>
                           {description && (
                              <p className="text-gray-500 text-sm mt-1">
                                 {description}
                              </p>
                           )}
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                           <div className={`text-4xl font-black ${color}`}>
                              {Math.round(score)}
                           </div>
                           <div className="text-xs text-gray-400">/100</div>
                        </div>
                     </div>
                     {/* SCORE BAR */}
                     <div className="mt-4 w-full bg-gray-100 rounded-full h-3">
                        <div
                           className={`h-3 rounded-full ${bg}`}
                           style={{ width: `${Math.min(score, 100)}%` }}
                        />
                     </div>
                     <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Kritis</span>
                        <span>Cukup</span>
                        <span>Baik</span>
                        <span>Sempurna</span>
                     </div>
                  </div>

                  {/* FACTORS */}
                  {factors.length > 0 && (
                     <div className="p-6 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                           Faktor yang Dicek
                        </p>
                        <div className="space-y-3">
                           {factors.map((f, i) => (
                              <div key={i} className="flex items-start gap-3">
                                 <span className="flex-shrink-0 text-base mt-0.5">
                                    {f.status === "ok"
                                       ? "✅"
                                       : f.status === "warn"
                                         ? "⚠️"
                                         : "❌"}
                                 </span>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                       {f.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                       {f.detail}
                                    </p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* RELATED ISSUES */}
                  {relatedIssues.length > 0 && (
                     <div className="p-6 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                           Issues Terkait
                        </p>
                        <ul className="space-y-2">
                           {relatedIssues.map((iss, i) => (
                              <li key={i} className="flex items-start gap-2">
                                 <span className="flex-shrink-0 mt-0.5">
                                    {iss.severity === "critical"
                                       ? "🔴"
                                       : iss.severity === "warning"
                                         ? "🟡"
                                         : "🔵"}
                                 </span>
                                 <div>
                                    <p className="text-sm text-gray-800">
                                       {iss.issue}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                       {iss.fix}
                                    </p>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}

                  {/* HOW TO IMPROVE */}
                  <div className="p-6">
                     <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Cara Improve Score Ini
                     </p>
                     <div className="bg-green-50 rounded-xl p-4">
                        {score >= 80 ? (
                           <p className="text-sm text-green-700">
                              🎉 Score bagus! Pertahankan dengan tidak mengubah
                              elemen yang sudah optimal.
                           </p>
                        ) : score >= 60 ? (
                           <ul className="space-y-1 text-sm text-green-800">
                              <li>
                                 → Fix semua issues yang berwarna 🟡 di bagian
                                 Issues
                              </li>
                              <li>
                                 → Targetkan score minimal 80 untuk ranking
                                 kompetitif
                              </li>
                              <li>
                                 → Cek tab Action Plan untuk langkah spesifik
                              </li>
                           </ul>
                        ) : (
                           <ul className="space-y-1 text-sm text-red-800">
                              <li>→ Fix semua issues 🔴 terlebih dahulu</li>
                              <li>
                                 → Score di bawah 60 bisa berdampak signifikan
                                 pada ranking
                              </li>
                              <li>
                                 → Prioritaskan perbaikan section ini sebelum
                                 yang lain
                              </li>
                           </ul>
                        )}
                     </div>
                     <button
                        onClick={() => setOpen(false)}
                        className="mt-4 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                     >
                        Tutup
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
