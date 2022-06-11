import Cookies from "js-cookie";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import { useGoogleAuth } from "../redux/googleAuth";

const RequireAuth = ({ children }) => {
  const { isSignedIn } = useGoogleAuth();
  const location = useLocation();
  const isLoggedIn = Boolean(Cookies.get("token"));

  if (!isLoggedIn && !isSignedIn) {
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
