import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function InsightCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon: Icon,
  accentColor = "amber",
  animationDelay = 0,
}) {
  const colorMap = {
    amber: {
      iconBg: "dark:bg-amber-500/15 bg-amber-50",
      iconColor: "dark:text-amber-400 text-amber-600",
      valueColor: "dark:text-amber-300 text-amber-700",
    },
    emerald: {
      iconBg: "dark:bg-emerald-500/15 bg-emerald-50",
      iconColor: "dark:text-emerald-400 text-emerald-600",
      valueColor: "dark:text-emerald-300 text-emerald-700",
    },
    rose: {
      iconBg: "dark:bg-rose-500/15 bg-rose-50",
      iconColor: "dark:text-rose-400 text-rose-600",
      valueColor: "dark:text-rose-300 text-rose-700",
    },
    blue: {
      iconBg: "dark:bg-blue-500/15 bg-blue-50",
      iconColor: "dark:text-blue-400 text-blue-600",
      valueColor: "dark:text-blue-300 text-blue-700",
    },
    violet: {
      iconBg: "dark:bg-violet-500/15 bg-violet-50",
      iconColor: "dark:text-violet-400 text-violet-600",
      valueColor: "dark:text-violet-300 text-violet-700",
    },
  };

  const colors = colorMap[accentColor] || colorMap.amber;
  const trendNum = parseFloat(trend);
  const isPos = trendNum > 0;
  const isNeg = trendNum < 0;

  return (
    <div
      className="dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={`w-11 h-11 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${colors.iconColor}`} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium dark:text-slate-500 text-slate-400 uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className={`text-xl font-bold font-mono truncate ${colors.valueColor}`}>{value}</p>
          {subtitle && (
            <p className="text-xs dark:text-slate-500 text-slate-400 mt-1 truncate">{subtitle}</p>
          )}
          {trend !== undefined && trend !== null && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
              isPos ? "text-emerald-500 dark:text-emerald-400" : isNeg ? "text-rose-500 dark:text-rose-400" : "text-slate-500"
            }`}>
              {isPos ? <TrendingUp className="w-3 h-3" /> : isNeg ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
              {Math.abs(trendNum)}% {trendLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
