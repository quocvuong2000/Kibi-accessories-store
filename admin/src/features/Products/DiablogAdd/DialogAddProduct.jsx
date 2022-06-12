import {
  Alert,
  Avatar,
  Box,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { Form, Formik } from "formik";
import * as React from "react";
import AppSelectField from "../../../@crema/core/AppFormComponents/AppSelectField";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import { getBrandList } from "../../Brands/BrandAPI";
import { getCategoryList } from "../../Categories/CategoryAPI";
import { addNewProduct } from "../ProductAPI";
import unknownUser from "../../../assets/images/product.png";
import { UilBox } from "@iconscout/react-unicons";
import { UilClipboardNotes } from "@iconscout/react-unicons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../utils/firebase";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import CHKditor from "../../../components/CHKditor/CHKditor";

const steps = ["Detail Product", "Description"];
const descriptionSteps = [
  "Content",
  "Detail",
  "How to care",
  "How to adjust",
  "Warranty detail",
];
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <UilBox />,
    2: <UilClipboardNotes />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
export default function DialogAddProduct(props) {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [brandList, setBrandList] = React.useState([]);
  const [catList, setCatList] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStepDes, setActiveStepDes] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [completedDes, setCompletedDes] = React.useState({});

  const handleClose = () => {
    props.handleShowDialog(false);
  };
  React.useEffect(() => {
    getBrandList().then((res) => {
      setBrandList(res.brands);
    });
    getCategoryList().then((res) => {
      setCatList(res.categories);
    });
  }, []);
  const Input = styled("input")({
    display: "none",
  });
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleStepDes = (step) => () => {
    setActiveStepDes(step);
  };

  return (
    <>
      <Dialog
        open={props.showDialog}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle>ADD NEW PRODUCT</DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stepper
            nonLinear
            activeStep={activeStep}
            sx={{ width: "400px" }}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                completed={completed[index]}
                sx={{ cursor: "pointer" }}
                onClick={handleStep(index)}
              >
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
                {/* <StepButton color="inherit" sx={{ p: 2 }}></StepButton> */}
              </Step>
            ))}
          </Stepper>
        </Box>
        <Formik
          validateOnChange={true}
          initialValues={{
            product: "",
            price: 0,
            category: "",
            brand: "",
            topSales: false,
            quantity: 0,
            description: {
              content: "",
              detail: "",
              howToCare: "",
              howToAdjust: "",
              warrantyDetail: "",
            },
          }}
          onSubmit={async (values) => {
            if (file) {
              const fileName = new Date().getTime() + file.name;
              const storage = getStorage(app);
              const storageRef = ref(storage, fileName);
              const uploadTask = uploadBytesResumable(storageRef, file);

              // Register three observers:
              // 1. 'state_changed' observer, called any time the state changes
              // 2. Error observer, called on failure
              // 3. Completion observer, called on successful completion
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                    default:
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      const product = {
                        ...values,
                        image: downloadURL,
                      };
                      addNewProduct(product)
                        .then(() => {
                          setSuccess(true);
                          props.handleShowDialog(false);
                          props.reLoadTable("sucess" + Date.now());
                        })
                        .catch(() => {
                          setFailure(true);
                        })
                        .finally(() => {
                          setFile(null);
                        });
                    }
                  );
                }
              );
            } else {
              addNewProduct(values)
                .then(() => {
                  setSuccess(true);
                  props.handleShowDialog(false);
                  props.reLoadTable("sucess" + Date.now());
                })
                .catch(() => {
                  setFailure(true);
                });
            }
          }}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off" style={{ minHeight: "500px" }}>
              <Grid container spacing={5} sx={{ p: 2 }}>
                {activeStep === 0 && (
                  <>
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
                      {/* PRODUCT */}
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <AppTextField
                          size="small"
                          placeholder={"Product"}
                          label={"Product"}
                          name="product"
                          variant="outlined"
                          sx={{
                            width: "100%",
                          }}
                        />
                      </Box>
                      {/* PRICE */}
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <AppTextField
                          size="small"
                          placeholder={"Price"}
                          label={"Price"}
                          name="price"
                          variant="outlined"
                          sx={{
                            width: "100%",
                          }}
                        />
                      </Box>
                      {/* CATEGORY ID */}
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <FormControl
                          size="small"
                          sx={{
                            width: "100%",
                          }}
                        >
                          <InputLabel
                            id="label-user-type"
                            sx={{
                              background: "#fff",
                              color: (theme) =>
                                errors.userType && touched.userType
                                  ? "#f44336"
                                  : "currentcolor",
                            }}
                          >
                            Category
                          </InputLabel>
                          <AppSelectField
                            labelId="label-user-type"
                            size="small"
                            label={"Category"}
                            name="category"
                            onChange={(event) =>
                              setFieldValue("category", event.target.value)
                            }
                          >
                            {catList.map((item, index) => {
                              return (
                                <MenuItem value={item._id} key={index}>
                                  {item.category}
                                </MenuItem>
                              );
                            })}
                          </AppSelectField>
                        </FormControl>
                      </Box>
                      {/* BRAND ID */}
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <FormControl
                          size="small"
                          sx={{
                            width: "100%",
                          }}
                        >
                          <InputLabel
                            id="label-user-role"
                            sx={{
                              background: "#fff",
                              color: (theme) =>
                                errors.userType && touched.userType
                                  ? "#f44336"
                                  : "currentcolor",
                            }}
                          >
                            Brand
                          </InputLabel>
                          <Select
                            labelId="label-user-role"
                            label="Brand"
                            name="brand"
                            sx={{
                              width: "100%",
                            }}
                            onChange={(event) =>
                              setFieldValue("brand", event.target.value)
                            }
                          >
                            {brandList.map((item, index) => {
                              return (
                                <MenuItem value={item._id} key={index}>
                                  {item.brand}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <AppTextField
                          size="small"
                          placeholder={"Quantity"}
                          label={"Quantity"}
                          name="quantity"
                          variant="outlined"
                          sx={{
                            width: "100%",
                          }}
                        />
                      </Box>

                      {/* Top Sales */}
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <FormControlLabel
                          value="Top Sales"
                          control={<Checkbox />}
                          label="Top Sales"
                          labelPlacement="start"
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
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={file ? URL.createObjectURL(file) : unknownUser}
                        sx={{
                          width: 350,
                          height: 350,
                          mb: 2,
                          borderRadius: "0",
                        }}
                      />
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <Button variant="contained" component="span">
                          Upload
                        </Button>
                      </label>
                    </Grid>
                  </>
                )}
                {activeStep === 1 && (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{
                      width: "100%",
                      minheight: "414px",
                      textAlign: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Stepper
                        nonLinear
                        activeStep={activeStepDes}
                        sx={{ width: "800px", mb: 2 }}
                      >
                        {descriptionSteps.map((label, index) => (
                          <Step key={label} completed={completedDes[index]}>
                            <StepButton
                              color="inherit"
                              onClick={handleStepDes(index)}
                            >
                              {label}
                            </StepButton>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                    {activeStepDes === 0 && (
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <CHKditor
                          setValue={setFieldValue}
                          field={"description.content"}
                        />
                      </Box>
                    )}
                    {activeStepDes === 1 && (
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <CHKditor
                          setValue={setFieldValue}
                          field={"description.detail"}
                        />
                      </Box>
                    )}
                    {activeStepDes === 2 && (
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <CHKditor
                          setValue={setFieldValue}
                          field={"description.howToCare"}
                        />
                      </Box>
                    )}
                    {activeStepDes === 3 && (
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <CHKditor
                          setValue={setFieldValue}
                          field={"description.howToAdjust"}
                        />
                      </Box>
                    )}
                    {activeStepDes === 4 && (
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <CHKditor
                          setValue={setFieldValue}
                          field={"description.warrantyDetail"}
                        />
                      </Box>
                    )}
                  </Grid>
                )}
              </Grid>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Add
                </Button>
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
