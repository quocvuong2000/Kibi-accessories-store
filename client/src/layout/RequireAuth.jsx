import Cookies from "js-cookie";
import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import DotRing from "../components/DotRing";
import { useWindowSize } from "../customHook/useWindowSize";
import { Brand } from "../components/Brand";

const RequireAuth = ({ children }) => {
  const [width] = useWindowSize();
  const location = useLocation();
  const isLoggedIn = Boolean(Cookies.get("tokenClient"));

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ form: location }} replace />;
  }
  const deCodeToken = jwt_decode(Cookies.get("tokenClient"));

  if (deCodeToken.exp < Date.now() / 1000) {
    Cookies.remove("tokenClient");
    localStorage.removeItem("persist:root");
  }
  return (
    <div id="scrollableDiv">
      <Header />
      {/* {width > 1280 && <DotRing />} */}
      <div>{children}</div>
      {width > 1280 && <Brand />}
      <Footer />
    </div>
  );
};
export default RequireAuth;
