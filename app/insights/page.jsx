"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllTransactions } from "@/store/slices/transactionsSlice";
import PageLayout from "@/components/common/PageLayout";
import InsightCard from "@/components/insights/InsightCard";
import CategorySpendingBars from "@/components/insights/CategorySpendingBars";
import MonthlyComparisonChart from "@/components/charts/MonthlyComparisonChart";
import {
  computeSummary,
  groupByMonth,
  groupByCategory,
  formatCurrency,
  getChangePercent,
} from "@/utils/formatters";
import {
  Trophy,
  TrendingDown,
  TrendingUp,
  CalendarDays,
  PiggyBank,
  Percent,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function InsightsPage() {
  const transactions = useSelector(selectAllTransactions);

  const insights = useMemo(() => {
    const { totalIncome, totalExpense, balance } = computeSummary(transactions);
    const monthly = groupByMonth(transactions);
    const categories = groupByCategory(transactions);

    const topCat = categories[0];
    const secondCat = categories[1];

    // Savings rate
    const savingsRate = totalIncome > 0
      ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
      : 0;

    // Month-over-month
    const lastM = monthly[monthly.length - 1];
    const prevM = monthly[monthly.length - 2];
    const expenseChange = lastM && prevM
      ? getChangePercent(lastM.expense, prevM.expense)
      : null;
    const incomeChange = lastM && prevM
      ? getChangePercent(lastM.income, prevM.income)
      : null;
    const savingsLastMonth = lastM ? lastM.income - lastM.expense : 0;
    const savingsPrevMonth = prevM ? prevM.income - prevM.expense : 0;
    const savingsChange = getChangePercent(savingsLastMonth, savingsPrevMonth);

    // Avg monthly expense
    const avgMonthlyExpense = monthly.length
      ? (monthly.reduce((s, m) => s + m.expense, 0) / monthly.length).toFixed(0)
      : 0;
    const avgMonthlyIncome = monthly.length
      ? (monthly.reduce((s, m) => s + m.income, 0) / monthly.length).toFixed(0)
      : 0;

    // Best month (highest savings)
    const bestMonth = [...monthly].sort(
      (a, b) => (b.income - b.expense) - (a.income - a.expense)
    )[0];

    // Worst month (highest expense)
    const worstMonth = [...monthly].sort((a, b) => b.expense - a.expense)[0];

    // Observations
    const observations = [];
    if (parseFloat(savingsRate) >= 20) {
      observations.push({ type: "positive", text: `Great savings discipline! You're saving ${savingsRate}% of your income.` });
    } else if (parseFloat(savingsRate) < 10) {
      observations.push({ type: "warning", text: `Savings rate is ${savingsRate}%. Aim for at least 20% for financial health.` });
    }
    if (topCat && totalExpense > 0) {
      const topPct = ((topCat.total / totalExpense) * 100).toFixed(0);
      if (parseFloat(topPct) > 35) {
        observations.push({ type: "warning", text: `${topCat.category} accounts for ${topPct}% of your spending — consider reviewing.` });
      } else {
        observations.push({ type: "positive", text: `Spending is well distributed. Top category (${topCat.category}) is ${topPct}% of expenses.` });
      }
    }
    if (expenseChange !== null) {
      const dir = parseFloat(expenseChange) > 0 ? "increased" : "decreased";
      observations.push({ type: parseFloat(expenseChange) > 10 ? "warning" : "neutral", text: `Expenses ${dir} by ${Math.abs(expenseChange)}% compared to last month.` });
    }
    if (bestMonth) {
      observations.push({ type: "neutral", text: `Best savings month was ${bestMonth.label} with ₹${(bestMonth.income - bestMonth.expense).toLocaleString("en-IN")} net positive.` });
    }

    return {
      totalIncome, totalExpense, balance,
      savingsRate,
      topCat, secondCat,
      expenseChange, incomeChange, savingsChange,
      avgMonthlyExpense, avgMonthlyIncome,
      lastM, prevM, bestMonth, worstMonth,
      monthly, categories, observations,
    };
  }, [transactions]);

  const {
    totalIncome, totalExpense, savingsRate,
    topCat, expenseChange, incomeChange, savingsChange,
    avgMonthlyExpense, avgMonthlyIncome,
    bestMonth, monthly, categories, observations,
  } = insights;

  return (
    <PageLayout title="Insights" subtitle="Patterns and observations from your financial data">
      <div className="space-y-6 max-w-7xl mx-auto">

        {/* Key Insight Cards */}
        <section>
          <h2 className="text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-wider mb-3">
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <InsightCard
              title="Savings Rate"
              value={`${savingsRate}%`}
              subtitle={`${formatCurrency(totalIncome - totalExpense)} saved overall`}
              icon={PiggyBank}
              accentColor={parseFloat(savingsRate) >= 20 ? "emerald" : parseFloat(savingsRate) >= 10 ? "amber" : "rose"}
              trend={savingsChange}
              trendLabel="vs last month"
              animationDelay={0}
            />
            <InsightCard
              title="Avg Monthly Income"
              value={formatCurrency(Number(avgMonthlyIncome))}
              subtitle={`Over ${monthly.length} months tracked`}
              icon={TrendingUp}
              accentColor="emerald"
              trend={incomeChange}
              trendLabel="vs prev month"
              animationDelay={80}
            />
            <InsightCard
              title="Avg Monthly Expense"
              value={formatCurrency(Number(avgMonthlyExpense))}
              subtitle="Monthly spending average"
              icon={TrendingDown}
              accentColor="rose"
              trend={expenseChange}
              trendLabel="vs prev month"
              animationDelay={160}
            />
            <InsightCard
              title="Top Spending Category"
              value={topCat?.category || "—"}
              subtitle={topCat ? `${formatCurrency(topCat.total)} · ${topCat.count} transactions` : "No data"}
              icon={Trophy}
              accentColor="amber"
              animationDelay={240}
            />
            <InsightCard
              title="Best Savings Month"
              value={bestMonth?.label || "—"}
              subtitle={bestMonth ? `₹${(bestMonth.income - bestMonth.expense).toLocaleString("en-IN")} net savings` : "—"}
              icon={CalendarDays}
              accentColor="blue"
              animationDelay={320}
            />
            <InsightCard
              title="Income vs Expense Ratio"
              value={totalExpense > 0 ? `${(totalIncome / totalExpense).toFixed(2)}x` : "—"}
              subtitle="Income earned per rupee spent"
              icon={Percent}
              accentColor="violet"
              animationDelay={400}
            />
          </div>
        </section>

        {/* Charts + Category Bars */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Monthly Comparison */}
          <div className="dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
            <div className="mb-5">
              <h2 className="text-sm font-semibold dark:text-white text-slate-900">Monthly Comparison</h2>
              <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">Income vs expenses — last 6 months</p>
            </div>
            <MonthlyComparisonChart transactions={transactions} />

            {/* Summary table below chart */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b dark:border-white/10 border-slate-100">
                    {["Month", "Income", "Expense", "Net"].map((h) => (
                      <th key={h} className="text-left pb-2 font-semibold dark:text-slate-500 text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthly.slice(-6).reverse().map((m) => {
                    const net = m.income - m.expense;
                    return (
                      <tr key={m.month} className="border-b dark:border-white/5 border-slate-50">
                        <td className="py-2 dark:text-slate-300 text-slate-700 font-medium">{m.label}</td>
                        <td className="py-2 font-mono dark:text-emerald-400 text-emerald-600">{formatCurrency(m.income, true)}</td>
                        <td className="py-2 font-mono dark:text-rose-400 text-rose-600">{formatCurrency(m.expense, true)}</td>
                        <td className={`py-2 font-mono font-semibold ${net >= 0 ? "dark:text-amber-400 text-amber-600" : "dark:text-rose-400 text-rose-600"}`}>
                          {net >= 0 ? "+" : ""}{formatCurrency(net, true)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Category Spending Breakdown */}
          <div className="dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: "180ms", animationFillMode: "both" }}>
            <div className="mb-5">
              <h2 className="text-sm font-semibold dark:text-white text-slate-900">Category Spending</h2>
              <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">Where your money goes</p>
            </div>
            <CategorySpendingBars transactions={transactions} />
          </div>
        </section>

        {/* Observations */}
        <section className="animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
          <h2 className="text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            Observations & Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {observations.map((obs, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-4 rounded-xl border text-sm animate-fade-in
                  ${obs.type === "positive"
                    ? "dark:bg-emerald-500/8 bg-emerald-50 dark:border-emerald-500/20 border-emerald-200"
                    : obs.type === "warning"
                    ? "dark:bg-amber-500/8 bg-amber-50 dark:border-amber-500/20 border-amber-200"
                    : "dark:bg-white/3 bg-slate-50 dark:border-white/10 border-slate-200"
                  }`}
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
              >
                {obs.type === "positive" ? (
                  <CheckCircle className="w-4 h-4 dark:text-emerald-400 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : obs.type === "warning" ? (
                  <AlertTriangle className="w-4 h-4 dark:text-amber-400 text-amber-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Lightbulb className="w-4 h-4 dark:text-slate-400 text-slate-500 flex-shrink-0 mt-0.5" />
                )}
                <p className={`leading-relaxed ${
                  obs.type === "positive"
                    ? "dark:text-emerald-300 text-emerald-800"
                    : obs.type === "warning"
                    ? "dark:text-amber-300 text-amber-800"
                    : "dark:text-slate-300 text-slate-700"
                }`}>{obs.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
