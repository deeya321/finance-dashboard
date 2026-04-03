import { useState }              from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Sidebar      from "./components/layout/Sidebar"
import Header       from "./components/layout/Header"
import Dashboard    from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Insights     from "./pages/Insights"
import NotFound     from "./pages/NotFound"

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans overflow-hidden">

      {/* Sidebar — receives open state + close handler */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Routes>
            <Route path="/"             element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"    element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights"     element={<Insights />} />
            <Route path="*"             element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}