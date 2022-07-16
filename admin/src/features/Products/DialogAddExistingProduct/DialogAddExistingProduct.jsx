import {
  Alert,
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export default function DialogAddExistingProduct(props) {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const handleClose = () => {
    props.setShowAddExistingProduct(false);
  };
  return (
    <>
      <Dialog open={props.showDialog} onClose={handleClose}>
        <DialogTitle>
          Choose the existing product and enter the quantity
        </DialogTitle>
        <Box sx={{ p: 2 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={
              props.productList.products.length > 0
                ? props.productList.products
                : []
            }
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              console.log(event, newValue);
            }}
            renderInput={(params) => <TextField {...params} label="product" />}
          />
        </Box>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" onClick={handleClose}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Choose success
        </Alert>
      </Snackbar>
      <Snackbar
        open={failure}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error
        </Alert>
      </Snackbar>
    </>
  );
}
