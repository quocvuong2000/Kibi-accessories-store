import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { AppBar, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";
import React from "react";
import ListCancelled from "./ListCancelled";
import ListCompleted from "./ListCompleted";
import ListDelivery from "./ListDelivery";
import ListPending from "./ListPending";
import s from "./styles.module.scss";
import PropTypes from "prop-types";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const Orders = () => {
  const [value, setValue] = React.useState(0);

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
              sx={{ p: 2, display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                  centered={true}
                >
                  <Tab label="PENDING" />
                  <Tab label="DELIVERY" />
                  <Tab label="COMPLETED" />
                  <Tab label="CANCELLED" />
                </Tabs>

                <TabPanel value={value} index={0}>
                  <ListPending />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ListDelivery />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ListCompleted />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <ListCancelled />
                </TabPanel>
              </Box>
              {/* <Tabs value={1}>
                <Tab label="PENDING" value={1} />
                <Tab label="DELIVERY" value="2" />
                <Tab label="COMPLETED" value="3" />
                <Tab label="CANCELLED" value="4" />

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
              </Tabs> */}
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </div>
  );
};

export default Orders;
