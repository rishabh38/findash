import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionsSlice";
import filtersReducer from "./slices/filtersSlice";
import roleReducer from "./slices/roleSlice";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    filters: filtersReducer,
    role: roleReducer,
    theme: themeReducer,
  },
});

export default store;
