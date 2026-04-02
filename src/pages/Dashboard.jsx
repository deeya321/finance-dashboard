import { useMemo } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts"
import { transactions, categoryColors } from "../data/mockData"
import SummaryCard from "../components/ui/SummaryCard"

// ── helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)

const MONTHS = ["Jan", "Feb", "Mar", "Apr"]

// ── custom tooltip for line chart ────────────────────────────────────────────
function LineTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-gray-700 mb-1">{label}</p>
      <p className="text-indigo-600">Balance: {fmt(payload[0].value)}</p>
    </div>
  )
}

// ── custom tooltip for pie chart ─────────────────────────────────────────────
function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-gray-700">{payload[0].name}</p>
      <p style={{ color: payload[0].payload.fill }}>{fmt(payload[0].value)}</p>
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────
export default function Dashboard() {
  // 1. Total income across all transactions
  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0),
    []
  )

  // 2. Total expenses (as positive number for display)
  const totalExpenses = useMemo(
    () => Math.abs(transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0)),
    []
  )

  // 3. Net balance
  const balance = totalIncome - totalExpenses

  // 4. Savings rate
  const savingsRate = ((balance / totalIncome) * 100).toFixed(1)

  // 5. Monthly balance trend data for line chart
  const trendData = useMemo(() => {
    return MONTHS.map((month, i) => {
      const monthNum = String(i + 1).padStart(2, "0")
      const monthTxns = transactions.filter(t => t.date.startsWith(`2025-${monthNum}`))
      const net = monthTxns.reduce((s, t) => s + t.amount, 0)
      return { month, balance: net }
    })
  }, [])

  // 6. Spending by category for pie chart (expenses only)
  const categoryData = useMemo(() => {
    const map = {}
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => {
        map[t.category] = (map[t.category] || 0) + Math.abs(t.amount)
      })
    return Object.entries(map)
      .map(([name, value]) => ({ name, value, fill: categoryColors[name] }))
      .sort((a, b) => b.value - a.value)
  }, [])

  // 7. Recent 5 transactions for quick view
  const recentTxns = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5),
    []
  )

  return (
    <div className="space-y-6">

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Balance"
          value={fmt(balance)}
          subtitle="Jan – Apr 2025"
          icon="💰"
          color="indigo"
        />
        <SummaryCard
          title="Total Income"
          value={fmt(totalIncome)}
          subtitle="All sources"
          icon="📈"
          color="green"
        />
        <SummaryCard
          title="Total Expenses"
          value={fmt(totalExpenses)}
          subtitle="All categories"
          icon="📉"
          color="red"
        />
        <SummaryCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          subtitle="Of total income"
          icon="🎯"
          color="teal"
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Line chart — takes 2/3 width on large screens */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Monthly Balance Trend
          </h2>
          <p className="text-xs text-gray-400 mb-4">Net cash flow per month</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip content={<LineTooltip />} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ fill: "#6366f1", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart — takes 1/3 width */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Spending Breakdown
          </h2>
          <p className="text-xs text-gray-400 mb-4">By category</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Custom legend */}
          <div className="mt-3 space-y-1.5">
            {categoryData.slice(0, 5).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="text-gray-800 font-medium">{fmt(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-3">
          {recentTxns.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-3">
                {/* Category dot */}
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: categoryColors[txn.category] }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">{txn.description}</p>
                  <p className="text-xs text-gray-400">{txn.date} · {txn.category}</p>
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  txn.type === "income" ? "text-green-600" : "text-red-500"
                }`}
              >
                {txn.type === "income" ? "+" : ""}
                {fmt(txn.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}