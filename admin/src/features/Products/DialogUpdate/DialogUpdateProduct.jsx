import { UilTimesCircle } from "@iconscout/react-unicons";
import {
  Alert,
  Avatar,
  Box,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Snackbar,
  StepLabel,
  Typography,
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
import { useState } from "react";
import AppSelectField from "../../../@crema/core/AppFormComponents/AppSelectField";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import unknownUser from "../../../assets/images/product.png";
import Apploader from "../../../components/AppLoader";
import CHKditor from "../../../components/CHKditor/CHKditor";
import LinearProgressUpload from "../../../components/ProgressImageList/LinearProgress";
import { app } from "../../../firebase/firebase";
import {
  ColorlibConnector,
  ColorlibStepIcon,
  descriptionSteps,
  steps,
} from "../../../utils/addProductData";
import { getBrandList } from "../../Brands/BrandAPI";
import { getCategoryList } from "../../Categories/CategoryAPI";
import { doGetDetailProduct, doUpdateProduct } from "../ProductAPI";
import NumberFormat from "react-number-format";
import { NumberFormatCustom } from "../../../@crema/core/AppFormComponents/NumberFormatCustom";
import SnackBarCustom from "../../../components/SnackbarCustom/SnackBarCustom";
import AppLoader from "../../../components/AppLoader";
export default function DialogUpdateProduct(props) {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [brandList, setBrandList] = React.useState([]);
  const [catList, setCatList] = React.useState([]);
  // const [file, setFile] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStepDes, setActiveStepDes] = React.useState(0);
  const [completed] = React.useState({});
  const [completedDes] = React.useState({});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = React.useState([]);
  const [urls, setUrls] = React.useState([]);
  const [currentUrls, setCurrentUrls] = React.useState([]);
  const [description, setDescription] = React.useState({
    content: "",
    detail: "",
    howToCare: "",
    howToAdjust: "",
    warrantyDetail: "",
  });
  const [productDetail, setProductDetail] = useState();
  const [progressUpload, setProgressupload] = React.useState(0);
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
          setProgressupload(progress);
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
  }, [props.productId]);
  React.useEffect(() => {
    doGetDetailProduct(props.productId)
      .then((res) => {
        if (res) {
          setProductDetail(res.product);
          setDescription({
            content: res.product.description.content,
            detail: res.product.description.detail,
            howToCare: res.product.description.howToCare,
            howToAdjust: res.product.description.howToAdjust,
            warrantyDetail: res.product.description.warrantyDetail,
          });
          setCurrentUrls(res.product.images);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.productId]);

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
    setCurrentUrls(currentUrls.filter((item) => item !== url));
  };
  return (
    <>
      <>
        {loading && <AppLoader />}
        <Dialog
          open={props.showDialog}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"lg"}
        >
          <DialogTitle>UPDATE PRODUCT</DialogTitle>
          <DialogContent sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "600", marginRight: "5px" }}>
              Current branch:{" "}
            </Typography>{" "}
            {props.branchSelected.address}
          </DialogContent>
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
                </Step>
              ))}
            </Stepper>
          </Box>
          {productDetail && (
            <Formik
              validateOnChange={true}
              initialValues={{
                product: productDetail.product || "",
                price: productDetail.price || 0,
                category: productDetail.category || "",
                brand: productDetail.brand || "",
                topSales: productDetail.topSales || false,
                quantity:
                  productDetail.branches.find(
                    (el) => el.branchId === props.branchSelected?._id
                  )?.quantity || 0,
                sale: productDetail.sale || 0,
                warranty: productDetail.warranty || 0,

                description: {
                  content: productDetail.description?.content || "",
                  detail: productDetail.description?.detail || "",
                  howToCare: productDetail.description?.howToCare || "",
                  howToAdjust: productDetail.description?.howToAdjust || "",
                  warrantyDetail:
                    productDetail.description?.warrantyDetail || "",
                },
              }}
              onSubmit={async (values) => {
                setLoading(true);
                const newBranchesArr = [];
                productDetail.branches.forEach((el) => {
                  if (el.branchId === props.branchSelected._id) {
                    const newBranchQuantity = values.quantity;
                    const oldBranchQuantity = el.quantity;
                    if (newBranchQuantity > oldBranchQuantity) {
                      values.quantity =
                        productDetail.quantity +
                        (newBranchQuantity - oldBranchQuantity);
                    } else {
                      values.quantity =
                        productDetail.quantity -
                        (oldBranchQuantity - newBranchQuantity);
                    }
                    newBranchesArr.push({
                      branchId: props.branchSelected._id,
                      branchName: props.branchSelected.address,
                      quantity: parseInt(newBranchQuantity),
                      oldQuantity: oldBranchQuantity,
                    });
                  } else {
                    newBranchesArr.push(el);
                  }
                });
                if (newBranchesArr.length > 0) {
                  if (urls.length === images.length) {
                    const product = {
                      ...values,
                      images: [...urls, ...currentUrls],
                      branches: newBranchesArr,
                      oldQuantity: productDetail.quantity || 0,
                      quantity: parseInt(values.quantity),
                      currentBranch: props.branchSelected._id,
                    };

                    product &&
                      doUpdateProduct(props.productId, product)
                        .then(() => {
                          setSuccess(true);

                          setTimeout(() => {
                            props.handleShowDialog(false);
                            props.reLoadTable("sucess" + Date.now());
                          }, 1000);
                        })
                        .catch(() => {
                          setFailure(true);
                        })
                        .finally(() => {
                          setImages([]);
                          setUrls([]);
                          setLoading(false);
                        });
                  } else {
                    const product = {
                      ...values,
                      images: currentUrls,
                      branches: newBranchesArr,
                      oldQuantity: productDetail.quantity || 0,
                      quantity: parseInt(values.quantity),
                      currentBranch: props.branchSelected._id,
                    };
                    doUpdateProduct(props.productId, product)
                      .then(() => {
                        setSuccess(true);

                        setTimeout(() => {
                          props.reLoadTable("sucess" + Date.now());
                          props.handleShowDialog(false);
                        }, 1000);
                      })
                      .catch(() => {
                        setFailure(true);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                }
              }}
            >
              {({ setFieldValue, errors, touched }) => (
                <Form
                  noValidate
                  autoComplete="off"
                  style={{ minHeight: "500px" }}
                >
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
                                id="label-brand"
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
                              <AppSelectField
                                labelId="label-brand"
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
                              </AppSelectField>
                            </FormControl>
                          </Box>
                          {/* QUANTITY */}

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

                          {/* Sale */}
                          <Box
                            sx={{
                              mb: { xs: 3, xl: 3 },
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppTextField
                              size="small"
                              placeholder={"Sale%"}
                              label={"Sale%"}
                              name="sale"
                              variant="outlined"
                              InputProps={{
                                inputComponent: NumberFormatCustom,
                              }}
                              sx={{
                                width: "40%",
                              }}
                            />
                            <AppTextField
                              size="small"
                              placeholder={"Warranty (Month)"}
                              label={"Warranty (Month)"}
                              name="warranty"
                              variant="outlined"
                              InputProps={{
                                inputComponent: NumberFormatCustom,
                              }}
                              sx={{
                                width: "40%",
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
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: 500,
                              height: 450,
                              overflowY: "auto",
                            }}
                          >
                            <Typography variant="body2_medium">
                              Current Image
                            </Typography>
                            {currentUrls.length === 0 ? (
                              <Avatar
                                alt="Remy Sharp"
                                src={unknownUser}
                                sx={{
                                  width: 150,
                                  height: 150,
                                  mb: 2,
                                  borderRadius: "0",
                                }}
                              />
                            ) : (
                              <ImageList cols={3} rowHeight={164}>
                                {currentUrls.map((url, i) => (
                                  <ImageListItem
                                    key={i}
                                    sx={{ position: "relative" }}
                                  >
                                    <Box
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
                                    </Box>
                                    <img
                                      style={{ height: "150px" }}
                                      src={url}
                                      // srcSet={`${URL.createObjectURL(url)}`}
                                      alt={i}
                                      loading="lazy"
                                    />
                                  </ImageListItem>
                                ))}
                              </ImageList>
                            )}
                            <Divider />
                            <Typography variant="body2_medium">
                              New Image
                            </Typography>
                            {images.length === 0 ? (
                              <Avatar
                                alt="Remy Sharp"
                                src={unknownUser}
                                sx={{
                                  width: 150,
                                  height: 150,
                                  mb: 2,
                                  borderRadius: "0",
                                }}
                              />
                            ) : (
                              <ImageList cols={3} rowHeight={164}>
                                {images.map((url, i) => (
                                  <ImageListItem
                                    key={i}
                                    sx={{ position: "relative" }}
                                  >
                                    <img
                                      // src={url}
                                      srcSet={`${URL.createObjectURL(url)}`}
                                      alt={i}
                                      loading="lazy"
                                    />
                                    <LinearProgressUpload
                                      progress={progressUpload}
                                    />
                                  </ImageListItem>
                                ))}
                              </ImageList>
                            )}
                          </Box>
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
                    <Button color="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
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
                      Update Product
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          )}
        </Dialog>
        <SnackBarCustom
          open={success}
          setStateWhenClose={setSuccess}
          label={"Update Product Success"}
          status={"success"}
        />
        <SnackBarCustom
          open={failure}
          setStateWhenClose={setFailure}
          label={"update Product Failure"}
          status={"error"}
        />
      </>
    </>
  );
}
