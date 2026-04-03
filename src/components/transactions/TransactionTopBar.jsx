import { RiAddLine } from "react-icons/ri"

export default function TransactionTopBar({ count, role, onAdd }) {
  return (
    <div className="flex items-center justify-between ">
      <p className="text-sm text-gray-500 dark:text-gray-400 pr-2">
        Showing{" "}
        <span className="font-medium text-gray-700 dark:text-gray-200">{count}</span>{" "}
        transactions
      </p>

      {role === "admin" && (
        <button
          onClick={onAdd}
          className="btn-active flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                     text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <RiAddLine size={16} />
          Add Transaction
        </button>
      )}
    </div>
  )
}