const colorMap = {
  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
  green:  "bg-green-50  text-green-600  dark:bg-green-950 dark:text-green-400",
  red:    "bg-red-50    text-red-500    dark:bg-red-950   dark:text-red-400",
  teal:   "bg-teal-50   text-teal-600   dark:bg-teal-950  dark:text-teal-400",
}

export default function SummaryCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="card-hover bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center text-lg sm:text-xl shrink-0 ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 truncate">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">{subtitle}</p>}
      </div>
    </div>
  )
}
