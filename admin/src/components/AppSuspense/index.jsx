import React from "react";
import AppLoader from "../AppLoader";

const AppSuspense = ({ children }) => {
  return <React.Suspense fallback={<AppLoader />}>{children}</React.Suspense>;
};

export default AppSuspense;
