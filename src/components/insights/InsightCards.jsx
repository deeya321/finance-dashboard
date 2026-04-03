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
      sub:     `$${insights.topCategoryAmount.toLocaleString()} spent`,
    },
    {
      icon:    <RiTrophyLine size={20} />,
      color:   "green",
      label:   "Best Savings Month",
      value:   insights.bestMonth,
      sub:     `$${insights.bestMonthSavings.toLocaleString()} saved`,
    },
    {
      icon:    <RiArrowUpDownLine size={20} />,
      color:   "indigo",
      label:   "Avg Monthly Expense",
      value:   `$${insights.avgMonthlyExpense.toLocaleString()}`,
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
    red:    "bg-red-50 text-red-500",
    green:  "bg-green-50 text-green-600",
    indigo: "bg-indigo-50 text-indigo-600",
    teal:   "bg-teal-50 text-teal-600",
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4"
        >
          <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${colorMap[card.color]}`}>
            {card.icon}
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">{card.label}</p>
            <p className="text-lg font-semibold text-gray-800">{card.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}