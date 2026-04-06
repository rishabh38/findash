"use client";

import { Pencil, Trash2 } from "lucide-react";
import { TypeBadge, CategoryBadge } from "@/components/common/Badge";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { CATEGORY_ICONS } from "@/data/mockData";

export default function TransactionRow({ transaction, isAdmin, onEdit, onDelete, index }) {
  const { description, amount, category, type, date, note } = transaction;
  const icon = CATEGORY_ICONS[category] || "📦";

  return (
    <tr
      className="group border-b dark:border-white/5 border-slate-100 transition-colors dark:hover:bg-white/3 hover:bg-slate-50 animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms`, animationFillMode: "both" }}
    >
      {/* Icon + Description */}
      <td className="py-3.5 px-4 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl dark:bg-white/5 bg-slate-100 flex items-center justify-center flex-shrink-0 text-base">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium dark:text-slate-200 text-slate-800 truncate">
              {description}
            </p>
            {note && (
              <p className="text-xs dark:text-slate-600 text-slate-400 truncate">{note}</p>
            )}
          </div>
        </div>
      </td>

      {/* Date */}
      <td className="py-3.5 px-4 hidden sm:table-cell">
        <span className="text-xs dark:text-slate-400 text-slate-500 font-mono whitespace-nowrap">
          {formatDate(date, "short")}
        </span>
      </td>

      {/* Category */}
      <td className="py-3.5 px-4 hidden md:table-cell">
        <CategoryBadge category={category} />
      </td>

      {/* Type */}
      <td className="py-3.5 px-4 hidden lg:table-cell">
        <TypeBadge type={type} />
      </td>

      {/* Amount */}
      <td className="py-3.5 px-4 text-right">
        <span
          className={`font-mono font-semibold text-sm ${
            type === "income"
              ? "dark:text-emerald-400 text-emerald-600"
              : "dark:text-rose-400 text-rose-600"
          }`}
        >
          {type === "income" ? "+" : "-"}
          {formatCurrency(amount)}
        </span>
      </td>

      {/* Actions (Admin only) */}
      {isAdmin && (
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(transaction)}
              className="p-1.5 rounded-lg dark:text-slate-400 text-slate-500 dark:hover:bg-amber-500/15 hover:bg-amber-50 dark:hover:text-amber-400 hover:text-amber-600 transition-all"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(transaction.id)}
              className="p-1.5 rounded-lg dark:text-slate-400 text-slate-500 dark:hover:bg-rose-500/15 hover:bg-rose-50 dark:hover:text-rose-400 hover:text-rose-600 transition-all"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
