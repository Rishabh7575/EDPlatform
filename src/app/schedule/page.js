"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useStore } from "@/lib/store";
import { Calendar as CalIcon, Clock, Users, Video, Plus, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

// live class schedules & planning
export default function SchedulePage() {
  const store = useStore();
  const [topic, setTopic] = useState("");
  const [sub, setSub] = useState("Chemistry");
  const [time, setTime] = useState("Tomorrow, 5:00 PM - 6:30 PM");

  const { role, user, switchRole, sched, addSchedule } = store;
  const isTeacher = role === "teacher";

  const handleAdd = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const newSlot = {
      id: "sc_" + Date.now(),
      topic,
      sub,
      time,
      attendees: 12,
      status: "scheduled",
    };

    addSchedule(newSlot);
    setTopic("");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={role} switchRole={switchRole} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header role={role} user={user} switchRole={switchRole} />

        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Live Class Schedule & Timetable
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Upcoming interactive video doubt sessions and special revisions
              </p>
            </div>

            <Link
              href="/videocall"
              className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/25 flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Launch Live Room</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* schedule list */}
            <div className="lg:col-span-2 space-y-4">
              {sched.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-600 border border-orange-100 flex items-center justify-center shrink-0">
                      <CalIcon className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-orange-100 text-brand-700">
                          {item.sub}
                        </span>
                        {item.status === "live-soon" && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-700 animate-pulse">
                            Live in 25 mins
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm mt-1.5">{item.topic}</h4>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {item.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          {item.attendees} Attending
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/videocall"
                    className="px-4 py-2 bg-slate-900 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <span>{isTeacher ? "Open Classroom" : "Join Session"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

            {/* schedule booking / creation panel */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs h-fit">
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                {isTeacher ? "Schedule New Live Class" : "Classroom Guidelines"}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {isTeacher
                  ? "Notify all enrolled students with class topic and timings"
                  : "Important rules for attending live interactive classes"}
              </p>

              {isTeacher ? (
                <form onSubmit={handleAdd} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Session Topic</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rapid Problem Solving Marathon"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Subject</label>
                    <select
                      value={sub}
                      onChange={(e) => setSub(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none"
                    >
                      <option value="Chemistry">Chemistry</option>
                      <option value="Physics">Physics</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Computer Science">Computer Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Timing & Duration</label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Broadcast Live Slot</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p>Keep your webcam on for mandatory live class attendance.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p>Use the Raise Hand button before unmuting your microphone.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p>Post questions in the live chat drawer during lecture derivations.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
