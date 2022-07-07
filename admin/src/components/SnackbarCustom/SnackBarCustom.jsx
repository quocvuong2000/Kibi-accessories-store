import {
  Alert,
  Avatar,
  Menu,
  Snackbar,
  TablePagination,
  Typography,
} from "@mui/material";

import React from 'react'

const SnackBarCustom = ({open, setStateWhenClose,label}) => {
  return (
    <Snackbar
    open={open}
    autoHideDuration={1000}
    onClose={() => setStateWhenClose(false)}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert severity="error" sx={{ width: "100%" }}>
      {label}
    </Alert>
  </Snackbar>
  )
}

export default SnackBarCustom