import {
  Alert,
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Snackbar,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import * as React from "react";
import { useEffect, useState } from "react";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import AppLoader from "../../../components/AppLoader";
import { doGetAllProduct, doUpdateProduct } from "../ProductAPI";
import { AddExistingProductSchema } from "./validation";

export default function DialogAddExistingProduct(props) {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allProduct, setAllProduct] = useState([]);
  const handleClose = () => {
    props.setShowAddExistingProduct(false);
  };
  useEffect(() => {
    doGetAllProduct()
      .then((res) => {
        if (res.products.length > 0) {
          setAllProduct(res.products);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading && <AppLoader />}
      <Dialog open={props.showDialog} onClose={handleClose}>
        <DialogTitle>
          Choose the existing product and enter the quantity
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontWeight: "600" }}>Current branch: </Typography>{" "}
          {props.branchSelected.address}
        </DialogContent>
        <Box sx={{ p: 2 }}>
          <Formik
            validationSchema={AddExistingProductSchema}
            validateOnChange={true}
            initialValues={{
              productId: null,
              quantityEnter: 0,
            }}
            onSubmit={async (values) => {
              // console.log(values);
              const newBranchesArr = values.productId.branches;
              const newBranchQuantity = values.quantityEnter;
              const updateQuantity =
                values.productId.quantity + newBranchQuantity;
              newBranchesArr.push({
                branchId: props.branchSelected._id,
                branchName: props.branchSelected.address,
                quantity: newBranchQuantity,
                oldQuantity: 0,
              });
              const product = {
                ...values.productId,
                branches: newBranchesArr,
                oldQuantity: values.productId.quantity || 0,
                quantity: parseInt(updateQuantity),
                currentBranch: props.branchSelected._id,
              };
              doUpdateProduct(values.productId._id, product)
                .then(() => {
                  setSuccess(true);

                  setTimeout(() => {
                    props.reLoadTable("sucess" + Date.now());
                    props.setShowAddExistingProduct(false);
                  }, 1000);
                })
                .catch(() => {
                  setFailure(true);
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form
                noValidate
                autoComplete="off"
                style={{ minHeight: "250px" }}
              >
                <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                  {/* {console.log(
                    "props.currentProductList :>> ",
                    allProduct.filter(
                      (el) => !props.currentProductList.includes(el._id)
                    )
                  )} */}
                  <Autocomplete
                    id="combo-box-demo"
                    autoHighlight
                    options={allProduct.length > 0 ? allProduct : []}
                    getOptionLabel={(option) => option.product}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.product}
                      </Box>
                    )}
                    // getOptionLabel={(option) => option.product}
                    onChange={(event, newValue) => {
                      // console.log(newValue._id);
                      setFieldValue("productId", newValue);
                    }}
                    renderInput={(params) => (
                      <AppTextField
                        {...params}
                        name="productId"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                  <AppTextField
                    placeholder={"Quantity"}
                    label={"Quantity"}
                    name="quantityEnter"
                    variant="outlined"
                    type={"number"}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Box>
                <DialogActions>
                  <Button color="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Continue
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Box>
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
