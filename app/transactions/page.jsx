"use client";

import { useSelector } from "react-redux";
import { selectAllTransactions } from "@/store/slices/transactionsSlice";
import { selectIsAdmin } from "@/store/slices/roleSlice";
import PageLayout from "@/components/common/PageLayout";
import TransactionTable from "@/components/transactions/TransactionTable";
import SummaryCard from "@/components/common/SummaryCard";
import { computeSummary } from "@/utils/formatters";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function TransactionsPage() {
  const transactions = useSelector(selectAllTransactions);
  const isAdmin = useSelector(selectIsAdmin);
  const { totalIncome, totalExpense, balance } = computeSummary(transactions);

  return (
    <PageLayout
      title="Transactions"
      subtitle={isAdmin ? "Admin — add, edit & delete transactions" : "Viewer — read-only access"}
    >
      <div className="space-y-5 max-w-7xl mx-auto">
        {/* Mini summary row */}
        <div className="grid grid-cols-3 gap-3">
          <SummaryCard title="Balance" value={balance} icon={Wallet} theme="balance" compact animationDelay={0} />
          <SummaryCard title="Income" value={totalIncome} icon={ArrowDownLeft} theme="income" compact animationDelay={60} />
          <SummaryCard title="Expenses" value={totalExpense} icon={ArrowUpRight} theme="expense" compact animationDelay={120} />
        </div>

        <TransactionTable />
      </div>
    </PageLayout>
  );
}
