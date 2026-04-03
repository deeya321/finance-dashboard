import { categoryColors } from "../../data/categories"
import { fmt } from "../../utils/formatters"

export default function CategoryBreakdown({ data }) {
  const max = data[0]?.value || 1

  return (
    <div className="card-hover bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-1">
        Top Spending Categories
      </h2>
      <p className="text-xs text-gray-400 mb-5">Breakdown of where money goes</p>

      <div className="space-y-4">
        {data.map((item) => {
          const pct = Math.round((item.value / max) * 100)
          const color = categoryColors[item.name] || "#6366f1"

          return (
            <div key={item.name}>
              {/* Label row */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{pct}%</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {fmt(item.value)}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}