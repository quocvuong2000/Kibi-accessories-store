import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AppLoader from "../../@crema/core/AppLoader";
import { getBrandList } from "./BrandAPI";
import BrandList from "./BrandList/BrandList";
import HeaderBrand from "./Header/HeaderBrand";
import classes from "./styles.module.scss";

const Brands = () => {
  const [brandList, setBrandList] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  const takePage = (page) => {
    setPage(page);
  };
  const reLoadTable = (status) => {
    setReload(status);
  };

  useEffect(() => {
    getBrandList(page)
      .then((res) => {
        if (res) {
          setBrandList(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, reload]);

  return (
    <>
      {loading && <AppLoader />}
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
            <Grid item xs={12} sx={{ pr: 2 }}>
              <Box
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                sx={{ p: 2 }}
              >
                <h3>Brand</h3>
                <HeaderBrand reLoadTable={reLoadTable} />
                {brandList && (
                  <BrandList takePage={takePage} brandList={brandList} />
                )}
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </div>
    </>
  );
};

export default Brands;
