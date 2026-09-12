"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import ActivityChart from "@/components/ActivityChart";
import CourseCard from "@/components/CourseCard";
import { useStore } from "@/lib/store";
import { 
  Users, 
  Clock, 
  Award, 
  DollarSign, 
  Star, 
  Video, 
  Plus, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

// teacher instructor dashboard
export default function TeacherDashboard() {
  const store = useStore();
  const [q, setQ] = useState("");

  const { role, user, switchRole, crsList, metrics, sched, students } = store;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={role} switchRole={switchRole} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header role={role} user={user} switchRole={switchRole} q={q} setQ={setQ} />

        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* welcome hero */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-900 rounded-3xl p-8 text-white shadow-elevated relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/20 px-3 py-1 rounded-full backdrop-blur-md">
                Instructor Hub • Live Academic Year
              </span>
              <h2 className="text-3xl font-extrabold mt-3 tracking-tight">
                Welcome back, {user?.name || "Dr. Shakshi"}! 👋
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Your students have logged <span className="text-white font-bold">3,840 total watch hours</span> this month. You have a scheduled live doubt session today at 5:00 PM.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/teacher/content"
                  className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-500/30 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Lecture</span>
                </Link>
                <Link
                  href="/videocall"
                  className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-all backdrop-blur-md flex items-center gap-2"
                >
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span>Launch Live Classroom</span>
                </Link>
              </div>
            </div>

            {/* decorative background glow */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          </div>

          {/* KPI metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              label={metrics.students?.label || "Total Students"}
              val={metrics.students?.val || 1482}
              diff={metrics.students?.diff || "+14.2%"}
              up={metrics.students?.up}
              icon={Users}
              color="brand"
            />
            <MetricCard
              label={metrics.watchHrs?.label || "Watch Hours"}
              val={metrics.watchHrs?.val || "3,840h"}
              diff={metrics.watchHrs?.diff || "+8.5%"}
              up={metrics.watchHrs?.up}
              icon={Clock}
              color="emerald"
            />
            <MetricCard
              label={metrics.completion?.label || "Completion Rate"}
              val={metrics.completion?.val || "86.4%"}
              diff={metrics.completion?.diff || "+4.1%"}
              up={metrics.completion?.up}
              icon={Award}
              color="blue"
            />
            <MetricCard
              label={metrics.revenue?.label || "Monthly Revenue"}
              val={metrics.revenue?.val || "$18,450"}
              diff={metrics.revenue?.diff || "+12.8%"}
              up={metrics.revenue?.up}
              icon={DollarSign}
              color="purple"
            />
          </div>

          {/* charts & live schedule row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ActivityChart
                data={metrics.weeklyActivity}
                title="Student Watch Hours & Live Attendance"
                subtitle="Daily recorded viewing hours vs real-time interactive attendance"
              />
            </div>

            {/* upcoming live schedule widget */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900 text-base">Live Schedule</h4>
                  <Link href="/schedule" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                    <span>View all</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {sched?.slice(0, 3).map((s) => (
                    <div key={s.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100 text-brand-700">
                          {s.sub}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">{s.attendees} registered</span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-800 mt-2 line-clamp-1">{s.topic}</h5>
                      <p className="text-[11px] text-slate-500 mt-1">{s.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/videocall"
                className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Video className="w-4 h-4 text-emerald-400" />
                <span>Start Next Live Room</span>
              </Link>
            </div>
          </div>

          {/* active courses section */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Your Published Courses</h3>
                <p className="text-xs text-slate-500">Manage curriculum, monitor completion rate, and review comments</p>
              </div>

              <Link
                href="/teacher/content"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>View All Courses ({crsList.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {crsList.slice(0, 4).map((crs) => (
                <CourseCard key={crs.id} crs={crs} role={role} />
              ))}
            </div>
          </div>

          {/* enrolled students table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Top Performing Students</h4>
                <p className="text-xs text-slate-500">Real-time attendance and doubt clearance activity</p>
              </div>
              <Link href="/chat" className="text-xs font-bold text-brand-600 hover:text-brand-700">
                Open Chat Inbox →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((stu) => (
                    <tr key={stu.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img src={stu.avatar} alt={stu.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-slate-800">{stu.name}</p>
                          <p className="text-[11px] text-slate-400">{stu.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{stu.grade}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          stu.status === "online" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                        }`}>
                          {stu.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-28 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-brand-500 h-full rounded-full" style={{ width: "82%" }}></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href="/chat"
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-semibold"
                        >
                          Message
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
