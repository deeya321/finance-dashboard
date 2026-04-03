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
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <RiFilterLine size={20} className="text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-600">No transactions found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
          <button
            onClick={() => dispatch(resetFilters())}
            className="mt-4 text-xs text-indigo-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      </div>
    )
  }

  // ── Table ──────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* Head */}
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">
                <button
                  onClick={() => toggleSort("date")}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Date <SortIcon field="date" sortBy={sortBy} />
                </button>
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">
                Description
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">
                Category
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">
                Type
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-gray-500">
                <button
                  onClick={() => toggleSort("amount")}
                  className="flex items-center gap-1 ml-auto hover:text-gray-700"
                >
                  Amount <SortIcon field="amount" sortBy={sortBy} />
                </button>
              </th>
              {role === "admin" && (
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500">
                  Action
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-50">
            {transactions.map((txn) => (
              <TransactionRow key={txn.id} txn={txn} role={role} />
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}