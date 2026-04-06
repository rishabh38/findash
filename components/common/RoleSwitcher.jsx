"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRole, selectRole } from "@/store/slices/roleSlice";
import { selectUser } from "@/store/slices/authSlice";
import { ROLES } from "@/data/mockData";
import { Shield, Eye, Lock } from "lucide-react";
import AdminPasswordModal from "./AdminPasswordModal";

export default function RoleSwitcher() {
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const user = useSelector(selectUser);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleAdminClick = () => {
    if (role === ROLES.ADMIN) return; // Already admin
    setShowPasswordModal(true);
  };

  const handleAdminVerified = () => {
    dispatch(setRole(ROLES.ADMIN));
    setShowPasswordModal(false);
  };

  const handleViewerClick = () => {
    dispatch(setRole(ROLES.VIEWER));
  };

  return (
    <>
      <div className="dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl p-1 flex gap-1">
        <button
          onClick={handleAdminClick}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
            role === ROLES.ADMIN
              ? "bg-amber-500 text-navy-900 shadow-gold"
              : "dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-700"
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          Admin
          {role !== ROLES.ADMIN && <Lock className="w-2.5 h-2.5 opacity-50" />}
        </button>
        <button
          onClick={handleViewerClick}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
            role === ROLES.VIEWER
              ? "bg-blue-500 text-white shadow-sm"
              : "dark:text-slate-400 text-slate-500 dark:hover:text-slate-200 hover:text-slate-700"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Viewer
        </button>
      </div>

      <AdminPasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onVerified={handleAdminVerified}
      />
    </>
  );
}
