// src/app/profile/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import API from "@/lib/api";

const TIER_LABEL: Record<string, string> = {
   free: "Gratis",
   pro: "Pro",
   agency: "Agency",
};

const TIER_COLOR: Record<string, string> = {
   free: "bg-gray-100 text-gray-600",
   pro: "bg-blue-100 text-blue-700",
   agency: "bg-blue-100 text-blue-700",
};

export default function ProfilePage() {
   const { user, setAuth, token } = useAuthStore();
   const [activeTab, setActiveTab] = useState("akun");
   const [saving, setSaving] = useState(false);
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");

   // Form state — pre-fill dari auth store
   const [name, setName] = useState(user?.name || "");
   const [whatsapp, setWhatsapp] = useState(user?.whatsapp || "");

   // Password state
   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const handleSaveProfile = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      setSuccess("");
      setError("");

      try {
         await API.put("/auth/profile", { name, whatsapp });
         // Update store dengan data terbaru
         if (user && token) {
            setAuth({ ...user, name, whatsapp }, token);
         }
         setSuccess("Profil berhasil diperbarui!");
      } catch (err: unknown) {
         const axiosError = err as { response?: { data?: { message?: string } } };
         setError(axiosError?.response?.data?.message || "Gagal menyimpan perubahan.");
      } finally {
         setSaving(false);
      }
   };

   const handleChangePassword = async (e: React.FormEvent) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
         setError("Password baru tidak cocok.");
         return;
      }
      setSaving(true);
      setSuccess("");
      setError("");
      try {
         await API.put("/api/profile/password/", {
            current_password: currentPassword,
            new_password: newPassword,
         });
         setSuccess("Password berhasil diubah!");
         setCurrentPassword("");
         setNewPassword("");
         setConfirmPassword("");
      } catch (err: unknown) {
         const axiosError = err as { response?: { data?: { message?: string } } };
         setError(axiosError?.response?.data?.message || "Gagal mengubah password.");
      } finally {
         setSaving(false);
      }
   };

   const tabs = [
      { id: "akun", label: "Akun" },
      { id: "langganan", label: "Langganan" },
      { id: "keamanan", label: "Keamanan" },
      { id: "notifikasi", label: "Notifikasi" },
   ];

   const scanPercent = user
      ? Math.round((user.scans_this_month / user.scan_limit) * 100)
      : 0;

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
               <h1 className="text-2xl font-bold text-gray-900">
                  Pengaturan Akun
               </h1>
               <p className="text-sm text-gray-500 mt-1">
                  Kelola profil, langganan, dan preferensi kamu.
               </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
               {/* Sidebar */}
               <div className="lg:col-span-1">
                  {/* Avatar Card — data dari store */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 text-center">
                     <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                     </div>
                     <p className="font-semibold text-gray-900 text-sm">
                        {user?.name}
                     </p>
                     <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {user?.email}
                     </p>
                     {/* ← TIER DARI STORE, BUKAN HARDCODE */}
                     <span
                        className={`inline-flex items-center gap-1 mt-3 text-xs px-2.5 py-1 rounded-full font-medium ${TIER_COLOR[user?.tier ?? "free"]}`}
                     >
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                        Paket {TIER_LABEL[user?.tier ?? "free"]}
                     </span>
                     <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                           <span>Scan bulan ini</span>
                           <span>
                              {user?.scans_this_month}/{user?.scan_limit}
                           </span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-1.5">
                           <div
                              className={`h-1.5 rounded-full ${scanPercent >= 90 ? "bg-red-500" : scanPercent >= 70 ? "bg-yellow-500" : "bg-blue-500"}`}
                              style={{
                                 width: `${Math.min(scanPercent, 100)}%`,
                              }}
                           />
                        </div>
                     </div>
                  </div>

                  {/* Nav Tabs */}
                  <nav className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                     {tabs.map((tab) => (
                        <button
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left border-b border-gray-100 last:border-0 ${
                              activeTab === tab.id
                                 ? "bg-blue-50 text-blue-700 font-medium"
                                 : "text-gray-600 hover:bg-gray-50"
                           }`}
                        >
                           {activeTab === tab.id && (
                              <span className="w-1 h-4 bg-blue-600 rounded-full flex-shrink-0"></span>
                           )}
                           {tab.label}
                        </button>
                     ))}
                  </nav>
               </div>

               {/* Main Content */}
               <div className="lg:col-span-3 space-y-5">
                  {/* Alert */}
                  {success && (
                     <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                        <svg
                           width="16"
                           height="16"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                           />
                        </svg>
                        {success}
                     </div>
                  )}
                  {error && (
                     <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                        <svg
                           width="16"
                           height="16"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                           />
                        </svg>
                        {error}
                     </div>
                  )}

                  {/* TAB: AKUN */}
                  {activeTab === "akun" && (
                     <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="font-semibold text-gray-900 mb-5">
                           Informasi Profil
                        </h2>
                        <form onSubmit={handleSaveProfile}>
                           <div className="grid sm:grid-cols-2 gap-4 mb-4">
                              <div>
                                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Nama Lengkap
                                 </label>
                                 <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                 />
                              </div>
                              <div>
                                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Email
                                 </label>
                                 <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-400 cursor-not-allowed"
                                 />
                                 <p className="text-xs text-gray-400 mt-1">
                                    Email tidak bisa diubah
                                 </p>
                              </div>
                              <div>
                                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    No. WhatsApp
                                 </label>
                                 <input
                                    type="tel"
                                    value={whatsapp}
                                    onChange={(e) =>
                                       setWhatsapp(e.target.value)
                                    }
                                    placeholder="+62 812 xxxx xxxx"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                 />
                              </div>
                              <div>
                                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Paket Aktif
                                 </label>
                                 <div className="border border-gray-100 bg-gray-50 rounded-lg px-3 py-2.5 flex items-center justify-between">
                                    <span
                                       className={`text-xs px-2.5 py-1 rounded-full font-medium ${TIER_COLOR[user?.tier ?? "free"]}`}
                                    >
                                       {TIER_LABEL[user?.tier ?? "free"]}
                                    </span>
                                    {user?.tier === "agency" ? (
                                       <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Paket Tertinggi</span>
                                    ) : (
                                       <Link
                                          href="/pricing"
                                          className="text-xs text-blue-600 hover:underline"
                                       >
                                          Upgrade →
                                       </Link>
                                    )}
                                 </div>
                              </div>
                           </div>
                           <div className="flex justify-end">
                              <button
                                 type="submit"
                                 disabled={saving}
                                 className="bg-gray-900 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                              >
                                 {saving && (
                                    <svg
                                       className="animate-spin"
                                       width="14"
                                       height="14"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                    >
                                       <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                       />
                                       <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                       />
                                    </svg>
                                 )}
                                 {saving ? "Menyimpan..." : "Simpan Perubahan"}
                              </button>
                           </div>
                        </form>
                     </div>
                  )}

                  {/* TAB: LANGGANAN */}
                  {activeTab === "langganan" && (
                     <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="font-semibold text-gray-900 mb-5">
                           Paket Langganan
                        </h2>
                        <div
                           className={`border rounded-xl p-5 mb-6 ${user?.tier !== "free" ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
                        >
                           <div className="flex items-center justify-between">
                              <div>
                                 <span
                                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${TIER_COLOR[user?.tier ?? "free"]}`}
                                 >
                                    Aktif
                                 </span>
                                 <p className="font-bold text-gray-900 text-xl mt-2">
                                    Paket {TIER_LABEL[user?.tier ?? "free"]}
                                 </p>
                                 {user?.tier === "free" ? (
                                    <p className="text-sm text-gray-500 mt-1">
                                       Gratis selamanya
                                    </p>
                                 ) : (
                                    <p className="text-sm text-gray-500 mt-1">
                                       Rp{" "}
                                       {user?.tier === "pro"
                                          ? "99.000"
                                          : "299.000"}{" "}
                                       / bulan
                                    </p>
                                 )}
                              </div>
                              <div className="text-right">
                                 <p className="text-3xl font-bold text-gray-900">
                                    {(user?.scan_limit ?? 3) -
                                       (user?.scans_this_month ?? 0)}
                                 </p>
                                 <p className="text-xs text-gray-400 mt-1">
                                    scan tersisa
                                 </p>
                              </div>
                           </div>
                           <div className="mt-4 bg-gray-200 rounded-full h-1.5">
                              <div
                                 className={`h-1.5 rounded-full ${scanPercent >= 90 ? "bg-red-500" : "bg-blue-500"}`}
                                 style={{
                                    width: `${Math.min(scanPercent, 100)}%`,
                                 }}
                              />
                           </div>
                           <p className="text-xs text-gray-400 mt-1.5">
                              {user?.scans_this_month} dari {user?.scan_limit}{" "}
                              scan digunakan bulan ini
                           </p>
                        </div>
                        <div className="flex gap-3">
                           <Link
                              href="/pricing"
                              className="bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                           >
                              {user?.tier === "free"
                                 ? "Upgrade Paket"
                                 : "Kelola Paket"}
                           </Link>
                           {user?.tier !== "free" && (
                              <button className="border border-gray-200 text-sm text-gray-600 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                                 Batalkan Langganan
                              </button>
                           )}
                        </div>
                     </div>
                  )}

                  {/* TAB: KEAMANAN */}
                  {activeTab === "keamanan" && (
                     <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="font-semibold text-gray-900 mb-5">
                           Ubah Password
                        </h2>
                        <form
                           onSubmit={handleChangePassword}
                           className="space-y-4 max-w-md"
                        >
                           {[
                              {
                                 label: "Password Saat Ini",
                                 value: currentPassword,
                                 setter: setCurrentPassword,
                              },
                              {
                                 label: "Password Baru",
                                 value: newPassword,
                                 setter: setNewPassword,
                              },
                              {
                                 label: "Konfirmasi Password Baru",
                                 value: confirmPassword,
                                 setter: setConfirmPassword,
                              },
                           ].map((field) => (
                              <div key={field.label}>
                                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    {field.label}
                                 </label>
                                 <input
                                    type="password"
                                    value={field.value}
                                    onChange={(e) =>
                                       field.setter(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                 />
                              </div>
                           ))}
                           <button
                              type="submit"
                              disabled={saving}
                              className="bg-gray-900 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
                           >
                              {saving ? "Menyimpan..." : "Update Password"}
                           </button>
                        </form>
                     </div>
                  )}

                  {/* TAB: NOTIFIKASI */}
                  {activeTab === "notifikasi" && (
                     <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="font-semibold text-gray-900 mb-5">
                           Preferensi Notifikasi
                        </h2>
                        <div className="space-y-1">
                           {[
                              {
                                 label: "Laporan scan selesai",
                                 desc: "Notifikasi saat hasil scan sudah siap",
                                 on: true,
                              },
                              {
                                 label: "Promo & penawaran",
                                 desc: "Info diskon dan paket spesial Bang Bisnis",
                                 on: false,
                              },
                              {
                                 label: "Update fitur baru",
                                 desc: "Pemberitahuan saat ada fitur baru dirilis",
                                 on: true,
                              },
                              {
                                 label: "Reminder perpanjangan",
                                 desc: "Ingatkan 7 hari sebelum paket kadaluarsa",
                                 on: true,
                              },
                           ].map((item) => (
                              <div
                                 key={item.label}
                                 className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                              >
                                 <div>
                                    <p className="text-sm font-medium text-gray-900">
                                       {item.label}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                       {item.desc}
                                    </p>
                                 </div>
                                 <div
                                    className={`w-10 h-6 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${item.on ? "bg-blue-500" : "bg-gray-200"}`}
                                 >
                                    <div
                                       className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${item.on ? "translate-x-4" : "translate-x-0"}`}
                                    ></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Danger Zone */}
                  {activeTab === "akun" && (
                     <div className="bg-white border border-red-100 rounded-xl p-6">
                        <h2 className="font-semibold text-red-600 mb-2">
                           Zona Bahaya
                        </h2>
                        <p className="text-xs text-gray-500 mb-4">
                           Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <button className="text-sm text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium">
                           Hapus Akun
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
