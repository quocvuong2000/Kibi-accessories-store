import styled from "@emotion/styled";
import { async } from "@firebase/util";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import AppLoader from "../../../components/AppLoader";
import SnackBarCustom from "../../../components/SnackbarCustom/SnackBarCustom";
import {
  addNewBranch,
  addNewBranchToGhn,
  getDistrict,
  getProvince,
  getWard,
} from "../BranchAPI";
import { AddBranchSchema } from "../DialogAddBranch/validate";

export default function DialogUpdateBranch(props) {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // --------------------- STATE ADDRESS ---------------------
  const [wardList, setWardList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [provinceId, setProvinceId] = useState(
    props.branchSelectedUpdate.cityId
  );
  const [districtId, setDistrictId] = useState(
    props.branchSelectedUpdate.districtId
  );
  const [wardId, setWardId] = useState(`${props.branchSelectedUpdate.wardId}`);

  useEffect(() => {
    getProvince().then((res) => {
      if (res) {
        setProvinceList(res.data.data);
        setProvinceId(parseInt(props.branchSelectedUpdate.cityId));
      }
    });
  }, []);

  useEffect(() => {
    getDistrict(provinceId).then((res) => {
      if (res) {
        setDistrictList(res.data.data);
        // setDistrictId(res.data.data[0].DistrictID);
      }
    });
  }, [provinceId]);

  useEffect(() => {
    getWard(districtId).then((res) => {
      if (res) {
        setWardList(res.data.data);
        // setWardId(res.data.data[0].WardCode);
      }
    });
  }, [districtId, provinceId]);

  // --------------------- END STATE ADDRESS ---------------------

  const Input = styled("input")({
    display: "none",
  });

  const handleClose = () => {
    props.handleShowDialog(false);
  };

  return (
    <>
      {loading && <AppLoader />}
      <Dialog open={props.showDialog} onClose={handleClose} maxWidth={"lg"}>
        <DialogTitle>UPDATE BRANCH</DialogTitle>
        <Formik
          validationSchema={AddBranchSchema}
          validateOnChange={true}
          initialValues={{
            address: props.branchSelectedUpdate.address || "",
          }}
          onSubmit={async (values) => {
            addNewBranchToGhn(districtId, wardId, values.address)
              .then((res) => {
                if (res.code === 200) {
                  addNewBranch(
                    districtId,
                    wardId,
                    provinceId,
                    values.address,
                    res.data.shop_id
                  )
                    .then((res) => {
                      setLoading(false);
                      setSuccess(true);
                      setTimeout(() => {
                        props.handleShowDialog(false);
                        props.reLoadTable("sucess" + Date.now());
                      }, 500);
                    })
                    .catch(() => {
                      setFailure(true);
                    });
                }
              })
              .catch(() => {
                setFailure(true);
              });
          }}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form noValidate autoComplete="off" style={{ minHeight: "550px" }}>
              <DialogContent>
                <Grid
                  item
                  xs={12}
                  md={12}
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
                          errors.province && touched.province
                            ? "#f44336"
                            : "currentcolor",
                      }}
                    >
                      Province
                    </InputLabel>

                    <Select
                      labelId="label-category-type"
                      size="small"
                      label={"province"}
                      name="province"
                      onChange={(event) => {
                        setProvinceId(event.target.value);
                        getDistrict(provinceId)
                          .then((res) => {
                            if (res) {
                              setDistrictList(res.data.data);
                              setDistrictId(res.data.data[0].DistrictID);
                            }
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                        getWard(districtId)
                          .then((res) => {
                            if (res) {
                              setWardList(res.data.data);
                              setWardId(res.data.data[0].WardCode);
                            }
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      }}
                      value={provinceId}
                    >
                      {provinceList?.map((item, index) => {
                        return (
                          <MenuItem value={item.ProvinceID} key={index}>
                            {item.ProvinceName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <FormControl
                    size="small"
                    sx={{
                      width: "100%",
                      marginTop: 3,
                    }}
                  >
                    <InputLabel
                      id="label-category-type"
                      sx={{
                        background: "#fff",
                        color: (theme) =>
                          errors.district && touched.district
                            ? "#f44336"
                            : "currentcolor",
                      }}
                    >
                      District
                    </InputLabel>

                    <Select
                      labelId="label-category-type"
                      size="small"
                      label={"district"}
                      name="district"
                      onChange={(event) => {
                        setDistrictId(event.target.value);
                        getWard(districtId)
                          .then((res) => {
                            if (res) {
                              setWardList(res.data.data);
                              setWardId(res.data.data[0].WardCode);
                            }
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      }}
                      value={districtId}
                    >
                      {districtList?.map((item, index) => {
                        return (
                          <MenuItem value={item.DistrictID} key={index}>
                            {item.DistrictName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <FormControl
                    size="small"
                    sx={{
                      width: "100%",
                      marginTop: 3,
                    }}
                  >
                    <InputLabel
                      id="label-category-type"
                      sx={{
                        background: "#fff",
                        color: (theme) =>
                          errors.ward && touched.ward
                            ? "#f44336"
                            : "currentcolor",
                      }}
                    >
                      Ward
                    </InputLabel>

                    <Select
                      labelId="label-category-type"
                      size="small"
                      label={"ward"}
                      name="ward"
                      onChange={(e) => {
                        setWardId(e.target.value);
                      }}
                      value={wardId}
                    >
                      {wardList?.map((item, index) => {
                        return (
                          <MenuItem value={item.WardCode} key={index}>
                            {item.WardName}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
                      placeholder={"Address"}
                      label={"Address"}
                      name="address"
                      variant="outlined"
                      sx={{
                        width: "100%",
                      }}
                    />
                  </Box>
                </Grid>
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
        label={"Create Blog Success"}
        status={"success"}
      />
      <SnackBarCustom
        open={failure}
        setStateWhenClose={setFailure}
        label={"Create Blog Failure, Please try again"}
        status={"error"}
      />
    </>
  );
}
