import { configureStore } from "@reduxjs/toolkit"
import transactionsReducer from "../features/transactions/transactionsSlice"
import roleReducer         from "../features/role/roleSlice"
import filtersReducer      from "../features/filters/filtersSlice"
import themeReducer        from "../features/theme/themeSlice"
import budgetReducer       from "../features/budget/budgetSlice"

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    role:         roleReducer,
    filters:      filtersReducer,
    theme:        themeReducer,
    budget:       budgetReducer,
  },
})