import AppSuspense from "../components/AppSuspense/index";
import React from "react";

import { Home, Detail, Payment } from "../routes/index";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <AppSuspense>
      {/* <Header /> */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </AppSuspense>
  );
};

export default AppLayout;
