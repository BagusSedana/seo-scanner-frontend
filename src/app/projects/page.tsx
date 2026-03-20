"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import toast from "react-hot-toast";

interface Project {
   id: number;
   name: string;
   description: string;
   created_at: string;
}

interface Scan {
   id: number;
   domain: string;
   total_score: number;
   created_at: string;
}

export default function ProjectsPage() {
   const { token, isAuthenticated } = useAuthStore();
   const [projects, setProjects] = useState<Project[]>([]);
   const [loading, setLoading] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [newName, setNewName] = useState("");
   const [newDesc, setNewDesc] = useState("");
   const [activeProject, setActiveProject] = useState<number | null>(null);
   const [projectScans, setProjectScans] = useState<Scan[]>([]);
   const [scansLoading, setScansLoading] = useState(false);

   useEffect(() => {
      if (isAuthenticated && token) {
         fetchProjects();
      }
   }, [isAuthenticated, token]);

   const fetchProjects = async () => {
      setLoading(true);
      try {
         const res = await API.get("/projects", { headers: { Authorization: `Bearer ${token}` } });
         setProjects(res.data);
      } catch (err) {
         toast.error("Gagal memuat proyek");
      } finally {
         setLoading(false);
      }
   };

   const fetchProjectDetails = async (id: number) => {
      setActiveProject(id);
      setScansLoading(true);
      try {
         const res = await API.get(`/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
         setProjectScans(res.data.scans);
      } catch {
         toast.error("Gagal memuat detail proyek");
      } finally {
         setScansLoading(false);
      }
   };

   const handleCreateProject = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newName) return toast.error("Nama proyek wajib diisi");
      try {
         await API.post("/projects", 
            { name: newName, description: newDesc },
            { headers: { Authorization: `Bearer ${token}` } }
         );
         toast.success("Proyek berhasil dibuat!");
         setShowModal(false);
         setNewName("");
         setNewDesc("");
         fetchProjects();
      } catch {
         toast.error("Gagal membuat proyek");
      }
   };

   const handleDeleteProject = async (id: number) => {
      if (!confirm("Hapus proyek ini? Scan di dalamnya tidak akan dihapus, hanya dilepas dari proyek.")) return;
      try {
         await API.delete(`/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
         toast.success("Proyek dihapus");
         if (activeProject === id) setActiveProject(null);
         fetchProjects();
      } catch {
         toast.error("Gagal menghapus proyek");
      }
   };

   if (loading) return <div className="p-20 text-center text-gray-400">Memuat proyek...</div>;

   return (
      <div className="min-h-screen bg-gray-50 pb-20">
         <div className="bg-slate-900 text-white py-12 px-4 shadow-lg">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                     <span className="bg-green-500 w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-green-500/20">📁</span>
                     Manajemen Proyek
                  </h1>
                  <p className="text-slate-400 text-sm">Organisir hasil scan SEO kamu berdasarkan brand atau klien.</p>
               </div>
               <button 
                  onClick={() => setShowModal(true)}
                  className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-600/20 transition-all active:scale-95"
               >
                  + Buat Proyek Baru
               </button>
            </div>
         </div>

         <div className="max-w-6xl mx-auto px-4 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               
               {/* PROJECT LIST */}
               <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Daftar Proyek ({projects.length})</h2>
                  {projects.length === 0 ? (
                     <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 text-sm italic">Belum ada proyek.</p>
                     </div>
                  ) : (
                     projects.map(p => (
                        <div 
                           key={p.id}
                           onClick={() => fetchProjectDetails(p.id)}
                           className={`group relative bg-white border cursor-pointer rounded-2xl p-5 transition-all hover:shadow-md ${activeProject === p.id ? 'border-green-500 ring-2 ring-green-500/10' : 'border-gray-100'}`}
                        >
                           <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{p.name}</h3>
                           <p className="text-xs text-gray-500 line-clamp-1 mb-3">{p.description || "Tidak ada deskripsi"}</p>
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] text-gray-400 uppercase font-medium">{new Date(p.created_at).toLocaleDateString()}</span>
                              <button 
                                 onClick={(e) => { e.stopPropagation(); handleDeleteProject(p.id); }}
                                 className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                 <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                           </div>
                        </div>
                     ))
                  )}
               </div>

               {/* SCANS WITHIN PROJECT */}
               <div className="lg:col-span-2">
                  <div className="bg-white border border-gray-100 rounded-3xl shadow-sm min-h-[400px] overflow-hidden">
                     {activeProject ? (
                        <>
                           <div className="p-6 border-b border-gray-50 bg-slate-50/50 flex items-center justify-between">
                              <div>
                                 <h2 className="font-bold text-gray-900">Scan SEO di Proyek Ini</h2>
                                 <p className="text-xs text-gray-500">Hasil audit terbaru untuk {projects.find(p => p.id === activeProject)?.name}</p>
                              </div>
                           </div>
                           <div className="p-6">
                              {scansLoading ? (
                                 <div className="py-10 text-center text-gray-400 text-sm">Memuat scan...</div>
                              ) : projectScans.length === 0 ? (
                                 <div className="py-20 text-center">
                                    <div className="text-4xl mb-4">🔍</div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">Belum ada scan di proyek ini</p>
                                    <p className="text-[10px] text-gray-400 max-w-xs mx-auto">Gunakan halaman hasil scan untuk memindahkan audit ke proyek ini.</p>
                                    <Link href="/dashboard/scan" className="mt-6 inline-block bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl">Mulai Scan Baru</Link>
                                 </div>
                              ) : (
                                 <div className="space-y-3">
                                    {projectScans.map(s => (
                                       <Link 
                                          key={s.id} 
                                          href={`/hasil/${s.id}`}
                                          className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all group"
                                       >
                                          <div>
                                             <p className="font-bold text-gray-900 text-sm group-hover:text-green-700">{s.domain}</p>
                                             <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">{new Date(s.created_at).toLocaleDateString()}</p>
                                          </div>
                                          <div className="flex items-center gap-4">
                                             <div className="text-right">
                                                <p className="text-lg font-black text-gray-900">{Math.round(s.total_score)}</p>
                                                <p className="text-[9px] uppercase font-bold text-gray-400 mt-0.5 tracking-tighter">SEO Score</p>
                                             </div>
                                             <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-green-100 flex items-center justify-center text-gray-400 group-hover:text-green-600 transition-colors">
                                                →
                                             </div>
                                          </div>
                                       </Link>
                                    ))}
                                 </div>
                              )}
                           </div>
                        </>
                     ) : (
                        <div className="flex flex-col items-center justify-center h-full p-10 text-center py-20">
                           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner ring-8 ring-white">📁</div>
                           <h3 className="font-bold text-gray-900 text-xl mb-2">Pilih Proyek</h3>
                           <p className="text-gray-500 text-sm max-w-sm leading-relaxed">Pilih salah satu proyek di sebelah kiri untuk melihat daftar website dan skor SEO-nya.</p>
                        </div>
                     )}
                  </div>
               </div>

            </div>
         </div>

         {/* MODAL CREATE */}
         {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
               <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                  <div className="p-8 border-b border-gray-100">
                     <h2 className="text-2xl font-black text-gray-900 mb-2">Buat Proyek Baru</h2>
                     <p className="text-sm text-gray-500">Gunakan proyek untuk memisahkan hasil audit antar klien atau brand.</p>
                  </div>
                  <form onSubmit={handleCreateProject} className="p-8 space-y-6">
                     <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 block tracking-widest">Nama Proyek</label>
                        <input 
                           type="text" 
                           value={newName}
                           onChange={(e) => setNewName(e.target.value)}
                           className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 outline-none focus:border-green-500 transition-all text-sm font-medium"
                           placeholder="Contoh: Brand Fashion A"
                           autoFocus
                        />
                     </div>
                     <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 block tracking-widest">Deskripsi (Opsional)</label>
                        <textarea 
                           value={newDesc}
                           onChange={(e) => setNewDesc(e.target.value)}
                           className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 outline-none focus:border-green-500 transition-all text-sm h-32 resize-none"
                           placeholder="Pencatatan detail proyek..."
                        />
                     </div>
                     <div className="flex gap-4 pt-4">
                        <button 
                           type="button"
                           onClick={() => setShowModal(false)}
                           className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                        >
                           Batal
                        </button>
                        <button 
                           type="submit"
                           className="flex-1 bg-green-600 hover:bg-green-500 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-green-600/20 transition-all"
                        >
                           Simpan Proyek
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}
