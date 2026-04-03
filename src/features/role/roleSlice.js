import { createSlice } from "@reduxjs/toolkit"

const loadRole = () => {
  try {
    const saved = localStorage.getItem("fintrack_role")
    return saved || "viewer"
  } catch {
    return "viewer"
  }
}

const roleSlice = createSlice({
  name: "role",
  initialState: loadRole(),
  reducers: {
    setRole: (state, action) => {
      try {
        localStorage.setItem("fintrack_role", action.payload)
      } catch {}
      return action.payload
    },
  },
})

export const { setRole } = roleSlice.actions
export default roleSlice.reducer