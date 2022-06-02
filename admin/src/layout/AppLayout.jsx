import React from "react";
import { Route, Routes } from "react-router-dom";
import AppSuspense from "../components/AppSuspense";
import { Brands, Categories, Dashboard, Home, Login, Products } from "../routes";

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
          <Route path="categories" element={<Categories />} />
          <Route path="brands" element={<Brands />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppSuspense>
  );
};

export default AppLayout;
