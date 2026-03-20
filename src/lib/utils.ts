import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): string {
   if (score >= 80) return "text-green-500";
   if (score >= 60) return "text-yellow-500";
   if (score >= 40) return "text-orange-500";
   return "text-red-500";
}

export function getScoreBg(score: number): string {
   if (score >= 80) return "bg-green-500";
   if (score >= 60) return "bg-yellow-500";
   if (score >= 40) return "bg-orange-500";
   return "bg-red-500";
}

export function getScoreLabel(score: number): string {
   if (score >= 85) return "Sehat";
   if (score >= 70) return "Cukup Baik";
   if (score >= 55) return "Perlu Perhatian";
   if (score >= 40) return "Butuh Perbaikan";
   return "Kritis";
}

export function getSeverityColor(severity: string): string {
   if (severity === "critical") return "bg-red-100 text-red-700 border-red-200";
   if (severity === "warning")
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
   return "bg-blue-100 text-blue-700 border-blue-200";
}

export function getSeverityIcon(severity: string): string {
   if (severity === "critical") return "🔴";
   if (severity === "warning") return "🟡";
   return "🔵";
}
