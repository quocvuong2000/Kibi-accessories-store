import {
  UilEdit,
  UilSetting,
  UilTimesSquare,
  UilExclamationTriangle,
} from "@iconscout/react-unicons";
import {
  Alert,
  Avatar,
  Snackbar,
  TablePagination,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useState } from "react";
import productPlaceholder from "../../../assets/images/product-example.png";
import AppLoader from "../../../components/AppLoader";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { StyledMenu } from "../../../theme/styledMenu";
import { checkTypeItem } from "../../../utils/checkTypeItem";
import numberWithCommas from "../../../utils/numberWithCommas";
import DialogUpdateProduct from "../DialogUpdate/DialogUpdateProduct";
import { doDeleteProduct, doDeleteProductByBranch } from "../ProductAPI";

export default function ProductList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteDialog, setDeleteDialog] = React.useState({
    delete: false,
    id: "",
  });
  const [deleteDialogByBranch, setDeleteDialogByBranch] = React.useState({
    delete: false,
    id: "",
  });
  const [productIdSelected, setProductIdSelected] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productSelectedUpdate, setProductSelectedUpdate] = useState("");
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);
  const hanldeShowUpdateProductModal = (isVisible) => {
    setShowUpdateModal(isVisible);
  };

  const hanldeShowDeleteDialog = (visible) => {
    setDeleteDialog(visible);
  };
  const hanldeShowDeleteDialogByBranch = (visible) => {
    setDeleteDialogByBranch(visible);
  };
  const hanldeDeleteProduct = () => {
    setLoading(true);
    doDeleteProduct(deleteDialog.id)
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
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const hanldeDeleteProductByBranch = () => {
    setLoading(true);
    doDeleteProductByBranch({
      id: deleteDialogByBranch.id,
      branchId: props.branchSelected._id,
    })
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          props.reLoadTable("delete" + Date.now());
          setDeleteDialogByBranch({
            delete: false,
            id: "",
          });
        }, 500);
      })
      .catch(() => {
        setFailure(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePage = (_event, newPage) => {
    props.takePage(newPage + 1);
  };

  // return focus to the button when we transitioned from !open -> open
  return (
    <>
      {loading && <AppLoader />}
      {props.branchSelected._id && (
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
                  <TableCell align="left">Product Image</TableCell>
                  <TableCell>Product ID</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Sale (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {props.productList.products?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      maxHeight: 440,
                    }}
                    onClick={() => {
                      setProductIdSelected(row._id);
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
                            setDeleteDialog({
                              delete: true,
                              id: productIdSelected,
                            });
                            setAnchorEl(null);
                          }}
                          disableRipple
                          sx={{ color: "red" }}
                        >
                          <UilExclamationTriangle />
                          <Typography sx={{ marginLeft: "10px" }}>
                            Delete permantly
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setDeleteDialogByBranch({
                              delete: true,
                              id: productIdSelected,
                            });
                            setAnchorEl(null);
                          }}
                          disableRipple
                        >
                          <UilTimesSquare />
                          <Typography sx={{ marginLeft: "10px" }}>
                            Delete for this branch only
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          disableRipple
                          onClick={() => {
                            setShowUpdateModal(true);
                            setProductSelectedUpdate(productIdSelected);
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
                    <TableCell align="left">
                      <Avatar
                        alt="Remy Sharp"
                        src={row.images ? row.images[0] : productPlaceholder}
                        sx={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        color: row.quantity === 0 && "red",
                        textDecoration: row.quantity === 0 && "line-through",
                      }}
                    >
                      {row._id}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: row.quantity === 0 && "red",
                        textDecoration: row.quantity === 0 && "line-through",
                      }}
                    >
                      {row.product}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: row.quantity === 0 && "red",
                        textDecoration: row.quantity === 0 && "line-through",
                      }}
                    >
                      {numberWithCommas(row.price)} VND
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: row.quantity === 0 && "red",
                        textDecoration: row.quantity === 0 && "line-through",
                      }}
                    >
                      {/* {console.log(row.branches)} */}
                      {row.branches.length > 0
                        ? row.branches.find(
                            (el) => el.branchId === props.branchSelected?._id
                          )?.quantity
                        : "N/A"}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: row.quantity === 0 && "red",
                        textDecoration: row.quantity === 0 && "line-through",
                      }}
                    >
                      {checkTypeItem(row.sale)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={props.productList?.totalItems || 1}
            rowsPerPage={10}
            page={(props.productList?.currentPage || 1) - 1}
            onPageChange={handleChangePage}
          />
        </div>
      )}

      <ConfirmationDialog
        show={deleteDialog.delete}
        hanldeShow={hanldeShowDeleteDialog}
        hanldeAgree={hanldeDeleteProduct}
        title={"Delete product permantly ?"}
        content={"This will remove the product out of kibi"}
      />
      <ConfirmationDialog
        show={deleteDialogByBranch.delete}
        hanldeShow={hanldeShowDeleteDialogByBranch}
        hanldeAgree={hanldeDeleteProductByBranch}
        title={"Delete this product on this branch"}
        content={"Are you sure to delete ?"}
      />
      <Snackbar
        open={success}
        autoHideDuration={1000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Delete success
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
      {showUpdateModal && (
        <DialogUpdateProduct
          showDialog={showUpdateModal}
          handleShowDialog={hanldeShowUpdateProductModal}
          reLoadTable={props.reLoadTable}
          productId={productSelectedUpdate}
          branchSelected={props.branchSelected}
        />
      )}
    </>
  );
}
