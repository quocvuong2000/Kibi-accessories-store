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
  // console.log(deCodeToken);

  if (deCodeToken.exp < Date.now() / 1000) {
    Cookies.remove("token");
  }
  return <>{children}</>;
};
export default RequireAuth;
