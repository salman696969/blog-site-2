import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function RequireAuth() {
  let authContext = useContext(AuthContext);
  let loggedin = sessionStorage.getItem("login")

  return loggedin ? <Outlet /> : <Navigate to="/" replace />;
}
