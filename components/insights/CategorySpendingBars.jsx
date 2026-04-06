"use client";

import { groupByCategory, formatCurrency } from "@/utils/formatters";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/data/mockData";

export default function CategorySpendingBars({ transactions }) {
  const data = groupByCategory(transactions).slice(0, 8);
  if (data.length === 0) return null;

  const max = data[0].total;

  return (
    <div className="space-y-3">
      {data.map((d, i) => {
        const pct = ((d.total / max) * 100).toFixed(1);
        const color = CATEGORY_COLORS[d.category] || "#94a3b8";
        const icon = CATEGORY_ICONS[d.category] || "📦";
        return (
          <div key={d.category} className="animate-slide-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm">{icon}</span>
                <span className="text-sm dark:text-slate-300 text-slate-700 font-medium">{d.category}</span>
                <span className="text-xs dark:text-slate-600 text-slate-400">({d.count} txns)</span>
              </div>
              <span className="text-sm font-mono font-semibold dark:text-slate-200 text-slate-800">
                {formatCurrency(d.total)}
              </span>
            </div>
            <div className="h-2 dark:bg-white/5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${pct}%`, background: color, animationDelay: `${i * 80}ms` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
