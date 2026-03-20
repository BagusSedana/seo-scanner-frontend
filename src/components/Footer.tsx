// src/components/Footer.tsx
"use client";

import Link from "next/link";

const FOOTER_DATA = [
   {
      title: "PERUSAHAAN",
      links: [
         { label: "Tentang Kami", href: "/tentang-kami" },
         { label: "Karir", href: "/karir" },
         { label: "Blog", href: "/blog" },
         { label: "Harga", href: "/pricing" },
         { label: "Kontak", href: "/kontak" },
         { label: "Login", href: "/login" },
      ],
   },
   {
      title: "INDUSTRI",
      links: [
         { label: "E-commerce", href: "/industri/ecommerce" },
         { label: "Agensi Digital", href: "/industri/agensi" },
         { label: "Bisnis Lokal", href: "/industri/bisnis-lokal" },
         { label: "Teknologi & SaaS", href: "/industri/saas" },
         { label: "Layanan Kesehatan", href: "/industri/healthcare" },
         { label: "Properti", href: "/industri/properti" },
         { label: "Pendidikan", href: "/industri/pendidikan" },
         { label: "Manufaktur", href: "/industri/manufaktur" },
      ],
   },
   {
      title: "FITUR SEO",
      links: [
         { label: "Audit Teknikal", href: "/fitur/audit-teknikal" },
         { label: "Analisis PageSpeed", href: "/fitur/pagespeed" },
         { label: "Kualitas Konten", href: "/fitur/kualitas-konten" },
         { label: "Local SEO Audit", href: "/fitur/local-seo" },
         { label: "Pemantauan Ranking", href: "/fitur/ranking-monitor" },
         { label: "Analisis Backlink", href: "/fitur/backlink" },
      ],
   },
   {
      title: "DUKUNGAN",
      links: [
         { label: "Pusat Bantuan", href: "/bantuan" },
         { label: "Portal Support", href: "/support" },
         { label: "Status Sistem", href: "/status-sistem" },
         { label: "Keamanan Data", href: "/keamanan" },
      ],
   },
   {
      title: "PRIVASI",
      links: [
         { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
         { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
         { label: "Pengaturan Cookie", href: "/cookies" },
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
