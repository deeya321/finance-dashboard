import { createSlice } from "@reduxjs/toolkit"

const loadFilters = () => {
  try {
    const saved = localStorage.getItem("fintrack_filters")
    return saved ? JSON.parse(saved) : {
      search:   "",
      type:     "all",
      category: "all",
      sortBy:   "date_desc",
    }
  } catch {
    return {
      search:   "",
      type:     "all",
      category: "all",
      sortBy:   "date_desc",
    }
  }
}

const saveFilters = (state) => {
  try {
    localStorage.setItem("fintrack_filters", JSON.stringify(state))
  } catch {}
}

const filtersSlice = createSlice({
  name: "filters",
  initialState: loadFilters(),
  reducers: {
    setSearch:   (state, action) => { state.search   = action.payload; saveFilters(state) },
    setType:     (state, action) => { state.type     = action.payload; saveFilters(state) },
    setCategory: (state, action) => { state.category = action.payload; saveFilters(state) },
    setSortBy:   (state, action) => { state.sortBy   = action.payload; saveFilters(state) },
    resetFilters:(state) => {
      state.search   = ""
      state.type     = "all"
      state.category = "all"
      state.sortBy   = "date_desc"
      saveFilters(state)
    },
  },
})

export const { setSearch, setType, setCategory, setSortBy, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer