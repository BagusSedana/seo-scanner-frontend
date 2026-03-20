// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function Navbar() {
   const [mobileOpen, setMobileOpen] = useState(false);
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const pathname = usePathname();
   const router = useRouter();
   const { user, isAuthenticated, logout } = useAuthStore();

   const handleLogout = () => {
      logout();
      router.push("/");
   };

   const TIER_LABEL: Record<string, string> = {
      free: "Basic",
      pro: "Pro Webmaster",
      agency: "Agency",
   };

   const TIER_COLOR: Record<string, string> = {
      free: "bg-slate-50 text-slate-500 border border-slate-200/50",
      pro: "bg-blue-50 text-blue-600 border border-blue-200/50",
      agency: "bg-blue-600 text-white border border-blue-600",
   };

   return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div className="flex items-center gap-2">
                  <Link href="/" className="flex items-center gap-2 group">
                     <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                        <span className="text-white text-xs font-medium uppercase tracking-tighter">S</span>
                     </div>
                     <span className="font-medium text-slate-900 tracking-tight text-xl">
                        SEO Checkup
                     </span>
                  </Link>
               </div>

               {/* Desktop Nav */}
               <nav className="hidden md:flex items-center gap-8">
                  <Link
                     href="/"
                     className={`text-sm font-medium transition-colors ${pathname === "/" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}
                  >
                     Beranda
                  </Link>
                  <Link
                     href="/#features"
                     className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                     Fitur
                  </Link>
                  <Link
                     href="/#solutions"
                     className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                     Solusi
                  </Link>
                  <Link
                     href="/free-tools"
                     className={`text-sm font-medium transition-colors ${pathname.startsWith("/free-tools") ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}
                  >
                     Free Tools
                  </Link>
                  <Link
                     href="/blog"
                     className={`text-sm font-medium transition-colors ${pathname.startsWith("/blog") ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}
                  >
                     Blog
                  </Link>
                  <Link
                     href="/pricing"
                     className={`text-sm font-medium transition-colors ${pathname === "/pricing" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}
                  >
                     Harga
                  </Link>
               </nav>

               {/* CTA — kondisional berdasarkan auth */}
               <div className="hidden md:flex items-center gap-4">
                  {isAuthenticated && user ? (
                     <>
                        {/* Scan button */}
                        <Link
                           href="/dashboard/scan"
                           className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all font-bold shadow-sm"
                        >
                           Audit SEO
                        </Link>

                        {/* User dropdown */}
                        <div className="relative">
                           <button
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                              className="group flex items-center gap-2.5 p-1 pr-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                           >
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                                 {user.name?.charAt(0).toUpperCase() || "U"}
                              </div>
                              <span className="text-sm font-bold text-slate-700 tracking-tight pl-1">
                                 {user.name}
                              </span>
                              <svg
                                 width="12"
                                 height="12"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="3"
                                 viewBox="0 0 24 24"
                                 className={`text-slate-400 transition-transform duration-300 ml-1 ${dropdownOpen ? "rotate-180" : ""}`}
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9l-7 7-7-7"
                                 />
                              </svg>
                           </button>

                           {/* Dropdown Menu */}
                           {dropdownOpen && (
                              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                                 {/* User info header */}
                                 <div className="px-4 py-3.5 bg-slate-50/50">
                                    <div className="flex items-center gap-2.5 mb-2">
                                       <div className="w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                          {user.name?.charAt(0).toUpperCase()}
                                       </div>
                                       <div className="overflow-hidden">
                                          <p className="text-sm font-bold text-gray-900 leading-none">
                                             {user.name}
                                          </p>
                                          <p className="text-[10px] text-gray-500 truncate mt-1">
                                             {user.email}
                                          </p>
                                       </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-200/50">
                                       <span
                                          className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold ${TIER_COLOR[user.tier]}`}
                                       >
                                          {TIER_LABEL[user.tier]}
                                       </span>
                                       <span className="text-[10px] font-medium text-gray-500">
                                          {user.scans_this_month} / {user.scan_limit} <span className="text-[9px] text-gray-400 font-normal">scans</span>
                                       </span>
                                    </div>
                                 </div>

                                 <div className="py-1">
                                    <Link
                                       href="/dashboard"
                                       onClick={() => setDropdownOpen(false)}
                                       className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                    >
                                       <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                       </svg>
                                       Dashboard
                                    </Link>
                                    <Link
                                       href="/projects"
                                       onClick={() => setDropdownOpen(false)}
                                       className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                    >
                                       <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.625-1.5a1.5 1.5 0 0 0-3 0m-3.75 1.5H20.25a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75v-6.75a.75.75 0 0 1 .75-.75ZM9 3.75h6" />
                                       </svg>
                                       Proyek Saya
                                    </Link>
                                    <Link
                                       href="/dashboard/scan"
                                       onClick={() => setDropdownOpen(false)}
                                       className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                    >
                                       <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                                       </svg>
                                       Audit SEO Baru
                                    </Link>
                                    <Link
                                       href="/profile"
                                       onClick={() => setDropdownOpen(false)}
                                       className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                    >
                                       <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                       </svg>
                                       Profil & Pengaturan
                                    </Link>
                                    <Link
                                       href="/pricing"
                                       onClick={() => setDropdownOpen(false)}
                                       className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                    >
                                       <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                       </svg>
                                       Upgrade Paket
                                    </Link>
                                 </div>

                                 <div className="border-t border-gray-100 py-1">
                                    <button
                                       onClick={handleLogout}
                                       className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/50 transition-all duration-200"
                                    >
                                       <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                       </svg>
                                       Keluar
                                    </button>
                                 </div>
                              </div>
                           )}
                        </div>
                     </>
                  ) : (
                     <>
                        <Link
                           href="/login"
                           className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                        >
                           Masuk
                        </Link>
                        <Link
                           href="/register"
                           className="bg-blue-600 text-white text-sm px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all font-medium shadow-lg shadow-blue-200"
                        >
                           Daftar Gratis
                        </Link>
                     </>
                  )}
               </div>

               {/* Mobile toggle */}
               <button
                  className="md:hidden p-2 text-gray-600"
                  onClick={() => setMobileOpen(!mobileOpen)}
               >
                  <svg
                     width="20"
                     height="20"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24"
                  >
                     {mobileOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                     ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                     )}
                  </svg>
               </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
               <div className="md:hidden border-t border-gray-100 py-4 space-y-1 pb-6">
                  {isAuthenticated && user && (
                     <div className="flex items-center gap-3 px-4 py-4 mb-4 bg-slate-50/80 rounded-2xl mx-2 border border-slate-100">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-base font-medium shadow-sm ring-2 ring-white">
                           {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                           <p className="text-sm font-medium text-gray-900 leading-none">
                              {user.name}
                           </p>
                           <p className="text-xs text-gray-500 truncate mt-1 mb-2">
                              {user.email}
                           </p>
                           <div className="flex items-center gap-2">
                              <span
                                 className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-medium shadow-sm ${TIER_COLOR[user.tier]}`}
                              >
                                 {TIER_LABEL[user.tier]}
                              </span>
                              <span className="text-[10px] font-medium text-gray-500">
                                 {user.scans_this_month} / {user.scan_limit} <span className="text-[9px] text-gray-400 font-normal">scans</span>
                              </span>
                           </div>
                        </div>
                     </div>
                  )}

                  <Link
                     href="/"
                     onClick={() => setMobileOpen(false)}
                     className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                     Beranda
                  </Link>
                  <Link
                     href="/#features"
                     onClick={() => setMobileOpen(false)}
                     className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                     Fitur
                  </Link>
                  <Link
                     href="/#solutions"
                     onClick={() => setMobileOpen(false)}
                     className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                     Solusi
                  </Link>
                  <Link
                     href="/#how-it-works"
                     onClick={() => setMobileOpen(false)}
                     className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                     Cara Kerja
                  </Link>
                  <Link
                     href="/free-tools"
                     onClick={() => setMobileOpen(false)}
                     className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                     Free Tools
                  </Link>
                  <Link
                     href="/pricing"
                     onClick={() => setMobileOpen(false)}
                     className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                     Harga
                  </Link>

                  {isAuthenticated && (
                     <Link
                        href="/projects"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                     >
                        Proyek Saya
                     </Link>
                  )}


                  <div className="pt-3 border-t border-gray-100 mt-2 flex flex-col gap-2 px-1">
                     {isAuthenticated && user ? (
                        <>
                           <Link
                              href="/dashboard"
                              onClick={() => setMobileOpen(false)}
                              className="bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg text-center font-medium"
                           >
                              Dashboard
                           </Link>
                           <Link
                              href="/dashboard/scan"
                              onClick={() => setMobileOpen(false)}
                              className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded-lg text-center font-medium"
                           >
                              Audit SEO Baru
                           </Link>
                           <Link
                              href="/profile"
                              onClick={() => setMobileOpen(false)}
                              className="border border-gray-200 text-sm text-gray-600 px-4 py-2.5 rounded-lg text-center"
                           >
                              Profil & Pengaturan
                           </Link>
                           <button
                              onClick={handleLogout}
                              className="border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg text-center"
                           >
                              Keluar
                           </button>
                        </>
                     ) : (
                        <>
                           <Link
                              href="/login"
                              onClick={() => setMobileOpen(false)}
                              className="border border-gray-200 text-sm text-gray-600 px-4 py-2.5 rounded-lg text-center hover:bg-gray-50 transition-colors"
                           >
                              Masuk
                           </Link>
                           <Link
                              href="/register"
                              onClick={() => setMobileOpen(false)}
                              className="bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg text-center font-medium"
                           >
                              Daftar Gratis
                           </Link>
                        </>
                     )}
                  </div>
               </div>
            )}
         </div>
      </header>
   );
}
