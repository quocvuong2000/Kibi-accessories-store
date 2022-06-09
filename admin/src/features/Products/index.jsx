import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import HeaderProduct from "./Header/HeaderProduct";
import ProductList from "./ProductList/ProductList";
import classes from "./styles.module.scss";
import { getProductList } from "./ProductAPI";

const Products = () => {
  const [productList, setProductList] = useState({});
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
    getProductList(page)
      .then((res) => {
        if (res) {
          setProductList(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, reload]);
  return (
    <div className={classes.brandsContainer}>
      <h1>Product management</h1>
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
              <h3>Products</h3>
              <HeaderProduct reLoadTable={reLoadTable} />
              {productList && (
                <ProductList takePage={takePage} productList={productList} />
              )}
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </div>
  );
};

export default Products;
