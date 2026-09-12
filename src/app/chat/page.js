"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ChatBox from "@/components/ChatBox";
import { useStore } from "@/lib/store";

// real-time doubts & direct messaging page
export default function ChatPage() {
  const store = useStore();
  const { role, user, switchRole, students, msgs, sendMsg } = store;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={role} switchRole={switchRole} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header role={role} user={user} switchRole={switchRole} />

        <main className="p-8 max-w-7xl mx-auto w-full">
          <div className="mb-4">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {role === "teacher" ? "Student Doubts & Messaging" : "Ask Instructor & Discussion"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Direct communication between teachers and students with instant message delivery
            </p>
          </div>

          <ChatBox
            students={students}
            msgs={msgs}
            onSend={sendMsg}
            user={user}
            role={role}
          />
        </main>
      </div>
    </div>
  );
}
