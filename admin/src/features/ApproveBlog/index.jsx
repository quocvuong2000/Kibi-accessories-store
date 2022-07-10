import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AppLoader from "../../components/AppLoader";
import { getBlogList, getBlogListPending } from "../Blogs/BlogAPI";
import ApproveBlogList from "./ApproveBlogList/ApproveBlogList";

import s from "./styles.module.scss";

const ApproveBlog = () => {
  const [blogList, setBlogList] = useState({});
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
    getBlogListPending(page)
      .then((res) => {
        if (res) {
          setBlogList(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, reload]);

  return (
    <>
      {loading === true && <AppLoader />}
      <div className={s.container}>
        <h1>Blog management</h1>
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
                <h3>Approve Blog</h3>
                {blogList && (
                  <ApproveBlogList
                    takePage={takePage}
                    reLoadTable={reLoadTable}
                    blogList={blogList}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </div>
    </>
  );
};

export default ApproveBlog;
