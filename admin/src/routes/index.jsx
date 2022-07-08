import React from "react";
//DASHBOARD PAGE
import Home from "../features/Dashboard/Home";
import Products from "../features/Products";
import Categories from "../features/Categories";
import Brands from "../features/Brands";
import Staffs from '../features/Staffs';
import Orders from '../features/Orders';
import Customers from '../features/Customers';
import Vouchers from '../features/Vouchers';
import Blogs from '../features/Blogs';

const Dashboard = React.lazy(() => import("../features/Dashboard"));
const Error404 = React.lazy(() => import("../features/ErrorPages/Error404"));
const Login = React.lazy(() => import("../features/Login"));

//LOGIN PAGE

export { Dashboard, Home, Products, Categories, Brands, Login,Staffs,Blogs,Customers,Orders,Vouchers ,Error404};
