import AppSuspense from "../components/AppSuspense/index";
import React from "react";

import { Home, Detail, Payment, Login } from "../routes/index";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import ViewAll from "../pages/ViewAll";

const AppLayout = () => {
  const currentURL = window.location.pathname;
  console.log(currentURL);
  return (
    <AppSuspense>
      {currentURL !== "/login" ? (
        <React.Fragment>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Payment />} />
            <Route path="/viewall" element={<ViewAll />} />
          </Routes>
          <Footer />
        </React.Fragment>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      )}
    </AppSuspense>
  );
};

export default AppLayout;
