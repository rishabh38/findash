"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  TrendingUp,
  X,
  LogOut,
} from "lucide-react";
import RoleSwitcher from "./RoleSwitcher";
import ThemeToggle from "./ThemeToggle";
import { selectUser, logout } from "@/store/slices/authSlice";
import { clearTransactions } from "@/store/slices/transactionsSlice";
import { clearRole } from "@/store/slices/roleSlice";
import { clearTheme } from "@/store/slices/themeSlice";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearTransactions());
    dispatch(clearRole());
    dispatch(clearTheme());
    router.push("/auth");
  };

  // Generate avatar initials
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-40 sidebar-transition
          dark:bg-navy-900 bg-white border-r dark:border-white/5 border-slate-200
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b dark:border-white/5 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold">
              <TrendingUp className="w-5 h-5 text-navy-900" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-bold dark:text-white text-slate-900 leading-tight">
                FinTrack
              </p>
              <p className="text-xs dark:text-slate-500 text-slate-400">
                Personal Finance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg dark:text-slate-400 text-slate-500 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Profile */}
        {user && (
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl dark:bg-white/5 bg-slate-50 border dark:border-white/5 border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center text-xs font-bold text-navy-900 flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold dark:text-white text-slate-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs dark:text-slate-500 text-slate-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Role Switcher */}
        <div className="px-4 pt-2">
          <RoleSwitcher />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold dark:text-slate-600 text-slate-400 uppercase tracking-wider px-3 mb-3">
            Navigation
          </p>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? "text-amber-400" : ""
                  }`}
                />
                <span>{label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 pb-5 border-t dark:border-white/5 border-slate-100 pt-4 space-y-3">
          <ThemeToggle />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl dark:bg-rose-500/10 bg-rose-50 dark:text-rose-400 text-rose-600 dark:border dark:border-rose-500/20 border border-rose-200 text-xs font-semibold dark:hover:bg-rose-500/20 hover:bg-rose-100 transition-all duration-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>

          <p className="text-center text-xs dark:text-slate-600 text-slate-400">
            Finance Dashboard v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
