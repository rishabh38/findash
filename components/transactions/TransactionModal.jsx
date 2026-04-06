"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, updateTransaction } from "@/store/slices/transactionsSlice";
import { CATEGORIES } from "@/data/mockData";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import { Save, PlusCircle } from "lucide-react";

const EMPTY_FORM = {
  description: "",
  amount: "",
  category: "Food & Dining",
  type: "expense",
  date: new Date().toISOString().split("T")[0],
  note: "",
};

export default function TransactionModal({ isOpen, onClose, transaction = null }) {
  const dispatch = useDispatch();
  const isEditing = Boolean(transaction);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        amount: String(transaction.amount),
        category: transaction.category,
        type: transaction.type,
        date: transaction.date,
        note: transaction.note || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [transaction, isOpen]);

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = "Enter a valid positive amount";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    const payload = {
      ...(isEditing ? transaction : {}),
      id: isEditing ? transaction.id : `TXN-${Date.now()}`,
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
      note: form.note.trim(),
    };

    if (isEditing) {
      dispatch(updateTransaction(payload));
    } else {
      dispatch(addTransaction(payload));
    }
    onClose();
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    },
  });

  const inputCls = (key) =>
    `input-field ${errors[key] ? "!border-rose-500/60 !ring-rose-500/30" : ""}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Transaction" : "Add Transaction"}
    >
      <div className="space-y-4">
        {/* Type toggle */}
        <div>
          <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 mb-2">
            Transaction Type
          </label>
          <div className="flex gap-2">
            {["expense", "income"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  form.type === t
                    ? t === "income"
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                      : "bg-rose-500/20 border-rose-500/40 text-rose-400"
                    : "dark:bg-white/5 bg-slate-50 dark:border-white/10 border-slate-200 dark:text-slate-400 text-slate-500"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 mb-1.5">
            Description *
          </label>
          <input
            type="text"
            placeholder="e.g. Monthly salary, Grocery run…"
            className={inputCls("description")}
            {...field("description")}
          />
          {errors.description && (
            <p className="text-xs text-rose-400 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Amount + Date */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 mb-1.5">
              Amount (₹) *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              className={`${inputCls("amount")} font-mono`}
              {...field("amount")}
            />
            {errors.amount && (
              <p className="text-xs text-rose-400 mt-1">{errors.amount}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 mb-1.5">
              Date *
            </label>
            <input
              type="date"
              className={`${inputCls("date")} dark:[color-scheme:dark]`}
              {...field("date")}
            />
            {errors.date && (
              <p className="text-xs text-rose-400 mt-1">{errors.date}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 mb-1.5">
            Category
          </label>
          <div className="relative">
            <select className="select-field dark:bg-navy-800" {...field("category")}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 mb-1.5">
            Note (optional)
          </label>
          <textarea
            rows={2}
            placeholder="Any additional details…"
            className="input-field resize-none"
            {...field("note")}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            icon={isEditing ? Save : PlusCircle}
            className="flex-1 justify-center"
          >
            {isEditing ? "Save Changes" : "Add Transaction"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
