import AppSuspense from "../components/AppSuspense/index";
import React from "react";

import { Home, Detail } from "../routes/index";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";

const AppLayout = () => {
  return (
    <AppSuspense>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/test" element={<Detail />}></Route>
      </Routes>
      <Footer />
    </AppSuspense>
  );
};

export default AppLayout;
