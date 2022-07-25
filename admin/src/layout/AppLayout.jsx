import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppSuspense from "../components/AppSuspense";
import ApproveBlog from "../features/ApproveBlog";
import Branch from "../features/Branch";

import Comments from "../features/Comment";
import Error403 from "../features/ErrorPages/Error403";
import Storage from "../features/Storage";
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
  CategoryBlog,
  Subscriber,
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
          <Route path="comments" element={<Comments />} />
          <Route path="categoryblog" element={<CategoryBlog />} />
          <Route path="approveblog" element={<ApproveBlog />} />
          <Route path="branch" element={<Branch />} />
          <Route path="storage" element={<Storage />} />
          <Route path="subscriber" element={<Subscriber />} />
        </Route>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </AppSuspense>
  );
};

export default AppLayout;
