import { createSlice } from "@reduxjs/toolkit"
import { initialTransactions } from "../../data/transactions"

// Load from localStorage if available, else use mock data
const load = () => {
  try {
    const saved = localStorage.getItem("fintrack_transactions")
    return saved ? JSON.parse(saved) : initialTransactions
  } catch {
    return initialTransactions
  }
}

// Save to localStorage
const save = (state) => {
  try {
    localStorage.setItem("fintrack_transactions", JSON.stringify(state))
  } catch {}
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: load(),
  reducers: {
    addTransaction: (state, action) => {
      state.push(action.payload)
      save(state)
    },
    deleteTransaction: (state, action) => {
      const next = state.filter((t) => t.id !== action.payload)
      save(next)
      return next
    },
  },
})

export const { addTransaction, deleteTransaction } = transactionsSlice.actions
export default transactionsSlice.reducer