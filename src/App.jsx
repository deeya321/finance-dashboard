import { Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/layout/Sidebar"
import Header  from "./components/layout/Header"
import Dashboard    from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Insights     from "./pages/Insights"

export default function App() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/"             element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"    element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights"     element={<Insights />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}