import { createSlice } from "@reduxjs/toolkit"

const roleSlice = createSlice({
  name: "role",
  initialState: "viewer",   // default role
  reducers: {
    setRole: (_, action) => action.payload,
  },
})

export const { setRole } = roleSlice.actions
export default roleSlice.reducer