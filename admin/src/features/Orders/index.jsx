import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";
import React from "react";
import ListCancelled from "./ListCancelled";
import ListCompleted from "./ListCompleted";
import ListDelivery from "./ListDelivery";
import ListPending from "./ListPending";
import s from "./styles.module.scss";
const Orders = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={s.container}>
      <h1>Order Management</h1>
      <motion.div
        animate={{
          scale: [0.5, 1],
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          times: [0.1, 0.4],
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} sx={{ pr: 2 }}>
            <Box
              component={Paper}
              style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
              sx={{ p: 2 }}
            >
              <TabContext value={value}>
                <TabList
                  onChange={handleChange}
                  centered={true}
                  aria-label="Tab Orders"
                  className={s.tab}
                >
                  <Tab label="PENDING" value="1" />
                  <Tab label="DELIVERY" value="2" />
                  <Tab label="COMPLETED" value="3" />
                  <Tab label="CANCELLED" value="4" />
                </TabList>

                <TabPanel value="1">
                  <ListPending />
                </TabPanel>
                <TabPanel value="2">
                  <ListDelivery />
                </TabPanel>
                <TabPanel value="3">
                  <ListCompleted />
                </TabPanel>
                <TabPanel value="4">
                  <ListCancelled />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </div>
  );
};

export default Orders;
