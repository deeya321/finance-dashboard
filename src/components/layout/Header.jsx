import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { setRole } from "../../features/role/roleSlice"
import {
  RiShieldUserLine,
  RiEyeLine,
  RiSunLine,
  RiBellLine,
  RiUserSmileLine,
} from "react-icons/ri"

const pageMeta = {
  "/dashboard":    { title: "Dashboard",    subtitle: "Your financial overview at a glance" },
  "/transactions": { title: "Transactions", subtitle: "Track and manage your transactions" },
  "/insights":     { title: "Insights",     subtitle: "Understand your spending patterns" },
}

export default function Header() {
  const role     = useSelector((state) => state.role)
  const dispatch = useDispatch()
  const location = useLocation()

  const meta = pageMeta[location.pathname] || pageMeta["/dashboard"]

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-0 flex items-center justify-between h-16 shrink-0">

      {/* Left — Page title */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-base font-semibold text-gray-800 leading-tight">
            {meta.title}
          </h1>
          <p className="text-xs text-gray-400">{meta.subtitle}</p>
        </div>
      </div>

      {/* Right — controls */}
      <div className="flex items-center gap-2">

        {/* Role switcher pill */}
        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => dispatch(setRole("viewer"))}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all
              ${role === "viewer"
                ? "bg-white text-gray-700 shadow-sm border border-gray-200"
                : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <RiEyeLine size={13} />
            Viewer
          </button>
          <button
            onClick={() => dispatch(setRole("admin"))}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all
              ${role === "admin"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <RiShieldUserLine size={13} />
            Admin
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Notification bell */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400
                           hover:bg-gray-100 hover:text-gray-600 transition-colors relative">
          <RiBellLine size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <RiUserSmileLine size={16} className="text-indigo-600" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-gray-700 leading-tight">Deeya</p>
            <p className="text-xs text-gray-400 leading-tight capitalize">{role}</p>
          </div>
        </div>

      </div>
    </header>
  )
}