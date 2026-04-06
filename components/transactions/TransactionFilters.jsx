"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setSearch, setType, setCategory, setSortBy,
  setDateFrom, setDateTo, resetFilters, selectFilters,
} from "@/store/slices/filtersSlice";
import { CATEGORIES } from "@/data/mockData";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function TransactionFilters({ totalCount, filteredCount }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [expanded, setExpanded] = useState(false);

  const hasActiveFilters =
    filters.search || filters.type !== "all" || filters.category !== "all" ||
    filters.dateFrom || filters.dateTo || filters.sortBy !== "date_desc";

  return (
    <div className="dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-4 space-y-3">
      {/* Search bar + expand */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-500 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions…"
            value={filters.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="input-field pl-9"
          />
          {filters.search && (
            <button
              onClick={() => dispatch(setSearch(""))}
              className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-slate-500 text-slate-400 dark:hover:text-slate-200 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all
            ${expanded || hasActiveFilters
              ? "dark:bg-amber-500/15 bg-amber-50 dark:border-amber-500/30 border-amber-200 text-amber-500 dark:text-amber-400"
              : "dark:bg-white/5 bg-slate-50 dark:border-white/10 border-slate-200 dark:text-slate-400 text-slate-600"
            }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-navy-900 text-xs font-bold flex items-center justify-center">
              !
            </span>
          )}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Expanded filters */}
      {expanded && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1 animate-fade-in">
          {/* Type */}
          <div className="relative">
            <label className="block text-xs dark:text-slate-500 text-slate-400 mb-1">Type</label>
            <select
              value={filters.type}
              onChange={(e) => dispatch(setType(e.target.value))}
              className="select-field dark:bg-navy-900"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div className="relative col-span-2 sm:col-span-1">
            <label className="block text-xs dark:text-slate-500 text-slate-400 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="select-field dark:bg-navy-900"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs dark:text-slate-500 text-slate-400 mb-1">Sort by</label>
            <select
              value={filters.sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="select-field dark:bg-navy-900"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="amount_desc">Highest Amount</option>
              <option value="amount_asc">Lowest Amount</option>
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="block text-xs dark:text-slate-500 text-slate-400 mb-1">From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => dispatch(setDateFrom(e.target.value))}
              className="input-field dark:[color-scheme:dark]"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-xs dark:text-slate-500 text-slate-400 mb-1">To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => dispatch(setDateTo(e.target.value))}
              className="input-field dark:[color-scheme:dark]"
            />
          </div>
        </div>
      )}

      {/* Stats + reset */}
      <div className="flex items-center justify-between">
        <p className="text-xs dark:text-slate-500 text-slate-400">
          Showing{" "}
          <span className="dark:text-slate-300 text-slate-700 font-semibold">{filteredCount}</span>
          {" "}of{" "}
          <span className="dark:text-slate-300 text-slate-700 font-semibold">{totalCount}</span>{" "}
          transactions
        </p>
        {hasActiveFilters && (
          <button
            onClick={() => dispatch(resetFilters())}
            className="text-xs text-amber-500 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
