export default function Header({ role, setRole }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Page context */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Good morning 👋
        </h1>
        <p className="text-sm text-gray-500">Here's your financial overview</p>
      </div>

      {/* Role switcher */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Role:</span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="viewer">👁 Viewer</option>
          <option value="admin">🛡 Admin</option>
        </select>

        {/* Role badge */}
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full
          ${role === "admin"
            ? "bg-indigo-100 text-indigo-700"
            : "bg-gray-100 text-gray-600"
          }`}>
          {role === "admin" ? "Full Access" : "Read Only"}
        </span>
      </div>
    </header>
  )
}