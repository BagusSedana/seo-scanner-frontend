"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/api";
import { getScoreColor } from "@/lib/utils";
import IssueList from "@/components/IssueList";
import ActionPlan from "@/components/ActionPlan";
import ScoreCard from "@/components/ScoreCard";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth";
import dynamic from "next/dynamic";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

const ScoreChart = dynamic(() => import("@/components/ScoreChart"), { ssr: false });

interface PageInfo {
   title?: string;
   title_length?: number;
   meta_description?: string;
   meta_desc_length?: number;
   h1_tags?: string[];
   h2_tags?: string[];
   canonical?: string;
   lang?: string;
   robots?: string;
   sitemap?: string;
   has_sitemap?: boolean;
   has_robots_txt?: boolean;
   has_schema?: boolean;
   schema_types?: string[];
   og_complete?: boolean;
   twitter_card?: string;
   favicon?: boolean;
   redirect_count?: number;
   word_count?: number;
   paragraph_count?: number;
   total_images?: number;
   images_without_alt?: number;
   internal_links?: number;
   external_links?: number;
   load_time?: number;
   https_status?: string;
   has_viewport?: boolean;
   has_contact_info?: boolean;
   phone_numbers?: string[];
   google_maps?: boolean;
   social_media_links?: string[];
}

interface ScanData {
   scan_id: number;
   domain: string;
   total_score: number;
   seo_score: number;
   performance_score: number;
   trust_score: number;
   content_score: number;
   local_seo_score: number;
   status: string;
   issue_counts: { critical: number; warning: number; info: number };
   issues: import("@/lib/api").ScanIssue[];
   page_info: PageInfo;
   action_plan: {
      fix_now: import("@/lib/api").ScanIssue[];
      fix_this_week: import("@/lib/api").ScanIssue[];
      fix_later: import("@/lib/api").ScanIssue[];
      quick_wins: string[];
   };
   ai_summary: string | null;
   scanned_at: string;
   project_id: number | null;
   _gated?: boolean;
   _gate_message?: string;
}

function getFactors(
   type: string,
   pi: PageInfo,
   data: ScanData,
) {
   const map: Record<
      string,
      { name: string; status: "ok" | "warn" | "fail"; detail: string }[]
   > = {
      SEO: [
         {
            name: "Title tag",
            status: pi.title ? "ok" : "fail",
            detail: pi.title
               ? `${pi.title_length} kar — "${pi.title?.slice(0, 50)}..."`
               : "Tidak ditemukan",
         },
         {
            name: "Panjang title (50–60 char)",
            status:
               (pi.title_length ?? 0) >= 50 && (pi.title_length ?? 0) <= 60 ? "ok" : "warn",
            detail: `${pi.title_length ?? 0} karakter (ideal 50–60)`,
         },
         {
            name: "Meta description",
            status: pi.meta_description ? "ok" : "fail",
            detail: pi.meta_description
               ? `${pi.meta_desc_length} karakter`
               : "Tidak ada",
         },
         {
            name: "Panjang meta (120–155 char)",
            status:
               (pi.meta_desc_length ?? 0) >= 120 && (pi.meta_desc_length ?? 0) <= 155
                  ? "ok"
                  : "warn",
            detail: `${pi.meta_desc_length ?? 0} karakter (ideal 120–155)`,
         },
         {
            name: "H1 tag",
            status: (pi.h1_tags?.length ?? 0) > 0 ? "ok" : "fail",
            detail: (pi.h1_tags?.length ?? 0) > 0 ? (pi.h1_tags?.[0] || "") : "Tidak ditemukan",
         },
         {
            name: "Canonical URL",
            status: pi.canonical ? "ok" : "warn",
            detail: pi.canonical ?? "Tidak ada",
         },
         {
            name: "Atribut bahasa",
            status: pi.lang ? "ok" : "warn",
            detail: pi.lang ?? "Tidak ada",
         },
      ],
      Trust: [
         {
            name: "Sitemap XML",
            status: pi.has_sitemap ? "ok" : "warn",
            detail: pi.has_sitemap
               ? "Ditemukan"
               : "Tidak ada — buat sitemap.xml",
         },
         {
            name: "robots.txt",
            status: pi.has_robots_txt ? "ok" : "warn",
            detail: pi.has_robots_txt ? "Ada" : "Tidak ditemukan",
         },
         {
            name: "Schema markup",
            status: pi.has_schema ? "ok" : "warn",
            detail: pi.has_schema
               ? `Ada: ${pi.schema_types?.join(", ")}`
               : "Tidak ada JSON-LD",
         },
         {
            name: "Open Graph tags",
            status: pi.og_complete ? "ok" : "warn",
            detail: pi.og_complete ? "Lengkap" : "Tidak lengkap",
         },
         {
            name: "Twitter Card",
            status: pi.twitter_card ? "ok" : "warn",
            detail: pi.twitter_card ?? "Tidak ada",
         },
         {
            name: "Favicon",
            status: pi.favicon ? "ok" : "warn",
            detail: pi.favicon ? "Ada" : "Tidak ada",
         },
         {
            name: "Redirect count",
            status: (pi.redirect_count ?? 0) <= 1 ? "ok" : "warn",
            detail: `${pi.redirect_count ?? 0} redirect`,
         },
      ],
      Konten: [
         {
            name: "Jumlah kata",
            status:
               (pi.word_count ?? 0) >= 300
                  ? "ok"
                  : (pi.word_count ?? 0) >= 100
                    ? "warn"
                    : "fail",
            detail: `${pi.word_count ?? 0} kata (ideal 300–500+)`,
         },
         {
            name: "H2 headings",
            status: (pi.h2_tags?.length ?? 0) > 0 ? "ok" : "warn",
            detail: `${pi.h2_tags?.length ?? 0} H2 ditemukan`,
         },
         {
            name: "Paragraf",
            status: (pi.paragraph_count ?? 0) >= 3 ? "ok" : "warn",
            detail: `${pi.paragraph_count ?? 0} paragraf`,
         },
         {
            name: "Gambar",
            status: (pi.total_images ?? 0) >= 1 ? "ok" : "warn",
            detail: `${pi.total_images ?? 0} gambar`,
         },
         {
            name: "Alt text gambar",
            status: pi.images_without_alt === 0 ? "ok" : "warn",
            detail: `${pi.images_without_alt} gambar tanpa alt text`,
         },
         {
            name: "Internal links",
            status: (pi.internal_links ?? 0) >= 3 ? "ok" : "warn",
            detail: `${pi.internal_links ?? 0} link internal`,
         },
      ],
      Performa: [
         {
            name: "Estimasi mobile score",
            status:
               data.performance_score >= 70
                  ? "ok"
                  : data.performance_score >= 50
                    ? "warn"
                    : "fail",
            detail: `${Math.round(data.performance_score)}/100`,
         },
         {
            name: "Viewport meta",
            status: pi.has_viewport ? "ok" : "fail",
            detail: pi.has_viewport
               ? "Ada"
               : "Tidak ada — mobile tidak optimal",
         },
         {
            name: "Inline scripts",
            status: "warn",
            detail: "Cek tab Issues untuk detail",
         },
      ],
      "Local SEO": [
         {
            name: "Info kontak (NAP)",
            status: pi.has_contact_info ? "ok" : "warn",
            detail: pi.has_contact_info
               ? "Ditemukan"
               : "Tidak ada nama/alamat/telepon",
         },
         {
            name: "Nomor telepon",
            status: (pi.phone_numbers?.length ?? 0) > 0 ? "ok" : "warn",
            detail: pi.phone_numbers?.[0] ?? "Tidak ditemukan",
         },
         {
            name: "Google Maps embed",
            status: pi.google_maps ? "ok" : "warn",
            detail: pi.google_maps ? "Ada" : "Tidak ada",
         },
         {
            name: "Link social media",
            status: (pi.social_media_links?.length ?? 0) > 0 ? "ok" : "warn",
            detail: `${pi.social_media_links?.length ?? 0} link ditemukan`,
         },
      ],
   };
   return map[type] ?? [];
}

function getLocalRankingEstimate(score: number) {
   if (score >= 85)
      return {
         label: "🏆 Potensi Halaman 1",
         color: "text-emerald-700",
         bg: "bg-emerald-50 border-emerald-100",
         desc: "SEO kamu sudah sangat kompetitif. Fokus ke keyword targeting dan backlink building.",
      };
   if (score >= 70)
      return {
         label: "🥈 Potensi Halaman 2–3",
         color: "text-slate-700",
         bg: "bg-slate-50 border-slate-200",
         desc: "Butuh beberapa perbaikan strategis untuk masuk halaman 1 Google Indonesia.",
      };
   if (score >= 55)
      return {
         label: "🥉 Estimasi Halaman 4–10",
         color: "text-slate-600",
         bg: "bg-gray-50 border-slate-200",
         desc: "SEO perlu perbaikan signifikan. Fokus perbaiki masalah teknis dan struktur konten.",
      };
   return {
      label: "⚠️ Belum Terindeks Optimal",
      color: "text-red-700",
      bg: "bg-red-50 border-red-200",
      desc: "Skor sangat rendah. Website belum siap bersaing di hasil pencarian Google.",
   };
}

function getRoadmap(data: ScanData) {
   const pi = data.page_info;
   const steps = [];
   const m1: string[] = [];
   if (!(pi.h1_tags?.length ?? 0))
      m1.push("Tambahkan H1 dengan keyword utama halaman");
   if ((pi.word_count ?? 0) < 300)
      m1.push(`Perbanyak konten ke 300+ kata (sekarang ${pi.word_count ?? 0} kata)`);
   if (!pi.has_sitemap)
      m1.push("Buat sitemap.xml dan submit ke Google Search Console");
   if (!pi.has_robots_txt) m1.push("Buat file robots.txt");
   if (!pi.has_schema) m1.push("Tambahkan schema markup JSON-LD");
   if (!pi.meta_description)
      m1.push("Tambahkan meta description 120–155 karakter");
   if (m1.length > 0)
      steps.push({
         month: "Bulan 1",
         title: "Fondasi Teknikal",
         items: m1,
         color: "border-red-200 bg-red-50",
         emoji: "🔧",
      });
   const m2: string[] = [];
   if (!pi.has_contact_info)
      m2.push("Tambahkan info kontak (nama, alamat, telepon) di footer");
   if (!pi.google_maps)
      m2.push("Embed Google Maps dari Google Business Profile");
   if (!pi.social_media_links?.length)
      m2.push("Tambahkan link Instagram, Facebook, atau TikTok");
   m2.push("Daftarkan website ke Google Search Console");
   m2.push("Buat atau klaim Google Business Profile");
   steps.push({
      month: "Bulan 2",
      title: "Optimasi & Local SEO",
      items: m2,
      color: "border-yellow-200 bg-yellow-50",
      emoji: "📍",
   });
   steps.push({
      month: "Bulan 3",
      title: "Authority & Konten",
      items: [
         "Dapatkan backlink dari direktori bisnis Indonesia",
         "Minta review Google dari pelanggan",
         "Rutin buat konten blog 1–2x per bulan",
         "Targetkan 3–5 keyword long-tail lokal",
      ],
      color: "border-green-200 bg-green-50",
      emoji: "📈",
   });
   return steps;
}



function formatDate(dateStr: string) {
   if (!dateStr) return "";
   const d = new Date(dateStr);
   return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   });
}

export default function HasilPage() {
   const { scanId } = useParams();
   const router = useRouter();
   const { user, token } = useAuthStore();
   const [data, setData] = useState<ScanData | null>(null);
   const [loading, setLoading] = useState(true);
   const [activeTab, setActiveTab] = useState<"issues" | "action" | "info">(
      "issues",
   );
   const [copied, setCopied] = useState(false);
   const [rescanning, setRescanning] = useState(false);
   const [isExporting, setIsExporting] = useState(false);

   const [competitors, setCompetitors] = useState<any[]>([]);
   const [compInputs, setCompInputs] = useState<string[]>([]);
   const [compLoading, setCompLoading] = useState(false);
   const [projects, setProjects] = useState<any[]>([]);
   const [selectedProject, setSelectedProject] = useState<number | null>(null);
   const [assigningProject, setAssigningProject] = useState(false);

   useEffect(() => {
      API.get(`/scan/${scanId}`)
         .then((r) => setData(r.data))
         .catch(console.error)
         .finally(() => setLoading(false));

      if (token) {
         API.get(`/scan/${scanId}/competitors`, { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => setCompetitors(r.data))
            .catch(() => {});
         
         API.get("/projects", { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => setProjects(r.data))
            .catch(() => {});
      }
   }, [scanId, token]);

   useEffect(() => {
      if (data) {
         setSelectedProject(data.project_id || null);
      }
      if (user) {
         const limit = user.tier === "agency" ? 10 : 3;
         setCompInputs(Array(limit).fill(""));
      }
   }, [data, user]);

   const handleCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   const handleRescan = async () => {
      if (!data) return;
      setRescanning(true);
      try {
         const res = await API.post("/scan", {
            domain: data.domain,
            use_ai: false,
         });
         router.push(`/hasil/${res.data.scan_id}`);
      } catch {
         setRescanning(false);
      }
   };

   const handleCompare = async () => {
      const validComps = compInputs.filter(c => c.trim() !== "");
      if (validComps.length === 0) return toast.error("Masukkan minimal 1 URL kompetitor.");
      
      const limit = user?.tier === "agency" ? 10 : 3;
      if (validComps.length > limit) return toast.error(`Maksimal ${limit} kompetitor untuk paket ${user?.tier}`);

      setCompLoading(true);
      try {
         const res = await API.post(
            `/scan/${scanId}/competitors`,
            { competitors: validComps },
            { headers: { Authorization: `Bearer ${token}` } }
         );
         setCompetitors(res.data);
         toast.success("Analisis kompetitor berhasil!");
      } catch (err: any) {
         toast.error(err.response?.data?.detail || "Gagal membandingkan kompetitor");
      } finally {
         setCompLoading(false);
      }
   };

   const handleAssignProject = async (projId: number | null) => {
      setAssigningProject(true);
      try {
         await API.post(`/scan/${scanId}/assign-project`, 
            { project_id: projId },
            { headers: { Authorization: `Bearer ${token}` } }
         );
         setSelectedProject(projId);
         toast.success(projId ? "Berhasil ditambahkan ke Proyek" : "Berhasil dilepas dari Proyek");
      } catch (err) {
         toast.error("Gagal update proyek");
      } finally {
         setAssigningProject(false);
      }
   };

   const handleExportPDF = async () => {
      const isFree = !user || user.tier === "free";
      if (isFree) {
         router.push("/pricing");
         return;
      }
      setIsExporting(true);
      try {
         const element = document.getElementById("pdf-report-container");
         if (!element) throw new Error("Elemen report tidak ditemukan");
         
         toast.loading("Mempersiapkan PDF...", { id: "pdf-toast" });

         const imgData = await toJpeg(element, { 
            quality: 0.95, 
            pixelRatio: 2,
            skipFonts: true,
            fontEmbedCSS: ""
         });
         
         const pdf = new jsPDF("p", "mm", "a4");
         const pdfWidth = pdf.internal.pageSize.getWidth();
         const pageHeight = pdf.internal.pageSize.getHeight();
         
         // Kita harus buat image element untuk mendeteksi proporsi ukuran natural canvasnya
         const img = new Image();
         img.src = imgData;
         await new Promise((resolve) => { img.onload = resolve; });
         
         const pdfHeight = (img.height * pdfWidth) / img.width;

         let heightLeft = pdfHeight;
         let position = 0;

         pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
         heightLeft -= pageHeight;

         while (heightLeft > 0) {
            position = heightLeft - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
         }

         pdf.save(`SEO-Audit-${data?.domain || "Report"}.pdf`);
         toast.success("PDF berhasil didownload!", { id: "pdf-toast" });
      } catch (err: any) {
         toast.error(`Gagal export PDF: ${err.message || err}`, { id: "pdf-toast" });
         console.error(err);
      } finally {
         setIsExporting(false);
      }
   };

   if (loading)
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <div className="flex gap-2 justify-center mb-4">
                  {[0, 1, 2].map((i) => (
                     <div
                        key={i}
                        className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                     />
                  ))}
               </div>
               <p className="text-gray-500">Memuat hasil scan...</p>
            </div>
         </div>
      );

   if (!data)
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <p className="text-2xl mb-2">😕</p>
               <p className="text-gray-500">Hasil scan tidak ditemukan</p>
               <Link
                  href="/"
                  className="mt-4 inline-block text-green-500 hover:underline"
               >
                  ← Scan ulang
               </Link>
            </div>
         </div>
      );

   const pi = data.page_info ?? {};
   const rank = getLocalRankingEstimate(data.total_score);
   const roadmap = getRoadmap(data);
   const waUrl = `https://wa.me/6281234567890?text=Halo, saya mau konsultasi SEO untuk ${data.domain}`;
   const isGated = data._gated === true;
   const isFree = !user || user.tier === "free";

   const radarData = [
      { subject: "SEO", value: data.seo_score },
      { subject: "Trust", value: data.trust_score },
      { subject: "Konten", value: data.content_score },
      { subject: "Performa", value: data.performance_score },
      { subject: "Local SEO", value: data.local_seo_score },
   ];

   const scoreCards = [
      {
         label: "SEO",
         score: data.seo_score,
         icon: "🔍",
         desc: "Title, meta, heading, canonical, dan struktur halaman",
      },
      {
         label: "Trust",
         score: data.trust_score,
         icon: "🛡️",
         desc: "Sitemap, robots.txt, schema, OG tags, dan sinyal kepercayaan",
      },
      {
         label: "Konten",
         score: data.content_score,
         icon: "📝",
         desc: "Kualitas konten, gambar, heading, dan internal links",
      },
      {
         label: "Performa",
         score: data.performance_score,
         icon: "⚡",
         desc: "Kecepatan halaman dan Core Web Vitals",
      },
      {
         label: "Local SEO",
         score: data.local_seo_score,
         icon: "📍",
         desc: "Kontak, Google Maps, dan social media presence",
      },
   ];

   const tabs = [
      { key: "issues" as const, label: `Issues (${data.issues?.length ?? 0})` },
      { key: "action" as const, label: "Action Plan" },
      { key: "info" as const, label: "Info Halaman" },
   ];

   return (
      <div id="pdf-report-container" className="min-h-screen bg-gray-50 pb-16">
         {/* HERO HEADER */}
         <div className="bg-[#0f172a] text-white">
            <div className="max-w-6xl mx-auto px-4 py-8">
               <Link
                  href="/"
                  className="text-white/60 hover:text-white text-sm mb-4 inline-block transition-colors"
               >
                  ← Scan domain lain
               </Link>
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h1 className="text-3xl font-black text-white">
                           {data.domain}
                        </h1>
                        {isGated && (
                           <span className="bg-white/20 border border-white/30 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                              🔒 Free — hasil dibatasi
                           </span>
                        )}
                     </div>
                     <p className="text-white/70 text-sm mb-2">{data.status}</p>
                     {data.scanned_at && (
                        <p className="text-white/50 text-xs mb-3">
                           🕐 Discan pada {formatDate(data.scanned_at)}
                        </p>
                     )}
                     <div className="flex gap-2 flex-wrap">
                        <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full font-medium">
                           🔴 {data.issue_counts?.critical ?? 0} Kritis
                        </span>
                        <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full font-medium">
                           🟡 {data.issue_counts?.warning ?? 0} Peringatan
                        </span>
                        <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full font-medium">
                            🔵 {data.issue_counts?.info ?? 0} Info
                        </span>
                     </div>
                  </div>

                  {/* PROJECT SELECTOR */}
                  {!isFree && (
                     <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                        <label className="text-[10px] uppercase font-bold text-white/60 mb-2 block">Pilih Proyek / Brand</label>
                        <select 
                           value={selectedProject || ""} 
                           onChange={(e) => handleAssignProject(e.target.value ? parseInt(e.target.value) : null)}
                           disabled={assigningProject}
                           className="bg-slate-900/50 text-white text-xs border border-white/20 rounded-lg px-3 py-2 w-full outline-none focus:ring-1 focus:ring-green-500 transition-all appearance-none cursor-pointer hover:bg-slate-900"
                        >
                           <option value="" className="bg-slate-900 text-white">— Tanpa Proyek —</option>
                           {projects.map(p => (
                              <option key={p.id} value={p.id} className="bg-slate-900 text-white">{p.name}</option>
                           ))}
                        </select>
                        <Link href="/projects" className="text-[10px] text-green-400 hover:text-green-300 mt-2 block text-right">Kelola Proyek →</Link>
                     </div>
                  )}

                  {/* SCORE CIRCLE */}
                  <div className="text-center flex-shrink-0">
                     <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white/40 flex flex-col items-center justify-center shadow-xl">
                        <span className="text-4xl font-black text-white leading-none">
                           {Math.round(data.total_score)}
                        </span>
                        <span className="text-white/60 text-xs uppercase tracking-widest mt-1">
                           / 100
                        </span>
                     </div>
                     <p className="text-white/60 text-xs mt-2">Total Score</p>
                  </div>
               </div>

               {/* ACTION BUTTONS */}
               <div className="flex gap-2 mt-6 flex-wrap">
                  <button
                     onClick={handleRescan}
                     disabled={rescanning}
                     className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                     {rescanning ? "⏳ Scanning..." : "🔄 Scan Ulang"}
                  </button>
                  <button
                     onClick={handleCopyLink}
                     className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                     {copied ? "✅ Link Disalin!" : "🔗 Salin Link"}
                  </button>
                  <button
                     onClick={handleExportPDF}
                     disabled={isExporting}
                     className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-medium transition-colors border ${
                        isFree
                           ? "bg-white/10 border-white/20 text-white/40 cursor-not-allowed"
                           : "bg-white text-gray-900 border-white hover:bg-gray-100"
                     }`}
                  >
                     {isExporting ? (
                        <>
                           <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                           Mengekspor...
                        </>
                     ) : isFree ? (
                        "🔒 Export PDF (Pro)"
                     ) : (
                        "📄 Export PDF"
                     )}
                  </button>
               </div>
            </div>
         </div>

         <div className="max-w-6xl mx-auto px-4 py-8">
            {/* GATED BANNER */}
            {isGated && (
               <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                     <p className="font-bold text-amber-800 mb-1">
                        🔒 Hasil scan dibatasi untuk akun Free
                     </p>
                     <p className="text-sm text-amber-700">
                        {data._gate_message ??
                           "Upgrade ke Pro untuk melihat semua issues, action plan lengkap, dan rekomendasi detail."}
                     </p>
                  </div>
                  <Link
                     href="/pricing"
                     className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                  >
                     Upgrade ke Pro →
                  </Link>
               </div>
            )}

            {/* SCORE CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
               {scoreCards.map((card) => (
                  <ScoreCard
                     key={card.label}
                     label={card.label}
                     score={card.score}
                     icon={card.icon}
                     description={card.desc}
                     factors={getFactors(card.label, pi, data)}
                     relatedIssues={
                        data.issues?.filter((iss) => {
                           const cat = (iss.category ?? "").toLowerCase();
                           if (card.label === "SEO")
                              return (
                                 cat.includes("seo dasar") ||
                                 cat.includes("struktur")
                              );
                           if (card.label === "Trust")
                              return (
                                 cat.includes("teknikal") ||
                                 cat.includes("trust")
                              );
                           if (card.label === "Konten")
                              return cat.includes("konten");
                           if (card.label === "Performa")
                              return cat.includes("performa");
                           if (card.label === "Local SEO")
                              return (
                                 cat.includes("local") ||
                                 cat.includes("sosial") ||
                                 cat.includes("social")
                              );
                           return false;
                        }) ?? []
                     }
                  />
               ))}
            </div>

            {/* RANKING ESTIMATE */}
            <div
               className={`border-2 rounded-xl p-5 mb-6 flex items-center justify-between gap-4 flex-wrap ${rank.bg}`}
            >
               <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                     Estimasi Posisi Google Indonesia
                  </p>
                  <p className={`text-2xl font-bold ${rank.color}`}>
                     {rank.label}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 max-w-xl">
                     {rank.desc}
                  </p>
               </div>
               <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400 mb-1">Score kamu</p>
                  <p
                     className={`text-3xl font-black ${getScoreColor(data.total_score)}`}
                  >
                     {Math.round(data.total_score)}/100
                  </p>
               </div>
            </div>

            {/* ROADMAP */}
            <div className="mb-8 grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
               <div className={`lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden relative ${isFree ? "select-none" : ""}`}>
                  
                  {/* Paywall Overlay */}
                  {isFree && (
                     <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md">
                        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 text-center border border-gray-100">
                           <span className="text-4xl mb-4 block">🔒</span>
                           <h3 className="text-xl font-bold text-gray-900 mb-2">Roadmap Tersedia di Pro</h3>
                           <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                              Dapatkan panduan langkah demi langkah selama 3 bulan untuk mendominasi halaman 1 Google.
                           </p>
                           <Link href="/pricing" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 block w-full">
                              Upgrade Sekarang →
                           </Link>
                        </div>
                     </div>
                  )}

                  <div className={`p-6 border-b border-gray-100 flex items-center justify-between ${isFree ? "opacity-40 blur-[2px]" : ""}`}>
                     <div>
                        <h2 className="font-bold text-gray-900 text-lg">
                           🗺️ Roadmap Halaman Pertama Google
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                           Langkah strategis untuk{" "}
                           <span className="font-medium">{data.domain}</span>
                        </p>
                     </div>
                     <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Custom Plan
                     </span>
                  </div>
                  <div className={`p-6 grid grid-cols-1 md:grid-cols-3 gap-6 ${isFree ? "opacity-40 blur-[2px]" : ""}`}>
                     {roadmap.map((step, i) => (
                        <div
                           key={i}
                           className={`border border-gray-100 rounded-2xl p-5 ${step.color.replace('border-2', 'border')}`}
                        >
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                              {step.month}
                           </p>
                           <p className="font-bold text-gray-900 text-sm mb-4">
                              {step.emoji} {step.title}
                           </p>
                           <ul className="space-y-3">
                              {step.items.map((item, j) => (
                                 <li
                                    key={j}
                                    className="text-xs text-gray-600 flex gap-2 leading-relaxed"
                                 >
                                    <span className="text-emerald-500">✔</span>
                                    <span>{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               </div>

               {/* HIRE EXPERT CTA */}
               <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div>
                     <h3 className="font-bold text-lg mb-2">Butuh Bantuan Eksekusi?</h3>
                     <p className="text-xs text-slate-400 leading-relaxed mb-6">
                        Tim Bang Bisnis siap membantu Anda mengimplementasikan roadmap ini agar website Anda benar-benar dominasi halaman 1 Google.
                     </p>
                     <ul className="space-y-2 mb-8">
                        {['Audit Mendalam', 'Eksekusi Konten', 'Backlink High-DR'].map(item => (
                           <li key={item} className="text-[10px] flex items-center gap-2 text-slate-300">
                              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                              {item}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <a
                     href={waUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block w-full bg-emerald-500 hover:bg-emerald-400 text-white text-center py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                  >
                     Konsultasi Gratis 🚀
                  </a>
               </div>
            </div>

            {/* COMPETITOR BENCHMARK */}
            <div className="mb-8 grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
               <div className={`lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden relative ${isFree ? "select-none" : ""}`}>
                  
                  {/* Paywall Overlay */}
                  {isFree && (
                     <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md">
                        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 text-center border border-gray-100">
                           <span className="text-4xl mb-4 block">📈</span>
                           <h3 className="text-xl font-bold text-gray-900 mb-2">Bandingkan Kompetitor</h3>
                           <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                              Fitur premium untuk membandingkan SEO kamu dengan 3 domain kompetitor teratas.
                           </p>
                           <Link href="/pricing" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 block w-full">
                              Upgrade ke Pro →
                           </Link>
                        </div>
                     </div>
                  )}

                  <div className={`p-6 border-b border-gray-100 flex items-center justify-between ${isFree ? "opacity-30 blur-sm" : ""}`}>
                     <div>
                        <h2 className="font-bold text-gray-900 text-lg">
                           📈 Competitor Benchmark
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                           Bandingkan <span className="font-medium">{data.domain}</span> dengan hingga {user?.tier === "agency" ? 10 : 3} kompetitor.
                        </p>
                     </div>
                  </div>
                  <div className={`p-6 ${isFree ? "opacity-30 blur-sm" : ""}`}>
                     {!isFree ? (
                        competitors.length === 0 ? (
                           <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-inner">
                              <p className="text-sm font-semibold text-gray-900 mb-2">Masukkan URL Kompetitor</p>
                              <p className="text-xs text-gray-500 mb-4">Maksimal {user?.tier === "agency" ? 10 : 3} domain untuk dianalisis dan dibandingkan.</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4 max-h-[300px] overflow-y-auto p-1">
                                 {compInputs.map((val, idx) => (
                                    <div key={idx} className="relative">
                                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{idx + 1}</span>
                                       <input 
                                          type="text" 
                                          value={val}
                                          onChange={(e) => {
                                             const ne = [...compInputs];
                                             ne[idx] = e.target.value;
                                             setCompInputs(ne);
                                          }}
                                          placeholder={`kompetitor${idx+1}.com`}
                                          className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                       />
                                    </div>
                                 ))}
                              </div>
                              <button 
                                 onClick={handleCompare}
                                 disabled={compLoading}
                                 className="w-full sm:w-auto bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                              >
                                 {compLoading ? "Menganalisis..." : "Bandingkan Sekarang"}
                              </button>
                           </div>
                        ) : (
                           <div className="overflow-x-auto">
                              <div className="flex items-center justify-between mb-4">
                                 <h3 className="text-sm text-gray-600 font-medium">✨ Hasil Perbandingan</h3>
                                 <button onClick={() => setCompetitors([])} className="text-xs text-blue-600 hover:text-blue-700 underline">Scan ulang kompetitor</button>
                              </div>
                              <table className="w-full text-left bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                 <thead className="bg-gray-50 text-xs text-gray-500 border-b border-gray-100">
                                    <tr>
                                       <th className="p-4 font-semibold w-1/4 sticky left-0 bg-gray-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Matriks</th>
                                       <th className="p-4 font-bold text-gray-900 border-l border-r border-blue-100 bg-blue-50/50">{data.domain}</th>
                                       {competitors.map((c, i) => (
                                          <th key={i} className="p-4 font-semibold border-r border-gray-100 last:border-0 min-w-[120px]">{c.domain}</th>
                                       ))}
                                    </tr>
                                 </thead>
                                 <tbody className="text-sm divide-y divide-gray-100">
                                    {[
                                       { label: "Lokal SEO", key: "local_score", mainKey: "local_seo_score" },
                                       { label: "Performa", key: "perf_score", mainKey: "performance_score" },
                                       { label: "Konten", key: "content_score", mainKey: "content_score" },
                                       { label: "Trust", key: "trust_score", mainKey: "trust_score" },
                                       { label: "On-Page SEO", key: "seo_score", mainKey: "seo_score" },
                                       { label: "Total Score", key: "total_score", mainKey: "total_score", highlight: true },
                                    ].map((m) => {
                                       const myScore = Math.round((data as any)[m.mainKey] ?? 0);
                                       const compScores = competitors.map(c => Math.round(c[m.key] ?? 0));
                                       const isHighest = myScore >= Math.max(...compScores);
                                       
                                       return (
                                          <tr key={m.key} className={m.highlight ? "bg-gray-50/50" : ""}>
                                             <td className={`p-4 sticky left-0 z-10 bg-inherit shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] ${m.highlight ? "font-bold text-gray-900" : "text-gray-600"}`}>{m.label}</td>
                                             <td className={`p-4 border-l border-r border-blue-100 bg-blue-50/30 ${m.highlight ? "font-bold" : "font-medium"} ${isHighest ? "text-green-600" : "text-gray-900"}`}>
                                                {myScore} {isHighest && <span className="text-[10px] ml-1">👑</span>}
                                             </td>
                                             {compScores.map((score, i) => (
                                                <td key={i} className={`p-4 border-r border-gray-100 last:border-0 min-w-[120px] ${m.highlight ? "font-bold" : ""} ${score > myScore ? "text-orange-600" : "text-gray-500"}`}>
                                                   {score}
                                                </td>
                                             ))}
                                          </tr>
                                       );
                                    })}
                                 </tbody>
                              </table>
                           </div>
                        )
                     ) : (
                        <div className="flex flex-col gap-4">
                           {[1, 2, 3].map((i) => (
                              <div key={i} className="flex items-center gap-4 border border-gray-100 p-4 rounded-xl">
                                 <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                    ?
                                 </div>
                                 <div className="flex-1">
                                    <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="w-24 h-3 bg-gray-100 rounded"></div>
                                 </div>
                                 <div className="w-16 h-8 bg-blue-50 rounded-lg"></div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>

               {/* COMPETITOR INFO BANNER */}
               <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-blue-900 flex flex-col justify-center text-center">
                  <span className="text-3xl block mb-4">🎯</span>
                  <h3 className="font-bold text-sm mb-2">Analisis Kompetitor</h3>
                  <p className="text-xs text-blue-700/80 leading-relaxed">
                     Mengetahui kelemahan kompetitor adalah cara tercepat untuk merebut posisi halaman 1 di Google.
                  </p>
               </div>
            </div>

            {/* AI SUMMARY */}
            {data.ai_summary && (
               <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-8">
                  <p className="text-sm font-semibold text-purple-700 mb-2">
                     🤖 AI Summary by Gemini
                  </p>
                  <p className="text-sm text-purple-900 leading-relaxed">
                     {data.ai_summary}
                  </p>
               </div>
            )}

            {/* METHODOLOGY SECTION */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-8 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest">
                     Super Accurate Algorithm v2.0
                  </span>
               </div>
               <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
                     ⚖️
                  </div>
                  <div>
                     <h3 className="font-bold text-slate-900 text-xl">Metodologi Audit SEO Scanner</h3>
                     <p className="text-sm text-slate-500">Algoritma kami mensimulasikan Googlebot untuk analisis 50+ parameter teknis secara real-time.</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                     { title: "Technical Rigor", desc: "Mengecek validitas sitemap, robots.txt, dan SSL security secara mendalam." },
                     { title: "UX & Speed", desc: "Simulasi Core Web Vitals (LCP, CLS) untuk estimasi pengalaman pengguna." },
                     { title: "Semantic Depth", desc: "Menganalisis relevansi struktur tag H1-H6 dan distribusi konten." },
                     { title: "Trust Markers", desc: "Verifikasi Schema.org (JSON-LD) dan konsistensi data Local SEO." }
                  ].map(m => (
                     <div key={m.title} className="flex flex-col gap-2">
                        <div className="h-1 w-8 bg-emerald-500 rounded-full mb-1"></div>
                        <p className="font-bold text-slate-900 text-sm">{m.title}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* MAIN + SIDEBAR */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2">
                  {/* TABS */}
                  <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
                     {tabs.map((tab) => (
                        <button
                           key={tab.key}
                           onClick={() => setActiveTab(tab.key)}
                           className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all ${
                              activeTab === tab.key
                                 ? "bg-white text-gray-900 shadow-sm"
                                 : "text-gray-500 hover:text-gray-700"
                           }`}
                        >
                           {tab.label}
                        </button>
                     ))}
                  </div>

                  {/* GATED OVERLAY */}
                  {isGated ? (
                     <div className="relative">
                        <div className="pointer-events-none select-none blur-sm opacity-40 min-h-[200px]">
                           <IssueList issues={data.issues ?? []} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="bg-white border-2 border-amber-200 rounded-2xl p-8 text-center shadow-xl max-w-sm mx-4">
                              <p className="text-3xl mb-3">🔒</p>
                              <p className="font-bold text-gray-900 mb-2">
                                 Konten Terkunci
                              </p>
                              <p className="text-sm text-gray-500 mb-5">
                                 Upgrade ke Pro untuk lihat semua{" "}
                                 {(data.issue_counts?.critical ?? 0) +
                                    (data.issue_counts?.warning ?? 0) +
                                    (data.issue_counts?.info ?? 0)}{" "}
                                 issues dan action plan lengkap.
                              </p>
                              <Link
                                 href="/pricing"
                                 className="block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                              >
                                 Upgrade paket SEO Checkup
                              </Link>
                              <p className="text-xs text-gray-400 mt-3">
                                 Mulai dari Rp99.000/bulan
                              </p>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <>
                        {activeTab === "issues" && (
                           <IssueList issues={data.issues ?? []} />
                        )}
                        {activeTab === "action" && (
                           <ActionPlan
                              fixNow={data.action_plan?.fix_now ?? []}
                              fixWeek={data.action_plan?.fix_this_week ?? []}
                              fixLater={data.action_plan?.fix_later ?? []}
                              quickWins={data.action_plan?.quick_wins ?? []}
                           />
                        )}
                        {activeTab === "info" && (
                           <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                              {[
                                 { label: "Title", value: pi.title },
                                 {
                                    label: "Panjang Title",
                                    value:
                                       pi.title_length != null
                                          ? `${pi.title_length} karakter`
                                          : null,
                                 },
                                 {
                                    label: "Meta Desc",
                                    value: pi.meta_description,
                                 },
                                 {
                                    label: "Panjang Meta",
                                    value:
                                       pi.meta_desc_length != null
                                          ? `${pi.meta_desc_length} karakter`
                                          : null,
                                 },
                                  {
                                     label: "H1",
                                     value:
                                        (pi.h1_tags?.length ?? 0) > 0
                                           ? pi.h1_tags?.[0]
                                           : "❌ Tidak ada",
                                  },
                                  {
                                     label: "H2",
                                     value:
                                        (pi.h2_tags?.length ?? 0) > 0
                                           ? pi.h2_tags?.slice(0, 3).join(", ")
                                           : "❌ Tidak ada",
                                  },
                                 {
                                    label: "Kata",
                                    value:
                                       pi.word_count != null
                                          ? `${pi.word_count} kata`
                                          : null,
                                 },
                                 {
                                    label: "Paragraf",
                                    value:
                                       pi.paragraph_count != null
                                          ? `${pi.paragraph_count} paragraf`
                                          : null,
                                 },
                                 {
                                    label: "Gambar",
                                    value:
                                       pi.total_images != null
                                          ? `${pi.total_images} total, ${pi.images_without_alt} tanpa alt`
                                          : null,
                                 },
                                 {
                                    label: "Internal Links",
                                    value:
                                       pi.internal_links != null
                                          ? `${pi.internal_links} link`
                                          : null,
                                 },
                                 {
                                    label: "robots.txt",
                                    value: pi.has_robots_txt
                                       ? "✅ Ada"
                                       : "❌ Tidak ada",
                                 },
                                 {
                                    label: "Sitemap",
                                    value: pi.has_sitemap
                                       ? "✅ Ada"
                                       : "❌ Tidak ada",
                                 },
                                 {
                                    label: "Schema",
                                    value: pi.has_schema
                                       ? `✅ Ada (${pi.schema_types?.join(", ")})`
                                       : "❌ Tidak ada",
                                 },
                                 {
                                    label: "OG Tags",
                                    value: pi.og_complete
                                       ? "✅ Lengkap"
                                       : "⚠️ Tidak lengkap",
                                 },
                                 {
                                    label: "Twitter Card",
                                    value: pi.twitter_card ?? null,
                                 },
                                 {
                                    label: "Canonical",
                                    value: pi.canonical ?? null,
                                 },
                                 { label: "Bahasa", value: pi.lang ?? null },
                                 {
                                    label: "Redirect",
                                    value:
                                       pi.redirect_count != null
                                          ? `${pi.redirect_count}x redirect`
                                          : null,
                                 },
                                 {
                                    label: "Kontak",
                                    value: pi.has_contact_info
                                       ? "✅ Ditemukan"
                                       : "❌ Tidak ada",
                                 },
                                 {
                                    label: "Google Maps",
                                    value: pi.google_maps
                                       ? "✅ Ada embed"
                                       : "❌ Tidak ada",
                                 },
                              ]
                                 .filter((r) => r.value)
                                 .map((row) => (
                                    <div
                                       key={row.label}
                                       className="flex gap-4 py-2.5 border-b border-gray-50 last:border-0"
                                    >
                                       <span className="text-sm text-gray-400 w-36 flex-shrink-0">
                                          {row.label}
                                       </span>
                                       <span className="text-sm text-gray-700 flex-1 break-words">
                                          {row.value}
                                       </span>
                                    </div>
                                 ))}
                           </div>
                        )}
                     </>
                  )}
               </div>

               {/* SIDEBAR */}
               <div className="space-y-6">
                  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                     <h3 className="font-bold text-gray-900 mb-4 text-sm">
                        Profil SEO
                     </h3>
                     <div className="mt-4">
                        <ScoreChart 
                           scores={{
                              total: data.total_score,
                              seo: data.seo_score,
                              technical: data.seo_score, // Fallback if technical isn't there
                              content: data.content_score,
                              performance: data.performance_score,
                              local_seo: data.local_seo_score,
                              social: data.trust_score
                           }} 
                        />
                     </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6">
                     <h3 className="font-bold mb-2">
                        Butuh bantuan fix semua issue ini?
                     </h3>
                     <p className="text-gray-300 text-sm mb-4">
                        Tim kami siap bantu implementasi semua rekomendasi SEO
                        untuk {data.domain}.
                     </p>
                     <a
                        href={waUrl}
                        target="_blank"
                        className="block w-full text-center bg-green-500 hover:bg-green-400 text-white py-3 rounded-lg font-medium text-sm transition-colors"
                     >
                        💬 Konsultasi via WhatsApp
                     </a>
                     <Link
                        href="/pricing"
                        className="block w-full text-center mt-2 text-gray-400 hover:text-white text-sm py-2 transition-colors"
                     >
                        Lihat paket Pro →
                     </Link>
                  </div>

                  {!isGated && (data.action_plan?.fix_now?.length ?? 0) > 0 && (
                     <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                        <h3 className="font-bold text-red-800 text-sm mb-3">
                           🔴 Fix Sekarang ({data.action_plan.fix_now.length})
                        </h3>
                        <ul className="space-y-2">
                           {data.action_plan.fix_now.map(
                              (item: any, i: number) => (
                                 <li
                                    key={i}
                                    className="text-sm text-red-700 flex gap-2"
                                 >
                                    <span className="flex-shrink-0">→</span>
                                    <span>{item.issue}</span>
                                 </li>
                              ),
                           )}
                        </ul>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
