import { configureStore } from "@reduxjs/toolkit"
import transactionsReducer from "../features/transactions/transactionsSlice"
import roleReducer         from "../features/role/roleSlice"
import filtersReducer      from "../features/filters/filtersSlice"
import themeReducer        from "../features/theme/themeSlice"

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    role:         roleReducer,
    filters:      filtersReducer,
    theme:        themeReducer,
  },
})