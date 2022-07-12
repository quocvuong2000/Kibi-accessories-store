import { UilEdit, UilSetting, UilTimesSquare } from "@iconscout/react-unicons";
import { MenuItem, TablePagination, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import AppLoader from "../../../components/AppLoader";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import SnackBarCustom from "../../../components/SnackbarCustom/SnackBarCustom";
import { StyledMenu } from "../../../theme/styledMenu";
import { doDeleteBrand, doGetRelatedProduct } from "../BrandAPI";
import DialogUpdateBrand from "../DialogUpdateBrand/DialogUpdateBrand";

export default function BrandList(props) {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    delete: false,
    id: "",
  });
  const [brandIdSelected, setBrandIdSelected] = useState("");
  const [brandIdUpdateSelected, setBrandIdUpdateSelected] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandNameTemp, setBrandNameTemp] = useState("");
  const [loading, setLoading] = useState(false);
  const [productRelated, setProductRelated] = useState(0);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const hanldeShowUpdateBrandModal = (isVisible) => {
    setShowUpdateModal(isVisible);
  };
  const handleChangePage = (_event, newPage) => {
    props.takePage(newPage + 1);
  };
  const hanldeShowDeleteDialog = (visible) => {
    setDeleteDialog(visible);
  };
  const hanldeDeleteStaff = () => {
    doDeleteBrand(deleteDialog.id)
      .then(() => {
        setSuccess(true);
        props.reLoadTable("delete" + Date.now());
        setDeleteDialog({
          delete: false,
          id: "",
        });
      })
      .catch(() => {
        setFailure(true);
      });
  };
  return (
    <>
      {loading && <AppLoader />}
      <div style={{ height: "465px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 650, height: "100%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Setting</TableCell>
                <TableCell>Brand ID</TableCell>
                <TableCell align="left">Brand Name</TableCell>
                <TableCell align="left">Update At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {props.brandList.brands?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    maxHeight: 440,
                  }}
                  onClick={() => {
                    setBrandIdSelected(row._id);
                    setBrandNameTemp(row.brand);
                  }}
                >
                  <TableCell
                    align="left"
                    // className={classes.details}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <UilSetting
                      id="fade-button"
                      aria-controls={open ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        "aria-labelledby": "demo-customized-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          setLoading(true);
                          doGetRelatedProduct(brandIdSelected).then((res) => {
                            setProductRelated(res.totalItems);
                            setTimeout(() => {
                              setDeleteDialog({
                                delete: true,
                                id: brandIdSelected,
                              });
                              setAnchorEl(null);
                              setLoading(false);
                            }, 500);
                          });
                        }}
                        disableRipple
                      >
                        <UilTimesSquare />
                        <Typography sx={{ marginLeft: "10px" }}>
                          Delete
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        disableRipple
                        onClick={() => {
                          setShowUpdateModal(true);
                          setBrandName(brandNameTemp);
                          setAnchorEl(null);
                          setBrandIdUpdateSelected(brandIdSelected);
                        }}
                      >
                        <UilEdit />
                        <Typography sx={{ marginLeft: "10px" }}>
                          Update
                        </Typography>
                      </MenuItem>
                    </StyledMenu>
                  </TableCell>
                  <TableCell>{row._id}</TableCell>
                  <TableCell align="left">{row.brand}</TableCell>
                  <TableCell align="left">
                    {moment(row.updatedAt).format("DD-MM-YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={props.brandList?.totalItems}
          rowsPerPage={10}
          page={props.brandList?.currentPage - 1}
          onPageChange={handleChangePage}
        />
      </div>
      {deleteDialog.delete && (
        <ConfirmationDialog
          show={deleteDialog.delete}
          hanldeShow={hanldeShowDeleteDialog}
          hanldeAgree={hanldeDeleteStaff}
          title={`This brand has ${productRelated} product Related, Are you sure to delete?`}
          content={`This will delete all the product related`}
        />
      )}
      {showUpdateModal && (
        <DialogUpdateBrand
          showDialog={showUpdateModal}
          handleShowDialog={hanldeShowUpdateBrandModal}
          reLoadTable={props.reLoadTable}
          brandName={brandName}
          brandId={brandIdUpdateSelected}
        />
      )}
      <SnackBarCustom
        open={success}
        setStateWhenClose={setSuccess}
        label={"Delete brand and all product related success"}
        status={"success"}
      />
      <SnackBarCustom
        open={failure}
        setStateWhenClose={setFailure}
        label={"Fail, please try again"}
        status={"error"}
      />
    </>
  );
}
