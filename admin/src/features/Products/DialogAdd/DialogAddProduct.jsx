import {
  Alert,
  Avatar,
  Box,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  StepLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Form, Formik } from "formik";
import * as React from "react";
import AppSelectField from "../../../@crema/core/AppFormComponents/AppSelectField";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import CHKditor from "../../../components/CHKditor/CHKditor";
import {
  ColorlibConnector,
  ColorlibStepIcon,
  descriptionSteps,
  steps,
} from "../../../utils/addProductData";
import { app } from "../../../utils/firebase";
import { getBrandList } from "../../Brands/BrandAPI";
import { getCategoryList } from "../../Categories/CategoryAPI";
import { addNewProduct } from "../ProductAPI";
import unknownUser from "../../../assets/images/product.png";
import { UilTimesCircle } from "@iconscout/react-unicons";
export default function DialogAddProduct(props) {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [brandList, setBrandList] = React.useState([]);
  const [catList, setCatList] = React.useState([]);
  // const [file, setFile] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStepDes, setActiveStepDes] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [completedDes, setCompletedDes] = React.useState({});
  const [images, setImages] = React.useState([]);
  const [urls, setUrls] = React.useState([]);
  const [description, setDescription] = React.useState({
    content: "",
    detail: "",
    howToCare: "",
    howToAdjust: "",
    warrantyDetail: "",
  });
  const hanldeDataCkeditor = (type, data) => {
    switch (type) {
      case "content":
        setDescription({ ...description, content: data });
        break;
      case "detail":
        setDescription({ ...description, detail: data });
        break;
      case "howToCare":
        setDescription({ ...description, howToCare: data });

        break;
      case "howToAdjust":
        setDescription({ ...description, howToAdjust: data });

        break;
      case "warrantyDetail":
        setDescription({ ...description, warrantyDetail: data });

        break;
      default:
        break;
    }
  };
  const handleChangeImage = (e) => {
    let list = [];
    setUrls([]);

    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      list.push(newImage);
      const fileName = new Date().getTime() + newImage.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, newImage);

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
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrls((prev) => [...prev, downloadURL]);
          });
        }
      );
    }

    setImages(list);
  };
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
  const hanldeDeleteImage = (url) => {
    setImages(images.filter((item) => item !== url));
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
            if (urls.length === images.length) {
              const product = {
                ...values,
                images: urls,
              };

              product &&
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
                    setImages([]);
                    setUrls([]);
                    setDescription({
                      content: "",
                      detail: "",
                      howToCare: "",
                      howToAdjust: "",
                      warrantyDetail: "",
                    });
                  });
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
          {({ setFieldValue, errors, touched }) => (
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
                      {images.length === 0 ? (
                        <Avatar
                          alt="Remy Sharp"
                          src={unknownUser}
                          sx={{
                            width: 350,
                            height: 350,
                            mb: 2,
                            borderRadius: "0",
                          }}
                        />
                      ) : (
                        <ImageList
                          sx={{ width: 500, height: 350 }}
                          cols={3}
                          rowHeight={164}
                        >
                          {images.map((url, i) => (
                            <ImageListItem
                              key={i}
                              sx={{ position: "relative" }}
                            >
                              {/* <Box
                                sx={{
                                  position: "absolute",
                                  right: "0px",
                                  top: "0px",
                                  backgroundColor: "#000",
                                  borderRadius: "20px",
                                  cursor: "pointer",
                                }}
                                onClick={() => hanldeDeleteImage(url)}
                              >
                                <UilTimesCircle fill={"#fff"} />
                              </Box> */}
                              <img
                                src={`${URL.createObjectURL(url)}`}
                                // srcSet={`${URL.createObjectURL(url)}`}
                                alt={i}
                                loading="lazy"
                              />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      )}

                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={handleChangeImage}
                        />
                        <Button variant="contained" component="span">
                          {images.length > 0
                            ? urls.length !== images.length
                              ? "Loading..."
                              : "Update"
                            : "Update"}
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
                          data={description.content}
                          updateData={hanldeDataCkeditor}
                          type={"content"}
                        />
                      </Box>
                    )}
                    {activeStepDes === 1 && (
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <CHKditor
                          setValue={setFieldValue}
                          field={"description.detail"}
                          data={description.detail}
                          updateData={hanldeDataCkeditor}
                          type={"detail"}
                        />
                      </Box>
                    )}
                    {activeStepDes === 2 && (
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <CHKditor
                          setValue={setFieldValue}
                          field={"description.howToCare"}
                          data={description.howToCare}
                          updateData={hanldeDataCkeditor}
                          type={"howToCare"}
                        />
                      </Box>
                    )}
                    {activeStepDes === 3 && (
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <CHKditor
                          setValue={setFieldValue}
                          field={"description.howToAdjust"}
                          data={description.howToAdjust}
                          updateData={hanldeDataCkeditor}
                          type={"howToAdjust"}
                        />
                      </Box>
                    )}
                    {activeStepDes === 4 && (
                      <Box sx={{ mb: { xs: 3, xl: 3 } }}>
                        <CHKditor
                          setValue={setFieldValue}
                          field={"description.warrantyDetail"}
                          data={description.warrantyDetail}
                          updateData={hanldeDataCkeditor}
                          type={"warrantyDetail"}
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
                  disabled={
                    images.length > 0
                      ? urls.length !== images.length
                        ? true
                        : false
                      : false
                  }
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
