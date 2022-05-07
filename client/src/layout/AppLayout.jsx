import AppSuspense from "../components/AppSuspense/index";
import React from "react";

import { Home, Detail, Payment } from "../routes/index";
import { Route, Routes } from "react-router-dom";

const AppLayout = () => {
  return (
    <AppSuspense>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </AppSuspense>
  );
};

export default AppLayout;
