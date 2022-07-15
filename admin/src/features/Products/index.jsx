import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import HeaderProduct from "./Header/HeaderProduct";
import ProductList from "./ProductList/ProductList";
import classes from "./styles.module.scss";
import { getProductList } from "./ProductAPI";
import AppLoader from "../../components/AppLoader";
import { getBranches } from "../Branch/BranchAPI";
import DialogChooseBranch from "./DialogChooseBranch/DialogChooseBranch";

const Products = () => {
  const [productList, setProductList] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [branchSelected, setBranchSelected] = useState("");
  const [branchPage, setBranchPage] = useState(1);
  const [branchList, setBranchList] = useState();
  const [showChooseBranch, setShowChooseBrach] = useState(true);
  const takePage = (page) => {
    setPage(page);
  };
  function loadMoreItems(event) {
    if (event.target.scrollTop === event.target.scrollHeight) {
      //user is at the end of the list so load more items
    }
  }
  const hanldeChooseBranches = (value) => {
    console.log(value);
    setBranchSelected({
      _id: value.value,
      address: value.name,
    });
  };
  const reLoadTable = (status) => {
    setReload(status);
  };
  useEffect(() => {
    getProductList(page,branchSelected._id)
      .then((res) => {
        if (res) {
          setProductList(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, reload, branchSelected]);
  useEffect(() => {
    getBranches(1).then((res) => {
      if (res.branches.length > 0) {
        setBranchList(res.branches);
        setBranchSelected({
          _id: res.branches[0]._id,
          address: res.branches[0].address,
        });
      }
    });
  }, []);
  return (
    <>
      {loading && <AppLoader />}
      {branchList && (
        <>
          <DialogChooseBranch
            showDialog={showChooseBranch}
            setShowChooseBrach={setShowChooseBrach}
            branchSelected={branchSelected._id}
            hanldeChooseBranches={hanldeChooseBranches}
            branchList={branchList}
          />
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
                    <HeaderProduct
                      reLoadTable={reLoadTable}
                      setShowChooseBrach={setShowChooseBrach}
                      branchSelected={branchSelected}
                      hanldeChooseBranches={hanldeChooseBranches}
                      branchList={branchList}
                    />
                    {productList && (
                      <ProductList
                        takePage={takePage}
                        reLoadTable={reLoadTable}
                        productList={productList}
                        branchSelected={branchSelected}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
