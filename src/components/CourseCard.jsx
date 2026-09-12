"use client";
import Link from "next/link";
import { Play, Clock, Users, Star, BookOpen } from "lucide-react";

// course card with progress and action
export default function CourseCard({ crs, role = "student", onSelect }) {
  const isTeacher = role === "teacher";
  const subColors = {
    Chemistry: "bg-amber-100 text-amber-800 border-amber-200",
    Physics: "bg-sky-100 text-sky-800 border-sky-200",
    Mathematics: "bg-purple-100 text-purple-800 border-purple-200",
    "Computer Science": "bg-emerald-100 text-emerald-800 border-emerald-200",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
      {/* thumbnail container */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img
          src={crs.thumb}
          alt={crs.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-95 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>

        {/* play overlay */}
        <Link
          href={`/student/courses?id=${crs.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]"
        >
          <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </Link>

        {/* top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${subColors[crs.sub] || "bg-slate-100 text-slate-800 border-slate-200"}`}>
            {crs.sub}
          </span>
          <span className="text-[11px] font-medium bg-black/60 text-white/90 backdrop-blur-md px-2 py-0.5 rounded-full">
            {crs.lang}
          </span>
        </div>

        {/* rating pill */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-md text-amber-400 text-xs font-bold px-2 py-1 rounded-lg">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{crs.rating}</span>
        </div>
      </div>

      {/* body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
            {crs.title}
          </h4>
          <p className="text-xs text-slate-500 mt-1.5">
            By <span className="font-semibold text-slate-700">{crs.instructor}</span>
          </p>
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {crs.desc}
          </p>
        </div>

        {/* footer metrics & progress */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          {/* progress bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-500">{crs.lessons?.length || 4} Lessons</span>
              <span className="text-brand-600">{crs.progress}% complete</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                style={{ width: `${crs.progress}%` }}
                className="bg-brand-500 h-full rounded-full transition-all duration-500"
              ></div>
            </div>
          </div>

          {/* actions */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {crs.enrolled}
              </span>
            </div>

            <Link
              href={`/student/courses?id=${crs.id}`}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-brand-500 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>{isTeacher ? "Manage Course" : "Watch Lecture"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
