import React, { useEffect, useState } from "react";
import AppLoader from "../../components/AppLoader";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { getSubscriberList } from "./SubsriberAPI";
import HeaderSubscriber from "./HeaderSubscriber/HeaderSubcriber";
import SubscriberList from "./SubscriberList/SubscriberList";
export default function Subscriber() {
  const [subscriberList, setSubscriberList] = useState({});
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
    getSubscriberList(page)
      .then((res) => {
        if (res) {
          setSubscriberList(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, reload]);

  return (
    <>
      {loading === true && <AppLoader />}
      <div>
        <h1>Subscriber management</h1>
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
                <h3>Subscriber</h3>
                <HeaderSubscriber reLoadTable={reLoadTable} />
                {subscriberList && (
                  <SubscriberList
                    takePage={takePage}
                    reLoadTable={reLoadTable}
                    subscriberList={subscriberList}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </div>
    </>
  );
}
