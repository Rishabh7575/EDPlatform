"use client";
import { useState } from "react";

// weekly activity visualization
export default function ActivityChart({ data = [], title = "Weekly Learning Hours", subtitle = "Hours recorded per day" }) {
  const [hovered, setHovered] = useState(null);

  const maxVal = Math.max(...data.map((d) => d.hrs || 0), 10);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-bold text-slate-900 text-base">{title}</h4>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
            <span>Recorded Lectures</span>
          </div>
          {data[0]?.live !== undefined && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-200"></span>
              <span>Live Attendance</span>
            </div>
          )}
        </div>
      </div>

      {/* chart bars */}
      <div className="h-48 flex items-end justify-between gap-3 pt-4 px-2">
        {data.map((item, idx) => {
          const heightPct = Math.round(((item.hrs || 0) / maxVal) * 100);
          const livePct = item.live ? Math.round((item.live / maxVal) * 100) : 0;
          const isHover = hovered === idx;

          return (
            <div
              key={item.day || idx}
              className="flex-1 flex flex-col items-center gap-2 relative group cursor-pointer"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* tooltip */}
              {isHover && (
                <div className="absolute -top-10 z-20 bg-slate-900 text-white text-xs px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
                  <p className="font-bold">{item.hrs} hrs</p>
                  {item.live && <p className="text-[10px] text-slate-300">{item.live} live</p>}
                </div>
              )}

              {/* bar column */}
              <div className="w-full max-w-[40px] bg-slate-100 rounded-xl h-40 flex flex-col justify-end p-1 overflow-hidden transition-all group-hover:bg-orange-50">
                {livePct > 0 && (
                  <div
                    style={{ height: `${livePct}%` }}
                    className="w-full bg-orange-200 rounded-lg mb-1 transition-all duration-500"
                  ></div>
                )}
                <div
                  style={{ height: `${heightPct}%` }}
                  className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-lg transition-all duration-500 group-hover:from-brand-500 group-hover:to-brand-300 shadow-sm"
                ></div>
              </div>

              {/* day label */}
              <span className={`text-xs font-semibold ${isHover ? "text-brand-600" : "text-slate-500"}`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
