// src/app/dashboard/history/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import API from "@/lib/api";

interface ScanHistoryItem {
   scan_id: number;
   domain: string;
   total_score: number;
   status: string;
   critical: number;
   warning: number;
   scanned_at: string;
}

const PAGE_SIZE = 10;

function ScoreCircle({ score }: { score: number }) {
   const color =
      score >= 80
         ? "text-blue-600"
         : score >= 60
           ? "text-slate-500"
           : "text-red-500";
   const border =
      score >= 80
         ? "border-blue-400"
         : score >= 60
           ? "border-slate-300"
           : "border-red-400";
   return (
      <div
         className={`w-11 h-11 rounded-full border-2 ${border} flex items-center justify-center flex-shrink-0 transition-all duration-300`}
      >
         <span className={`text-sm font-medium ${color}`}>
            {Math.round(score)}
         </span>
      </div>
   );
}

function StatusBadge({ status }: { status: string }) {
   const map: Record<string, string> = {
      "Sangat Baik": "bg-blue-50 text-blue-600 border border-blue-100",
      Baik: "bg-blue-50 text-blue-600 border border-blue-100",
      Cukup: "bg-slate-50 text-slate-500 border border-slate-100",
      "Perlu Perbaikan": "bg-orange-50 text-orange-600 border border-orange-100",
      Kritis: "bg-red-50 text-red-600 border border-red-100",
   };
   return (
      <span
         className={`text-[10px] px-2.5 py-1 rounded-full font-medium uppercase tracking-wider ${map[status] ?? "bg-slate-100 text-slate-500"}`}
      >
         {status}
      </span>
   );
}

type SortKey = "scanned_at" | "total_score" | "domain" | "critical";
type SortDir = "asc" | "desc";

export default function HistoryPage() {
   const [allScans, setAllScans] = useState<ScanHistoryItem[]>([]);
   const [loading, setLoading] = useState(true);
   const [search, setSearch] = useState("");
   const [sortKey, setSortKey] = useState<SortKey>("scanned_at");
   const [sortDir, setSortDir] = useState<SortDir>("desc");
   const [page, setPage] = useState(1);
   const [scoreFilter, setScoreFilter] = useState<
      "all" | "good" | "medium" | "bad"
   >("all");

   useEffect(() => {
      const fetch = async () => {
         try {
            const res = await API.get("/scans/history?limit=200");
            setAllScans(res.data || []);
         } catch {
            setAllScans([]);
         } finally {
            setLoading(false);
         }
      };
      fetch();
   }, []);

   const handleSort = (key: SortKey) => {
      if (sortKey === key) {
         setSortDir(sortDir === "asc" ? "desc" : "asc");
      } else {
         setSortKey(key);
         setSortDir("desc");
      }
      setPage(1);
   };

   const SortIcon = ({ k }: { k: SortKey }) => {
      if (sortKey !== k)
         return (
            <svg
               width="12"
               height="12"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               viewBox="0 0 24 24"
               className="text-gray-300"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 9l4-4 4 4M8 15l4 4 4-4"
               />
            </svg>
         );
      return (
         <svg
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="text-blue-600"
         >
            {sortDir === "desc" ? (
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
               />
            ) : (
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
               />
            )}
         </svg>
      );
   };

   const filtered = useMemo(() => {
      let data = [...allScans];

      // Search
      if (search.trim()) {
         data = data.filter((s) =>
            s.domain.toLowerCase().includes(search.toLowerCase()),
         );
      }

      // Score filter
      if (scoreFilter === "good")
         data = data.filter((s) => s.total_score >= 80);
      if (scoreFilter === "medium")
         data = data.filter((s) => s.total_score >= 60 && s.total_score < 80);
      if (scoreFilter === "bad") data = data.filter((s) => s.total_score < 60);

      // Sort
      data.sort((a, b) => {
         let va: string | number = a[sortKey] as unknown as string | number;
         let vb: string | number = b[sortKey] as unknown as string | number;
         if (sortKey === "scanned_at") {
            va = new Date(va as string).getTime();
            vb = new Date(vb as string).getTime();
         }
         if (typeof va === "string") va = va.toLowerCase();
         if (typeof vb === "string") vb = vb.toLowerCase();
         if (va < vb) return sortDir === "asc" ? -1 : 1;
         if (va > vb) return sortDir === "asc" ? 1 : -1;
         return 0;
      });

      return data;
   }, [allScans, search, sortKey, sortDir, scoreFilter]);

   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
   const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

   const formatDate = (iso: string) => {
      try {
         return new Date(iso).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
         });
      } catch {
         return iso;
      }
   };

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
               <div>
                  <h1 className="text-3xl font-medium text-gray-900 tracking-tight">
                     Histori Scan Data
                  </h1>
                  <p className="text-sm text-slate-400 mt-2">
                     <span className="font-medium text-slate-600">{allScans.length}</span> total laporan · <span className="font-medium text-slate-600">{filtered.length}</span> hasil ditemukan
                  </p>
               </div>
               <Link
                  href="/dashboard/scan"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
               >
                  <svg
                     width="14"
                     height="14"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
                     />
                  </svg>
                  Scan Baru
               </Link>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5 flex flex-col sm:flex-row gap-3">
               {/* Search */}
               <div className="relative flex-1">
                  <svg
                     width="16"
                     height="16"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24"
                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
                     />
                  </svg>
                  <input
                     type="text"
                     value={search}
                     onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                     }}
                     placeholder="Cari domain... (contoh: bisnis-sukses.id)"
                     className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-slate-900"
                  />
                  {search && (
                     <button
                        onClick={() => {
                           setSearch("");
                           setPage(1);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                     >
                        <svg
                           width="14"
                           height="14"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                  )}
               </div>

               {/* Score Filter */}
               <div className="flex gap-2 flex-wrap">
                  {[
                     { key: "all", label: "Semua" },
                     { key: "good", label: "✅ Baik (≥80)" },
                     { key: "medium", label: "⚠️ Cukup (60–79)" },
                     { key: "bad", label: "❌ Kritis (<60)" },
                  ].map((f) => (
                     <button
                        key={f.key}
                        onClick={() => {
                           setScoreFilter(f.key as "all" | "good" | "medium" | "bad");
                           setPage(1);
                        }}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                           scoreFilter === f.key
                              ? "bg-gray-900 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                     >
                        {f.label}
                     </button>
                  ))}
               </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
               {/* Table Header */}
               <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500">
                  <div className="col-span-1 text-center">Skor</div>
                  <button
                     onClick={() => handleSort("domain")}
                     className="col-span-4 flex items-center gap-1.5 hover:text-gray-900 transition-colors text-left"
                  >
                     Domain <SortIcon k="domain" />
                  </button>
                  <div className="col-span-2">Status</div>
                  <button
                     onClick={() => handleSort("critical")}
                     className="col-span-2 flex items-center gap-1.5 hover:text-gray-900 transition-colors"
                  >
                     Issues <SortIcon k="critical" />
                  </button>
                  <button
                     onClick={() => handleSort("scanned_at")}
                     className="col-span-3 flex items-center gap-1.5 hover:text-gray-900 transition-colors"
                  >
                     Tanggal <SortIcon k="scanned_at" />
                  </button>
               </div>

               {loading ? (
                  <div className="py-20 flex items-center justify-center">
                     <svg
                        className="animate-spin text-gray-300"
                        width="28"
                        height="28"
                        fill="none"
                        viewBox="0 0 24 24"
                     >
                        <circle
                           className="opacity-25"
                           cx="12"
                           cy="12"
                           r="10"
                           stroke="currentColor"
                           strokeWidth="4"
                        />
                        <path
                           className="opacity-75"
                           fill="currentColor"
                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                     </svg>
                  </div>
               ) : paginated.length === 0 ? (
                  <div className="py-20 text-center">
                     <p className="text-gray-400 text-sm">
                        {search || scoreFilter !== "all"
                           ? "Tidak ada hasil yang cocok. Coba ubah filter."
                           : "Belum ada scan. Mulai scan pertama kamu!"}
                     </p>
                     {!search && scoreFilter === "all" && (
                        <Link
                           href="/dashboard/scan"
                           className="inline-block mt-4 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                           Scan Sekarang
                        </Link>
                     )}
                  </div>
               ) : (
                  <div className="divide-y divide-gray-50">
                     {paginated.map((scan) => (
                        <Link
                           key={scan.scan_id}
                           href={`/hasil/${scan.scan_id}`}
                           className="flex sm:grid sm:grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                           {/* Score */}
                           <div className="sm:col-span-1 flex justify-center">
                              <ScoreCircle score={scan.total_score} />
                           </div>

                           {/* Domain */}
                           <div className="sm:col-span-4 flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-sm truncate">
                                 {scan.domain}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5 sm:hidden">
                                 {formatDate(scan.scanned_at)}
                              </p>
                           </div>

                           {/* Status */}
                           <div className="sm:col-span-2 hidden sm:block">
                              <StatusBadge status={scan.status} />
                           </div>

                           {/* Issues */}
                           <div className="sm:col-span-2 hidden sm:flex items-center gap-2">
                              {scan.critical > 0 && (
                                 <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                    {scan.critical}
                                 </span>
                              )}
                              {scan.warning > 0 && (
                                 <span className="inline-flex items-center gap-1 text-xs text-yellow-600 font-medium">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                                    {scan.warning}
                                 </span>
                              )}
                              {scan.critical === 0 && scan.warning === 0 && (
                                 <span className="text-xs text-gray-400">
                                    —
                                 </span>
                              )}
                           </div>

                           {/* Date */}
                           <div className="sm:col-span-3 hidden sm:flex items-center justify-between">
                              <span className="text-xs text-gray-400">
                                 {formatDate(scan.scanned_at)}
                              </span>
                              <svg
                                 width="14"
                                 height="14"
                                 fill="none"
                                 stroke="#9ca3af"
                                 strokeWidth="2"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                 />
                              </svg>
                           </div>

                           {/* Mobile arrow */}
                           <svg
                              width="14"
                              height="14"
                              fill="none"
                              stroke="#9ca3af"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              className="sm:hidden flex-shrink-0"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M9 5l7 7-7 7"
                              />
                           </svg>
                        </Link>
                     ))}
                  </div>
               )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
               <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                     Menampilkan {(page - 1) * PAGE_SIZE + 1}–
                     {Math.min(page * PAGE_SIZE, filtered.length)} dari{" "}
                     {filtered.length} hasil
                  </p>
                  <div className="flex items-center gap-1">
                     <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                     >
                        <svg
                           width="14"
                           height="14"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19l-7-7 7-7"
                           />
                        </svg>
                     </button>

                     {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                           (p) =>
                              p === 1 ||
                              p === totalPages ||
                              Math.abs(p - page) <= 1,
                        )
                        .reduce<(number | "...")[]>((acc, p, i, arr) => {
                           if (i > 0 && p - (arr[i - 1] as number) > 1)
                              acc.push("...");
                           acc.push(p);
                           return acc;
                        }, [])
                        .map((p, i) =>
                           p === "..." ? (
                              <span
                                 key={`dot-${i}`}
                                 className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
                              >
                                 …
                              </span>
                           ) : (
                              <button
                                 key={p}
                                 onClick={() => setPage(p as number)}
                                 className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                                    page === p
                                       ? "bg-gray-900 text-white"
                                       : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                 }`}
                              >
                                 {p}
                              </button>
                           ),
                        )}

                     <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                     >
                        <svg
                           width="14"
                           height="14"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                           />
                        </svg>
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
