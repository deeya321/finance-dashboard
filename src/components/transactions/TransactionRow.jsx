import { useDispatch } from "react-redux"
import { RiDeleteBinLine } from "react-icons/ri"
import { deleteTransaction } from "../../features/transactions/transactionsSlice"
import { categoryColors }    from "../../data/categories"
import { fmt, formatDate }   from "../../utils/formatters"
import Badge                 from "../ui/Badge"

export default function TransactionRow({ txn, role }) {
  const dispatch = useDispatch()

  return (
    <>
      {/* Mobile card view */}
      <tr className="sm:hidden border-b border-gray-50 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 ease-in-out">
        <td className="px-3 py-3 w-full">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <span
                className="w-3 h-3 rounded-full shrink-0 mt-1"
                style={{ backgroundColor: categoryColors[txn.category] }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{txn.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{formatDate(txn.date)} · {txn.category}</p>
                <div className="mt-1">
                  <Badge type={txn.type} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className={`text-sm font-semibold ${txn.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                {txn.type === "income" ? "+" : ""}{fmt(txn.amount)}
              </span>
              {role === "admin" && (
                <button
                  onClick={() => dispatch(deleteTransaction(txn.id))}
                  className="btn-active w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400
                             hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                  title="Delete transaction"
                >
                  <RiDeleteBinLine size={16} />
                </button>
              )}
            </div>
          </div>
        </td>
      </tr>

      {/* Desktop table view */}
      <tr className="hidden sm:table-row hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 ease-in-out">

        {/* Date */}
        <td className="px-2 sm:px-5 py-3.5 text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs sm:text-sm">
          {formatDate(txn.date)}
        </td>

        {/* Description */}
        <td className="px-2 sm:px-5 py-3.5 font-medium text-gray-700 dark:text-gray-200 text-sm max-w-[120px] sm:max-w-none">
          <span className="truncate block">{txn.description}</span>
        </td>

        {/* Category */}
        <td className="px-2 sm:px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: categoryColors[txn.category] }}
            />
            <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{txn.category}</span>
          </div>
        </td>

        {/* Type */}
        <td className="px-2 sm:px-5 py-3.5">
          <Badge type={txn.type} />
        </td>

        {/* Amount */}
        <td className={`px-2 sm:px-5 py-3.5 text-right font-semibold whitespace-nowrap text-sm
          ${txn.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
          {txn.type === "income" ? "+" : ""}
          {fmt(txn.amount)}
        </td>

        {/* Admin: delete */}
        {role === "admin" && (
          <td className="px-2 sm:px-5 py-3.5 text-right">
            <button
              onClick={() => dispatch(deleteTransaction(txn.id))}
              className="btn-active w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400
                         hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              title="Delete transaction"
            >
              <RiDeleteBinLine size={18} />
            </button>
          </td>
        )}
      </tr>
    </>
  )
}
