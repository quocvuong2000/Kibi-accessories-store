import React from "react";
import Chat from "../components/Chat";

import { Footer } from "../components/Footer";
import Header from "../components/Header";

const UnRequireAuth = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Chat />
      <Footer />
    </>
  );
};

export default UnRequireAuth;
