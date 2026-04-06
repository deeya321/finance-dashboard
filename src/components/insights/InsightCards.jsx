import {
  RiAlarmWarningLine,
  RiTrophyLine,
  RiArrowUpDownLine,
  RiCalendarCheckLine,
} from "react-icons/ri"

export default function InsightCards({ insights }) {
  const cards = [
    {
      icon:    <RiAlarmWarningLine size={20} />,
      color:   "red",
      label:   "Highest Spending Category",
      value:   insights.topCategory,
      sub:     `₹${insights.topCategoryAmount.toLocaleString()} spent`,
    },
    {
      icon:    <RiTrophyLine size={20} />,
      color:   "green",
      label:   "Best Savings Month",
      value:   insights.bestMonth,
      sub:     `₹${insights.bestMonthSavings.toLocaleString()} saved`,
    },
    {
      icon:    <RiArrowUpDownLine size={20} />,
      color:   "indigo",
      label:   "Avg Monthly Expense",
      value:   `₹${insights.avgMonthlyExpense.toLocaleString()}`,
      sub:     "Across all months",
    },
    {
      icon:    <RiCalendarCheckLine size={20} />,
      color:   "teal",
      label:   "Most Active Month",
      value:   insights.mostActiveMonth,
      sub:     `${insights.mostActiveCount} transactions`,
    },
  ]

  const colorMap = {
    red:    "bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-400",
    green:  "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    teal:   "bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="card-hover bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 flex items-start gap-3 sm:gap-4"
        >
          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center shrink-0 ${colorMap[card.color]}`}>
            {card.icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{card.label}</p>
            <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">{card.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}