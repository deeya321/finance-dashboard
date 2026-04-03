import { createSlice } from "@reduxjs/toolkit"

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    search:   "",
    type:     "all",       // "all" | "income" | "expense"
    category: "all",
    sortBy:   "date_desc", // "date_desc" | "date_asc" | "amount_desc" | "amount_asc"
  },
  reducers: {
    setSearch:   (state, action) => { state.search   = action.payload },
    setType:     (state, action) => { state.type     = action.payload },
    setCategory: (state, action) => { state.category = action.payload },
    setSortBy:   (state, action) => { state.sortBy   = action.payload },
    resetFilters:(state) => {
      state.search   = ""
      state.type     = "all"
      state.category = "all"
      state.sortBy   = "date_desc"
    },
  },
})

export const { setSearch, setType, setCategory, setSortBy, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer