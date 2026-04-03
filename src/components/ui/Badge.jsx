export default function Badge({ type }) {
  const styles = {
    income:  "bg-green-50 text-green-700 border border-green-200",
    expense: "bg-red-50 text-red-600 border border-red-200",
  }

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${styles[type]}`}>
      {type}
    </span>
  )
}