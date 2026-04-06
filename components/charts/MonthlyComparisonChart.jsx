"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { groupByMonth, formatCurrency } from "@/utils/formatters";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="dark:bg-navy-900 bg-white border dark:border-white/10 border-slate-200 rounded-xl p-3 shadow-card text-xs space-y-1.5">
      <p className="dark:text-slate-400 text-slate-500 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span className="dark:text-slate-300 text-slate-600 capitalize">{p.dataKey}:</span>
          <span className="font-mono font-semibold dark:text-white text-slate-900">
            {formatCurrency(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function MonthlyComparisonChart({ transactions }) {
  const data = groupByMonth(transactions).slice(-6);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 dark:text-slate-600 text-slate-400 text-sm">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        barCategoryGap="25%"
        barGap={4}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.05)"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fill: "#64748b", fontSize: 11, fontFamily: "var(--font-jakarta)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatCurrency(v, true)}
          tick={{ fill: "#64748b", fontSize: 11, fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
        <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
}
