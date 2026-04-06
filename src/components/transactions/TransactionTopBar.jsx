import { RiAddLine } from "react-icons/ri"

export default function TransactionTopBar({ count, role, onAdd }) {
  const isAdmin = role === "admin"
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <p className="text-sm text-gray-500 dark:text-gray-400 pr-2">
        Showing{" "}
        <span className="font-medium text-gray-700 dark:text-gray-200">{count}</span>{" "}
        transactions
      </p>

      <div className="relative group">
        <button
          onClick={isAdmin ? onAdd : undefined}
          disabled={!isAdmin}
          className={`btn-active flex items-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium rounded-lg transition-colors
                     ${isAdmin 
                       ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                       : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
        >
          <RiAddLine size={16} />
          Add Transaction
        </button>
        {!isAdmin && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 dark:bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
            Only admin can add data
          </div>
        )}
      </div>
    </div>
  )
}