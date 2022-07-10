import { Alert, Box, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import * as React from "react";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import { createCategoryblog, updateCategoryBlog } from "../CategoryBlogAPI";
export default function DialogUpdateCategoryBlog(props) {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const handleClose = () => {
    props.handleShowDialog(false);
  };

  return (
    <>
      <Dialog open={props.showDialog} onClose={handleClose}>
        <DialogTitle>ADD NEW CATEGORY BLOG</DialogTitle>
        <Formik
          validateOnChange={true}
          initialValues={{
            title: `${props.categoryName}`,
          }}
          onSubmit={async (values) => {
            updateCategoryBlog(props.categoryId, values.title)
              .then(() => {
                setSuccess(true);
                props.handleShowDialog(false);
                props.reLoadTable("sucess" + Date.now());
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
                  placeholder={"Title"}
                  label={"title"}
                  name="title"
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Update</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={1000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Update success
        </Alert>
      </Snackbar>
      <Snackbar
        open={failure}
        autoHideDuration={1000}
        onClose={() => setFailure(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error
        </Alert>
      </Snackbar>
    </>
  );
}
