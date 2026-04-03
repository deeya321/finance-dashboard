import { createSlice } from "@reduxjs/toolkit"
import { categoryList } from "../../data/categories"

const loadBudgets = () => {
  try {
    const saved = localStorage.getItem("fintrack_budgets")
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

const saveBudgets = (budgets) => {
  try {
    localStorage.setItem("fintrack_budgets", JSON.stringify(budgets))
  } catch {}
}

const budgetSlice = createSlice({
  name: "budget",
  initialState: loadBudgets(),
  reducers: {
    setBudget: (state, action) => {
      const { category, amount } = action.payload
      state[category] = amount
      saveBudgets(state)
    },
    deleteBudget: (state, action) => {
      delete state[action.payload]
      saveBudgets(state)
    },
  },
})

export const { setBudget, deleteBudget } = budgetSlice.actions
export default budgetSlice.reducer
