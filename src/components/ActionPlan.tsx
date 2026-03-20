"use client";
import { ScanIssue } from "@/lib/api";

interface Props {
   fixNow: ScanIssue[];
   fixWeek: ScanIssue[];
   fixLater: ScanIssue[];
   quickWins: string[];
}

const Section = ({
   title,
   items,
   color,
   emoji,
}: {
   title: string;
   items: ScanIssue[];
   color: string;
   emoji: string;
}) => {
   if (!items.length) return null;
   return (
      <div className={`rounded-xl border-2 ${color} p-5`}>
         <h4 className="font-bold text-sm mb-3">
            {emoji} {title}
         </h4>
         <ul className="space-y-2">
            {items.map((item, i) => (
               <li key={i} className="text-sm flex gap-2">
                  <span className="flex-shrink-0 mt-0.5">→</span>
                  <span>{item.issue}</span>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default function ActionPlan({
   fixNow,
   fixWeek,
   fixLater,
   quickWins,
}: Props) {

   return (
      <div className="space-y-4">
         {quickWins.length > 0 && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
               <h4 className="font-bold text-sm text-green-700 mb-3">
                  ⚡ Quick Wins (Bisa dilakukan hari ini)
               </h4>
               <ul className="space-y-1">
                  {quickWins.map((win, i) => (
                     <li key={i} className="text-sm text-green-700 flex gap-2">
                        <span>✓</span>
                        <span>{win}</span>
                     </li>
                  ))}
               </ul>
            </div>
         )}
         <Section
            title="Fix Sekarang"
            items={fixNow}
            color="border-red-200 bg-red-50 text-red-700"
            emoji="🔴"
         />
         <Section
            title="Fix Minggu Ini"
            items={fixWeek}
            color="border-yellow-200 bg-yellow-50 text-yellow-700"
            emoji="🟡"
         />
         <Section
            title="Fix Nanti"
            items={fixLater}
            color="border-blue-200 bg-blue-50 text-blue-700"
            emoji="🔵"
         />
      </div>
   );
}
