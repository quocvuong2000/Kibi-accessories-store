import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AppLoader from "../../@crema/core/AppLoader";

import { getCategoryBlogList } from "./CategoryBlogAPI";
import CategoryBlogList from "./CategoryBlogList/CategoryBlogList";
import HeaderCat from "./Header/HeaderCat";
import classes from "./styles.module.scss";

const CategoryBlog = () => {
  const [categoryBlogList, setCategoryBlogList] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState("");

  const takePage = (page) => {
    setPage(page);
  };
  const reLoadTable = (status) => {
    setReload(status);
  };

  useEffect(() => {
    getCategoryBlogList(page)
      .then((res) => {
        if (res) {
          setCategoryBlogList(res);
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
        <h1>Category management</h1>
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
                <h3>Category</h3>
                <HeaderCat reLoadTable={reLoadTable} />
                <CategoryBlogList
                  takePage={takePage}
                  reLoadTable={reLoadTable}
                  categoryBlogList={categoryBlogList}
                />
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </div>
    </>
  );
};

export default CategoryBlog;
