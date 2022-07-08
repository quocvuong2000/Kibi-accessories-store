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
  Staffs,
  Blogs,
  Customers,
  Orders,
  Vouchers,
  Error404,
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
          <Route path="staffs" element={<Staffs />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="vouchers" element={<Vouchers />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </AppSuspense>
  );
};

export default AppLayout;
