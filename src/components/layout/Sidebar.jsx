import { NavLink }                  from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme }              from "../../features/theme/themeSlice"
import {
  RiDashboardLine, RiFileListLine, RiBarChartLine, RiWalletLine,
  RiSunLine, RiMoonLine, RiCloseLine,
} from "react-icons/ri"

const navItems = [
  { to: "/dashboard",    label: "Dashboard",    icon: <RiDashboardLine size={18} /> },
  { to: "/transactions", label: "Transactions", icon: <RiFileListLine  size={18} /> },
  { to: "/budgets",      label: "Budgets",      icon: <RiWalletLine    size={18} /> },
  { to: "/insights",     label: "Insights",     icon: <RiBarChartLine  size={18} /> },
]

export default function Sidebar({ open, onClose }) {
  const dispatch = useDispatch()
  const theme    = useSelector((s) => s.theme)

  const handleToggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    // Explicitly set the class instead of toggling blindly
    if (next === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    dispatch(toggleTheme())
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside className={`
        fixed top-0 left-0 h-full z-30 w-64
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        flex flex-col
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:z-auto
      `}>

        {/* Logo + close */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800
                        flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-gray-800 dark:text-white text-lg">
              FinTrack
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg
                       text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <RiCloseLine size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-sm font-medium transition-colors
                ${isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200"
                }
              `}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Theme toggle */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={handleToggle}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                       font-medium text-gray-600 dark:text-gray-400
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "dark"
              ? <><RiSunLine  size={18} /> Light Mode</>
              : <><RiMoonLine size={18} /> Dark Mode</>
            }
          </button>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-3 px-3">
            FinTrack v1.0
          </p>
        </div>
      </aside>
    </>
  )
}