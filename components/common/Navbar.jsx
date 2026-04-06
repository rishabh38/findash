"use client";

import { Menu, Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { selectRole } from "@/store/slices/roleSlice";
import { selectUser } from "@/store/slices/authSlice";
import { ROLES } from "@/data/mockData";

export default function Navbar({ onMenuClick, title, subtitle }) {
  const role = useSelector(selectRole);
  const user = useSelector(selectUser);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <header className="sticky top-0 z-20 dark:bg-navy-950/80 bg-slate-50/80 backdrop-blur-md border-b dark:border-white/5 border-slate-200">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Left: menu + title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-600 dark:hover:bg-white/10 hover:bg-slate-200 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold dark:text-white text-slate-900">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs dark:text-slate-500 text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: role badge + user avatar */}
        <div className="flex items-center gap-3">
          <span
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border
            ${
              role === ROLES.ADMIN
                ? "bg-amber-500/15 text-amber-400 border-amber-500/25"
                : "bg-blue-500/15 text-blue-400 border-blue-500/25"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                role === ROLES.ADMIN ? "bg-amber-400" : "bg-blue-400"
              }`}
            />
            {role === ROLES.ADMIN ? "Admin" : "Viewer"}
          </span>

          <button className="relative p-2 rounded-xl dark:bg-white/5 bg-slate-100 dark:text-slate-400 text-slate-500 dark:hover:bg-white/10 hover:bg-slate-200 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
          </button>

          {/* User Avatar */}
          {user && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center text-xs font-bold text-navy-900">
                {initials}
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-semibold dark:text-white text-slate-900 leading-tight">
                  {user.name}
                </p>
                <p className="text-xs dark:text-slate-500 text-slate-400 leading-tight">
                  {user.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
