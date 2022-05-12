import AppSuspense from "../components/AppSuspense/index";
import React from "react";

import { Home, Detail, Payment, Login } from "../routes/index";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <AppSuspense>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/detail" element={<Detail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Payment />} />
      </Routes>
      {/* <Footer /> */}
    </AppSuspense>
  );
};

export default AppLayout;
