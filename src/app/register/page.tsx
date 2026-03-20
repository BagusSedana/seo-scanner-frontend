"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function RegisterPage() {
   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      whatsapp: "",
   });
   const [loading, setLoading] = useState(false);
   const { setAuth } = useAuthStore();
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
         const { email, name, password, whatsapp } = form;
         const res = await API.post("/auth/register", {
            email,
            name,
            password,
            whatsapp,
         });
         setAuth(res.data.user, res.data.token);
         toast.success("Akun berhasil dibuat!");
         router.push("/");
      } catch (err: unknown) {
         const axiosError = err as { response?: { data?: { detail?: string } } };
         toast.error(axiosError.response?.data?.detail || "Registrasi gagal");
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
                  <h1 className="text-3xl font-medium text-gray-900 tracking-tight">
                     Mulai Perjalanan Anda
                  </h1>
                  <p className="text-gray-500 text-sm mt-3">
                     Buka potensi penuh data perusahaan Anda hari ini
                  </p>
               </div>

               <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "717904791336-qj6g02f8jngc2uolvlsst94tll18o4v6.apps.googleusercontent.com"}>
                  <div className="mb-6 flex justify-center">
                     <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => toast.error("Koneksi ke Google gagal")}
                        theme="filled_blue"
                        shape="pill"
                        text="signup_with"
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
                  {[
                     {
                        key: "name",
                        label: "Full Name",
                        type: "text",
                        placeholder: "Nama lengkap Anda",
                     },
                     {
                        key: "email",
                        label: "Email Address",
                        type: "email",
                        placeholder: "email@perusahaan.com",
                     },
                     {
                        key: "whatsapp",
                        label: "WhatsApp Number",
                        type: "text",
                        placeholder: "08xxx (opsional)",
                     },
                     {
                        key: "password",
                        label: "Password",
                        type: "password",
                        placeholder: "Min. 8 karakter",
                     },
                  ].map((f) => (
                     <div key={f.key}>
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2 block">
                           {f.label}
                        </label>
                        <input
                           type={f.type}
                           required={f.key !== "whatsapp"}
                           value={(form as any)[f.key]}
                           onChange={(e) =>
                              setForm({ ...form, [f.key]: e.target.value })
                           }
                           className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-slate-900"
                           placeholder={f.placeholder}
                        />
                     </div>
                  ))}
                  <button
                     type="submit"
                     disabled={loading}
                     className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-medium rounded-2xl transition-all shadow-lg shadow-blue-600/10 active:scale-95 mt-4"
                  >
                     {loading ? "Mendaftar..." : "Mulai Sekarang"}
                  </button>
               </form>
               <p className="text-center text-sm text-slate-500 mt-10">
                  Sudah memiliki akun?{" "}
                  <Link
                     href="/login"
                     className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                     Masuk
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}
