// src/app/pricing/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import Script from "next/script";
import { useAuthStore } from "@/store/auth";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

declare global {
   interface Window {
      snap?: {
         pay: (token: string, options: Record<string, unknown>) => void;
      };
   }
}

const PLANS = [
   {
      name: "Basic",
      id: "free",
      price: { monthly: 0, yearly: 0 },
      desc: "Bagi Anda yang hanya butuh tes cepat satu kali sesekali buat cek keadaan.",
      badge: null,
      cta: "Daftar Akun Gratis",
      ctaHref: "/register?plan=free",
      highlight: false,
      features: [
         { text: "Batasan 10 Scan Bulanan", included: true },
         { text: "Analitik Website Terbuka Semua", included: true },
         { text: "Agensi Logo (White Label)", included: false },
         { text: "Export PDF Custom", included: false },
      ],
   },
   {
      name: "Pro Webmaster",
      id: "pro",
      price: { monthly: 89000, yearly: 890000 },
      desc: "Buka berbagai limitasi untuk mengaudit web Anda setiap minggu.",
      badge: "Paling Populer",
      cta: "Upgrade Sekarang",
      ctaHref: "/register?plan=pro",
      highlight: true,
      features: [
         { text: "Batasan 100 Scan Bulanan", included: true, subtext: "Frekuensi wajar" },
         { text: "Akses Ekstensi Fitur Lengkap", included: true },
         { text: "Dapat Eksport Laporan PDF", included: true },
         { text: "Prioritas Engine Scanner", included: true },
         { text: "Agensi Logo", included: false },
      ],
   },
   {
      name: "Agency",
      id: "agency",
      price: { monthly: 229000, yearly: 2290000 },
      desc: "Layanan premium melayani klien agency, branding laporan, dan prioritas sistem.",
      badge: null,
      cta: "Pilih Agency",
      ctaHref: "/register?plan=agency",
      highlight: false,
      features: [
         { text: "Hingga 1,000 Scan per Bulan", included: true },
         { text: "Semua fitur Pro Webmaster", included: true },
         { text: "PDF Report Tanpa Watermark", included: true },
         { text: "Prioritas Jalur Layanan Cepat", included: true },
         { text: "Akses API Khusus", included: true },
      ],
   },
];

const REVIEWS = [
   {
      name: "Marcus Thorne",
      role: "SEO Director at GrowthX",
      content: "This scanner is a beast. The AI visibility tracking alone is worth 10x the price. It's the only tool that actually shows us where we stand in LLM answers.",
      avatar: "MT",
      rating: 5
   },
   {
      name: "Sarah Jenkins",
      role: "SaaS Founder",
      content: "We saw a 40% uptick in organic traffic in just 60 days. The PDF reports are beautiful enough to send directly to our board. Incredible ROI.",
      avatar: "SJ",
      rating: 5
   },
   {
      name: "David Chen",
      role: "Agency Principal",
      content: "The white-labeling is seamless. Our clients think we built this internal tool themselves. It has completely transformed our reporting overhead.",
      avatar: "DC",
      rating: 5
   },
   {
      name: "Elena Rodriguez",
      role: "Head of Growth",
      content: "Site speed monitoring saved us from a major outage during our last launch. The granularity of the data is superior to tools 3x the cost.",
      avatar: "ER",
      rating: 5
   },
   {
      name: "James Wilson",
      role: "E-commerce Owner",
      content: "Finally, a tool that understands modern search. It caught schema issues that other scanners missed for years. A complete game changer.",
      avatar: "JW",
      rating: 5
   },
   {
      name: "Aisha Khan",
      role: "Content Strategist",
      content: "The AI SEO insights are scary accurate. It told me exactly which keywords were being cited by Claude and how to win them back.",
      avatar: "AK",
      rating: 5
   }
];

const FAQS = [
   {
      q: "How does the AI Visibility factor work?",
      a: "Our engine simulation prompts multiple LLMs (ChatGPT, Gemini, Perplexity, etc.) to identify if your brand is being cited for specific high-value queries in your industry.",
   },
   {
      q: "Can I upgrade or downgrade anytime?",
      a: "Yes. You can change your plan at any time. Pricing will be prorated automatically based on your billing cycle.",
   },
   {
      q: "Is there a free trial for Pro features?",
      a: "We offer a 'Scan First' experience. For deep deep analysis and AI tracking, you can start with any of our paid plans risk-free for 7 days.",
   },
   {
      q: "Do you offer custom API endpoints?",
      a: "Our Professional plan includes standard API access. For enterprise-level high-volume scanning, please contact our sales team.",
   },
   {
      q: "What payment methods do you accept?",
      a: "We support all major credit cards, PayPal, and regional e-wallets through our secure payment partners.",
   },
];

export default function PricingPage() {
   const [yearly, setYearly] = useState(false);
   const [openFaq, setOpenFaq] = useState<number | null>(null);
   const { user, isAuthenticated } = useAuthStore();
   const [loading, setLoading] = useState<string | null>(null);
   const router = useRouter();

   const handleUpgrade = async (planId: string) => {
      if (planId === "free") return;

      if (!isAuthenticated) {
         router.push(`/register?plan=${planId}`);
         return;
      }

      setLoading(planId);
      try {
         const res = await API.post("/payment/create", {
            plan_tier: planId,
            billing_cycle: yearly ? "yearly" : "monthly",
         });

         const { snap_token } = res.data;

         if (window.snap) {
            window.snap.pay(snap_token, {
               onSuccess: () => router.push("/dashboard?payment=success"),
               onPending: () => router.push("/dashboard?payment=pending"),
               onError: () => alert("Pembayaran gagal, silakan coba lagi."),
            });
         }
      } catch (err: any) {
         alert(err.response?.data?.detail || "Gagal membuat transaksi");
      } finally {
         setLoading(null);
      }
   };

   return (
      <div className="min-h-screen bg-[#FDFDFD] font-sans antialiased">
         <Script
            src={process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
               ? "https://app.midtrans.com/snap/snap.js"
               : "https://app.sandbox.midtrans.com/snap/snap.js"}
            data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
            strategy="lazyOnload"
         />

         {/* Hero Header */}
         <section className="relative pt-24 pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8"
               >
                  <span className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black border border-blue-100 uppercase tracking-[0.2em] shadow-sm">
                     Smart Investment for the AI Era
                  </span>
               </motion.div>
               <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.95]"
               >
                  Automate SEO, <br />
                  <span className="text-blue-600">Maximize ROI.</span>
               </motion.h1>
               <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-2xl mx-auto text-xl text-slate-500 font-medium mb-16 leading-relaxed"
               >
                  Choose a plan built specifically for modern search. Target humans on Google and AI models in ChatGPT.
               </motion.p>

               {/* Toggle Pricing */}
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-6 mb-16"
               >                   
                   <span className={`text-xs font-black uppercase tracking-widest transition-colors ${!yearly ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
                  <button 
                     onClick={() => setYearly(!yearly)}
                     className="w-20 h-11 bg-slate-100 rounded-full p-2 transition-all relative hover:bg-slate-200 border border-slate-200"
                  >
                     <motion.div 
                        animate={{ x: yearly ? 36 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-7 h-7 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30"
                     />
                  </button>
                  <span className={`text-xs font-black uppercase tracking-widest transition-colors ${yearly ? 'text-slate-900' : 'text-slate-400'}`}>Yearly</span>
                  <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl shadow-blue-600/20">Save 20%</span>
               </motion.div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/40 to-transparent -z-10 pointer-events-none"></div>
         </section>

         {/* Pricing Grid */}
         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
               {PLANS.map((plan) => (
                   <div 
                     key={plan.name}
                     className={`rounded-[2rem] p-10 md:p-12 relative flex flex-col h-full border text-left bg-white transition-all
                        ${plan.highlight ? 'border-blue-600 ring-2 ring-blue-600 scale-100 sm:scale-105 z-10 shadow-2xl shadow-blue-900/10' : 'border-slate-200 hover:border-blue-200 hover:shadow-xl'}`}
                  >
                     {plan.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-bold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                           Paling Diminati
                        </div>
                     )}

                     <h3 className={`text-xl font-bold mb-2 text-slate-900`}>
                        {plan.name}
                     </h3>
                     
                     <p className={`text-sm mb-6 font-medium leading-relaxed text-slate-500`}>
                        {plan.desc}
                     </p>

                     <div className={`text-xs font-bold mb-1 text-slate-500`}>
                        Mulai dari
                     </div>

                     <div className={`flex items-baseline justify-start gap-1 mb-8 border-b pb-8 border-slate-100 text-slate-900`}>
                        <span className={`text-sm font-bold`}>{plan.price.monthly === 0 ? '' : 'Rp'}</span>
                        <span className={`${plan.price.monthly === 0 ? 'text-6xl font-black' : 'text-5xl font-black'} tracking-tight`} style={{ letterSpacing: "-0.05em" }}>
                           {plan.price.monthly === 0 ? 'Free' : `${(yearly ? plan.price.yearly : plan.price.monthly).toLocaleString('id-ID')}`}
                        </span>
                        {plan.price.monthly > 0 && (
                           <span className={`text-xs font-bold text-slate-400`}>/{yearly ? 'thn' : 'bln'}</span>
                        )}
                     </div>
                     
                     <div className="flex-1">
                        <ul className="space-y-4 mb-10">
                           {plan.features.map((feat, i) => (
                              <li key={i} className={`flex items-start gap-3 text-sm font-medium ${feat.included ? 'text-slate-600' : 'text-slate-400 italic'}`}>
                                 <svg className={`w-5 h-5 flex-shrink-0 ${feat.included ? 'text-blue-500' : 'opacity-40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {feat.included ? (
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    ) : (
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    )}
                                 </svg>
                                 <div>
                                    <del className={!feat.included ? "block" : "hidden"}>{feat.text}</del>
                                    <span className={feat.included ? "block" : "hidden"}>{feat.text}</span>
                                    {'subtext' in feat && feat.subtext && <span className="block text-xs mt-0.5 opacity-60 font-normal">{feat.subtext}</span>}
                                 </div>
                              </li>
                           ))}
                        </ul>
                     </div>
                     
                     <button 
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={loading !== null}
                        className={`w-full py-3.5 rounded-full font-bold text-sm transition-all text-center
                           ${plan.highlight 
                              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20' 
                              : 'bg-transparent text-blue-600 border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50'} 
                           disabled:opacity-50`}
                     >
                        {loading === plan.id ? 'Memproses...' : `Pilih Paket ${plan.name}`}
                     </button>
                  </div>
               ))}
            </div>
         </section>

         {/* Add On Banner */}
         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
            <div className="text-center mb-12">
               <h3 className="text-3xl font-bold text-slate-900 mb-4">Layanan Tambahan (Add-ons)</h3>
               <p className="text-slate-500 font-medium text-lg">Optimalkan website Anda dengan layanan tambahan yang dapat disesuaikan dengan kebutuhan spesifik bisnis.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
               {[
                  { title: "Top-Up Kuota Scan", desc: "Beli 5 kuota tambahan (Top-Up) kapan saja tanpa berlangganan.", price: "Rp25.000 / 5 Scan", id: "addon-5" },
                  { title: "White-Label Report", desc: "Logo agensi kustom di PDF hasil export untuk ditunjukkan ke klien.", price: "Rp150.000 / Bln", id: "addon-wl" },
                  { title: "API Akses Data", desc: "Koneksi token REST API untuk menarik metrik hasil scan via web Anda.", price: "Hubungi Kami", id: "addon-api" },
                  { title: "Konsultasi Priority", desc: "Dukungan jalur khusus melalui WhatsApp untuk bahas audit eksklusif.", price: "Mulai Rp500.000", id: "addon-support" }
               ].map((addon, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-[1.25rem] p-8 flex flex-col relative group hover:border-blue-400 hover:shadow-lg transition-all text-left">
                     <h4 className="font-bold text-slate-900 mb-3 text-lg leading-tight">{addon.title}</h4>
                     <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1 font-medium">{addon.desc}</p>
                     
                     <div className="mt-auto pt-5 border-t border-slate-100">
                        {addon.id === 'addon-api' || addon.id === 'addon-support' ? (
                           <Link href="/contact" className="w-full block text-center py-3 bg-slate-50 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
                              {addon.price}
                           </Link>
                        ) : (
                           <button onClick={() => handleUpgrade(addon.id)} disabled={loading !== null} className="w-full text-center py-3 bg-blue-50 text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-100 transition-colors border border-blue-100 disabled:opacity-50">
                              {loading === addon.id ? 'Memproses...' : `Beli Sekarang (${addon.price.split(' / ')[0]})`}
                           </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Trust Signals (Reviews) */}
         <section className="bg-slate-50 py-32 overflow-hidden border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
               <p className="text-sm text-blue-600 font-black uppercase tracking-[0.2em] mb-4">Trusted by Experts</p>
               <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">Join 10,000+ Brands <br />Scaling with SEO Checkup</h2>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
               {REVIEWS.map((rev, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.9, y: 30 }}
                     whileInView={{ opacity: 1, scale: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.7, delay: i * 0.1 }}
                     whileHover={{ y: -8 }}
                     className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.04)]"
                  >
                     <div className="flex gap-1 mb-8 text-amber-400">
                        {[...Array(5)].map((_, j) => (
                           <svg key={j} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07(3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                     </div>
                     <p className="text-lg font-medium text-slate-900 leading-relaxed italic mb-10">&quot;{rev.content}&quot;</p>
                     <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-200">
                           {rev.avatar}
                        </div>
                        <div className="text-left">
                           <p className="font-medium text-slate-900 text-lg tracking-tight">{rev.name}</p>
                           <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{rev.role}</p>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </section>

         {/* FAQ */}
         <section className="py-32 max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-black text-center mb-16 tracking-tight">Sering Ditanyakan</h2>
            <div className="grid gap-6">
               {FAQS.map((faq, i) => (
                  <div key={i} className="group border border-slate-100 rounded-3xl bg-white overflow-hidden shadow-sm hover:border-blue-100 hover:shadow-xl transition-all duration-300">
                     <button 
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 transition-colors"
                     >
                        <span className="font-medium text-slate-900 text-lg tracking-tight">{faq.q}</span>
                        <svg className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180 transform-gpu' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                     </button>
                     <AnimatePresence>
                        {openFaq === i && (
                           <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                           >
                              <div className="px-8 pb-8 text-slate-500 font-medium text-base leading-relaxed border-t border-slate-50 pt-6">
                                 {faq.a}
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               ))}
            </div>
         </section>

          <section className="max-w-7xl mx-auto px-4 pb-32">
            <div className="bg-blue-600 rounded-3xl p-16 sm:p-28 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(37,99,235,0.4)]">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-50"></div>
               <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
               <h2 className="text-4xl sm:text-7xl font-black mb-8 relative z-10 tracking-tight leading-[1.05]">Ready to dominate <br />search?</h2>
               <p className="text-blue-100 text-xl font-medium mb-14 max-w-2xl mx-auto relative z-10 opacity-90">Stop guessing. Start growing. Run your first audit and get your roadmap in seconds.</p>
               <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                  <Link href="/register" className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl active:scale-95">Get Started Risk-Free</Link>
                  <a href="https://wa.me/6287701785344" className="bg-blue-700/50 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-2xl font-bold text-lg hover:bg-blue-700/70 transition-all active:scale-95">Book a Strategy Call</a>
               </div>
            </div>
          </section>
      </div>
   );
}
