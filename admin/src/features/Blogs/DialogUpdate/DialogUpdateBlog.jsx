import {
  Alert,
  Avatar,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Snackbar,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import thumbnailPlaceholder from "../../../assets/noimage.png";
import DialogTitle from "@mui/material/DialogTitle";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Form, Formik } from "formik";
import * as React from "react";
import { useState } from "react";
import AppSelectField from "../../../@crema/core/AppFormComponents/AppSelectField";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import CHKditor from "../../../components/CHKditor/CHKditor";
import SnackBarCustom from "../../../components/SnackbarCustom/SnackBarCustom";
import { app } from "../../../firebase/firebase";
import { getCategoryBlogList } from "../../CategoryBlog/CategoryBlogAPI";
import { updateBlog } from "../BlogAPI";
import styled from "@emotion/styled";
const Input = styled("input")({
  display: "none",
});
export default function DialogUpdateBlog(props) {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [catBlogList, setCatBlogList] = React.useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState(props.allDes.content || "");
  const [loading, setLoading] = useState(false);
  const [innerTextSync, setInnerTextSync] = useState("");
  const [thumbnail, setThumbnail] = useState("");
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

  return (
    <>
      <Dialog open={props.showDialog} onClose={handleClose}>
        <DialogTitle>UPDATE BLOG</DialogTitle>
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
            if (thumbnail) {
              const fileName = new Date().getTime() + thumbnail.name;
              const storage = getStorage(app);
              const storageRef = ref(storage, fileName);
              const uploadTask = uploadBytesResumable(storageRef, thumbnail);

              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                },
                (error) => {
                  console.log(error);
                },
                async () => {
                  await getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      updateBlog(
                        values.title,
                        values.content,
                        values.categoryBlog,
                        values.author,
                        innerTextSync,
                        downloadURL
                      )
                        .then((res) => {
                          if (res.status === 200) {
                            setLoading(false);
                            setSuccess(true);
                            setTimeout(() => {
                              props.handleShowDialog(false);
                              props.reLoadTable("sucess" + Date.now());
                            }, 500);
                          }
                        })
                        .catch(() => {
                          setFailure(true);
                        });
                    }
                  );
                }
              );
            } else {
              updateBlog(
                values.title,
                values.content,
                values.categoryBlog,
                values.author,
                innerTextSync
              )
                .then((res) => {
                  if (res.status === 200) {
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                      props.handleShowDialog(false);
                      props.reLoadTable("sucess" + Date.now());
                    }, 500);
                  }
                })
                .catch(() => {
                  setFailure(true);
                });
            }
          }}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off" style={{ minHeight: "550px" }}>
              <DialogContent>
                <Grid container spacing={5} sx={{ p: 2 }}>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
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
                    </FormControl>

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
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Avatar
                        alt=""
                        src={
                          props.allDes.thumbnail
                            ? props.allDes.thumbnail
                            : thumbnail
                            ? URL.createObjectURL(thumbnail)
                            : thumbnailPlaceholder
                        }
                        sx={{
                          width: 250,
                          height: 250,
                          mb: 2,
                          borderRadius: "10px",
                        }}
                        loading="lazy"
                      />
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={(e) => setThumbnail(e.target.files[0])}
                        />
                        <Button variant="contained" component="span">
                          Update Avatar
                        </Button>
                      </label>
                    </Box>
                  </Grid>
                </Grid>

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
                <Button type="submit">Add</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      <SnackBarCustom
        open={success}
        setStateWhenClose={setSuccess}
        label={"Update Blog Success"}
        status={"success"}
      />
      <SnackBarCustom
        open={failure}
        setStateWhenClose={setFailure}
        label={"Update Blog Failure, Please try again"}
        status={"error"}
      />
    </>
  );
}
