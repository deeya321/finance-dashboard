import { useState } from "react"
import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Insights from "./pages/Insights"

export default function App() {
  const [activePage, setActivePage] = useState("dashboard")
  const [role, setRole] = useState("viewer") // "viewer" or "admin"

  const renderPage = () => {
    if (activePage === "dashboard") return <Dashboard role={role} />
    if (activePage === "transactions") return <Transactions role={role} />
    if (activePage === "insights") return <Insights />
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header role={role} setRole={setRole} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}