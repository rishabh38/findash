"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TypeBadge, CategoryBadge } from "@/components/common/Badge";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { CATEGORY_ICONS } from "@/data/mockData";

export default function RecentTransactions({ transactions }) {
  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold dark:text-white text-slate-900">Recent Transactions</h2>
          <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">Latest activity</p>
        </div>
        <Link
          href="/transactions"
          className="flex items-center gap-1.5 text-xs dark:text-amber-400 text-amber-600 font-medium hover:underline"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-2">
        {recent.map((txn, i) => (
          <div
            key={txn.id}
            className="flex items-center gap-3 py-2.5 px-3 rounded-xl dark:hover:bg-white/5 hover:bg-slate-50 transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
          >
            <div className="w-8 h-8 rounded-lg dark:bg-white/5 bg-slate-100 flex items-center justify-center text-sm flex-shrink-0">
              {CATEGORY_ICONS[txn.category] || "📦"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium dark:text-slate-200 text-slate-800 truncate">{txn.description}</p>
              <p className="text-xs dark:text-slate-600 text-slate-400">{formatDate(txn.date, "short")}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className={`text-sm font-mono font-semibold ${
                txn.type === "income" ? "dark:text-emerald-400 text-emerald-600" : "dark:text-rose-400 text-rose-600"
              }`}>
                {txn.type === "income" ? "+" : "-"}{formatCurrency(txn.amount, true)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
