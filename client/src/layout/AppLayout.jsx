import React from "react";
import { Route, Routes } from "react-router-dom";
import AppSuspense from "../components/AppSuspense/index";
import { CompleteProfile } from "../pages/CompleteProfile";
import ViewAll from "../pages/ViewAll";
import { Detail, Home, Login, Payment } from "../routes/index";
import RequireAuth from "./RequireAuth";

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
              <RequireAuth>
                <Home />
              </RequireAuth>
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
              <RequireAuth>
                <ViewAll />
              </RequireAuth>
            }
          />
          <Route
            path="/completeprofile"
            element={
              <RequireAuth>
                <CompleteProfile />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </React.Fragment>
    </AppSuspense>
  );
};

export default AppLayout;
