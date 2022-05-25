import React from "react";
import classes from "./styles.module.scss";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className={classes.dashboardContainer}>
      <div className={classes.dashboardGlass}>
        <SideBar />
        <div className={classes.dashboardContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
