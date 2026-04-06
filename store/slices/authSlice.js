import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hashPassword, verifyPassword, shortHash } from "@/utils/crypto";
import { DEMO_ACCOUNT } from "@/data/mockData";

const USERS_KEY = "fintrack_users";
const SESSION_KEY = "fintrack_session";

// ── Helpers ──────────────────────────────────────────────────
const loadUsers = () => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
  } catch {
    return {};
  }
};

const saveUsers = (users) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

const loadSession = () => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
};

const saveSession = (session) => {
  if (typeof window !== "undefined") {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }
};

// ── Async thunks ─────────────────────────────────────────────
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }, { rejectWithValue }) => {
    const users = loadUsers();
    const emailKey = email.toLowerCase().trim();

    if (users[emailKey]) {
      return rejectWithValue("An account with this email already exists. Please login instead.");
    }

    if (password.length < 6) {
      return rejectWithValue("Password must be at least 6 characters.");
    }

    const passwordHash = await hashPassword(password);
    const userHash = await shortHash(emailKey);

    const user = {
      email: emailKey,
      name: name.trim(),
      passwordHash,
      userHash,
      createdAt: new Date().toISOString(),
    };

    users[emailKey] = user;
    saveUsers(users);

    // Login count tracking
    const loginCountKey = `fintrack_logincount_${userHash}`;
    localStorage.setItem(loginCountKey, "1");

    const session = { email: emailKey, name: user.name, userHash, loginCount: 1 };
    saveSession(session);

    return { user: { email: emailKey, name: user.name, userHash }, isFirstLogin: true };
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    const users = loadUsers();
    const emailKey = email.toLowerCase().trim();
    const user = users[emailKey];

    if (!user) {
      return rejectWithValue("No account found with this email. Please sign up first.");
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return rejectWithValue("Incorrect password. Please try again.");
    }

    const userHash = user.userHash || (await shortHash(emailKey));

    // Update login count
    const loginCountKey = `fintrack_logincount_${userHash}`;
    const prevCount = parseInt(localStorage.getItem(loginCountKey) || "0", 10);
    const newCount = prevCount + 1;
    localStorage.setItem(loginCountKey, String(newCount));

    // If userHash wasn't stored, save it now
    if (!user.userHash) {
      user.userHash = userHash;
      users[emailKey] = user;
      saveUsers(users);
    }

    const session = { email: emailKey, name: user.name, userHash, loginCount: newCount };
    saveSession(session);

    return {
      user: { email: emailKey, name: user.name, userHash },
      isFirstLogin: newCount === 1,
    };
  }
);

export const verifyAdminPassword = createAsyncThunk(
  "auth/verifyAdminPassword",
  async ({ password }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.user) return rejectWithValue("Not logged in.");

    const users = loadUsers();
    const user = users[auth.user.email];
    if (!user) return rejectWithValue("User not found.");

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) return rejectWithValue("Incorrect password.");

    return true;
  }
);

// ── Slice ────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // { email, name, userHash }
    isAuthenticated: false,
    isFirstLogin: false,
    loading: false,
    error: null,
  },
  reducers: {
    hydrateAuth(state) {
      // Seed demo account if it doesn't exist yet
      if (typeof window !== "undefined") {
        const users = loadUsers();
        if (!users[DEMO_ACCOUNT.email]) {
          users[DEMO_ACCOUNT.email] = { ...DEMO_ACCOUNT };
          saveUsers(users);
        }
      }

      const session = loadSession();
      if (session) {
        state.user = { email: session.email, name: session.name, userHash: session.userHash };
        state.isAuthenticated = true;
        state.isFirstLogin = session.loginCount === 1;
      }
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isFirstLogin = false;
      state.error = null;
      saveSession(null);
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isFirstLogin = action.payload.isFirstLogin;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Signup failed.";
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isFirstLogin = action.payload.isFirstLogin;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed.";
    });

    // Verify admin password
    builder.addCase(verifyAdminPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyAdminPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(verifyAdminPassword.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { hydrateAuth, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

// ── Selectors ────────────────────────────────────────────────
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsFirstLogin = (state) => state.auth.isFirstLogin;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
