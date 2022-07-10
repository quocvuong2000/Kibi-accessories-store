import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import * as React from "react";
import { useState } from "react";
import AppSelectField from "../../../@crema/core/AppFormComponents/AppSelectField";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import CHKditor from "../../../components/CHKditor/CHKditor";
import { getCategoryBlogList } from "../../CategoryBlog/CategoryBlogAPI";
import { updateBlog } from "../BlogAPI";
import { AddBlogSchema } from "../DialogAdd/validation";
export default function DialogUpdateBlog(props) {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [catBlogList, setCatBlogList] = React.useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [innerTextSync, setInnerTextSync] = useState("");

  const hanldeDataCkeditor = (type, data) => {
    setContent(data);
  };
  React.useEffect(() => {
    getCategoryBlogList(page).then((res) => {
      setCatBlogList(res);
    });
  }, []);
  const handleClose = () => {
    props.handleShowDialog(false);
  };
  console.log("props.allDes:", props.allDes);
  return (
    <>
      <Dialog open={props.showDialog} onClose={handleClose}>
        <DialogTitle>ADD NEW BLOG</DialogTitle>
        <Formik
          validateOnChange={true}
          initialValues={{
            title: props.allDes.title || "",
            categoryBlog: props.allDes.categoryblog || "",
            content: props.allDes.content || "",
            author: props.allDes.author || "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            updateBlog(
              props.blogId,
              values.title,
              values.content,
              values.categoryBlog,
              values.author,
              innerTextSync
            ).then((res) => {
              if (res.status === 200) {
                props.handleShowDialog(false);
                props.reLoadTable("sucess" + Date.now());
              }
            });
          }}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off">
              <DialogContent>
                <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                  <FormControl
                    size="small"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <InputLabel
                      id="label-category-type"
                      sx={{
                        background: "#fff",
                        color: (theme) =>
                          errors.category && touched.category
                            ? "#f44336"
                            : "currentcolor",
                      }}
                    >
                      Category Blog
                    </InputLabel>
                    <AppSelectField
                      labelId="label-category-type"
                      size="small"
                      label={"Category Blog"}
                      name="categoryBlog"
                      onChange={(event) => {
                        setFieldValue("categoryBlog", event.target.value);
                      }}
                    >
                      {catBlogList.categories?.map((item, index) => {
                        return (
                          <MenuItem
                            value={item._id}
                            key={index}
                            title={item.title}
                          >
                            {item.title}
                          </MenuItem>
                        );
                      })}
                    </AppSelectField>
                    <Box
                      sx={{ mb: { xs: 3, xl: 3 } }}
                      style={{
                        width: "100%",

                        marginTop: "20px",
                      }}
                    >
                      <AppTextField
                        size="small"
                        placeholder={"Title"}
                        label={"Title"}
                        name="title"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{ mb: { xs: 3, xl: 3 } }}
                      style={{
                        width: "100%",
                      }}
                    >
                      <AppTextField
                        size="small"
                        placeholder={"Author"}
                        label={"Author"}
                        name="author"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{ mb: { xs: 3, xl: 3 } }}
                      style={{
                        width: "100%",
                        minHeight: "214px",
                      }}
                    >
                      <CHKditor
                        field={"content"}
                        setValue={setFieldValue}
                        data={content}
                        updateData={hanldeDataCkeditor}
                        type={"content"}
                      />
                    </Box>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Update</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={1000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Add success
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
