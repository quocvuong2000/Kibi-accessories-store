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
import { StyledMenu } from "../../../theme/styledMenu";
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
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandNameTemp, setBrandNameTemp] = useState("");

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
                <TableCell>Brand ID</TableCell>
                <TableCell align="left">Brand Name</TableCell>
                <TableCell align="left">Update At</TableCell>
                <TableCell align="left">Product Related</TableCell>
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
                          setDeleteDialog({
                            delete: true,
                            id: brandIdSelected,
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
                          setBrandName(brandNameTemp);
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
                  <TableCell align="left">{row.brand}</TableCell>
                  <TableCell align="left">
                    {moment(row.updatedAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="left">
                    <span
                    // className={classes.status}
                    // style={makeStyle(row.status)}
                    >
                      N/A
                    </span>
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
      {showUpdateModal && (
        <DialogUpdateBrand
          showDialog={showUpdateModal}
          handleShowDialog={hanldeShowUpdateBrandModal}
          reLoadTable={props.reLoadTable}
          brandname={brandName}
        />
      )}
    </>
  );
}
