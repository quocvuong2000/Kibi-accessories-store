import React from "react";
//DASHBOARD PAGE
import Home from "../features/Dashboard/Home";
import Products from "../features/Dashboard/Products"
const Dashboard = React.lazy(() => import("../features/Dashboard"));
const Login = React.lazy(() => import("../features/Login"));

//LOGIN PAGE

export { Dashboard, Home, Products,Login };
