"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAdminPassword, selectAuthLoading } from "@/store/slices/authSlice";
import { Shield, X, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

export default function AdminPasswordModal({ open, onClose, onVerified }) {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      const result = await dispatch(verifyAdminPassword({ password })).unwrap();
      if (result) {
        setPassword("");
        setError("");
        onVerified();
      }
    } catch (err) {
      setError(err || "Incorrect password. Please try again.");
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm mx-4 animate-slide-up">
        <div className="dark:bg-navy-900 bg-white border dark:border-white/10 border-slate-200 rounded-2xl p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold dark:text-white text-slate-900">
                  Admin Access
                </h3>
                <p className="text-xs dark:text-slate-500 text-slate-400">
                  Enter your password to continue
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg dark:text-slate-400 text-slate-500 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-500 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoFocus
                className="w-full dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl pl-10 pr-10 py-3 dark:text-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-slate-500 text-slate-400 hover:text-slate-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 px-4 rounded-xl dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-600 text-sm font-medium dark:hover:bg-white/10 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 text-sm font-semibold transition-all duration-200 hover:shadow-gold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Shield className="w-3.5 h-3.5" />
                    Verify
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
