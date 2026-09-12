"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Video, 
  Calendar, 
  Settings, 
  LogOut, 
  Sparkles,
  GraduationCap
} from "lucide-react";
import { ImOmega } from "react-icons/im";

// unified role-aware navigation sidebar
export default function Sidebar({ role, switchRole }) {
  const path = usePathname();
  const router = useRouter();
  const isTeacher = role === "teacher";

  // menu items based on role
  const teacherLinks = [
    { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
    { href: "/teacher/content", label: "Content & Courses", icon: BookOpen },
    { href: "/chat", label: "Student Chat", icon: MessageSquare },
    { href: "/videocall", label: "Live Classroom", icon: Video },
    { href: "/schedule", label: "Live Schedule", icon: Calendar },
  ];

  const studentLinks = [
    { href: "/student", label: "My Learning", icon: LayoutDashboard },
    { href: "/student/courses", label: "Enrolled Courses", icon: BookOpen },
    { href: "/chat", label: "Doubt Chat", icon: MessageSquare },
    { href: "/videocall", label: "Live Class", icon: Video },
    { href: "/schedule", label: "Schedule", icon: Calendar },
  ];

  const links = isTeacher ? teacherLinks : studentLinks;

  const handleLogout = () => {
    try {
      localStorage.removeItem("lms_role");
    } catch (e) {}
    router.push("/login");
  };

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between h-screen sticky top-0 shrink-0">
      {/* top brand */}
      <div>
        <div className="h-16 px-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
            <ImOmega className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-slate-900 leading-none">
              Omega<span className="text-brand-500 font-normal">LMS</span>
            </h1>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              {isTeacher ? "Instructor Studio" : "Student Academy"}
            </span>
          </div>
        </div>

        {/* role switcher tile */}
        <div className="p-4">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${isTeacher ? "bg-brand-500" : "bg-emerald-600"}`}>
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-slate-800">{isTeacher ? "Instructor" : "Student"}</p>
                <p className="text-[11px] text-slate-500">Active Mode</p>
              </div>
            </div>
            <button
              onClick={() => {
                const nextRole = isTeacher ? "student" : "teacher";
                switchRole(nextRole);
                router.push(nextRole === "teacher" ? "/teacher" : "/student");
              }}
              className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs hover:bg-orange-50 transition-all"
            >
              Switch
            </button>
          </div>
        </div>

        {/* nav links */}
        <nav className="px-3 space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const active = path === item.href || (item.href !== "/" && path?.startsWith(item.href) && item.href !== "/teacher" && item.href !== "/student");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/20 font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* bottom actions */}
      <div className="p-4 border-t border-slate-100 space-y-1">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Switch Account / Auth</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-all"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
