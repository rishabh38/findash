import { SearchX } from "lucide-react";

export default function EmptyState({
  icon: Icon = SearchX,
  title = "No results found",
  description = "Try adjusting your filters or search terms.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl dark:bg-white/5 bg-slate-100 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 dark:text-slate-600 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold dark:text-slate-300 text-slate-700 mb-1">{title}</h3>
      <p className="text-sm dark:text-slate-500 text-slate-400 max-w-xs">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
