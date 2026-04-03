import { useDispatch, useSelector } from "react-redux"
import {
  setSearch, setType, setCategory, resetFilters,
} from "../../features/filters/filtersSlice"
import { categoryList } from "../../data/categories"
import { fmt } from "../../utils/formatters"
import { RiSearchLine, RiFilterLine } from "react-icons/ri"

export default function TransactionFilters({ totals }) {
  const dispatch = useDispatch()
  const filters  = useSelector((s) => s.filters)

  return (
    <div className="card-hover bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex flex-wrap gap-3">

        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <RiSearchLine
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
          <input
            value={filters.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search transactions..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg
                       text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => dispatch(setType(e.target.value))}
          className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800"
        >
          <option value="all">All Categories</option>
          {categoryList.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Reset */}
        <button
          onClick={() => dispatch(resetFilters())}
          className="btn-active flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700
                     rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <RiFilterLine size={14} />
          Reset
        </button>
      </div>

      {/* Totals strip */}
      <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Income:{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">{fmt(totals.income)}</span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Expenses:{" "}
          <span className="font-semibold text-red-500 dark:text-red-400">{fmt(totals.expense)}</span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Net:{" "}
          <span className={`font-semibold ${
            totals.income - totals.expense >= 0
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-red-500 dark:text-red-400"
          }`}>
            {fmt(totals.income - totals.expense)}
          </span>
        </p>
      </div>
    </div>
  )
}