"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency, getBalanceTrend, getMonthKey, getMonthYear } from "@/utils/formatters";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="dark:bg-navy-900 bg-white border dark:border-amber-500/20 border-slate-200 rounded-xl p-3 shadow-card text-xs">
      <p className="dark:text-slate-400 text-slate-500 mb-1">{label}</p>
      <p className="font-mono font-semibold dark:text-amber-300 text-amber-600 text-sm">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
};

export default function BalanceTrendChart({ transactions }) {
  // Aggregate to one point per month (last day balance per month)
  const fullTrend = getBalanceTrend(transactions);

  // Reduce to monthly points
  const monthly = {};
  fullTrend.forEach((p) => {
    const key = getMonthKey(p.date);
    monthly[key] = { ...p, label: getMonthYear(p.date) };
  });
  const data = Object.values(monthly).slice(-8); // last 8 months

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 dark:text-slate-600 text-slate-400 text-sm">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} />
          </linearGradient>
        </defs>
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
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#f59e0b"
          strokeWidth={2.5}
          fill="url(#balanceGrad)"
          dot={false}
          activeDot={{ r: 5, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
