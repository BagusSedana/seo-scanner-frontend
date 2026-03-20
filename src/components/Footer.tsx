// src/components/Footer.tsx
"use client";

import Link from "next/link";

const FOOTER_DATA = [
   {
      title: "PERUSAHAAN",
      links: [
         { label: "Tentang Kami", href: "/about" },
         { label: "Karir", href: "/careers" },
         { label: "Blog", href: "/blog" },
         { label: "Harga", href: "/pricing" },
         { label: "Kontak", href: "/contact" },
         { label: "Login", href: "/login" },
      ],
   },
   {
      title: "INDUSTRI",
      links: [
         { label: "E-commerce", href: "#" },
         { label: "Agensi Digital", href: "#" },
         { label: "Bisnis Lokal", href: "#" },
         { label: "Teknologi & SaaS", href: "#" },
         { label: "Layanan Kesehatan", href: "#" },
         { label: "Properti", href: "#" },
         { label: "Pendidikan", href: "#" },
         { label: "Manufaktur", href: "#" },
      ],
   },
   {
      title: "FITUR SEO",
      links: [
         { label: "Audit Teknikal", href: "#" },
         { label: "Analisis PageSpeed", href: "#" },
         { label: "Kualitas Konten", href: "#" },
         { label: "Local SEO Audit", href: "#" },
         { label: "Pemantauan Ranking", href: "#" },
         { label: "Analisis Backlink", href: "#" },
      ],
   },
   {
      title: "DUKUNGAN",
      links: [
         { label: "Pusat Bantuan", href: "#" },
         { label: "Portal Support", href: "#" },
         { label: "Status Sistem", href: "#" },
         { label: "Keamanan Data", href: "#" },
      ],
   },
   {
      title: "PRIVASI",
      links: [
         { label: "Kebijakan Privasi", href: "#" },
         { label: "Syarat & Ketentuan", href: "#" },
         { label: "Pengaturan Cookie", href: "#" },
      ],
   },
];

export default function Footer() {
   return (
      <footer className="bg-[#0f172a] text-white pt-24 pb-12 border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-6 mb-20">
               <div className="col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-xl">S</div>
                     <span className="font-bold text-xl tracking-tight text-white">SEO Checkup</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-sm">
                     Platform audit SEO tercanggih di Indonesia. Membantu UMKM dan Agensi Digital tumbuh lebih cepat dengan data analitik yang akurat.
                  </p>
                  <div className="flex items-center gap-4 text-slate-400">
                     {["facebook", "instagram", "twitter", "linkedin"].map((icon) => (
                        <Link key={icon} href="#" className="hover:text-blue-500 transition-colors">
                           <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                              <span className="capitalize text-[10px] font-bold">{icon[0]}</span>
                           </div>
                        </Link>
                     ))}
                  </div>
               </div>

               {FOOTER_DATA.map((col) => (
                  <div key={col.title}>
                     <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
                        {col.title}
                     </h4>
                     <ul className="space-y-4">
                        {col.links.map((link) => (
                           <li key={link.label}>
                              <Link 
                                 href={link.href} 
                                 className="text-sm text-slate-400 hover:text-blue-400 transition-colors font-medium"
                              >
                                 {link.label}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
               
            </div>

            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
               <p className="text-sm text-slate-500 font-medium">
                  © {new Date().getFullYear()} SEO Checkup. Hak Cipta Dilindungi.
               </p>
               <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
                  <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
               </div>
            </div>
         </div>
      </footer>
   );
}
