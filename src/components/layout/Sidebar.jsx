import { NavLink } from "react-router-dom"
import { RiDashboardLine, RiFileListLine, RiBarChartLine } from "react-icons/ri"

const navItems = [
  { to: "/dashboard",    label: "Dashboard",    icon: <RiDashboardLine size={18} /> },
  { to: "/transactions", label: "Transactions", icon: <RiFileListLine  size={18} /> },
  { to: "/insights",     label: "Insights",     icon: <RiBarChartLine  size={18} /> },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="font-semibold text-gray-800 text-lg">FinTrack</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-gray-200">
        <p className="text-xs text-gray-400">FinTrack v1.0</p>
      </div>
    </aside>
  )
}