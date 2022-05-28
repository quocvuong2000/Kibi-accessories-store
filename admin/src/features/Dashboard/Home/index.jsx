import Grid from "@mui/material/Grid";
import React, { useMemo } from "react";
import Cards from "../../../components/Cards/Cards";
import ChartProducts from "../../../components/ChartProducts/ChartProducts";
import DashboardTable from "../../../components/DashboardTable/DashboardTable";
import Notifications from "../../../components/Notification/Notification";
import classes from "./styles.module.scss";

const Home = () => {
  const nfs = useMemo(
    () => [
      {
        date: "FRIDAY, 20 MARCH, 05:00 PM",
        title: "New Reservation",
        text: "Richard Rogers has booked for [X] service at 09.00 am with Lozy as staff.",
      },
      {
        date: "FRIDAY, 20 MARCH, 05:00 PM",
        title: "New Reservation",
        text: "Richard Rogers has booked for [X] service at 09.00 am with Lozy as staff.",
      },
      {
        date: "FRIDAY, 20 MARCH, 05:00 PM",
        title: "New Reservation",
        text: "Richard Rogers has booked for [X] service at 09.00 am with Lozy as staff.",
      },
    ],
    []
  );
  return (
    <div className={classes.dashboard}>
      <h1>Dashboard</h1>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={8}>
          <h3>Information</h3>
          <Cards />
        </Grid>
        <Grid item xs={4}>
          <ChartProducts />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={8}>
          <DashboardTable />
        </Grid>
        <Grid item xs={4}>
          <h3>Notification</h3>
          <div className={classes.notificationsDashboard}>
            {nfs.map(function (item, idx) {
              return (
                <Notifications
                  key={idx}
                  date={item.date}
                  title={item.title}
                  text={item.text}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
