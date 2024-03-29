import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeaderStaff from "./Header/HeaderStaff";
import StaffList from "./StaffList/StaffList";
import { doGetstaffList } from "./StaffsAPI";
import classes from "./styles.module.scss";
import AppLoader from "../../components/AppLoader";
const Staffs = () => {
  const [staffs, setStaffs] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    doGetstaffList(page)
      .then((res) => {
        setStaffs(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, reload]);

  const takePage = (page) => {
    setPage(page);
  };

  const reLoadTable = (status) => {
    setReload(status);
  };

  return (
    <>
      {loading && <AppLoader />}
      <div >
        <h1>Staff management</h1>
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
                <h3>Staff</h3>
                <HeaderStaff reLoadTable={reLoadTable} />
                {staffs && (
                  <StaffList
                    takePage={takePage}
                    reLoadTable={reLoadTable}
                    staffs={staffs}
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

export default Staffs;
