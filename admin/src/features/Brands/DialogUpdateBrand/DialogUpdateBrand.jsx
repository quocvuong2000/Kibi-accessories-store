import React, { useState } from "react";
import AppLoader from "../../../components/AppLoader";
import SnackBarCustom from "../../../components/SnackbarCustom/SnackBarCustom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import { Box } from "@mui/system";
import { doUpdateBrand } from "../BrandAPI";
const DialogUpdateBrand = (props) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    props.handleShowDialog(false);
  };

  return (
    <>
      {loading && <AppLoader />}
      <Dialog open={props.showDialog} onClose={handleClose}>
        <DialogTitle>UPDATE BRAND</DialogTitle>
        <Formik
          validateOnChange={true}
          initialValues={{
            brand: props.brandName || "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            doUpdateBrand(props.brandId, values)
              .then(() => {
                setSuccess(true);
                setTimeout(() => {
                  props.handleShowDialog(false);
                  props.reLoadTable("sucess" + Date.now());
                  setLoading(false);
                }, 500);
              })
              .catch(() => {
                setFailure(true);
              });
          }}
        >
          <Form noValidate autoComplete="off">
            <DialogContent>
              <Box>
                <AppTextField
                  placeholder={"Brand Name"}
                  label={"brandName"}
                  name="brand"
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" component="span">
                Update
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
      <SnackBarCustom
        open={success}
        setStateWhenClose={setSuccess}
        label={"Update Staff Success"}
        status={"success"}
      />
      <SnackBarCustom
        open={failure}
        setStateWhenClose={setFailure}
        label={"Create Staff Failure, Email already exists"}
        status={"error"}
      />
    </>
  );
};

export default DialogUpdateBrand;
