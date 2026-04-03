import { configureStore } from "@reduxjs/toolkit"
import transactionsReducer from "../features/transactions/transactionsSlice"
import roleReducer         from "../features/role/roleSlice"
import filtersReducer      from "../features/filters/filtersSlice"

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    role:         roleReducer,
    filters:      filtersReducer,
  },
})