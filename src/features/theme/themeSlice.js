import { createSlice } from "@reduxjs/toolkit"

const getInitialTheme = () => {
  const saved = localStorage.getItem("fintrack_theme")
  if (saved) return saved
  return "light" // default to light, ignore system preference
}

const themeSlice = createSlice({
  name: "theme",
  initialState: getInitialTheme(),
  reducers: {
    toggleTheme: (state) => {
      const next = state === "dark" ? "light" : "dark"
      localStorage.setItem("fintrack_theme", next)
      return next
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer