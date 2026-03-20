// src/components/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

export default function AuthProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const hydrate = useAuthStore((s) => s.hydrate);

   useEffect(() => {
      hydrate(); // dipanggil sekali saat app pertama load
   }, [hydrate]);

   return <>{children}</>;
}
