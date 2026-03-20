"use client";
import { useState } from "react";
import { ScanIssue } from "@/lib/api";
import { getSeverityColor, getSeverityIcon } from "@/lib/utils";

interface Props {
   issues: ScanIssue[];
}

export default function IssueList({ issues }: Props) {
   const [expanded, setExpanded] = useState<number | null>(null);
   const [filter, setFilter] = useState<"critical" | "warning" | "info">("critical");

   const counts = {
      critical: issues.filter((i) => i.severity === "critical").length,
      warning: issues.filter((i) => i.severity === "warning").length,
      info: issues.filter((i) => i.severity === "info").length,
   };

   const filteredIssues = issues.filter((i) => i.severity === filter);

   if (!issues.length)
      return (
         <div className="text-center py-12 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <span className="text-5xl mb-4 block">✅</span>
            <p className="font-bold text-gray-900">Mantap! Tidak ada issue ditemukan</p>
            <p className="text-sm text-gray-500 mt-1">Website kamu sudah mengikuti best practice utama.</p>
         </div>
      );

   return (
      <div className="space-y-4">
         {/* Filter Buttons */}
         <div className="flex flex-wrap gap-2 mb-4">
            {[
               { id: "critical", label: "Kritis", count: counts.critical, color: "bg-red-50 text-red-600 border-red-200" },
               { id: "warning", label: "Cukup", count: counts.warning, color: "bg-amber-50 text-amber-600 border-amber-200" },
               { id: "info", label: "Baik", count: counts.info, color: "bg-blue-50 text-blue-600 border-blue-200" },
            ].map((btn) => (
               <button
                  key={btn.id}
                  onClick={() => {
                     setFilter(btn.id as any);
                     setExpanded(null);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                     filter === btn.id 
                        ? `${btn.color} ring-2 ring-offset-1 ring-current ring-opacity-10` 
                        : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                  }`}
               >
                  {btn.label}
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${filter === btn.id ? "bg-white/50" : "bg-gray-100"}`}>
                     {btn.count}
                  </span>
               </button>
            ))}
         </div>

         {filteredIssues.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
               <p className="text-sm text-gray-500">Tidak ada issue dengan kategori ini.</p>
            </div>
         ) : (
            <div className="space-y-3">
               {filteredIssues.map((issue, idx) => (
                  <div
                     key={idx}
                     className={`border rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-md ${getSeverityColor(issue.severity)}`}
                  >
                     <button
                        onClick={() => setExpanded(expanded === idx ? null : idx)}
                        className="w-full text-left px-4 py-3 flex items-start gap-3"
                     >
                        <span className="mt-0.5 flex-shrink-0">
                           {getSeverityIcon(issue.severity)}
                        </span>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">
                                 {issue.category}
                              </span>
                           </div>
                           <p className="font-bold text-sm mt-0.5 leading-snug">{issue.issue}</p>
                        </div>
                        <span className="text-xs opacity-60 flex-shrink-0 mt-0.5">
                           {expanded === idx ? "▲" : "▼"}
                        </span>
                     </button>

                     {expanded === idx && (
                        <div className="px-4 pb-4 space-y-3 border-t border-current border-opacity-10 pt-3 bg-white/30 backdrop-blur-[2px]">
                           <div>
                              <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1.5 ring-1 ring-current ring-opacity-20 w-fit px-1.5 rounded">
                                 Kenapa penting?
                              </p>
                              <p className="text-xs leading-relaxed opacity-90 italic">"{issue.why}"</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1.5 ring-1 ring-current ring-opacity-20 w-fit px-1.5 rounded">
                                 Langkah Perbaikan:
                              </p>
                              <p className="text-xs leading-relaxed font-medium bg-white/50 p-2 rounded-lg border border-current border-opacity-10 whitespace-pre-line">
                                 {issue.fix}
                              </p>
                           </div>
                        </div>
                     )}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
