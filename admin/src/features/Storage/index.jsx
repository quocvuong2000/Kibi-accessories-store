import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { AppBar, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";
import PropTypes from "prop-types";
import ListImport from "./Import/import";
import ListExport from "./export/export";
import { doGetStorageList } from "./StorageAPI";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const Storage = () => {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(1);
  const [pageImport, setPageImport] = useState(1);

  const [importList, setImportList] = useState([]);
  const [exportList, setExportList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    doGetStorageList("import", pageImport)
      .then((res) => {
        setImportList(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageImport]);

  useEffect(() => {
    doGetStorageList("export", page)
      .then((res) => {
        console.log("res:", res);
        setExportList(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  const takePage = (page) => {
    setPage(page);
  };

  const takePageImport = (page) => {
    setPageImport(page);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={s.container}>
      <h1>Storage Management</h1>
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
              sx={{ p: 2, display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                  centered={true}
                >
                  <Tab label="IMPORT" />
                  <Tab label="EXPORT" />
                </Tabs>

                <TabPanel value={value} index={0}>
                  <ListImport
                    takePageImport={takePageImport}
                    importList={importList}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ListExport
                    loading={loading}
                    takePage={takePage}
                    exportList={exportList}
                    setLoading={setLoading}
                  />
                </TabPanel>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </div>
  );
};

export default Storage;
