import AppSuspense from '../components/AppSuspense/index';
import React from "react";

import { Home } from "../routes/index";
import { Route, Routes } from "react-router-dom";

const AppLayout = () => {
  return (
    <AppSuspense>
      <Routes>
        <Route path="/home" element={
        <Home/>}></Route>
        <Route path="/test" element={"fdsfsdf"}></Route>
      </Routes>
    </AppSuspense>
  );
};

export default AppLayout;
