import { useDispatch } from "react-redux"
import { RiDeleteBinLine } from "react-icons/ri"
import { deleteTransaction } from "../../features/transactions/transactionsSlice"
import { categoryColors }    from "../../data/categories"
import { fmt, formatDate }   from "../../utils/formatters"
import Badge                 from "../ui/Badge"

export default function TransactionRow({ txn, role }) {
  const dispatch = useDispatch()

  return (
    <tr className="hover:bg-gray-50 transition-colors">

      {/* Date */}
      <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
        {formatDate(txn.date)}
      </td>

      {/* Description */}
      <td className="px-5 py-3.5 font-medium text-gray-700">
        {txn.description}
      </td>

      {/* Category */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: categoryColors[txn.category] }}
          />
          <span className="text-gray-600">{txn.category}</span>
        </div>
      </td>

      {/* Type */}
      <td className="px-5 py-3.5">
        <Badge type={txn.type} />
      </td>

      {/* Amount */}
      <td className={`px-5 py-3.5 text-right font-semibold whitespace-nowrap
        ${txn.type === "income" ? "text-green-600" : "text-red-500"}`}>
        {txn.type === "income" ? "+" : ""}
        {fmt(txn.amount)}
      </td>

      {/* Admin: delete */}
      {role === "admin" && (
        <td className="px-5 py-3.5 text-right">
          <button
            onClick={() => dispatch(deleteTransaction(txn.id))}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500
                       hover:bg-red-50 transition-colors"
            title="Delete transaction"
          >
            <RiDeleteBinLine size={15} />
          </button>
        </td>
      )}
    </tr>
  )
}