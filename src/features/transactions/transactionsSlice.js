import { createSlice } from "@reduxjs/toolkit"
import { initialTransactions } from "../../data/transactions"

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialTransactions,
  reducers: {
    // Admin: add a new transaction
    addTransaction: (state, action) => {
      state.push(action.payload)
    },
    // Admin: delete a transaction by id
    deleteTransaction: (state, action) => {
      return state.filter((t) => t.id !== action.payload)
    },
  },
})

export const { addTransaction, deleteTransaction } = transactionsSlice.actions
export default transactionsSlice.reducer