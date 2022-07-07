import { Avatar, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'
import { UilEdit, UilSetting, UilTimesSquare } from "@iconscout/react-unicons";
import {StyledMenu} from '../../../theme/styledMenu';
import productPlaceholder from "../../../assets/images/product-example.png";
const StaffList = ({staffs,takePage}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    delete: false,
    id: "",
  });
  const [staffIdSelected, setStaffIdSelected] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [staffSelectedUpdate, setStaffSelectedUpdate] = useState("");
  const open = Boolean(anchorEl);
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
              {staffs.products?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    maxHeight: 440,
                  }}
                  onClick={() => {
                    setStaffIdSelected(row._id);
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
                            id: staffIdSelected,
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
                          setShowUpdateModal(true);
                          setStaffSelectedUpdate(staffIdSelected);
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
                  <TableCell>{row._id}</TableCell>
                  <TableCell align="left">{row.product}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">
                   {row.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={staffs?.totalItems || 1}
          rowsPerPage={10}
          page={(staffs?.currentPage || 1) - 1}
          onPageChange={handleChangePage}
        />
        </div>
    </>
  )
}

export default StaffList