import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from "@/data/mockData";

const getStorageKey = (userHash) => `fintrack_role_${userHash}`;

const loadRole = (userHash) => {
  if (typeof window === "undefined" || !userHash) return ROLES.VIEWER;
  return localStorage.getItem(getStorageKey(userHash)) || ROLES.VIEWER;
};

const roleSlice = createSlice({
  name: "role",
  initialState: {
    current: ROLES.VIEWER,
    userHash: null,
  },
  reducers: {
    setRole(state, action) {
      state.current = action.payload;
      if (typeof window !== "undefined" && state.userHash) {
        localStorage.setItem(getStorageKey(state.userHash), action.payload);
      }
    },
    hydrateRole(state, action) {
      const { userHash, isFirstLogin } = action.payload || {};
      state.userHash = userHash;
      if (isFirstLogin) {
        // First-time login → Admin mode directly
        state.current = ROLES.ADMIN;
        if (typeof window !== "undefined" && userHash) {
          localStorage.setItem(getStorageKey(userHash), ROLES.ADMIN);
        }
      } else {
        // Returning user → Viewer mode first
        state.current = ROLES.VIEWER;
      }
    },
    clearRole(state) {
      state.current = ROLES.VIEWER;
      state.userHash = null;
    },
  },
});

export const { setRole, hydrateRole, clearRole } = roleSlice.actions;
export default roleSlice.reducer;

export const selectRole = (state) => state.role.current;
export const selectIsAdmin = (state) => state.role.current === ROLES.ADMIN;
