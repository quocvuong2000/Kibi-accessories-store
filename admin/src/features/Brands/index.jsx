import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

import classes from "./styles.module.scss";
import BrandList from "./BrandList/BrandList";
const Brands = () => {
  return (
    <div className={classes.brandsContainer}>
      <h1>Brand management</h1>
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
          <Grid item xs={12}>
            <BrandList />
          </Grid>
        </Grid>
      </motion.div>
    </div>
  );
};

export default Brands;
