"use client";

import { motion } from "framer-motion";

const ITEMS = [
   { title: "Losing deals to AI", desc: "Prospects ask ChatGPT for recommendations. Your competitors get cited. You don't.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
   { title: "Unknown prompts", desc: "Competitors dominate specific AI prompts in your category. You don't know which.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
   { title: "Not mentioned by LLMs", desc: "ChatGPT, Claude, Gemini, none cite your brand. Competitors appear instead.", icon: "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" },
   { title: "Not optimized for AI", desc: "LLMs need structured data and trust signals, not keywords. Different game.", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }
];

export default function AIVisibility() {
   return (
      <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               <div className="flex-1 order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-10 h-px bg-orange-500"></div>
                     <span className="text-orange-500 font-black uppercase tracking-[0.2em] text-[10px]">The Problem You Don't Know You Have</span>
                  </div>
                  <h2 className="text-4xl lg:text-7xl font-medium leading-[1.05] tracking-tight mb-8">
                     Search is shifting to AI. <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">And you're invisible.</span>
                  </h2>
                  <p className="text-xl text-slate-400 leading-relaxed mb-16 max-w-xl font-medium">
                     40% of searches now happen in AI engines. Your competitors appear in ChatGPT, Gemini, Perplexity and other LLM generated answers. You are not.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                     {ITEMS.map((item, i) => (
                        <div key={i} className="flex gap-6">
                           <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 shadow-lg shadow-orange-500/5">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                              </svg>
                           </div>
                           <div>
                              <h4 className="font-bold text-lg mb-3 tracking-tight">{item.title}</h4>
                              <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  <button className="px-10 py-5 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/40 active:scale-95">Check your AI Visibility</button>
               </div>
               
               <div className="flex-1 order-1 lg:order-2 relative">
                  <div className="bg-white rounded-3xl p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] text-slate-900 transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                     <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs font-bold ring-4 ring-slate-100 italic font-serif">AI</div>
                        <span className="font-bold text-slate-800 tracking-tight">What are the Best SEO Tools for SaaS?</span>
                     </div>
                     <div className="space-y-6">
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Here's a comparison of top SEO tools based on your requirements:</p>
                        <div className="overflow-hidden border border-slate-100 rounded-2xl shadow-sm">
                           <table className="w-full text-xs text-left">
                              <thead className="bg-slate-50">
                                 <tr>
                                    <th className="p-4 font-black uppercase tracking-widest text-[10px] text-slate-400">Tool</th>
                                    <th className="p-4 font-black uppercase tracking-widest text-[10px] text-slate-400">Ideal for</th>
                                    <th className="p-4 font-black uppercase tracking-widest text-[10px] text-slate-400">Key Strength</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                 <tr className="bg-orange-50/40">
                                    <td className="p-4 font-black text-orange-600 tracking-tight">Competitor #1</td>
                                    <td className="p-4 font-medium">Agencies</td>
                                    <td className="p-4 font-medium">Backlinks</td>
                                 </tr>
                                 <tr>
                                    <td className="p-4 font-black text-blue-600 tracking-tight">Competitor #2</td>
                                    <td className="p-4 font-medium">Startups</td>
                                    <td className="p-4 font-medium">Site Speed</td>
                                 </tr>
                                 <tr>
                                    <td className="p-4 font-black text-purple-600 tracking-tight">Competitor #3</td>
                                    <td className="p-4 font-medium">SMBs</td>
                                    <td className="p-4 font-medium">Local SEO</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                        <div className="flex items-center gap-3 mt-6 text-[11px] text-slate-400 font-bold bg-slate-50 p-4 rounded-xl border border-slate-100">
                           <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center">💬</div>
                           <span>What about AI citation tracking tools?</span>
                           <div className="ml-auto w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-lg shadow-slate-950/20">↑</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
