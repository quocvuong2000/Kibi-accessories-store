import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import AppDateFiled from "../../../@crema/core/AppFormComponents/AppDateFiled";
import AppSelectField from "../../../@crema/core/AppFormComponents/AppSelectField";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import unknownUser from "../../../assets/user.jpg";
import AppLoader from "../../../components/AppLoader";
import SnackBarCustom from "../../../components/SnackbarCustom/SnackBarCustom";
import { app } from "../../../firebase/firebase";
import { doCreateStaff } from "../StaffsAPI";
import { CreateStaffSchema } from "./validation";
const Input = styled("input")({
  display: "none",
});
const DialogAddStaff = (props) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [dateMui, setDateMui] = useState(moment().format(""));
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
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          ADD NEW STAFF
        </DialogTitle>
        <Formik
          validationSchema={CreateStaffSchema}
          initialValues={{
            email: "",
            password: "",
            rePassword: "",
            name: "",
            phone: "",
            address: "",
            dob: dateMui,
            gender: "",
            type: "staff",
            role: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            if (image) {
              const fileName = new Date().getTime() + image.name;
              const storage = getStorage(app);
              const storageRef = ref(storage, fileName);
              const uploadTask = uploadBytesResumable(storageRef, image);

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
                      const newStaff = {
                        ...values,
                        avatar: downloadURL,
                        dob: dateMui,
                        username: values.email,
                      };
                      doCreateStaff(newStaff)
                        .then(() => {
                          setSuccess(true);
                          setTimeout(() => {
                            props.handleShowDialog(false);
                            props.reLoadTable("sucess" + Date.now());
                          }, 1000);
                        })
                        .catch(() => setFailure(true))
                        .finally(() => {
                          setLoading(false);
                        });
                    }
                  );
                }
              );
            } else {
              const newStaff = {
                ...values,
                dob: dateMui,
                username: values.email,
              };
              doCreateStaff(newStaff)
                .then(() => {
                  setSuccess(true);
                  setTimeout(() => {
                    props.handleShowDialog(false);
                    props.reLoadTable("sucess" + Date.now());
                  }, 1000);
                })
                .catch(() => setFailure(true))
                .finally(() => {
                  setLoading(false);
                });
            }
          }}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off" style={{ minHeight: "550px" }}>
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
                  {/* EMAIL */}
                  <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                    <AppTextField
                      size="small"
                      placeholder={"Email"}
                      label={"Email"}
                      name="email"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Box>
                  {/* FULL NAME */}
                  <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                    <AppTextField
                      size="small"
                      placeholder={"Full Name"}
                      label={"Full Name"}
                      name="name"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Box>
                  {/* PHONE NUMBER */}
                  <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                    <AppTextField
                      size="small"
                      placeholder={"Phone Number"}
                      label={"Phone Number"}
                      name="phone"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Box>
                  {/* ADDRESS */}
                  <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                    <AppTextField
                      size="small"
                      placeholder={"Address"}
                      label={"Address"}
                      name="address"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Box>
                  {/* DATE OF BIRTH */}
                  <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <AppDateFiled
                        size="small"
                        placeholder={"Date Of Birth"}
                        label={"Date Of Birth"}
                        name="dob"
                        variant="outlined"
                        format="DD-MM-YYYY"
                        mask="__-__-____"
                        value={dateMui}
                        sx={{
                          width: "100%",
                        }}
                        onChange={(value) => {
                          setFieldValue(
                            "dob",
                            moment(value).format("DD/MM/YYYY")
                          );
                          setDateMui(value);
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                  {/* GENDER */}
                  <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                    <FormControl
                      size="small"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <InputLabel
                        id="label-gender-role"
                        sx={{
                          background: "#fff",
                          color: (theme) =>
                            errors.gender && touched.gender
                              ? "#f44336"
                              : "currentcolor",
                        }}
                      >
                        Gender
                      </InputLabel>
                      <AppSelectField
                        labelId="label-gender-role"
                        label="Gender"
                        name="gender"
                        sx={{
                          width: "100%",
                        }}
                        onChange={(event) =>
                          setFieldValue("gender", event.target.value)
                        }
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"other"}>Other</MenuItem>
                      </AppSelectField>
                    </FormControl>
                  </Box>
                  {/* ROLE */}
                  <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                    <FormControl
                      size="small"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <InputLabel
                        id="label-role"
                        sx={{
                          background: "#fff",
                          color: (theme) =>
                            errors.role && touched.role
                              ? "#f44336"
                              : "currentcolor",
                        }}
                      >
                        Staff Role
                      </InputLabel>
                      <AppSelectField
                        labelId="label-role"
                        label="Staff Role"
                        name="role"
                        sx={{
                          width: "100%",
                        }}
                        onChange={(event) =>
                          setFieldValue("role", event.target.value)
                        }
                      >
                        <MenuItem value={"blog"}>Blog Management</MenuItem>
                        <MenuItem value={"product"}>
                          Product Management
                        </MenuItem>
                        <MenuItem value={"order"}>Order Management</MenuItem>
                      </AppSelectField>
                    </FormControl>
                  </Box>
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
                      src={image ? URL.createObjectURL(image) : unknownUser}
                      sx={{
                        width: 350,
                        height: 350,
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
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <Button variant="contained" component="span">
                        Update Avatar
                      </Button>
                    </label>
                  </Box>
                  <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      Add Staff
                    </Button>
                  </DialogActions>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Dialog>
      <SnackBarCustom
        open={success}
        setStateWhenClose={setSuccess}
        label={"Create Staff Success"}
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

export default DialogAddStaff;
