// src/components/UseCasePage.tsx
import Link from "next/link";

interface Props {
   emoji: string;
   title: string;
   subtitle: string;
   description: string;
   problems: string[];
   solutions: { icon: string; title: string; desc: string }[];
   results: { metric: string; label: string }[];
   testimonial: { text: string; name: string; company: string };
}

export function UseCasePage({
   emoji,
   title,
   subtitle,
   description,
   problems,
   solutions,
   results,
   testimonial,
}: Props) {
   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
            {/* Hero */}
            <div className="text-center mb-16">
               <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
               >
                  ← Beranda
               </Link>
               <div className="mt-6 text-6xl mb-6">{emoji}</div>
               <div className="inline-block bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full mb-6 shadow-sm">
                  CASE STUDY: {title}
               </div>
               <h1 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                  Solusi SEO untuk <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">{title}</span>
               </h1>
               <p className="text-xl text-blue-600 font-bold mb-6 tracking-tight">
                  {subtitle}
               </p>
               <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
                  {description}
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <Link
                     href="/register"
                     className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                  >
                     Mulai Audit Gratis
                  </Link>
                  <Link
                     href="/pricing"
                     className="border border-slate-200 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all active:scale-95"
                  >
                     Lihat Paket →
                  </Link>
               </div>
            </div>

            {/* Problems */}
            <div className="mb-20">
               <h2 className="text-3xl font-black text-slate-900 text-center mb-10 tracking-tight">
                  Hambatan Pertumbuhan Organic
               </h2>
               <div className="grid sm:grid-cols-2 gap-3">
                  {problems.map((p) => (
                     <div
                        key={p}
                        className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4"
                     >
                        <span className="text-red-500 font-bold text-sm flex-shrink-0">
                           ✕
                        </span>
                        <span className="text-sm text-red-700">{p}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Solutions */}
            <div className="mb-20">
               <h2 className="text-3xl font-black text-slate-900 text-center mb-10 tracking-tight">
                  Strategi Dominasi dengan SEOscanner
               </h2>
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {solutions.map((s) => (
                     <div
                        key={s.title}
                        className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                     >
                        <span className="text-4xl block mb-6 transform group-hover:scale-110 transition-transform">{s.icon}</span>
                        <h3 className="font-black text-slate-900 mb-3 text-lg tracking-tight">
                           {s.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                           {s.desc}
                        </p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Results */}
            <div className="bg-slate-900 rounded-[4rem] p-12 sm:p-16 mb-20 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
               <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-12 tracking-tight">
                  Impact Nyata untuk Bisnis Anda
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                  {results.map((r) => (
                     <div key={r.label} className="relative z-10">
                        <p className="text-5xl font-black text-blue-400 mb-3 tracking-tighter">
                           {r.metric}
                        </p>
                        <p className="text-sm text-slate-400 font-bold max-w-[150px] mx-auto leading-snug">{r.label}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
               <p className="text-4xl mb-4">❝</p>
               <p className="text-gray-700 italic mb-4 leading-relaxed">
                  &quot;{testimonial.text}&quot;
               </p>
               <p className="font-semibold text-gray-900">{testimonial.name}</p>
               <p className="text-sm text-gray-400">{testimonial.company}</p>
            </div>
         </div>
      </div>
   );
}
