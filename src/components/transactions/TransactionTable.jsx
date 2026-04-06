import { useDispatch } from "react-redux"
import { setSortBy }   from "../../features/filters/filtersSlice"
import { resetFilters } from "../../features/filters/filtersSlice"
import { RiArrowUpSLine, RiArrowDownSLine, RiFilterLine } from "react-icons/ri"
import TransactionRow from "./TransactionRow"

// Sort icon shown in column headers
function SortIcon({ field, sortBy }) {
  if (sortBy === `${field}_asc`)  return <RiArrowUpSLine   size={14} />
  if (sortBy === `${field}_desc`) return <RiArrowDownSLine size={14} />
  return <RiArrowDownSLine size={14} className="opacity-30" />
}

export default function TransactionTable({ transactions, sortBy, role }) {
  const dispatch = useDispatch()

  const toggleSort = (field) => {
    dispatch(setSortBy(
      sortBy === `${field}_desc` ? `${field}_asc` : `${field}_desc`
    ))
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
       <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
          <div className="w-12 h-12 sm:w-12 sm:h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
            <RiFilterLine size={20} className="text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">No transactions found</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your filters</p>
          <button
            onClick={() => dispatch(resetFilters())}
            className="mt-4 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      </div>
    )
  }

  // ── Table ──────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

           {/* Head */}
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                <th className="text-left px-2 sm:px-5 py-2 sm:py-3 text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                  <button
                    onClick={() => toggleSort("date")}
                    className="flex items-center gap-1 px-2 py-1 -mx-2 -my-1 hover:text-gray-700 dark:hover:text-gray-200 rounded"
                  >
                    Date <SortIcon field="date" sortBy={sortBy} />
                  </button>
                </th>
                <th className="text-left px-2 sm:px-5 py-2 sm:py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Description
                </th>
                <th className="text-left px-2 sm:px-5 py-2 sm:py-3 text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left px-2 sm:px-5 py-2 sm:py-3 text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                  Type
                </th>
                <th className="text-right px-2 sm:px-5 py-2 sm:py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <button
                    onClick={() => toggleSort("amount")}
                    className="flex items-center gap-1 ml-auto px-2 py-1 -mx-2 -my-1 hover:text-gray-700 dark:hover:text-gray-200 rounded"
                  >
                    Amount <SortIcon field="amount" sortBy={sortBy} />
                  </button>
                </th>
                {role === "admin" && (
                  <th className="text-right px-2 sm:px-5 py-2 sm:py-3 text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                    Action
                  </th>
                )}
              </tr>
            </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {transactions.map((txn) => (
              <TransactionRow key={txn.id} txn={txn} role={role} />
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}