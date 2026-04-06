import { CATEGORY_ICONS } from "@/data/mockData";

const TYPE_STYLES = {
  income: "badge-income",
  expense: "badge-expense",
};

const CATEGORY_STYLE_MAP = {
  "Food & Dining": "dark:bg-amber-500/10 bg-amber-50 dark:text-amber-400 text-amber-600 dark:border-amber-500/20 border-amber-200",
  Transport: "dark:bg-blue-500/10 bg-blue-50 dark:text-blue-400 text-blue-600 dark:border-blue-500/20 border-blue-200",
  Shopping: "dark:bg-violet-500/10 bg-violet-50 dark:text-violet-400 text-violet-600 dark:border-violet-500/20 border-violet-200",
  Entertainment: "dark:bg-pink-500/10 bg-pink-50 dark:text-pink-400 text-pink-600 dark:border-pink-500/20 border-pink-200",
  Healthcare: "dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-400 text-emerald-600 dark:border-emerald-500/20 border-emerald-200",
  Utilities: "dark:bg-cyan-500/10 bg-cyan-50 dark:text-cyan-400 text-cyan-600 dark:border-cyan-500/20 border-cyan-200",
  Housing: "dark:bg-orange-500/10 bg-orange-50 dark:text-orange-400 text-orange-600 dark:border-orange-500/20 border-orange-200",
  Travel: "dark:bg-lime-500/10 bg-lime-50 dark:text-lime-400 text-lime-600 dark:border-lime-500/20 border-lime-200",
  Education: "dark:bg-indigo-500/10 bg-indigo-50 dark:text-indigo-400 text-indigo-600 dark:border-indigo-500/20 border-indigo-200",
  "Personal Care": "dark:bg-fuchsia-500/10 bg-fuchsia-50 dark:text-fuchsia-400 text-fuchsia-600 dark:border-fuchsia-500/20 border-fuchsia-200",
  Salary: "dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-400 text-emerald-600 dark:border-emerald-500/20 border-emerald-200",
  Freelance: "dark:bg-teal-500/10 bg-teal-50 dark:text-teal-400 text-teal-600 dark:border-teal-500/20 border-teal-200",
  Investment: "dark:bg-amber-500/10 bg-amber-50 dark:text-amber-400 text-amber-600 dark:border-amber-500/20 border-amber-200",
  Other: "dark:bg-slate-500/10 bg-slate-50 dark:text-slate-400 text-slate-600 dark:border-slate-500/20 border-slate-200",
};

export function TypeBadge({ type }) {
  return (
    <span className={TYPE_STYLES[type] || "badge-expense"}>
      <span className={`w-1.5 h-1.5 rounded-full ${type === "income" ? "bg-emerald-400" : "bg-rose-400"}`} />
      {type === "income" ? "Income" : "Expense"}
    </span>
  );
}

export function CategoryBadge({ category }) {
  const icon = CATEGORY_ICONS[category] || "📦";
  const style = CATEGORY_STYLE_MAP[category] || CATEGORY_STYLE_MAP["Other"];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      <span className="text-xs">{icon}</span>
      {category}
    </span>
  );
}
