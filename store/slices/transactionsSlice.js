import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_TRANSACTIONS, DEMO_ACCOUNT } from "@/data/mockData";

const getStorageKey = (userHash) => `fintrack_txn_${userHash}`;

const loadFromStorage = (userHash) => {
  if (typeof window === "undefined" || !userHash) return null;
  try {
    const raw = localStorage.getItem(getStorageKey(userHash));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (transactions, userHash) => {
  if (typeof window === "undefined" || !userHash) return;
  try {
    localStorage.setItem(getStorageKey(userHash), JSON.stringify(transactions));
  } catch {}
};

const initialState = {
  items: [],
  loaded: false,
  userHash: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    hydrate(state, action) {
      const { userHash, email } = action.payload;
      state.userHash = userHash;
      if (userHash) {
        const stored = loadFromStorage(userHash);
        if (stored && stored.length > 0) {
          state.items = stored;
        } else if (email === DEMO_ACCOUNT.email) {
          // Only demo account gets pre-loaded mock data
          state.items = INITIAL_TRANSACTIONS;
          saveToStorage(state.items, userHash);
        } else {
          // All other users start with empty ledger
          state.items = [];
          saveToStorage(state.items, userHash);
        }
      }
      state.loaded = true;
    },

    addTransaction(state, action) {
      state.items.unshift(action.payload);
      saveToStorage(state.items, state.userHash);
    },

    updateTransaction(state, action) {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
        saveToStorage(state.items, state.userHash);
      }
    },

    deleteTransaction(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
      saveToStorage(state.items, state.userHash);
    },

    resetTransactions(state) {
      state.items = INITIAL_TRANSACTIONS;
      saveToStorage(state.items, state.userHash);
    },

    clearTransactions(state) {
      state.items = [];
      state.loaded = false;
      state.userHash = null;
    },
  },
});

export const {
  hydrate,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  resetTransactions,
  clearTransactions,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;

// ── Selectors ────────────────────────────────────────────────
export const selectAllTransactions = (state) => state.transactions.items;
export const selectTransactionsLoaded = (state) => state.transactions.loaded;
