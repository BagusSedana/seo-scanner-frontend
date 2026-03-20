"use client";
import {
   Radar,
   RadarChart,
   PolarGrid,
   PolarAngleAxis,
   ResponsiveContainer,
} from "recharts";
import { ScanScore } from "@/lib/api";

interface Props {
   scores: ScanScore;
}

export default function ScoreChart({ scores }: Props) {
   const data = [
      { subject: "SEO", value: scores.seo },
      { subject: "Technical", value: scores.technical },
      { subject: "Konten", value: scores.content },
      { subject: "Performa", value: scores.performance },
      { subject: "Local SEO", value: scores.local_seo },
      { subject: "Social", value: scores.social },
   ];

   return (
      <ResponsiveContainer width="100%" height={280}>
         <RadarChart data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
               dataKey="subject"
               tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Radar
               name="Score"
               dataKey="value"
               stroke="#22c55e"
               fill="#22c55e"
               fillOpacity={0.2}
               strokeWidth={2}
            />
         </RadarChart>
      </ResponsiveContainer>
   );
}
