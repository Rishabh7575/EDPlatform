"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CourseCard from "@/components/CourseCard";
import { useStore } from "@/lib/store";
import { Plus, Video, Calendar, Upload, X, Filter } from "lucide-react";
import Link from "next/link";

// content studio: upload & manage lectures
export default function TeacherContent() {
  const store = useStore();
  const [q, setQ] = useState("");
  const [subFilter, setSubFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  // new lecture form state
  const [form, setForm] = useState({
    title: "",
    sub: "Chemistry",
    lang: "English / Hindi",
    desc: "",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  });

  const { role, user, switchRole, crsList, addCourse } = store;

  const subjects = ["All", "Chemistry", "Physics", "Mathematics", "Computer Science"];

  const filtered = crsList.filter((c) => {
    const matchSub = subFilter === "All" || c.sub === subFilter;
    const matchQ = !q || c.title.toLowerCase().includes(q.toLowerCase()) || c.sub.toLowerCase().includes(q.toLowerCase());
    return matchSub && matchQ;
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newCrs = {
      id: "c_" + Date.now(),
      title: form.title,
      sub: form.sub,
      lang: form.lang,
      instructor: user?.name || "Dr. Shakshi Ganotra",
      rating: 5.0,
      enrolled: 1,
      progress: 0,
      thumb: form.sub === "Physics" 
        ? "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600" 
        : form.sub === "Mathematics"
        ? "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600"
        : form.sub === "Computer Science"
        ? "https://images.unsplash.com/photo-1516116211227-bbc1552a8b3e?w=600"
        : "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600",
      desc: form.desc || "Comprehensive curriculum modules with practical problem solving.",
      lessons: [
        { id: "l_" + Date.now(), title: "1. " + form.title, dur: "25:00", done: false, url: form.url }
      ]
    };

    addCourse(newCrs);
    setModalOpen(false);
    setForm({
      title: "",
      sub: "Chemistry",
      lang: "English / Hindi",
      desc: "",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={role} switchRole={switchRole} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header role={role} user={user} switchRole={switchRole} q={q} setQ={setQ} />

        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* header action strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Course & Video Content Studio
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Upload new syllabus modules, manage student access, and organize topics
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/schedule"
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Schedule Live Class</span>
              </Link>

              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/25 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Video Lecture</span>
              </button>
            </div>
          </div>

          {/* subject filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Subject:
            </span>
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSubFilter(s)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  subFilter === s
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* courses grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((crs) => (
              <CourseCard key={crs.id} crs={crs} role={role} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
              No courses found matching &quot;{q || subFilter}&quot;. Click &quot;Upload Video Lecture&quot; to add one!
            </div>
          )}
        </main>
      </div>

      {/* upload modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Upload New Video Lecture</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Lecture Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thermodynamics & Heat Transfer - Part 1"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={form.sub}
                    onChange={(e) => setForm({ ...form, sub: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Chemistry">Chemistry</option>
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Language</label>
                  <input
                    type="text"
                    value={form.lang}
                    onChange={(e) => setForm({ ...form, lang: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Key concepts, syllabus topics, and prerequisites..."
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Video Stream URL</label>
                <input
                  type="text"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-md shadow-brand-500/25"
                >
                  Publish Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
