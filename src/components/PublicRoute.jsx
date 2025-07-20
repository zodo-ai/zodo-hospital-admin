import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const { user } = useAuth();
  const accessToken = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (accessToken && user?.user_type === "hsAdmin") {
    return <Navigate to="/" replace />;
  }

  if (accessToken && user?.user_type === "staff") {
    return <Navigate to="/appointment" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
