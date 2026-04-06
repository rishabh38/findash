"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, selectThemeMode } from "@/store/slices/themeSlice";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 dark:text-slate-400 text-slate-600 dark:hover:bg-white/10 hover:bg-slate-100 transition-all text-sm font-medium"
    >
      <span>{mode === "dark" ? "Dark Mode" : "Light Mode"}</span>
      <div className="relative w-10 h-5 rounded-full dark:bg-navy-700 bg-slate-200 transition-colors">
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center
            ${mode === "dark" ? "left-0.5 bg-amber-400" : "left-5 bg-white shadow"}`}
        >
          {mode === "dark" ? (
            <Moon className="w-2.5 h-2.5 text-navy-900" />
          ) : (
            <Sun className="w-2.5 h-2.5 text-amber-500" />
          )}
        </span>
      </div>
    </button>
  );
}
