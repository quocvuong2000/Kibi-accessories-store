import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppSuspense from "../components/AppSuspense";
import {
  Brands,
  Categories,
  Dashboard,
  Home,
  Login,
  Products,
} from "../routes";
import RequireAuth from "../routes/RequireAuth";

const AppLayout = () => {
  return (
    <AppSuspense>
      <Routes>
        <Route
          path="/dashboard"
          element={
            // <SalonSelect/>
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="brands" element={<Brands />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </AppSuspense>
  );
};

export default AppLayout;
