import Cookies from "js-cookie";
import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import DotRing from "../components/DotRing";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = Boolean(Cookies.get("token"));

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ form: location }} replace />;
  }
  const deCodeToken = jwt_decode(Cookies.get("token"));
  // console.log(deCodeToken);

  if (deCodeToken.exp < Date.now() / 1000) {
    console.log("first");
    Cookies.remove("token");
    localStorage.removeItem("persist:root");
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
