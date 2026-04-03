import { useMemo }      from "react"
import { useSelector }  from "react-redux"
import { categoryColors } from "../data/categories"
import InsightCards      from "../components/insights/InsightCards"
import MonthlyBarChart   from "../components/insights/MonthlyBarChart"
import CategoryBreakdown from "../components/insights/CategoryBreakdown"
import MonthlyComparison from "../components/insights/MonthlyComparison"

const MONTHS = [
  { label: "Jan", prefix: "2025-01" },
  { label: "Feb", prefix: "2025-02" },
  { label: "Mar", prefix: "2025-03" },
  { label: "Apr", prefix: "2025-04" },
]

export default function Insights() {
  const transactions = useSelector((s) => s.transactions)

  // ── Monthly data (used by bar chart + comparison table) ───────────────────
  const monthlyData = useMemo(() =>
    MONTHS.map(({ label, prefix }) => {
      const monthTxns  = transactions.filter(t => t.date.startsWith(prefix))
      const income     = monthTxns.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0)
      const expenses   = Math.abs(monthTxns.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0))
      return { month: label, income, expenses, count: monthTxns.length }
    }),
    [transactions]
  )

  // ── Category breakdown (expenses only, sorted) ────────────────────────────
  const categoryData = useMemo(() => {
    const map = {}
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => { map[t.category] = (map[t.category] || 0) + Math.abs(t.amount) })
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [transactions])

  // ── Key insight values (for InsightCards) ─────────────────────────────────
  const insights = useMemo(() => {
    // Highest spending category
    const topCat = categoryData[0] || { name: "—", value: 0 }

    // Best savings month
    const best = [...monthlyData].sort(
      (a, b) => (b.income - b.expenses) - (a.income - a.expenses)
    )[0] || { month: "—", income: 0, expenses: 0 }

    // Average monthly expense
    const avgExp = Math.round(
      monthlyData.reduce((s, m) => s + m.expenses, 0) / (monthlyData.length || 1)
    )

    // Most active month (most transactions)
    const mostActive = [...monthlyData].sort((a, b) => b.count - a.count)[0] ||
      { month: "—", count: 0 }

    return {
      topCategory:       topCat.name,
      topCategoryAmount: topCat.value,
      bestMonth:         best.month,
      bestMonthSavings:  best.income - best.expenses,
      avgMonthlyExpense: avgExp,
      mostActiveMonth:   mostActive.month,
      mostActiveCount:   mostActive.count,
    }
  }, [categoryData, monthlyData])

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Row 1 — Key insight cards */}
      <InsightCards insights={insights} />

      {/* Row 2 — Bar chart + Category breakdown side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyBarChart   data={monthlyData} />
        <CategoryBreakdown data={categoryData} />
      </div>

      {/* Row 3 — Monthly comparison table */}
      <MonthlyComparison data={monthlyData} />
    </div>
  )
}