import { useSelector, useDispatch } from "react-redux"
import { useLocation }              from "react-router-dom"
import { setRole }                  from "../../features/role/roleSlice"
import {
  RiShieldUserLine, RiEyeLine,
  RiBellLine, RiUserSmileLine, RiMenuLine,
} from "react-icons/ri"

const pageMeta = {
  "/dashboard":    { title: "Dashboard",    subtitle: "Your financial overview at a glance" },
  "/transactions": { title: "Transactions", subtitle: "Track and manage your transactions"  },
  "/insights":     { title: "Insights",     subtitle: "Understand your spending patterns"   },
}

export default function Header({ onMenuClick }) {
  const role     = useSelector((s) => s.role)
  const dispatch = useDispatch()
  const location = useLocation()
  const meta     = pageMeta[location.pathname] || pageMeta["/dashboard"]

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100
                       dark:border-gray-800 px-4 lg:px-6 h-16 flex items-center
                       justify-between shrink-0">

      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg
                     text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <RiMenuLine size={20} />
        </button>

        <div>
          <h1 className="text-base font-semibold text-gray-800 dark:text-white leading-tight">
            {meta.title}
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Role toggle */}
        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800
                        border border-gray-200 dark:border-gray-700 rounded-lg p-1">
          <button
            onClick={() => dispatch(setRole("viewer"))}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5
                        rounded-md transition-all
              ${role === "viewer"
                ? "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-600"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
          >
            <RiEyeLine size={13} />
            <span className="hidden sm:inline">Viewer</span>
          </button>
          <button
            onClick={() => dispatch(setRole("admin"))}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5
                        rounded-md transition-all
              ${role === "admin"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
          >
            <RiShieldUserLine size={13} />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

        {/* Bell */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg
                           text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800
                           hover:text-gray-600 transition-colors relative">
          <RiBellLine size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5
                           bg-indigo-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950
                          flex items-center justify-center">
            <RiUserSmileLine size={16} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-tight">
              Deeya
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight capitalize">
              {role}
            </p>
          </div>
        </div>

      </div>
    </header>
  )
}