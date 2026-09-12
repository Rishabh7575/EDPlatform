"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import CourseCard from "@/components/CourseCard";
import { useStore } from "@/lib/store";
import { Filter, ArrowLeft, BookOpen } from "lucide-react";

function EnrolledContent() {
  const store = useStore();
  const searchParams = useSearchParams();
  const initialCourseId = searchParams.get("id");

  const [q, setQ] = useState("");
  const [subFilter, setSubFilter] = useState("All");
  const [selCrsId, setSelCrsId] = useState(initialCourseId || "c1");

  const { role, user, switchRole, crsList } = store;

  const subjects = ["All", "Chemistry", "Physics", "Mathematics", "Computer Science"];

  const activeCourse = crsList.find((c) => c.id === selCrsId) || crsList[0];

  const filtered = crsList.filter((c) => {
    const matchSub = subFilter === "All" || c.sub === subFilter;
    const matchQ = !q || c.title.toLowerCase().includes(q.toLowerCase()) || c.sub.toLowerCase().includes(q.toLowerCase());
    return matchSub && matchQ;
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={role} switchRole={switchRole} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header role={role} user={user} switchRole={switchRole} q={q} setQ={setQ} />

        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* header & subject filter tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Classroom & Course Curriculum
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Stream HD video lectures, follow curriculum chapters, and review notes
              </p>
            </div>

            {/* subject pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {subjects.map((s) => (
                <button
                  key={s}
                  onClick={() => setSubFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    subFilter === s
                      ? "bg-brand-500 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* interactive active video player */}
          {activeCourse && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-brand-500" />
                  Active Classroom Player
                </span>
                <span className="text-xs font-bold text-brand-600">
                  {activeCourse.sub} • {activeCourse.instructor}
                </span>
              </div>
              <VideoPlayer course={activeCourse} />
            </div>
          )}

          {/* other courses selection catalog */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-lg font-extrabold text-slate-900 mb-4">
              Switch Course ({filtered.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((crs) => (
                <div
                  key={crs.id}
                  onClick={() => {
                    setSelCrsId(crs.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`cursor-pointer transition-all ${
                    crs.id === selCrsId ? "ring-2 ring-brand-500 rounded-2xl" : ""
                  }`}
                >
                  <CourseCard crs={crs} role={role} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function EnrolledCourses() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading course curriculum...</div>}>
      <EnrolledContent />
    </Suspense>
  );
}
