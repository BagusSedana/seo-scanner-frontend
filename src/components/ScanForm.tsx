"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import toast from "react-hot-toast";

export default function ScanForm() {
   const [domain, setDomain] = useState("");
   const [loading, setLoading] = useState(false);
   const [loadingText, setLoadingText] = useState("");
   const router = useRouter();

   const handleScan = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!domain.trim()) return;

      setLoading(true);
      const texts = [
         "Mengakses website...",
         "Menganalisis SEO dasar...",
         "Cek kecepatan halaman...",
         "Menganalisis konten...",
         "Cek local SEO...",
         "Menyusun laporan...",
      ];
      let i = 0;
      setLoadingText(texts[0]);
      const interval = setInterval(() => {
         i = (i + 1) % texts.length;
         setLoadingText(texts[i]);
      }, 2500);

      try {
         const res = await API.post("/scan", {
            domain: domain.trim(),
            use_ai: false,
         });
         clearInterval(interval);
         router.push(`/hasil/${res.data.scan_id}`);
      } catch (err: unknown) {
         clearInterval(interval);
         const axiosError = err as { response?: { data?: { detail?: string } } };
         const msg = axiosError.response?.data?.detail || "Gagal scan. Coba lagi.";
         toast.error(typeof msg === "string" ? msg : "Gagal scan. Coba lagi.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <form onSubmit={handleScan} className="w-full max-w-2xl mx-auto">
         <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                  https://
               </span>
               <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="namadomain.com"
                  disabled={loading}
                  className="w-full pl-20 pr-4 py-4 text-lg text-gray-900 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white placeholder:text-gray-400"
               />
            </div>
            <button
               type="submit"
               disabled={loading || !domain.trim()}
               className="px-8 py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold text-lg rounded-xl transition-all disabled:cursor-not-allowed whitespace-nowrap shadow-lg hover:shadow-xl"
            >
               {loading ? "Scanning..." : "Scan Sekarang →"}
            </button>
         </div>

         {loading && (
            <div className="mt-4 flex items-center gap-3 justify-center">
               <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                     <div
                        key={i}
                        className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                     />
                  ))}
               </div>
               <span className="text-gray-500 text-sm animate-pulse">
                  {loadingText}
               </span>
            </div>
         )}
      </form>
   );
}
