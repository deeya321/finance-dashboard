import React    from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider }      from "react-redux"
import { store }         from "./app/store"
import App               from "./App"
import "./index.css"

// Apply saved theme before first paint
const saved = localStorage.getItem("fintrack_theme")
if (saved === "dark") {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)