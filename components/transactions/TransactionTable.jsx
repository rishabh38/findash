"use client";

import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTransactions, deleteTransaction } from "@/store/slices/transactionsSlice";
import { selectFilters } from "@/store/slices/filtersSlice";
import { selectIsAdmin } from "@/store/slices/roleSlice";
import TransactionRow from "./TransactionRow";
import TransactionFilters from "./TransactionFilters";
import TransactionModal from "./TransactionModal";
import EmptyState from "@/components/common/EmptyState";
import Button from "@/components/common/Button";
import { SearchX, PlusCircle, Download } from "lucide-react";
import { exportAsCSV, exportAsJSON } from "@/utils/exportUtils";

const PAGE_SIZE = 15;

export default function TransactionTable() {
  const dispatch = useDispatch();
  const all = useSelector(selectAllTransactions);
  const filters = useSelector(selectFilters);
  const isAdmin = useSelector(selectIsAdmin);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [page, setPage] = useState(1);
  const [showExport, setShowExport] = useState(false);

  // Apply filters + sort
  const filtered = useMemo(() => {
    let list = [...all];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.note?.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }
    if (filters.type !== "all") list = list.filter((t) => t.type === filters.type);
    if (filters.category !== "all") list = list.filter((t) => t.category === filters.category);
    if (filters.dateFrom) list = list.filter((t) => t.date >= filters.dateFrom);
    if (filters.dateTo) list = list.filter((t) => t.date <= filters.dateTo);

    switch (filters.sortBy) {
      case "date_asc": list.sort((a, b) => a.date.localeCompare(b.date)); break;
      case "date_desc": list.sort((a, b) => b.date.localeCompare(a.date)); break;
      case "amount_asc": list.sort((a, b) => a.amount - b.amount); break;
      case "amount_desc": list.sort((a, b) => b.amount - a.amount); break;
      default: list.sort((a, b) => b.date.localeCompare(a.date));
    }

    return list;
  }, [all, filters]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleEdit = (txn) => { setEditTarget(txn); setModalOpen(true); };
  const handleAdd = () => { setEditTarget(null); setModalOpen(true); };
  const handleDelete = (id) => { if (confirm("Delete this transaction?")) dispatch(deleteTransaction(id)); };
  const handleModalClose = () => { setModalOpen(false); setEditTarget(null); };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <TransactionFilters totalCount={all.length} filteredCount={filtered.length} />

      {/* Action bar */}
      <div className="flex items-center justify-between gap-3">
        {/* Export */}
        <div className="relative">
          <Button
            variant="secondary"
            icon={Download}
            onClick={() => setShowExport((v) => !v)}
            size="sm"
          >
            Export
          </Button>
          {showExport && (
            <div className="absolute top-full left-0 mt-1 dark:bg-navy-900 bg-white border dark:border-white/10 border-slate-200 rounded-xl overflow-hidden shadow-card z-10 min-w-[120px] animate-slide-up">
              <button
                onClick={() => { exportAsCSV(filtered); setShowExport(false); }}
                className="w-full text-left px-4 py-2.5 text-xs dark:text-slate-300 text-slate-700 dark:hover:bg-white/10 hover:bg-slate-50 transition-colors font-medium"
              >
                Export CSV
              </button>
              <button
                onClick={() => { exportAsJSON(filtered); setShowExport(false); }}
                className="w-full text-left px-4 py-2.5 text-xs dark:text-slate-300 text-slate-700 dark:hover:bg-white/10 hover:bg-slate-50 transition-colors font-medium"
              >
                Export JSON
              </button>
            </div>
          )}
        </div>

        {isAdmin && (
          <Button variant="primary" icon={PlusCircle} onClick={handleAdd} size="sm">
            Add Transaction
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No transactions found"
            description="Try adjusting your search or filter criteria."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-white/10 border-slate-100">
                    <th className="text-left py-3 px-4 text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-wider hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                      Type
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-wider">
                      Amount
                    </th>
                    {isAdmin && (
                      <th className="py-3 px-4 text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((txn, i) => (
                    <TransactionRow
                      key={txn.id}
                      transaction={txn}
                      isAdmin={isAdmin}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      index={i}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t dark:border-white/5 border-slate-100">
                <p className="text-xs dark:text-slate-500 text-slate-400">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-1">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1.5 text-xs rounded-lg dark:bg-white/5 bg-slate-50 dark:text-slate-400 text-slate-600 dark:hover:bg-white/10 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                          p === page
                            ? "bg-amber-500 text-navy-900 font-bold"
                            : "dark:bg-white/5 bg-slate-50 dark:text-slate-400 text-slate-600 dark:hover:bg-white/10 hover:bg-slate-100"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1.5 text-xs rounded-lg dark:bg-white/5 bg-slate-50 dark:text-slate-400 text-slate-600 dark:hover:bg-white/10 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        transaction={editTarget}
      />
    </div>
  );
}
