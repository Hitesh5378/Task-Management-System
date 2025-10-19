import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage (if available)
const savedUser = JSON.parse(localStorage.getItem("registeredUser")) || null;

const initialState = {
  registeredUser: savedUser,
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth", // Changed name from "user" to "auth"
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.registeredUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("registeredUser", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.registeredUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem("registeredUser");
    },
  },
});

export const { registerUser, logoutUser } = authSlice.actions;
export default authSlice.reducer; // Updated reducer name
