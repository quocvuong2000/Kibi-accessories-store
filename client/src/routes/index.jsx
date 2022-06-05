import React from "react";

const Home = React.lazy(() => import("../pages/Home/index"));
const Detail = React.lazy(() => import("../pages/Detail/index"));
const Login = React.lazy(() => import("../pages/Login/index"));
const Payment = React.lazy(() => import("../pages/Payment/index"));
const Page404 = React.lazy(() => import("../pages/404/index"));
const UserProfile = React.lazy(() => import("../pages/UserProfile/index"));
export { Home, Detail, Payment, Login, Page404, UserProfile };
