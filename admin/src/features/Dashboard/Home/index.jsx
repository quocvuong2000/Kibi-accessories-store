import React from "react";
import Cards from "../../../components/Cards/Cards";
import classes from "./styles.module.scss";
import Grid from "@mui/material/Grid";
import DashboardTable from "../../../components/DashboardTable/DashboardTable";
import Updates from "../../../components/CustomerReview/Update";
import CustomerReview from "../../../components/Update/CustomerReview";
const Home = () => {
  return (
    <div className={classes.dashboard}>
      <h1>Dashboard</h1>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={8}>
          <Cards />
        </Grid>
        <Grid item xs={4}>
        <CustomerReview />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={8}>
          <DashboardTable />
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
