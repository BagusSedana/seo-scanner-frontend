// src/app/scan/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function ScanPage() {
   const router = useRouter();
   const { isAuthenticated } = useAuthStore();

   useEffect(() => {
      if (isAuthenticated) {
         router.replace("/dashboard/scan");
      } else {
         router.replace("/register");
      }
   }, [isAuthenticated, router]);

   return null;
}
