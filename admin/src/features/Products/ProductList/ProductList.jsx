import {
  Alert,
  Avatar,
  Button,
  Fade,
  Menu,
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
import { UilSetting, UilTimesSquare, UilEdit } from "@iconscout/react-unicons";
import productPlaceholder from "../../../assets/images/product-example.png";
import { styled, alpha } from "@mui/material/styles";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { doDeleteProduct } from "../ProductAPI";

const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function ProductList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [productIdSelected, setProductIdSelected] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const open = Boolean(anchorEl);

  const hanldeShowDeleteDialog = (visible) => {
    setDeleteDialog(visible);
  };
  const hanldeDeleteProduct = () => {
    doDeleteProduct(productIdSelected)
      .then(() => {
        setSuccess(true);
        props.reLoadTable("delete" + Date.now());
        setDeleteDialog(false);
      })
      .catch(() => {
        setFailure(true);
      });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePage = (_event, newPage) => {
    props.takePage(newPage + 1);
  };
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "top",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow: " rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));
  // return focus to the button when we transitioned from !open -> open
  return (
    <>
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
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {props.productList.products?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    maxHeight: 440,
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
                          setDeleteDialog(true);
                          setProductIdSelected(row._id);
                          setAnchorEl(null);
                        }}
                        disableRipple
                      >
                        <UilTimesSquare />
                        <Typography sx={{ marginLeft: "10px" }}>
                          Delete
                        </Typography>
                      </MenuItem>
                      <MenuItem disableRipple>
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
                  <TableCell>{row._id}</TableCell>
                  <TableCell align="left">{row.product}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">
                    <span style={makeStyle(row.status)}>{row.quantity}</span>
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
      <ConfirmationDialog
        show={deleteDialog}
        hanldeShow={hanldeShowDeleteDialog}
        hanldeAgree={hanldeDeleteProduct}
        title={"Delete product"}
        content={"Are you sure to delete"}
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
    </>
  );
}
