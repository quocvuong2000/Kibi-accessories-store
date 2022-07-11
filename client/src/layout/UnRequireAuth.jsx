import DotRing from "../components/DotRing";
import Cookies from "js-cookie";

import { Footer } from "../components/Footer";
import Header from "../components/Header";
import jwt_decode from "jwt-decode";

const UnRequireAuth = ({ children }) => {
  const isLoggedIn = Boolean(Cookies.get("tokenClient"));
  if (isLoggedIn) {
    const deCodeToken = jwt_decode(Cookies.get("tokenClient"));
    // console.log(deCodeToken.exp < Date.now() / 1000);
    // console.log(deCodeToken.exp < Date.now() / 1000);
    if (deCodeToken.exp < Date.now() / 1000) {
      Cookies.remove("tokenClient");
      localStorage.removeItem("persist:root");
    }
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

export default UnRequireAuth;
