import { useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setBudget, deleteBudget } from "../features/budget/budgetSlice"
import { categoryList } from "../data/categories"
import { fmt } from "../utils/formatters"
import { RiEditLine, RiDeleteBinLine, RiAddLine } from "react-icons/ri"
import { categoryColors } from "../data/categories"

function BudgetRow({ category, budget, spent, onEdit, onDelete }) {
  const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
  const isOver = spent > budget
  const remaining = budget - spent

  return (
    <div className="card-hover bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: categoryColors[category] }}
            />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">{category}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(category, budget)}
              className="btn-active w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg
                         hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <RiEditLine size={16} />
            </button>
            <button
              onClick={() => onDelete(category)}
              className="btn-active w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg
                         hover:bg-red-50 dark:hover:bg-red-950 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <RiDeleteBinLine size={16} />
            </button>
          </div>
        </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Budget</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(budget)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Spent</span>
          <span className={`font-medium ${isOver ? "text-red-600 dark:text-red-400" : "text-gray-800 dark:text-gray-200"}`}>
            {fmt(spent)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Remaining</span>
          <span className={`font-medium ${isOver ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
            {isOver ? `-${fmt(Math.abs(remaining))}` : fmt(remaining)}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              isOver ? "bg-red-500" : pct > 75 ? "bg-yellow-500" : "bg-green-500"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className={`text-xs mt-1 ${isOver ? "text-red-600 dark:text-red-400" : "text-gray-400 dark:text-gray-500"}`}>
          {pct.toFixed(0)}% used
          {isOver && " - Over budget!"}
        </p>
      </div>
    </div>
  )
}

function AddBudgetModal({ onClose, existingBudgets }) {
  const dispatch = useDispatch()
  const [category, setCategory] = useState(categoryList[0])
  const [amount, setAmount] = useState("")

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return
    dispatch(setBudget({ category, amount: Number(amount) }))
    onClose()
  }

  const availableCategories = categoryList.filter((c) => !(c in existingBudgets))

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Set Budget</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Category</label>
             <select
               value={category}
               onChange={(e) => setCategory(e.target.value)}
               className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 sm:py-2 text-sm
                          text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-indigo-500"
             >
              {availableCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Monthly Budget (₹)</label>
               <input
                 type="number"
                 min="0"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 placeholder="0"
                 className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 sm:py-2 text-sm
                            text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
                            focus:outline-none focus:ring-2 focus:ring-indigo-500"
               />
          </div>
        </div>
         <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
            <button
              onClick={onClose}
              className="btn-active flex-1 py-2.5 sm:py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700
                         rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="btn-active flex-1 py-2.5 sm:py-2 text-sm font-medium text-white bg-indigo-600
                         rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Set Budget
            </button>
          </div>
      </div>
    </div>
  )
}

export default function Budgets() {
  const transactions = useSelector((s) => s.transactions)
  const budgets = useSelector((s) => s.budget)
  const role = useSelector((s) => s.role)
  const [showModal, setShowModal] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [editAmount, setEditAmount] = useState("")

  const dispatch = useDispatch()

  const spendingByCategory = useMemo(() => {
    const now = new Date()
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
    const map = {}
    transactions
      .filter((t) => t.type === "expense" && t.date.startsWith(currentMonth))
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + Math.abs(t.amount)
      })
    return map
  }, [transactions])

  const handleEdit = (category, currentBudget) => {
    setEditCategory(category)
    setEditAmount(currentBudget.toString())
  }

  const handleEditSubmit = () => {
    if (!editAmount || isNaN(editAmount) || Number(editAmount) <= 0) return
    dispatch(setBudget({ category: editCategory, amount: Number(editAmount) }))
    setEditCategory(null)
    setEditAmount("")
  }

  const isAdmin = role === "admin"

  return (
    <div className="space-y-4 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Budget Management</h1>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-0.5">Set and track monthly budgets</p>
        </div>
        <div className="relative group">
          <button
            onClick={isAdmin ? () => setShowModal(true) : undefined}
            disabled={!isAdmin}
            className={`btn-active flex items-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium rounded-lg transition-colors
                       ${isAdmin 
                         ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                         : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
          >
            <RiAddLine size={18} />
            Add Budget
          </button>
          {!isAdmin && (
            <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-800 dark:bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              Only admin can add data
            </div>
          )}
        </div>
      </div>

       {Object.keys(budgets).length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 sm:p-12 text-center">
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">No budgets set yet</p>
            <div className="relative group inline-block">
              <button
                onClick={isAdmin ? () => setShowModal(true) : undefined}
                disabled={!isAdmin}
                className={`btn-active inline-flex items-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium rounded-lg transition-colors
                          ${isAdmin 
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
              >
                <RiAddLine size={18} />
                Set Your First Budget
              </button>
              {!isAdmin && (
                <div className="absolute top-full right-1/2 translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 dark:bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  Only admin can add data
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {Object.entries(budgets).map(([category, budget]) => (
             <BudgetRow
               key={category}
               category={category}
               budget={budget}
               spent={spendingByCategory[category] || 0}
               onEdit={handleEdit}
               onDelete={(cat) => dispatch(deleteBudget(cat))}
             />
           ))}
         </div>
       )}

      {showModal && (
        <AddBudgetModal
          onClose={() => setShowModal(false)}
          existingBudgets={budgets}
        />
      )}

      {editCategory && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Edit Budget - {editCategory}</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Monthly Budget (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 sm:py-2 text-sm
                             text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
               <button
                 onClick={() => { setEditCategory(null); setEditAmount("") }}
                 className="btn-active flex-1 py-2.5 sm:py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700
                            rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
               >
                 Cancel
               </button>
               <button
                 onClick={handleEditSubmit}
                 className="btn-active flex-1 py-2.5 sm:py-2 text-sm font-medium text-white bg-indigo-600
                            rounded-lg hover:bg-indigo-700 transition-colors"
               >
                 Update Budget
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  )
}
