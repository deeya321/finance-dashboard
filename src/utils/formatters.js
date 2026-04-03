// Currency formatter — e.g. ₹1,200
export const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n)

// Short month label from date string — e.g. "Jan"
export const getMonth = (dateStr) =>
  new Date(dateStr + "T00:00:00").toLocaleString("en-US", { month: "short" })

// Full date label — e.g. "Jan 5, 2025"
export const formatDate = (dateStr) =>
  new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })