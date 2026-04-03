const colorMap = {
  indigo: "bg-indigo-50 text-indigo-600",
  green:  "bg-green-50  text-green-600",
  red:    "bg-red-50    text-red-500",
  teal:   "bg-teal-50   text-teal-600",
}

export default function SummaryCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-xl shrink-0 ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}