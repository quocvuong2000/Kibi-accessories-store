import React from "react";

const Home = React.lazy(() => import("../pages/Home/index"));
const Detail = React.lazy(() => import("../pages/Detail/index"));
const Login = React.lazy(() => import("../pages/Login/index"));
export { Home, Detail, Login };
