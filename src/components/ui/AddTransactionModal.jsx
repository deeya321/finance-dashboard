import { useState, useEffect } from "react"
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal opens
  useEffect(() => {
    setForm(empty)
    setError("")
  }, [])

  const handle = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError("")
  }

  const submit = (e) => {
    e?.preventDefault()
    if (isSubmitting) return

    // Validation
    if (!form.description.trim()) {
      setError("Description is required.")
      return
    }

    const amountNum = Number(form.amount)
    if (!form.amount || isNaN(amountNum) || amountNum <= 0) {
      setError("Enter a valid positive amount.")
      return
    }

    setIsSubmitting(true)

    try {
      dispatch(
        addTransaction({
          id:          Date.now(),
          description: form.description.trim(),
          amount:      form.type === "expense"
                         ? -Math.abs(amountNum)
                         :  Math.abs(amountNum),
          category:    form.category,
          type:        form.type,
          date:        form.date,
        })
      )
      onClose()
    } catch (err) {
      setError("Failed to add transaction. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      autoFocus
    >
       <div
         className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
         onClick={e => e.stopPropagation()}
       >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Add Transaction</h2>
           <button
             onClick={onClose}
             className="btn-active w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg
                        hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
           >
            <RiCloseLine size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit}>
          <div className="px-6 py-5 space-y-4">

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800
                            rounded-lg px-3 py-2">{error}</p>
            )}

            {/* Type toggle */}
               <div>
                 <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Type</label>
                 <div className="flex gap-2">
                   {["expense", "income"].map((t) => (
                     <button
                       key={t}
                       type="button"
                       onClick={() => setForm((p) => ({ ...p, type: t }))}
                       className={`btn-active flex-1 py-2.5 sm:py-2 rounded-lg text-sm font-medium border transition-all capitalize
                         ${form.type === t
                           ? t === "expense"
                             ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
                             : "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800"
                           : "bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                         }`}
                     >
                       {t}
                     </button>
                   ))}
                 </div>
               </div>

            {/* Description */}
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
                Description
              </label>
             <input
               name="description"
               value={form.description}
               onChange={handle}
               placeholder="e.g. Grocery Store"
               className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 sm:py-2 text-sm
                          text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-indigo-500"
               required
               autoFocus
             />
            </div>

            {/* Amount + Category side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
                  Amount (₹)
                </label>
                 <input
                   name="amount"
                   type="number"
                   min="0"
                   step="0.01"
                   value={form.amount}
                   onChange={handle}
                   placeholder="0"
                   className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 sm:py-2 text-sm
                              text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
                              focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   required
                 />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
                  Category
                </label>
                 <select
                   name="category"
                   value={form.category}
                   onChange={handle}
                   className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 sm:py-2 text-sm
                              text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
                              focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 >
                  {categoryList.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Date</label>
             <input
               name="date"
               type="date"
               value={form.date}
               onChange={handle}
               className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 sm:py-2 text-sm
                          text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-indigo-500"
               required
             />
            </div>
          </div>

          {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-active flex-1 py-2.5 sm:py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700
                       rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-active flex-1 py-2.5 sm:py-2 text-sm font-medium text-white bg-indigo-600
                       rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Transaction
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}