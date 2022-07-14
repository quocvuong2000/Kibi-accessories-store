import React from "react";
import { Route, Routes } from "react-router-dom";
import AppSuspense from "../components/AppSuspense/index";
import { CompleteProfile } from "../pages/CompleteProfile";
import ViewAll from "../pages/ViewAll";
import ViewAllByBrand from "../pages/ViewAll/viewallbybrand";
import {
  Detail,
  Home,
  Login,
  Payment,
  Page404,
  UserProfile,
  Search,
  Blog,
  DetailBlog,
  ViewAllBlog,
  Client,
  Page500,
  AboutUs,
} from "../routes/index";
import RequireAuth from "./RequireAuth";
import UnRequireAuth from "./UnRequireAuth";

const AppLayout = () => {
  return (
    <AppSuspense>
      <React.Fragment>
        <Routes>
          <Route
            path="/"
            element={
              <UnRequireAuth>
                <Home />
              </UnRequireAuth>
            }
          />
          <Route
            path="/detail"
            element={
              <UnRequireAuth>
                <Detail />
              </UnRequireAuth>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <UnRequireAuth>
                <Detail />
              </UnRequireAuth>
            }
          />
          <Route
            path="/payment"
            element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            }
          />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            }
          />
          <Route
            path="/confirmation/:id"
            element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            }
          />
          <Route
            path="/viewall"
            element={
              <UnRequireAuth>
                <ViewAll />
              </UnRequireAuth>
            }
          />
          <Route
            path="/viewall/:idCate"
            element={
              <UnRequireAuth>
                <ViewAll />
              </UnRequireAuth>
            }
          />
          <Route
            path="/viewallbybrand/:idBrandPr"
            element={
              <UnRequireAuth>
                <ViewAllByBrand />
              </UnRequireAuth>
            }
          />
          <Route path="/500" element={<Page500 />} />
          {/* <Route
            path="/completeprofile"
            element={
              <UnRequireAuth>
                <CompleteProfile />
              </UnRequireAuth>
            }
          /> */}
          <Route
            path="/myaccount"
            element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/myaccount/:active"
            element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/search/:kw"
            element={
              <UnRequireAuth>
                <Search />
              </UnRequireAuth>
            }
          />

          <Route
            path="*"
            element={
              <UnRequireAuth>
                <Page404 />
              </UnRequireAuth>
            }
          />
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/blog"
            element={
              <UnRequireAuth>
                <Blog />
              </UnRequireAuth>
            }
          ></Route>
          <Route
            path="/detailblog/:id"
            element={
              <UnRequireAuth>
                <DetailBlog />
              </UnRequireAuth>
            }
          ></Route>
          <Route
            path="/about-us"
            element={
              <UnRequireAuth>
                <AboutUs />
              </UnRequireAuth>
            }
          ></Route>
          <Route
            path="/viewallblog/:id"
            element={
              <UnRequireAuth>
                <ViewAllBlog />
              </UnRequireAuth>
            }
          ></Route>
        </Routes>
      </React.Fragment>
    </AppSuspense>
  );
};

export default AppLayout;
