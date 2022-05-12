import AppSuspense from "../components/AppSuspense/index";
import React from "react";

import { Home, Detail, Login } from "../routes/index";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <AppSuspense>
      {/* <Header /> */}
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      {/* <Footer /> */}
    </AppSuspense>
  );
};

export default AppLayout;
