"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
   const [form, setForm] = useState({ email: "", password: "" });
   const [loading, setLoading] = useState(false);
   const { setAuth } = useAuthStore();
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
         const res = await API.post("/auth/login", form);
         setAuth(res.data.user, res.data.token);
         toast.success("Selamat datang kembali!");
         router.push("/dashboard");
      } catch (err: unknown) {
         const axiosError = err as { response?: { data?: { detail?: string } } };
         toast.error(axiosError.response?.data?.detail || "Login gagal");
      } finally {
         setLoading(false);
      }
   };

   const handleGoogleSuccess = async (credentialResponse: any) => {
      setLoading(true);
      try {
         const res = await API.post("/auth/google", { token: credentialResponse.credential });
         setAuth(res.data.user, res.data.token);
         toast.success("Login via Google berhasil!");
         router.push("/dashboard");
      } catch (err: unknown) {
         const axiosError = err as { response?: { data?: { detail?: string } } };
         toast.error(axiosError.response?.data?.detail || "Gagal login dengan Google.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center px-4">
         <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
               <div className="text-center mb-10">
                  <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                     Masuk ke SEO Checkup
                  </h2>
                  <p className="text-gray-500 text-sm mt-3">
                     Kelola semua data perusahaan Anda dalam satu tempat
                  </p>
               </div>

               <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "717904791336-qj6g02f8jngc2uolvlsst94tll18o4v6.apps.googleusercontent.com"}>
                  <div className="mb-6 flex justify-center">
                     <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => toast.error("Koneksi ke Google gagal")}
                        theme="filled_blue"
                        shape="pill"
                        text="continue_with"
                        width="300"
                     />
                  </div>
               </GoogleOAuthProvider>
               
               <div className="relative flex items-center mb-6">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-semibold uppercase tracking-widest">Atau via Email</span>
                  <div className="flex-grow border-t border-slate-200"></div>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                     <label className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2 block">
                        Email Address
                     </label>
                     <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                           setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-slate-900"
                        placeholder="email@perusahaan.com"
                     />
                  </div>
                  <div>
                     <label className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2 block">
                        Password
                     </label>
                     <input
                        type="password"
                        required
                        value={form.password}
                        onChange={(e) =>
                           setForm({ ...form, password: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-slate-900"
                        placeholder="••••••••"
                     />
                  </div>
                  <button
                     type="submit"
                     disabled={loading}
                     className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-medium rounded-2xl transition-all shadow-lg shadow-blue-600/10 active:scale-95 mt-4"
                  >
                     {loading ? "Menghubungkan..." : "Masuk ke SEO Checkup"}
                  </button>
               </form>
               <p className="text-center text-sm text-slate-500 mt-10">
                  Belum punya akses?{" "}
                  <Link
                     href="/register"
                     className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                     Daftar sekarang
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}
