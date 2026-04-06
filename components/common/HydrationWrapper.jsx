"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { hydrate } from "@/store/slices/transactionsSlice";
import { hydrateRole } from "@/store/slices/roleSlice";
import { hydrateTheme } from "@/store/slices/themeSlice";
import {
  hydrateAuth,
  selectIsAuthenticated,
  selectUser,
  selectIsFirstLogin,
} from "@/store/slices/authSlice";

export default function HydrationWrapper({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isFirstLogin = useSelector(selectIsFirstLogin);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Step 1: Hydrate auth first
    dispatch(hydrateAuth());
    setHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    if (isAuthenticated && user?.userHash) {
      // Step 2: Hydrate user-specific data
      dispatch(hydrate({ userHash: user.userHash, email: user.email }));
      dispatch(hydrateRole({ userHash: user.userHash, isFirstLogin }));
      dispatch(hydrateTheme(user.userHash));
    }
  }, [hydrated, isAuthenticated, user, isFirstLogin, dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    // Auth guard: redirect unauthenticated users to /auth
    const isAuthPage = pathname === "/auth";

    if (!isAuthenticated && !isAuthPage) {
      router.push("/auth");
    } else if (isAuthenticated && isAuthPage) {
      router.push("/dashboard");
    }
  }, [hydrated, isAuthenticated, pathname, router]);

  // Show nothing during initial hydration to prevent flash
  if (!hydrated) {
    return (
      <div className="min-h-screen dark:bg-navy-950 bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold animate-pulse">
            <svg className="w-5 h-5 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-xs dark:text-slate-500 text-slate-400 font-medium">Loading FinTrack...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
