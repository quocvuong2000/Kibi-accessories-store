import styled from "@emotion/styled";
import { UilSetting, UilEdit, UilTimesSquare } from "@iconscout/react-unicons";
import {
  alpha,
  Menu,
  MenuItem,
  TablePagination,
  Typography,
} from "@mui/material";
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
import { deleteCategory, doGetProductRelatedCat } from "../CategoryAPI";
import DialogUpdateCategory from "../DialogUpdate.jsx/DialogUpdateCategory";

export default function CategoryList(props) {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [categorySelectedUpdate, setCategorySelectedUpdate] =
    React.useState("");
  const [categorySelectedUpdateTemp, setCategorySelectedUpdateTemp] =
    React.useState("");
  const [idCateUpdate, setIdCateUpdate] = React.useState("");
  const [deleteDialog, setDeleteDialog] = React.useState({
    delete: false,
    id: "",
  });
  const [productRelated, setProductRelated] = useState(0);
  const handleChangePage = (_event, newPage) => {
    props.takePage(newPage + 1);
  };

  const hanldeShowUpdateProductModal = (isVisible) => {
    setShowUpdateModal(isVisible);
  };
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteCategory = () => {
    deleteCategory(deleteDialog.id)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          props.reLoadTable("delete" + Date.now());
          setDeleteDialog({
            delete: false,
            id: "",
          });
        }, 500);
      })
      .catch(() => {
        setFailure(true);
      });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const hanldeShowDeleteDialog = (visible) => {
    setDeleteDialog(visible);
  };
  return (
    <>
      {loading && <AppLoader />}
      <div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 650, height: "100%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Setting</TableCell>
                <TableCell>Category ID</TableCell>
                <TableCell align="left">Category Name</TableCell>
                <TableCell align="left">Update At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {props.categoryList.categories?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    setIdCateUpdate(row._id);
                    setCategorySelectedUpdateTemp(row);
                  }}
                >
                  <TableCell
                    align="left"
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
                          doGetProductRelatedCat(idCateUpdate).then((res) => {
                            setProductRelated(res);

                            setTimeout(() => {
                              setDeleteDialog({
                                delete: true,
                                id: idCateUpdate,
                              });
                              setAnchorEl(null);
                              setLoading(false);
                            }, 500);
                          });

                          setAnchorEl(null);
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
                          setCategorySelectedUpdate(categorySelectedUpdateTemp);
                          setShowUpdateModal(true);
                          setIdCateUpdate(row._id);
                          setAnchorEl(null);
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
                  <TableCell align="left">{row.category}</TableCell>
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
          count={props.categoryList?.totalItems}
          rowsPerPage={10}
          page={props.categoryList?.currentPage - 1}
          onPageChange={handleChangePage}
        />
      </div>
      <ConfirmationDialog
        show={deleteDialog.delete}
        hanldeShow={hanldeShowDeleteDialog}
        hanldeAgree={handleDeleteCategory}
        title={`This category has ${productRelated} product Related, Are you sure to delete?`}
        content={`This will delete all the product related`}
      />
      {showUpdateModal && (
        <DialogUpdateCategory
          showDialog={showUpdateModal}
          handleShowDialog={hanldeShowUpdateProductModal}
          reLoadTable={props.reLoadTable}
          categorySelectedUpdate={categorySelectedUpdate}
          categoryId={idCateUpdate}
        />
      )}
      <SnackBarCustom
        open={success}
        setStateWhenClose={setSuccess}
        label={"Delete category and all product related success"}
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
