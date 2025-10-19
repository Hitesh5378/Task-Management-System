import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  
  return localStorage.getItem("login") === "true" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
