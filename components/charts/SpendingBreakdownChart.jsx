"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { groupByCategory, formatCurrency } from "@/utils/formatters";
import { CATEGORY_COLORS } from "@/data/mockData";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="dark:bg-navy-900 bg-white border dark:border-white/10 border-slate-200 rounded-xl p-3 shadow-card text-xs">
      <p className="dark:text-slate-300 text-slate-700 font-medium mb-1">{d.category}</p>
      <p className="font-mono font-semibold dark:text-white text-slate-900">{formatCurrency(d.total)}</p>
      <p className="dark:text-slate-500 text-slate-400 mt-0.5">{d.count} transactions</p>
    </div>
  );
};

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={10}
      fontWeight={600}
      fontFamily="var(--font-jakarta)"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function SpendingBreakdownChart({ transactions }) {
  const data = groupByCategory(transactions).slice(0, 8); // top 8

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 dark:text-slate-600 text-slate-400 text-sm">
        No expense data available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            dataKey="total"
            nameKey="category"
            labelLine={false}
            label={renderLabel}
            strokeWidth={0}
          >
            {data.map((entry) => (
              <Cell
                key={entry.category}
                fill={CATEGORY_COLORS[entry.category] || "#94a3b8"}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-1.5">
        {data.slice(0, 6).map((d) => (
          <div key={d.category} className="flex items-center gap-2 text-xs">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: CATEGORY_COLORS[d.category] || "#94a3b8" }}
            />
            <span className="dark:text-slate-400 text-slate-500 truncate">{d.category}</span>
            <span className="font-mono dark:text-slate-300 text-slate-700 ml-auto font-medium text-xs">
              {formatCurrency(d.total, true)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
