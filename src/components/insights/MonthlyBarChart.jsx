import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts"

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill }}>
          {p.name}: ₹{p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function MonthlyBarChart({ data }) {
  return (
    <div className="card-hover bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
        Income vs Expenses
      </h2>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">Monthly comparison</p>

      {/* Custom legend */}
      <div className="flex gap-5 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="w-3 h-3 rounded-sm bg-indigo-500" />
          Income
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="w-3 h-3 rounded-sm bg-rose-400" />
          Expenses
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200} sm:height={230} lg:height={260}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1f2937" }} />
          <Bar dataKey="income"   name="Income"   fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#fb7185" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}