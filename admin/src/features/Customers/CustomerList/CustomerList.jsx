import { UilEdit, UilSetting } from "@iconscout/react-unicons";
import {
  Avatar,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import userPlaceholder from "../../../assets/user.jpg";
import { StyledMenu } from "../../../theme/styledMenu";
import { checkTypeItem } from "../../../utils/checkTypeItem";
import DialogUpdateCustomer from "../DialogUpdateCustomer/DialogUpdateCustomer";

const CustomerList = ({ customers, takePage, reLoadTable }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [customerIdSelected, setCustomerIdSelected] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [customerSelectedUpdate, setCustomerSelectedUpdate] = useState("");
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleChangePage = (_event, newPage) => {
    takePage(newPage + 1);
  };
  const hanldeShowUpdateProductModal = (isVisible) => {
    setShowUpdateModal(isVisible);
  };
  const open = Boolean(anchorEl);
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
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="left">Customer</TableCell>
                <TableCell align="left">Phone Number</TableCell>
                <TableCell align="left">Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {customers.customers?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    maxHeight: 440,
                  }}
                  onClick={() => {
                    setCustomerIdSelected(row._id);
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
                        disableRipple
                        onClick={() => {
                          setShowUpdateModal(true);
                          setCustomerSelectedUpdate(customerIdSelected);
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
                      alt=""
                      src={row.avatar ? row.avatar : userPlaceholder}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell align="left">{checkTypeItem(row.phone)}</TableCell>
                  <TableCell align="left">
                    {checkTypeItem(row.address)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={customers?.totalItems || 1}
          rowsPerPage={10}
          page={(customers?.currentPage || 1) - 1}
          onPageChange={handleChangePage}
        />
      </div>
      {showUpdateModal && (
        <DialogUpdateCustomer
          showDialog={showUpdateModal}
          handleShowDialog={hanldeShowUpdateProductModal}
          reLoadTable={reLoadTable}
          customerId={customerSelectedUpdate}
        />
      )}
    </>
  );
};

export default CustomerList;
