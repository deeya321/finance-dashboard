export const exportToCSV = (transactions, filename = "transactions") => {
  if (!transactions || transactions.length === 0) return

  const headers = ["Date", "Description", "Category", "Type", "Amount"]
  const rows = transactions.map((t) => [
    t.date,
    t.description,
    t.category,
    t.type,
    Math.abs(t.amount),
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
