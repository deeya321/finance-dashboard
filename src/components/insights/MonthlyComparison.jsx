import { fmt } from "../../utils/formatters"
import { RiArrowUpLine, RiArrowDownLine, RiSubtractLine } from "react-icons/ri"

function DeltaBadge({ current, previous }) {
  if (!previous) return <span className="text-xs text-gray-400">—</span>

  const diff = current - previous
  const pct  = Math.abs(Math.round((diff / previous) * 100))

  if (diff > 0)
    return (
      <span className="flex items-center gap-0.5 text-xs font-medium text-red-500">
        <RiArrowUpLine size={12} /> {pct}%
      </span>
    )
  if (diff < 0)
    return (
      <span className="flex items-center gap-0.5 text-xs font-medium text-green-600">
        <RiArrowDownLine size={12} /> {pct}%
      </span>
    )
  return <RiSubtractLine size={12} className="text-gray-400" />
}

export default function MonthlyComparison({ data }) {
  return (
    <div className="card-hover bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-1">
        Month-by-Month Comparison
      </h2>
      <p className="text-xs text-gray-400 mb-5">
        Expense delta vs previous month — green means you spent less
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left pb-3 text-xs font-medium text-gray-500">Month</th>
              <th className="text-right pb-3 text-xs font-medium text-gray-500">Income</th>
              <th className="text-right pb-3 text-xs font-medium text-gray-500">Expenses</th>
              <th className="text-right pb-3 text-xs font-medium text-gray-500">vs Last Month</th>
              <th className="text-right pb-3 text-xs font-medium text-gray-500">Savings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, i) => (
              <tr key={row.month} className="hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                <td className="py-3 font-medium text-gray-700">{row.month}</td>
                <td className="py-3 text-right text-green-600 font-medium">
                  {fmt(row.income)}
                </td>
                <td className="py-3 text-right text-red-500 font-medium">
                  {fmt(row.expenses)}
                </td>
                <td className="py-3 text-right">
                  <DeltaBadge
                    current={row.expenses}
                    previous={data[i - 1]?.expenses}
                  />
                </td>
                <td className={`py-3 text-right font-semibold ${
                  row.income - row.expenses >= 0
                    ? "text-indigo-600"
                    : "text-red-500"
                }`}>
                  {fmt(row.income - row.expenses)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}