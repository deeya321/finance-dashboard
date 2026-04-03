import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTransaction } from "../../features/transactions/transactionsSlice"
import { categoryList } from "../../data/categories"
import { RiCloseLine } from "react-icons/ri"

const empty = {
  description: "",
  amount:      "",
  category:    "Food",
  type:        "expense",
  date:        new Date().toISOString().split("T")[0],
}

export default function AddTransactionModal({ onClose }) {
  const dispatch = useDispatch()
  const [form, setForm]     = useState(empty)
  const [error, setError]   = useState("")

  const handle = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = () => {
    if (!form.description.trim()) return setError("Description is required.")
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      return setError("Enter a valid positive amount.")

    dispatch(
      addTransaction({
        id:          Date.now(),
        description: form.description.trim(),
        amount:      form.type === "expense"
                       ? -Math.abs(Number(form.amount))
                       :  Math.abs(Number(form.amount)),
        category:    form.category,
        type:        form.type,
        date:        form.date,
      })
    )
    onClose()
  }

  return (
    /* Backdrop */
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">Add Transaction</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg
                       hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RiCloseLine size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200
                          rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Type toggle */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Type</label>
            <div className="flex gap-2">
              {["expense", "income"].map((t) => (
                <button
                  key={t}
                  onClick={() => setForm((p) => ({ ...p, type: t }))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all capitalize
                    ${form.type === t
                      ? t === "expense"
                        ? "bg-red-50 text-red-600 border-red-200"
                        : "bg-green-50 text-green-700 border-green-200"
                      : "bg-white text-gray-400 border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">
              Description
            </label>
            <input
              name="description"
              value={form.description}
              onChange={handle}
              placeholder="e.g. Grocery Store"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                         text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Amount + Category side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                Amount (₹)
              </label>
              <input
                name="amount"
                type="number"
                min="0"
                value={form.amount}
                onChange={handle}
                placeholder="0"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                           text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handle}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                           text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categoryList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handle}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                         text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm font-medium text-gray-600 border border-gray-200
                       rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 py-2 text-sm font-medium text-white bg-indigo-600
                       rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add Transaction
          </button>
        </div>

      </div>
    </div>
  )
}