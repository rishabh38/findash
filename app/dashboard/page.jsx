"use client";

import { useSelector } from "react-redux";
import { selectAllTransactions } from "@/store/slices/transactionsSlice";
import { selectIsAdmin } from "@/store/slices/roleSlice";
import PageLayout from "@/components/common/PageLayout";
import SummaryCard from "@/components/common/SummaryCard";
import BalanceTrendChart from "@/components/charts/BalanceTrendChart";
import SpendingBreakdownChart from "@/components/charts/SpendingBreakdownChart";
import MonthlyComparisonChart from "@/components/charts/MonthlyComparisonChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import {
  computeSummary,
  groupByMonth,
  groupByCategory,
  getChangePercent,
  formatCurrency,
} from "@/utils/formatters";
import { CATEGORY_ICONS } from "@/data/mockData";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";

export default function DashboardPage() {
  const transactions = useSelector(selectAllTransactions);
  const isAdmin = useSelector(selectIsAdmin);

  const { totalIncome, totalExpense, balance } = computeSummary(transactions);

  // Month-over-month change for balance
  const monthly = groupByMonth(transactions);
  const lastMonth = monthly[monthly.length - 1];
  const prevMonth = monthly[monthly.length - 2];
  const balanceChange = lastMonth && prevMonth
    ? getChangePercent(
        lastMonth.income - lastMonth.expense,
        prevMonth.income - prevMonth.expense
      )
    : null;
  const incomeChange = lastMonth && prevMonth
    ? getChangePercent(lastMonth.income, prevMonth.income)
    : null;
  const expenseChange = lastMonth && prevMonth
    ? getChangePercent(lastMonth.expense, prevMonth.expense)
    : null;

  // Top spending category
  const categoryData = groupByCategory(transactions);
  const topCat = categoryData[0];

  return (
    <PageLayout
      title="Dashboard"
      subtitle={`Welcome back${isAdmin ? " — Admin view" : " — Viewer mode"}`}
    >
      <div className="space-y-6 max-w-7xl mx-auto">

        {/* Summary Cards */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <SummaryCard
              title="Net Balance"
              value={balance}
              change={balanceChange}
              changeLabel="vs last month"
              icon={Wallet}
              theme="balance"
              animationDelay={0}
            />
            <SummaryCard
              title="Total Income"
              value={totalIncome}
              change={incomeChange}
              changeLabel="vs last month"
              icon={ArrowDownLeft}
              theme="income"
              animationDelay={80}
            />
            <SummaryCard
              title="Total Expenses"
              value={totalExpense}
              change={expenseChange}
              changeLabel="vs last month"
              icon={ArrowUpRight}
              theme="expense"
              animationDelay={160}
            />
            {/* Top category quick stat */}
            <div
              className="stat-card dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 shadow-card animate-slide-up"
              style={{ animationDelay: "240ms", animationFillMode: "both" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl dark:bg-violet-500/15 bg-violet-50 flex items-center justify-center text-lg">
                  {topCat ? CATEGORY_ICONS[topCat.category] : <ShoppingBag className="w-5 h-5" />}
                </div>
              </div>
              <p className="text-xs font-medium dark:text-slate-400 text-slate-500 mb-1 uppercase tracking-wider">
                Top Expense
              </p>
              <p className="font-mono font-semibold dark:text-violet-300 text-violet-700 text-2xl sm:text-3xl">
                {topCat ? formatCurrency(topCat.total) : "—"}
              </p>
              <p className="text-xs dark:text-slate-500 text-slate-400 mt-1.5">
                {topCat?.category || "No data"}
              </p>
            </div>
          </div>
        </section>

        {/* Charts row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Balance Trend */}
          <div className="lg:col-span-2 dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold dark:text-white text-slate-900">Balance Trend</h2>
                <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">Running net balance over time</p>
              </div>
              <TrendingUp className="w-4 h-4 dark:text-amber-400 text-amber-500" />
            </div>
            <BalanceTrendChart transactions={transactions} />
          </div>

          {/* Spending Breakdown */}
          <div className="dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: "180ms", animationFillMode: "both" }}>
            <div className="mb-5">
              <h2 className="text-sm font-semibold dark:text-white text-slate-900">Spending Breakdown</h2>
              <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">By category</p>
            </div>
            <SpendingBreakdownChart transactions={transactions} />
          </div>
        </section>

        {/* Monthly Comparison + Recent Transactions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Monthly Comparison */}
          <div className="dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
            <div className="mb-5">
              <h2 className="text-sm font-semibold dark:text-white text-slate-900">Monthly Overview</h2>
              <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">Income vs Expenses</p>
            </div>
            <MonthlyComparisonChart transactions={transactions} />
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2 dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: "260ms", animationFillMode: "both" }}>
            <RecentTransactions transactions={transactions} />
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
