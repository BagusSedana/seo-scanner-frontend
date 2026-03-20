import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
   title: "Fitur Unggulan Agensi | SEO Checkup",
   description: "Pelajari lebih lanjut mengenai fitur unggulan SEO Checkup untuk Agensi Anda.",
};

export default function FiturAgensiPage() {
   return (
      <div className="min-h-screen bg-white">
         <main>
            {/* Header Section */}
            <section className="bg-blue-600 py-24 sm:py-32 text-center relative overflow-hidden text-white">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
               <div className="max-w-4xl mx-auto px-4 relative z-10">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                     Fitur Unggulan <span className="text-blue-200">Agensi</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-medium">
                     Tingkatkan skala layanan SEO Anda dengan data yang komprehensif, eksekusi cepat, dan laporan profesional yang dirancang khusus untuk memenuhi ekspektasi klien level enterprise.
                  </p>
               </div>
            </section>

            {/* Content Section */}
            <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="space-y-16">
                  {/* Feature 1 */}
                  <div className="bg-slate-50 border border-slate-100 p-8 sm:p-10 rounded-[2rem] hover:shadow-xl hover:border-blue-200 transition-all">
                     <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                     </div>
                     <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Audit SEO Menyeluruh (50+ Metrik On-Page)</h2>
                     <p className="text-slate-600 leading-relaxed font-medium mb-6">
                        Bukan sekadar pengecekan standar. Scanner pintar kami menelusuri setiap sudut elemen on-page di balik layar website klien Anda. Kami menganalisis lebih dari 50 metrik SEO krusial, mulai dari tag judul, kepadatan kata kunci, struktur heading, rasio text-to-HTML, hingga elemen langka yang sering dilewatkan kompetitor. 
                        Hal ini memudahkan tim internal Anda maupun spesialis SEO dalam merekomendasikan perbandingan sebelum dan sesudah optimasi secara presisi dengan data yang tidak terbantahkan.
                     </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="bg-slate-50 border border-slate-100 p-8 sm:p-10 rounded-[2rem] hover:shadow-xl hover:border-teal-200 transition-all">
                     <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                     </div>
                     <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Extractor Tag H1 & Meta (Analisis Kompetitor)</h2>
                     <p className="text-slate-600 leading-relaxed font-medium mb-6">
                        Menulis konten yang ramah mesin pencari membutuhkan riset mendalam. Dengan Extractor Tag, tim Anda dapat mencuri pandang ke dalam kerangka struktur artikel milik kompetitor top di halaman satu Google.
                        Dengan satu klik, platform kami mengekstrak hierarki H1 hingga H6, meta deskripsi, serta open graph tags yang digunakan oleh lawan Anda. Jadikan data ini pondasi menyusun Content Brief yang jauh lebih berbobot untuk klien Anda tanpa harus membuka source-code web mereka secara manual!
                     </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="bg-slate-50 border border-slate-100 p-8 sm:p-10 rounded-[2rem] hover:shadow-xl hover:border-orange-200 transition-all">
                     <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                     </div>
                     <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Sitemap XML Validator Akurat</h2>
                     <p className="text-slate-600 leading-relaxed font-medium mb-6">
                        Masalah indexing sering kali bermuara pada file sitemap yang rusak atau tidak terbaca dengan baik. Modul validator kami tidak hanya mencari keberadaan file sitemap.xml, tetapi membedahnya.
                        Kami memvalidasi format, mengecek tautan rusak di dalamnya, dan memastikan tidak ada URL sampah atau ter-redirect yang menghalangi Googlebot merekam halaman penting bisnis klien ke dalam database Google secara mulus.
                     </p>
                  </div>

                  {/* Feature 4 */}
                  <div className="bg-slate-50 border border-slate-100 p-8 sm:p-10 rounded-[2rem] hover:shadow-xl hover:border-purple-200 transition-all">
                     <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                     </div>
                     <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Export PDF Laporan Klien (White Label)</h2>
                     <p className="text-slate-600 leading-relaxed font-medium mb-6">
                        Membangun kepercayaan klien dimulai dari presentasi visual data. Bang Bisnis menyediakan fitur Export PDF instan yang menyajikan audit rumit menjadi dokumen eksekutif dengan desain premium.
                        Dan yang terpenting: fitur White-label memperbolehkan agensi Anda untuk mencetak logo, nama, dan warna brand Anda di setiap halaman laporan tersebut sebelum dikirimkan. Audiens Anda tidak akan pernah tahu Anda menggunakan tools kami.
                     </p>
                  </div>
               </div>
               
               <div className="mt-20 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Siap Menggunakan Semua Fitur Agensi?</h3>
                  <Link href="/pricing" className="inline-flex px-10 py-5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:scale-105">
                     Pilih Paket Tingkat Lanjut Sekarang
                  </Link>
               </div>
            </section>
         </main>
         <Footer />
      </div>
   );
}
