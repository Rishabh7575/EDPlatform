"use client";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// clean KPI card with trends
export default function MetricCard({ label, val, diff, up = true, icon: Icon, color = "brand" }) {
  const colorMap = {
    brand: "bg-orange-50 text-brand-500 border-orange-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{label}</span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${colorMap[color] || colorMap.brand}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{val}</h3>
        {diff && (
          <div className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${up ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
            {up ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            <span>{diff}</span>
          </div>
        )}
      </div>
    </div>
  );
}
