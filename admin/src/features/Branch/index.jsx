import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AppLoader from "../../components/AppLoader";
import { getBranches } from "./BranchAPI";
import BranchList from "./BranchList/BranchList";
import HeaderBranch from "./HeaderBranch/HeaderBranch";
import s from "./styles.module.scss";

const Branch = () => {
  const [branchList, setBranchList] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); //set
  const [reload, setReload] = useState(true);

  const takePage = (page) => {
    setPage(page);
  };
  const reLoadTable = (status) => {
    setReload(status);
  };
  useEffect(() => {
    getBranches(page)
      .then((res) => {
        console.log("res:", res);
        if (res) {
          setBranchList(res);
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
        <h1>Branch management</h1>
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
                <h3>Branch</h3>
                <HeaderBranch reLoadTable={reLoadTable} />
                {branchList && (
                  <BranchList
                    takePage={takePage}
                    reLoadTable={reLoadTable}
                    branchList={branchList}
                  />
                )}
                {/* <HeaderBlog reLoadTable={reLoadTable} />
                {branchList && (
                  <BlogList
                    takePage={takePage}
                    reLoadTable={reLoadTable}
                    blogList={blogList}
                  />
                )} */}
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </div>
    </>
  );
};

export default Branch;
