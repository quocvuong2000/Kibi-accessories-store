import {
  Alert,
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
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import * as React from "react";
import AppSelectField from "../../../@crema/core/AppFormComponents/AppSelectField";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import { getBrandList } from "../../Brands/BrandAPI";
import { getCategoryList } from "../../Categories/CategoryAPI";
import { addNewProduct } from "../ProductAPI";
export default function DialogAddProduct(props) {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [brandList, setBrandList] = React.useState([]);
  const [catList, setCatList] = React.useState([]);
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

  return (
    <>
      <Dialog
        open={props.showDialog}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>ADD NEW PRODUCT</DialogTitle>
        <Formik
          validateOnChange={true}
          initialValues={{
            product: "",
            price: 0,
            category: "",
            brand: "",
            topSales: false,
            quantity: 0,
            description: "",
          }}
          onSubmit={async (values) => {
            addNewProduct(values)
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
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off">
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
                  {/* PRODUCT */}
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
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
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
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
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
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
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
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
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {/* GENERAL INFORMATION*/}
                  {/* <Box
                    sx={{
                      mb: { xs: 3, xl: 4 },
                      fontWeight: 600,
                      fontSize: 20,
                    }}
                  >
                    More information
                  </Box> */}
                  {/* Quantity */}
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
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
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                    <FormControlLabel
                      value="Top Sales"
                      control={<Checkbox />}
                      label="Top Sales"
                      labelPlacement="start"
                    />
                  </Box>

                  {/* DESCRIPTION */}
                  <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                    <AppTextField
                      size="small"
                      placeholder={"Description"}
                      label={"Description"}
                      name="description"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Box>
                </Grid>
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
