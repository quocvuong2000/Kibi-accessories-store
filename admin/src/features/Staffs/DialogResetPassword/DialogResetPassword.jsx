import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import AppLoader from "../../../components/AppLoader";
import SnackBarCustom from "../../../components/SnackbarCustom/SnackBarCustom";
import { doUpdateStaff } from "../StaffsAPI";
import { ResetPasswordSchema } from "./validation";
const DialogResetPassword = (props) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    props.handleShowDialog(false);
  };
  return (
    <>
      {loading && <AppLoader />}
      <Dialog
        open={props.showDialog}
        onClose={handleClose}
        fullWidth={false}
        maxWidth={"xl"}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          RESET NEW PASSWORD
        </DialogTitle>
        <Formik
          validationSchema={ResetPasswordSchema}
          initialValues={{
            password: "",
            rePassword: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            doUpdateStaff(props.staffId, { password: values.password })
              .then(() => {
                setSuccess(true);
                setTimeout(() => {
                  props.handleShowDialog(false);
                  props.reLoadTable("success" + Date.now());
                }, 500);
              })
              .catch(() => {
                setFailure(true);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <Form
            noValidate
            autoComplete="off"
            style={{ minHeight: "100px", padding: "10px" }}
          >
            {/* PASSWORD */}
            <Box sx={{ mb: { xs: 3, xl: 3 } }}>
              <AppTextField
                size="small"
                placeholder={"Password"}
                label={"Password"}
                name="password"
                variant="outlined"
                type="password"
                sx={{
                  width: "100%",
                }}
              />
            </Box>
            {/* RE-PASSWORD */}
            <Box sx={{ mb: { xs: 3, xl: 3 } }}>
              <AppTextField
                size="small"
                placeholder={"Re Password"}
                label={"Re Password"}
                name="rePassword"
                variant="outlined"
                type="password"
                sx={{
                  width: "100%",
                }}
              />
            </Box>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Reset password
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
      <SnackBarCustom
        open={success}
        setStateWhenClose={setSuccess}
        label={"Reset password success"}
        status={"success"}
      />
      <SnackBarCustom
        open={failure}
        setStateWhenClose={setFailure}
        label={"Reset password failure"}
        status={"error"}
      />
    </>
  );
};

export default DialogResetPassword;
