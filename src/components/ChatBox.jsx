"use client";
import { useState } from "react";
import { Search, Send, Paperclip, MoreVertical, CheckCheck, Smile } from "lucide-react";

// real-time study chat
export default function ChatBox({ students, msgs, onSend, user, role = "teacher" }) {
  const [activeId, setActiveId] = useState(students?.[0]?.id || "s1");
  const [txt, setTxt] = useState("");
  const [q, setQ] = useState("");

  const activeStudent = students.find((s) => s.id === activeId) || students[0];
  const thread = msgs[activeId] || [];

  // filter contacts
  const filtered = (students || []).filter((s) =>
    s.name.toLowerCase().includes(q.toLowerCase()) || s.email.toLowerCase().includes(q.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!txt.trim()) return;
    onSend(activeId, txt);
    setTxt("");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs flex h-[720px]">
      {/* contacts sidebar */}
      <div className="w-80 border-r border-slate-200 bg-slate-50/50 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-extrabold text-base text-slate-900 mb-3">
            {role === "teacher" ? "Student Inquiries" : "Course Instructors"}
          </h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-white text-xs text-slate-800 placeholder-slate-400 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* contacts list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filtered.map((s) => {
            const isSel = s.id === activeId;
            return (
              <div
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`p-3.5 flex items-center gap-3 cursor-pointer transition-all ${
                  isSel ? "bg-orange-50/80 border-l-4 border-brand-500" : "hover:bg-slate-100/70"
                }`}
              >
                <div className="relative">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-white"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      s.status === "online" ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  ></span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold truncate ${isSel ? "text-brand-900" : "text-slate-800"}`}>
                      {s.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">{s.grade || "Student"}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {s.email}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* message viewport */}
      <div className="flex-1 flex flex-col justify-between bg-white">
        {/* chat header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeStudent?.avatar}
                alt={activeStudent?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  activeStudent?.status === "online" ? "bg-emerald-500" : "bg-slate-300"
                }`}
              ></span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{activeStudent?.name}</h4>
              <p className="text-[11px] text-slate-500 capitalize">
                {activeStudent?.status === "online" ? "Active Now" : "Offline"} • {activeStudent?.grade || "Class 12th"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-orange-100 text-brand-700 font-bold px-3 py-1 rounded-full">
              Doubt Thread
            </span>
          </div>
        </div>

        {/* messages stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20">
          {thread.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
              <p>No messages yet. Send a message to start the doubt discussion!</p>
            </div>
          ) : (
            thread.map((m) => {
              const isMe = m.senderId === user?.id || m.senderName === user?.name || (role === "teacher" && m.senderId?.startsWith("t"));
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] text-slate-400 font-medium mb-1 px-1">
                    {m.senderName} • {m.ts}
                  </span>
                  <div
                    className={`max-w-[70%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      isMe
                        ? "bg-brand-500 text-white rounded-tr-none font-medium"
                        : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-none font-normal"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* message input bar */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 flex items-center gap-3 bg-white">
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all"
            title="Attach assignment or screenshot"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            placeholder={`Message ${activeStudent?.name || "student"}...`}
            className="flex-1 bg-slate-100 text-xs text-slate-800 placeholder-slate-400 px-4 py-3 rounded-2xl border border-transparent focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
          />

          <button
            type="submit"
            disabled={!txt.trim()}
            className="p-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white rounded-2xl transition-all shadow-md shadow-brand-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
