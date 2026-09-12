"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import ActivityChart from "@/components/ActivityChart";
import CourseCard from "@/components/CourseCard";
import { useStore } from "@/lib/store";
import { 
  Flame, 
  Clock, 
  BookOpen, 
  Award, 
  Play, 
  Video, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

// student learning dashboard
export default function StudentDashboard() {
  const store = useStore();
  const [q, setQ] = useState("");

  const { role, user, switchRole, crsList, metrics, sched } = store;

  // currently active course to continue
  const continueCourse = crsList[0] || {};

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={role} switchRole={switchRole} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header role={role} user={user} switchRole={switchRole} q={q} setQ={setQ} />

        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* student hero banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-brand-900 rounded-3xl p-8 text-white shadow-elevated relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>14 Day Learning Streak Active! Keep it going!</span>
              </div>

              <h2 className="text-3xl font-extrabold mt-3 tracking-tight">
                Welcome back, {user?.name || "Rishabh"}! 🚀
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                You are <span className="text-white font-bold">78% done</span> with Organic Reaction Mechanisms. Finish today&apos;s 18-minute module to hit your weekly goal.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/student/courses?id=${continueCourse.id}`}
                  className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-500/30 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume: {continueCourse.title?.slice(0, 30)}...</span>
                </Link>

                <Link
                  href="/videocall"
                  className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-all backdrop-blur-md flex items-center gap-2"
                >
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span>Join Chemistry Live Room</span>
                </Link>
              </div>
            </div>

            <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          </div>

          {/* KPI metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              label={metrics.hoursLearned?.label || "Study Hours"}
              val={metrics.hoursLearned?.val || "42.5h"}
              diff={metrics.hoursLearned?.diff || "+5.2h"}
              up={metrics.hoursLearned?.up}
              icon={Clock}
              color="brand"
            />
            <MetricCard
              label={metrics.streak?.label || "Streak"}
              val={metrics.streak?.val || "14 Days"}
              diff={metrics.streak?.diff || "Personal best! 🔥"}
              up={metrics.streak?.up}
              icon={Flame}
              color="emerald"
            />
            <MetricCard
              label={metrics.activeCourses?.label || "Active Courses"}
              val={metrics.activeCourses?.val || "4"}
              diff={metrics.activeCourses?.diff || "2 near completion"}
              up={metrics.activeCourses?.up}
              icon={BookOpen}
              color="blue"
            />
            <MetricCard
              label={metrics.quizAvg?.label || "Avg Quiz Score"}
              val={metrics.quizAvg?.val || "92.8%"}
              diff={metrics.quizAvg?.diff || "+3.4%"}
              up={metrics.quizAvg?.up}
              icon={Award}
              color="purple"
            />
          </div>

          {/* chart & live class banner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ActivityChart
                data={metrics.weeklyActivity}
                title="Your Weekly Study Hours"
                subtitle="Daily hours logged across video modules and self-study"
              />
            </div>

            {/* live class widget */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900 text-base">Live Classes Today</h4>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 animate-pulse">
                    Live Soon
                  </span>
                </div>

                <div className="space-y-3">
                  {sched?.slice(0, 2).map((s) => (
                    <div key={s.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100 text-brand-700">
                        {s.sub}
                      </span>
                      <h5 className="font-bold text-xs text-slate-800 mt-2 line-clamp-1">{s.topic}</h5>
                      <p className="text-[11px] text-slate-500 mt-1">{s.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/videocall"
                className="w-full mt-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-500/25"
              >
                <Video className="w-4 h-4" />
                <span>Join Classroom with Camera</span>
              </Link>
            </div>
          </div>

          {/* enrolled courses catalog */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Your Enrolled Courses</h3>
                <p className="text-xs text-slate-500">Pick up right where you left off</p>
              </div>

              <Link
                href="/student/courses"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>View Full Syllabus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {crsList.map((crs) => (
                <CourseCard key={crs.id} crs={crs} role={role} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
