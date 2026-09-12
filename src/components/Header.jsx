"use client";
import Link from "next/link";
import { Search, Bell, Sparkles, User, RefreshCw } from "lucide-react";

// top navigation header
export default function Header({ role, user, switchRole, q, setQ }) {
  const isTeacher = role === "teacher";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between">
      {/* search */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={q || ""}
            onChange={(e) => setQ && setQ(e.target.value)}
            placeholder={isTeacher ? "Search courses, students, topics..." : "Search subjects, lectures, formulas..."}
            className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 pl-9 pr-4 py-2 rounded-xl border border-transparent focus:border-brand-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* right actions */}
      <div className="flex items-center gap-3">
        {/* role switcher pill */}
        <button
          onClick={() => switchRole(isTeacher ? "student" : "teacher")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-brand-600 border border-slate-200 hover:border-brand-200 transition-all shadow-sm"
          title="Click to toggle teacher/student view"
        >
          <RefreshCw className="w-3.5 h-3.5 text-brand-500" />
          <span>Switch to {isTeacher ? "Student" : "Teacher"}</span>
        </button>

        {/* role badge */}
        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${isTeacher ? "bg-orange-100 text-brand-700" : "bg-emerald-100 text-emerald-700"}`}>
          {role}
        </span>

        {/* notification bell */}
        <button className="relative p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full"></span>
        </button>

        {/* user avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
          />
          <div className="hidden md:block text-left leading-tight">
            <p className="text-xs font-bold text-slate-800">{user?.name || "User"}</p>
            <p className="text-[11px] text-slate-500 capitalize">{user?.title || user?.grade || role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
