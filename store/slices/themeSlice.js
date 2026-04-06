import { createSlice } from "@reduxjs/toolkit";

const getStorageKey = (userHash) => `fintrack_theme_${userHash}`;

const loadTheme = (userHash) => {
  if (typeof window === "undefined") return "dark";
  if (userHash) {
    return localStorage.getItem(getStorageKey(userHash)) || "dark";
  }
  return "dark";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "dark",
    userHash: null,
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        if (state.userHash) {
          localStorage.setItem(getStorageKey(state.userHash), state.mode);
        }
        if (state.mode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
    hydrateTheme(state, action) {
      const userHash = action.payload;
      state.userHash = userHash;
      const mode = loadTheme(userHash);
      state.mode = mode;
      if (typeof window !== "undefined") {
        if (mode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
    clearTheme(state) {
      state.mode = "dark";
      state.userHash = null;
    },
  },
});

export const { toggleTheme, hydrateTheme, clearTheme } = themeSlice.actions;
export default themeSlice.reducer;

export const selectThemeMode = (state) => state.theme.mode;
