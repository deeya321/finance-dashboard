import { useMemo } from "react"
import { useSelector } from "react-redux"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts"
import { RiMoneyDollarCircleLine, RiArrowUpLine,
         RiArrowDownLine, RiPercentLine } from "react-icons/ri"

import SummaryCard     from "../components/ui/SummaryCard"
import { categoryColors } from "../data/categories"
import { fmt, formatDate } from "../utils/formatters"

const MONTHS = [
  { label: "Jan", prefix: "2025-01" },
  { label: "Feb", prefix: "2025-02" },
  { label: "Mar", prefix: "2025-03" },
  { label: "Apr", prefix: "2025-04" },
]

// Custom tooltip for line chart
function LineTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-gray-700 mb-1">{label}</p>
      <p className="text-indigo-600">Balance: {fmt(payload[0].value)}</p>
    </div>
  )
}

// Custom tooltip for pie chart
function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-gray-700">{payload[0].name}</p>
      <p style={{ color: payload[0].payload.fill }}>{fmt(payload[0].value)}</p>
    </div>
  )
}

export default function Dashboard() {
  // Read transactions from Redux store
  const transactions = useSelector((state) => state.transactions)

  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [transactions]
  )

  const totalExpenses = useMemo(
    () => Math.abs(transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0)),
    [transactions]
  )

  const balance     = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : "0.0"

  const trendData = useMemo(() =>
    MONTHS.map(({ label, prefix }) => {
      const net = transactions
        .filter(t => t.date.startsWith(prefix))
        .reduce((s, t) => s + t.amount, 0)
      return { month: label, balance: net }
    }),
    [transactions]
  )

  const categoryData = useMemo(() => {
    const map = {}
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => { map[t.category] = (map[t.category] || 0) + Math.abs(t.amount) })
    return Object.entries(map)
      .map(([name, value]) => ({ name, value, fill: categoryColors[name] }))
      .sort((a, b) => b.value - a.value)
  }, [transactions])

  const recentTxns = useMemo(() =>
    [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5),
    [transactions]
  )

  return (
    <div className="space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Balance"  value={fmt(balance)}
          subtitle="Jan – Apr 2025"
          icon={<RiMoneyDollarCircleLine size={22} />} color="indigo"
        />
        <SummaryCard
          title="Total Income"   value={fmt(totalIncome)}
          subtitle="All sources"
          icon={<RiArrowUpLine size={22} />} color="green"
        />
        <SummaryCard
          title="Total Expenses" value={fmt(totalExpenses)}
          subtitle="All categories"
          icon={<RiArrowDownLine size={22} />} color="red"
        />
        <SummaryCard
          title="Savings Rate"   value={`${savingsRate}%`}
          subtitle="Of total income"
          icon={<RiPercentLine size={22} />} color="teal"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Monthly Balance Trend</h2>
          <p className="text-xs text-gray-400 mb-4">Net cash flow per month</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`} />
              <Tooltip content={<LineTooltip />} />
              <Line type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={2.5}
                dot={{ fill: "#6366f1", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Spending Breakdown</h2>
          <p className="text-xs text-gray-400 mb-4">By category</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%"
                innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {categoryData.slice(0, 5).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="text-gray-800 font-medium">{fmt(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        {recentTxns.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No transactions yet.</p>
        ) : (
          <div className="space-y-3">
            {recentTxns.map((txn) => (
              <div key={txn.id}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: categoryColors[txn.category] }} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{txn.description}</p>
                    <p className="text-xs text-gray-400">{formatDate(txn.date)} · {txn.category}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${txn.type === "income" ? "text-green-600" : "text-red-500"}`}>
                  {txn.type === "income" ? "+" : ""}{fmt(txn.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}