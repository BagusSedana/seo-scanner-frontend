// src/store/auth.ts
import { create } from "zustand";

interface User {
   id: number;
   name: string;
   email: string;
   whatsapp?: string;
   company?: string;
   tier: "free" | "pro" | "agency";
   scans_this_month: number;
   scan_limit: number;
   topup_scans: number;
   last_reset_date?: string;
   subscription_end?: string;
}

interface AuthStore {
   user: User | null;
   token: string | null;
   isAuthenticated: boolean;
   setAuth: (user: User, token: string) => void;
   logout: () => void;
   hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
   user: null,
   token: null,
   isAuthenticated: false,
   setAuth: (user, token) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // Sync ke cookie biar middleware bisa baca
      document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      set({ user, token, isAuthenticated: true });
   },
   logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Hapus cookie
      document.cookie = "auth_token=; path=/; max-age=0";
      set({ user: null, token: null, isAuthenticated: false });
   },
   hydrate: () => {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
         try {
            const user = JSON.parse(userStr);
            // Sync cookie kalau belum ada
            document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
            set({ token, user, isAuthenticated: true });
         } catch {
            // localStorage corrupt, bersihkan
            localStorage.removeItem("token");
            localStorage.removeItem("user");
         }
      }
   },
}));
