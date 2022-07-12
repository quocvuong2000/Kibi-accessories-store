import Cookies from "js-cookie";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = Boolean(Cookies.get("token"));

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ form: location }} replace />;
  }
  const deCodeToken = jwt_decode(Cookies.get("token"));

  if (
    deCodeToken.exp < Date.now() / 1000 ||
    (deCodeToken.type !== "admin" && deCodeToken.type !== "staff")
  ) {
    Cookies.remove("token");
    return <Navigate to="/login" state={{ form: location }} replace />;
  }
  return <>{children}</>;
};
export default RequireAuth;
