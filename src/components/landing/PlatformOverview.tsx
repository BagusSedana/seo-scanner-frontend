"use client";

import { motion } from "framer-motion";

const STATS = [
   { label: "Clients Worldwide", value: "+85,000" },
   { label: "Years of SEO Excellence", value: "+12" },
   { label: "Unique URLs Checked", value: "+30M" },
   { label: "AI Engines Tracked", value: "6 AI" },
   { label: "Technical SEO Factors", value: "+70" },
   { label: "Countries Served", value: "+120" }
];

const PERSONAS = [
   { 
      title: "For SaaS Marketers", 
      desc: "Monitor product pages, track AI citations, prove marketing ROI fast.", 
      icon_path: "M13 10V3L4 14h7v7l9-11h-7z" 
   },
   { 
      title: "For Content-Led Companies", 
      desc: "Large-site audits. AI citation tracking. Content performance intel.", 
      icon_path: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
   },
   { 
      title: "For Growth Agencies", 
      desc: "Multi-client command center. White-label reports. AI + traditional SEO.", 
      icon_path: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
   },
   { 
      title: "For E-commerce Brands", 
      desc: "Monitor product pages, schemas, feeds. Rank in Google and ChatGPT.", 
      icon_path: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
   }
];

export default function PlatformOverview() {
   return (
      <section className="py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="w-8 h-px bg-orange-500"></div>
                     <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Smarter Insights. Better Rankings. Zero Guesswork</span>
                  </div>
                  <h2 className="text-4xl lg:text-7xl font-medium text-slate-900 leading-[1.05] tracking-tight mb-8">
                     SEO Site Checkup helps you rank higher on Google and AI Engines.
                  </h2>
                  <p className="text-xl text-slate-500 leading-relaxed mb-12 max-w-2xl">
                     Automated monitoring catches issues within 24 hours. AI visibility tracking shows exactly how you appear in ChatGPT, Gemini and other LLMs. Multi-site dashboard manages all your clients domains easily.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 border-t border-slate-100 pt-12">
                     {STATS.map((stat, i) => (
                        <div key={i} className="border-l-2 border-orange-500 pl-4">
                           <p className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">{stat.value}</p>
                           <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.1em]">{stat.label}</p>
                        </div>
                     ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                     <button className="px-10 py-5 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 active:scale-95">Start for Free</button>
                     <button className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95">See Pricing</button>
                  </div>
               </div>
               
               <div className="lg:w-1/3 bg-slate-50 rounded-3xl p-10 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black uppercase tracking-[0.15em] text-slate-400 mb-10">Target Persona</h3>
                  <div className="space-y-10">
                     {PERSONAS.map((persona, i) => (
                        <div key={i} className="group cursor-pointer">
                           <div className="flex gap-5 mb-3">
                              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform text-orange-500">
                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={persona.icon_path} />
                                 </svg>
                              </div>
                              <h4 className="font-bold text-slate-900 group-hover:text-orange-500 transition-colors pt-2">{persona.title}</h4>
                           </div>
                           <p className="text-sm text-slate-500 ml-16 mb-4 leading-relaxed font-medium">{persona.desc}</p>
                           <div className="ml-16 flex items-center gap-1 text-orange-500 font-black text-[10px] uppercase tracking-widest group-hover:gap-2 transition-all">
                              About {persona.title.split(' ').slice(1).join(' ')} <span>-&gt;</span>
                           </div>
                           {i < 3 && <div className="mt-10 border-b border-slate-200 opacity-30"></div>}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
