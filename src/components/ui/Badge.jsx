export default function Badge({ type }) {
  const styles = {
    income:  "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
    expense: "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  }

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${styles[type]}`}>
      {type}
    </span>
  )
}
