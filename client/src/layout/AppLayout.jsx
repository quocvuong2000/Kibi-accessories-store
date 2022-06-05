import React from "react";
import { Route, Routes } from "react-router-dom";
import AppSuspense from "../components/AppSuspense/index";
import { CompleteProfile } from "../pages/CompleteProfile";
import ViewAll from "../pages/ViewAll";
import {
  Detail,
  Home,
  Login,
  Payment,
  Page404,
  UserProfile,
} from "../routes/index";
import RequireAuth from "./RequireAuth";
import UnRequireAuth from "./UnRequireAuth";

const AppLayout = () => {
  const currentURL = window.location.pathname;
  console.log(currentURL);
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
              <RequireAuth>
                <Detail />
              </RequireAuth>
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
            path="/confirmation"
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
            path="/completeprofile"
            element={
              <UnRequireAuth>
                <CompleteProfile />
              </UnRequireAuth>
            }
          />
          <Route
            path="/myaccount"
            element={
              <UnRequireAuth>
                <UserProfile />
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
        </Routes>
      </React.Fragment>
    </AppSuspense>
  );
};

export default AppLayout;
