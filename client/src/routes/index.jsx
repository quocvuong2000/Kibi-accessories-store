import React from "react";

const Home = React.lazy(() => import("../pages/Home/index"));
const Detail = React.lazy(() => import("../pages/Detail/index"));
const Payment = React.lazy(() => import("../pages/Payment/index"));
export { Home, Detail, Payment };
