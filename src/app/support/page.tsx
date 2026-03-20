// src/app/support/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function SupportPage() {
   const [form, setForm] = useState({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
   });
   const [submitted, setSubmitted] = useState(false);
   const [ticketId, setTicketId] = useState("");

   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      setTicketId(String(Math.floor(Math.random() * 90000) + 10000));
      setLoading(false);
      setSubmitted(true);
   };

   return (
      <div className="min-h-screen bg-gray-50">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-10">
               <Link
                  href="/bantuan"
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
               >
                  ← Pusat Bantuan
               </Link>
               <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
                  Hubungi Support
               </h1>
               <p className="text-gray-500 text-sm">
                  Tim kami akan merespons dalam 1×24 jam kerja.
               </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
               {/* Contact Options */}
               <div className="space-y-4">
                  {[
                     {
                        icon: "💬",
                        label: "Live Chat",
                        desc: "Respons dalam 5 menit",
                        info: "Senin–Jumat, 09.00–18.00 WIB",
                        action: "Mulai Chat",
                        color: "bg-green-50 border-green-200",
                     },
                     {
                        icon: "📧",
                        label: "Email",
                        desc: "Respons 1×24 jam",
                        info: "support@SEOscanner",
                        action: null,
                        color: "bg-blue-50 border-blue-200",
                     },
                     {
                        icon: "📱",
                        label: "WhatsApp",
                        desc: "Chat langsung",
                        info: "+62 812-3456-7890",
                        action: "Chat WA",
                        color: "bg-green-50 border-green-200",
                     },
                  ].map((ch) => (
                     <div
                        key={ch.label}
                        className={`border rounded-2xl p-5 ${ch.color}`}
                     >
                        <div className="flex items-start gap-3">
                           <span className="text-2xl">{ch.icon}</span>
                           <div>
                              <p className="font-semibold text-gray-900 text-sm">
                                 {ch.label}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                 {ch.desc}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                 {ch.info}
                              </p>
                           </div>
                        </div>
                     </div>
                  ))}

                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                     <p className="text-sm font-semibold text-gray-900 mb-3">
                        Jam Operasional
                     </p>
                     {[
                        { day: "Senin – Jumat", time: "09.00 – 18.00 WIB" },
                        { day: "Sabtu", time: "10.00 – 14.00 WIB" },
                        { day: "Minggu & Libur", time: "Tutup" },
                     ].map((h) => (
                        <div
                           key={h.day}
                           className="flex justify-between text-xs py-1.5 border-b border-gray-50 last:border-0"
                        >
                           <span className="text-gray-500">{h.day}</span>
                           <span className="text-gray-700 font-medium">
                              {h.time}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Form */}
               <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
                  {submitted ? (
                     <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mb-4">
                           <svg
                              width="24"
                              height="24"
                              fill="none"
                              stroke="#16a34a"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M5 13l4 4L19 7"
                              />
                           </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                           Tiket Terkirim!
                        </h2>
                        <p className="text-sm text-gray-500 mb-1">
                           Kami akan menghubungi <strong>{form.email}</strong>{" "}
                           dalam 1×24 jam.
                        </p>
                        <p className="text-xs text-gray-400 mb-6">
                           Nomor tiket: #TKT-{ticketId}
                        </p>
                        <button
                           onClick={() => {
                              setSubmitted(false);
                              setForm({
                                 name: "",
                                 email: "",
                                 subject: "",
                                 category: "",
                                 message: "",
                              });
                           }}
                           className="text-sm text-green-600 hover:underline"
                        >
                           Kirim tiket lain
                        </button>
                     </div>
                  ) : (
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                           {[
                              {
                                 label: "Nama Lengkap",
                                 key: "name",
                                 placeholder: "John Doe",
                                 type: "text",
                              },
                              {
                                 label: "Email",
                                 key: "email",
                                 placeholder: "john@example.com",
                                 type: "email",
                              },
                           ].map((f) => (
                              <div key={f.key}>
                                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    {f.label}
                                 </label>
                                 <input
                                    type={f.type}
                                    required
                                    placeholder={f.placeholder}
                                    value={form[f.key as keyof typeof form]}
                                    onChange={(e) =>
                                       setForm({
                                          ...form,
                                          [f.key]: e.target.value,
                                       })
                                    }
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                 />
                              </div>
                           ))}
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Kategori
                           </label>
                           <select
                              required
                              value={form.category}
                              onChange={(e) =>
                                 setForm({ ...form, category: e.target.value })
                              }
                              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                           >
                              <option value="">Pilih kategori...</option>
                              {[
                                 "Bug / Error",
                                 "Pertanyaan Teknis",
                                 "Pembayaran & Tagihan",
                                 "Saran & Masukan",
                                 "Lainnya",
                              ].map((opt) => (
                                 <option key={opt} value={opt}>
                                    {opt}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Subjek
                           </label>
                           <input
                              type="text"
                              required
                              placeholder="Deskripsikan masalah secara singkat"
                              value={form.subject}
                              onChange={(e) =>
                                 setForm({ ...form, subject: e.target.value })
                              }
                              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Pesan
                           </label>
                           <textarea
                              required
                              rows={5}
                              placeholder="Jelaskan masalah atau pertanyaan kamu secara detail..."
                              value={form.message}
                              onChange={(e) =>
                                 setForm({ ...form, message: e.target.value })
                              }
                              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                           />
                        </div>

                        <button
                           type="submit"
                           disabled={loading}
                           className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                           {loading ? (
                              <>
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
                                 Mengirim...
                              </>
                           ) : (
                              "Kirim Tiket Support"
                           )}
                        </button>
                     </form>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
