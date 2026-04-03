import { useMemo, useState } from "react"
import { useSelector }       from "react-redux"

import TransactionTopBar  from "../components/transactions/TransactionTopBar"
import TransactionFilters from "../components/transactions/TransactionFilters"
import TransactionTable   from "../components/transactions/TransactionTable"
import AddTransactionModal from "../components/ui/AddTransactionModal"

export default function Transactions() {
  const transactions = useSelector((s) => s.transactions)
  const filters      = useSelector((s) => s.filters)
  const role         = useSelector((s) => s.role)

  const [showModal, setShowModal] = useState(false)

  // ── Filter + sort ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...transactions]

    if (filters.search)
      list = list.filter((t) =>
        t.description.toLowerCase().includes(filters.search.toLowerCase())
      )

    if (filters.type !== "all")
      list = list.filter((t) => t.type === filters.type)

    if (filters.category !== "all")
      list = list.filter((t) => t.category === filters.category)

    if (filters.sortBy === "date_desc")
      list.sort((a, b) => new Date(b.date) - new Date(a.date))
    else if (filters.sortBy === "date_asc")
      list.sort((a, b) => new Date(a.date) - new Date(b.date))
    else if (filters.sortBy === "amount_desc")
      list.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
    else if (filters.sortBy === "amount_asc")
      list.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount))

    return list
  }, [transactions, filters])

  // ── Totals for the filtered set ────────────────────────────────────────────
  const totals = useMemo(() => ({
    income:  filtered.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0),
    expense: filtered.filter(t => t.type === "expense").reduce((s, t) => s + Math.abs(t.amount), 0),
  }), [filtered])

  return (
    <div className="space-y-4">
      <TransactionTopBar
        count={filtered.length}
        role={role}
        onAdd={() => setShowModal(true)}
      />
      <TransactionFilters totals={totals} />
      <TransactionTable
        transactions={filtered}
        sortBy={filters.sortBy}
        role={role}
      />
      {showModal && (
        <AddTransactionModal onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}