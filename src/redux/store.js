import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/user/userSlice" ;
import authReducer from'./feature/authSlice/authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth:authReducer,
  },
});

export default store;
