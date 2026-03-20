import axios from "axios";

const API = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
   timeout: 120000,
});

API.interceptors.request.use((config) => {
   const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
   if (token) config.headers.Authorization = `Bearer ${token}`;
   return config;
});

export default API;

// Types
export interface ScanScore {
   total: number;
   seo: number;
   technical: number;
   content: number;
   performance: number;
   local_seo: number;
   social: number;
}

export interface ScanIssue {
   category: string;
   severity: "critical" | "warning" | "info";
   issue: string;
   why: string;
   fix: string;
}

export interface ScanResult {
   scan_id: number;
   domain: string;
   overview: {
      total_score: number;
      grade: string;
      status: string;
      status_color: string;
      executive_summary: string;
      issue_count: { critical: number; warning: number; info: number };
   };
   scores: ScanScore;
   page_info: Record<string, unknown>;
   issues: {
      all: ScanIssue[];
      critical: ScanIssue[];
      warnings: ScanIssue[];
      info: ScanIssue[];
   };
   action_plan: {
      fix_now: ScanIssue[];
      fix_this_week: ScanIssue[];
      fix_later: ScanIssue[];
      quick_wins: string[];
   };
   performance: {
      mobile: {
         score: number;
         lcp: string;
         cls: string;
         fcp: string;
         ttfb: string;
      };
   };
   ai_insights: Record<string, unknown>;
   cta: Record<string, unknown>;
   _gated?: boolean;
   meta: Record<string, unknown>;
}
