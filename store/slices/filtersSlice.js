import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  type: "all", // 'all' | 'income' | 'expense'
  category: "all",
  sortBy: "date_desc", // 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'
  dateFrom: "",
  dateTo: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setDateFrom(state, action) {
      state.dateFrom = action.payload;
    },
    setDateTo(state, action) {
      state.dateTo = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSearch,
  setType,
  setCategory,
  setSortBy,
  setDateFrom,
  setDateTo,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

export const selectFilters = (state) => state.filters;
