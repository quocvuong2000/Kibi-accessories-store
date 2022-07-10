import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import AppLoader from "../../components/AppLoader";
import { doGetListCustomer } from "./CustomersAPI";
import CustomerList from "./CustomerList/CustomerList";
import HeaderCustomer from "./Header/HeaderCustomer";
const Customers = () => {
  const [customers, setCustomers] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    doGetListCustomer(page)
      .then((res) => {
        setCustomers(res);
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
      <div>
        <h1>Customer management</h1>
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
                <h3>Customer</h3>
                <HeaderCustomer reLoadTable={reLoadTable} />
                {customers && (
                  <CustomerList
                    takePage={takePage}
                    reLoadTable={reLoadTable}
                    customers={customers}
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

export default Customers;
