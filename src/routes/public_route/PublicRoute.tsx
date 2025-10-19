import { Outlet, Navigate } from "react-router-dom";

export const PublicRoute = () =>
  
  localStorage.getItem("login") === "true" ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Outlet />
  );
