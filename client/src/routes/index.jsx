import React from "react";

const Home = React.lazy(() => import("../pages/Home/index"));
const Detail = React.lazy(() => import("../pages/Detail/index"));
const Login = React.lazy(() => import("../pages/Login/index"));
const Payment = React.lazy(() => import("../pages/Payment/index"));
const Page404 = React.lazy(() => import("../pages/404/index"));
const Page500 = React.lazy(() => import("../pages/500/index"));
const UserProfile = React.lazy(() => import("../pages/UserProfile/index"));
const Search = React.lazy(() => import("../pages/Search/index"));
const Blog = React.lazy(() => import("../pages/Blog/index"));
const DetailBlog = React.lazy(() => import("../pages/DetailBlog/index"));
const ViewAllBlog = React.lazy(() => import("../pages/ViewAllBlog/index"));
const ViewAllProductByBrand = React.lazy(() =>
  import("../pages/ViewAll/viewallbybrand")
);

export {
  Home,
  Detail,
  Payment,
  Login,
  Page404,
  UserProfile,
  Search,
  Blog,
  DetailBlog,
  ViewAllBlog,
  ViewAllProductByBrand,
  Page500,
};
