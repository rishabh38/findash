"use client";

import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger: "btn-danger",
  ghost: "flex items-center gap-2 text-sm font-medium dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-900 transition-colors px-3 py-2 rounded-xl dark:hover:bg-white/5 hover:bg-slate-100",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  type = "button",
  className = "",
  size = "md",
}) {
  const sizeClasses = size === "sm" ? "!px-3 !py-1.5 !text-xs" : size === "lg" ? "!px-6 !py-3 !text-base" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${VARIANTS[variant]} ${sizeClasses} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
}
