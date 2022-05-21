import React from "react";
import { Route, Routes } from "react-router-dom";
import AppSuspense from "../components/AppSuspense";
import { Dashboard, Home, Products } from "../routes";

const AppLayout = () => {
  return (
    <AppSuspense>
      <Routes>
        <Route
          path="/dashboard"
          element={
            // <SalonSelect/>
            <Dashboard />
          }
        >
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </AppSuspense>
  );
};

export default AppLayout;
