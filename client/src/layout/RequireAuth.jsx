import Cookies from "js-cookie";
import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = Boolean(Cookies.get("token"));

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ form: location }} replace />;
  }
  return (
    <>
      <Header />
      <div>{children}</div>

      <Footer />
    </>
  );
};
export default RequireAuth;
