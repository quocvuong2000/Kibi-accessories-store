import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { SendEmailSchema } from "./validation";
import CHKditor from "../../../components/CHKditor/CHKditor";
import SnackBarCustom from "../../../components/SnackbarCustom/SnackBarCustom";
import AppLoader from "../../../components/AppLoader";
import { sendEmailToSubscriber } from "../SubsriberAPI";

export default function DialogSendEmail(props) {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [content, setContent] = useState(``);
  const [loading, setLoading] = useState(false);
  const hanldeDataCkeditor = (type, data) => {
    setContent(data);
  };
  const handleClose = () => {
    props.handleShowDialog(false);
  };

  return (
    <>
      {loading && <AppLoader />}
      <Dialog
        open={props.showDialog}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle>SEND EMAIL TO SUBSCRIBE</DialogTitle>
        <Formik
          validationSchema={SendEmailSchema}
          validateOnChange={true}
          initialValues={{
            content: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            sendEmailToSubscriber(values.content).then((res) => {
              if (res) {
                setSuccess(true);
                setTimeout(() => {
                  props.handleShowDialog(false);
                  props.reLoadTable("success" + Date.now());
                }, 500);
              }
            });
          }}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off" style={{ minHeight: "550px" }}>
              <DialogContent>
                {/* CKEDITOR */}
                <Box>
                  <CHKditor
                    field={"content"}
                    setValue={setFieldValue}
                    data={content}
                    updateData={hanldeDataCkeditor}
                    type={"content"}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Send</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      <SnackBarCustom
        open={success}
        setStateWhenClose={setSuccess}
        label={"Send Success"}
        status={"success"}
      />
      <SnackBarCustom
        open={failure}
        setStateWhenClose={setFailure}
        label={"Send Failure, Please try again"}
        status={"error"}
      />
    </>
  );
}
