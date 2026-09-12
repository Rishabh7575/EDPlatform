"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import LiveRoom from "@/components/LiveRoom";
import { useStore } from "@/lib/store";

// live classroom with real-time video, audio & screen sharing
export default function VideoCallPage() {
  const store = useStore();
  const { role, user, switchRole } = store;

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar role={role} switchRole={switchRole} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header role={role} user={user} switchRole={switchRole} />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Live Interactive Classroom
              </h2>
              <p className="text-xs text-slate-400">
                HD Audio & Video stream with interactive doubt chat and screen sharing
              </p>
            </div>

            <span className="text-xs px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Live Room Active
            </span>
          </div>

          <LiveRoom user={user} role={role} />
        </main>
      </div>
    </div>
  );
}
