"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImOmega } from "react-icons/im";
import { ArrowRight } from "lucide-react";
import { setCookie } from "@/lib/auth";

// user registration portal
export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      localStorage.setItem("lms_role", role);
      setCookie("lms_role", role);
      setCookie("authToken", "token_" + Date.now());
      router.push(role === "teacher" ? "/teacher" : "/student");
    } catch (err) {
      router.push(role === "teacher" ? "/teacher" : "/student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-brand-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <ImOmega className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
              Omega<span className="text-brand-500 font-normal">LMS</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Create your educational account</p>
          </div>
        </div>

        {/* role selector */}
        <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1.5 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              role === "student" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            I am a Student
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              role === "teacher" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            I am an Instructor
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Suryansh Verma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email address</label>
            <input
              type="email"
              required
              placeholder="user@edplatform.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="Create strong password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 transition-all text-xs flex items-center justify-center gap-1.5 mt-2"
          >
            <span>{loading ? "Creating Account..." : "Create Account & Start Learning"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-brand-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
