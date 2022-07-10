import Cookies from "js-cookie";
import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import DotRing from "../components/DotRing";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = Boolean(Cookies.get("tokenClient"));

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ form: location }} replace />;
  }
  const deCodeToken = jwt_decode(Cookies.get("tokenClient"));
  // console.log(deCodeToken);

  if (deCodeToken.exp < Date.now() / 1000) {
    Cookies.remove("tokenClient");
  }
  return (
    <>
      <Header />
      <DotRing />
      <div>{children}</div>

      <Footer />
    </>
  );
};
export default RequireAuth;
