import Cookies from "js-cookie";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = Boolean(Cookies.get("token"));
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ form: location }} replace />;
  }
  return <>{children}</>;
};
export default RequireAuth;
