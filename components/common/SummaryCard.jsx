"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

const CARD_THEMES = {
  balance: {
    bg: "dark:bg-gradient-to-br dark:from-amber-500/20 dark:to-amber-600/5 bg-gradient-to-br from-amber-50 to-amber-100/50",
    border: "dark:border-amber-500/20 border-amber-200",
    accent: "text-amber-400",
    iconBg: "dark:bg-amber-500/20 bg-amber-100",
    iconColor: "dark:text-amber-400 text-amber-600",
    value: "dark:text-amber-300 text-amber-700",
  },
  income: {
    bg: "dark:bg-gradient-to-br dark:from-emerald-500/15 dark:to-emerald-600/5 bg-gradient-to-br from-emerald-50 to-emerald-100/50",
    border: "dark:border-emerald-500/20 border-emerald-200",
    accent: "text-emerald-400",
    iconBg: "dark:bg-emerald-500/20 bg-emerald-100",
    iconColor: "dark:text-emerald-400 text-emerald-600",
    value: "dark:text-emerald-300 text-emerald-700",
  },
  expense: {
    bg: "dark:bg-gradient-to-br dark:from-rose-500/15 dark:to-rose-600/5 bg-gradient-to-br from-rose-50 to-rose-100/50",
    border: "dark:border-rose-500/20 border-rose-200",
    accent: "text-rose-400",
    iconBg: "dark:bg-rose-500/20 bg-rose-100",
    iconColor: "dark:text-rose-400 text-rose-600",
    value: "dark:text-rose-300 text-rose-700",
  },
  neutral: {
    bg: "dark:bg-white/5 bg-white",
    border: "dark:border-white/10 border-slate-200",
    accent: "text-slate-400",
    iconBg: "dark:bg-white/10 bg-slate-100",
    iconColor: "dark:text-slate-300 text-slate-600",
    value: "dark:text-white text-slate-900",
  },
};

export default function SummaryCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  theme = "neutral",
  compact = false,
  animationDelay = 0,
}) {
  const styles = CARD_THEMES[theme] || CARD_THEMES.neutral;
  const changeNum = parseFloat(change);
  const isPositive = changeNum > 0;
  const isNegative = changeNum < 0;

  return (
    <div
      className={`stat-card border ${styles.bg} ${styles.border} shadow-card animate-slide-up`}
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: "both" }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl ${styles.iconBg} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`w-5 h-5 ${styles.iconColor}`} />
        </div>
        {change !== undefined && change !== null && (
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full
            ${
              isPositive
                ? "dark:bg-emerald-500/10 bg-emerald-50 text-emerald-500 dark:text-emerald-400"
                : isNegative
                ? "dark:bg-rose-500/10 bg-rose-50 text-rose-500 dark:text-rose-400"
                : "dark:bg-slate-500/10 bg-slate-50 text-slate-500"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : isNegative ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            {Math.abs(changeNum)}%
          </div>
        )}
      </div>

      {/* Value */}
      <div>
        <p className="text-xs font-medium dark:text-slate-400 text-slate-500 mb-1 uppercase tracking-wider">
          {title}
        </p>
        <p className={`font-mono font-semibold ${styles.value} ${compact ? "text-xl" : "text-2xl sm:text-3xl"}`}>
          {formatCurrency(value)}
        </p>
        {changeLabel && (
          <p className="text-xs dark:text-slate-500 text-slate-400 mt-1.5">
            {changeLabel}
          </p>
        )}
      </div>
    </div>
  );
}
