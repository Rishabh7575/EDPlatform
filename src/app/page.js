"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImOmega } from "react-icons/im";
import { 
  GraduationCap, 
  Video, 
  MessageSquare, 
  Award, 
  ArrowRight, 
  Flame, 
  Play, 
  ShieldCheck, 
  Users, 
  Clock 
} from "lucide-react";

// intelligent role portal & landing showcase
export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState("teacher");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lms_role");
      if (saved) setRole(saved);
    } catch (e) {}
  }, []);

  const selectRoleAndGo = (chosenRole) => {
    try {
      localStorage.setItem("lms_role", chosenRole);
    } catch (e) {}
    router.push(chosenRole === "teacher" ? "/teacher" : "/student");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      {/* top navbar */}
      <header className="h-20 border-b border-slate-800/80 px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <ImOmega className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-white leading-none">
              Omega<span className="text-brand-500 font-normal">LMS</span>
            </h1>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              Next-Gen Academic Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-bold text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <button
            onClick={() => selectRoleAndGo("teacher")}
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/25"
          >
            Launch Platform →
          </button>
        </div>
      </header>

      {/* hero section */}
      <main className="max-w-7xl mx-auto px-8 py-16 flex-1 flex flex-col items-center text-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold mb-6">
          <Flame className="w-4 h-4 fill-current" />
          <span>Turnkey LMS with Real Metrics, WebRTC Video & Instant Doubts</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl text-balance leading-tight">
          Supercharged Learning Platform for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-orange-400 to-amber-300">Instructors & Students</span>
        </h1>

        <p className="text-slate-400 text-base max-w-2xl mt-5 leading-relaxed">
          High-definition video courses, live interactive classroom with camera and screen sharing, real-time student messaging, and rich academic metrics.
        </p>

        {/* role selection cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-12 text-left">
          {/* teacher entry card */}
          <div
            onClick={() => selectRoleAndGo("teacher")}
            className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-brand-500 transition-all cursor-pointer group shadow-xl hover:shadow-brand-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Educator Portal</span>
              <h3 className="text-xl font-extrabold text-white mt-1">Instructor Studio</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Monitor watch time KPIs, publish courses, manage live classes, and answer student doubts.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-brand-400 group-hover:text-brand-300">
              <span>Enter Teacher Dashboard</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* student entry card */}
          <div
            onClick={() => selectRoleAndGo("student")}
            className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500 transition-all cursor-pointer group shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Learner Portal</span>
              <h3 className="text-xl font-extrabold text-white mt-1">Student Academy</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Watch curated video chapters, maintain learning streaks, join live video classes, and ask questions.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              <span>Enter Student Academy</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* platform highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mt-16 pt-10 border-t border-slate-900 text-center">
          <div>
            <p className="text-2xl font-black text-white">1,482+</p>
            <p className="text-xs text-slate-500 mt-0.5">Enrolled Learners</p>
          </div>
          <div>
            <p className="text-2xl font-black text-white">3,840 hrs</p>
            <p className="text-xs text-slate-500 mt-0.5">Watch Time Logged</p>
          </div>
          <div>
            <p className="text-2xl font-black text-white">86.4%</p>
            <p className="text-xs text-slate-500 mt-0.5">Course Completion</p>
          </div>
          <div>
            <p className="text-2xl font-black text-white">4.9 / 5.0</p>
            <p className="text-xs text-slate-500 mt-0.5">Student Rating</p>
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className="h-16 border-t border-slate-900 px-8 flex items-center justify-between text-xs text-slate-500 max-w-7xl mx-auto w-full">
        <p>© 2025 Omega LMS Platform. Ready to use out-of-the-box.</p>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hover:text-slate-300 transition-colors">Sign In</Link>
          <Link href="/register" className="hover:text-slate-300 transition-colors">Register</Link>
          <Link href="/videocall" className="hover:text-slate-300 transition-colors">Live Room</Link>
        </div>
      </footer>
    </div>
  );
}
