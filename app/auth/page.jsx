"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  signup,
  login,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  clearAuthError,
} from "@/store/slices/authSlice";
import {
  TrendingUp,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react";

export default function AuthPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Clear errors when switching modes
  useEffect(() => {
    setFormError("");
    dispatch(clearAuthError());
  }, [mode, dispatch]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    dispatch(clearAuthError());

    // Validation
    if (!email.trim()) {
      setFormError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      setFormError("Password is required.");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setFormError("Name is required for sign up.");
      return;
    }

    try {
      if (mode === "signup") {
        await dispatch(signup({ name, email, password })).unwrap();
      } else {
        await dispatch(login({ email, password })).unwrap();
      }
      router.push("/dashboard");
    } catch {
      // Error is handled via Redux state
    }
  };

  const displayError = formError || error;

  return (
    <div className="min-h-screen dark:bg-navy-950 bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/3 blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-400/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-gradient shadow-gold mb-4">
            <TrendingUp className="w-8 h-8 text-navy-900" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold dark:text-white text-slate-900">
            FinTrack
          </h1>
          <p className="text-sm dark:text-slate-500 text-slate-400 mt-1">
            Personal Finance Dashboard
          </p>
        </div>

        {/* Auth Card */}
        <div className="dark:bg-navy-900/80 bg-white/80 backdrop-blur-xl border dark:border-white/10 border-slate-200 rounded-2xl p-8 shadow-card">
          {/* Mode Toggle */}
          <div className="flex gap-1 p-1 dark:bg-white/5 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === "login"
                  ? "bg-amber-500 text-navy-900 shadow-gold"
                  : "dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-slate-700"
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === "signup"
                  ? "bg-amber-500 text-navy-900 shadow-gold"
                  : "dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-slate-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h2 className="text-lg font-bold dark:text-white text-slate-900">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-xs dark:text-slate-500 text-slate-400 mt-1">
              {mode === "login"
                ? "Enter your credentials to access your dashboard"
                : "Start tracking your finances today"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (signup only) */}
            {mode === "signup" && (
              <div className="animate-slide-up" style={{ animationDuration: "0.2s" }}>
                <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-500 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl pl-10 pr-4 py-3 dark:text-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all text-sm"
                    id="auth-name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-500 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl pl-10 pr-4 py-3 dark:text-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all text-sm"
                  id="auth-email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium dark:text-slate-400 text-slate-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-500 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  className="w-full dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl pl-10 pr-10 py-3 dark:text-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all text-sm"
                  id="auth-password"
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
              {mode === "signup" && (
                <p className="text-xs dark:text-slate-600 text-slate-400 mt-1.5">
                  Minimum 6 characters. This password is also used for admin access.
                </p>
              )}
            </div>

            {/* Error */}
            {displayError && (
              <div className="flex items-start gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2.5 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>{displayError}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold transition-all duration-200 hover:shadow-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              id="auth-submit"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : mode === "login" ? (
                <>
                  Log In
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer hint */}
          <div className="mt-6 pt-5 border-t dark:border-white/5 border-slate-100">
            <p className="text-center text-xs dark:text-slate-500 text-slate-400">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs dark:text-slate-600 text-slate-400">
          <Shield className="w-3 h-3" />
          <span>Your data is encrypted and stored locally</span>
        </div>
      </div>
    </div>
  );
}
