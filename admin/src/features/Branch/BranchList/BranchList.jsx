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
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { deleteBranch } from "../BranchAPI";
import DialogUpdateBranch from "../DialogUpdateBranch/DialogUpdateBranch";

export default function BranchList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [branchSelectedUpdate, setBranchSelectedUpdate] = React.useState({});
  const [branchSelectedUpdateTemp, setBranchSelectedUpdateTemp] =
    React.useState({});
  const [idBranch, setIdBranch] = React.useState("");
  const [deleteDialog, setDeleteDialog] = React.useState({
    delete: false,
    id: "",
  });
  const handleChangePage = (_event, newPage) => {
    props.takePage(newPage + 1);
  };

  const handleShowUpdateBranchModal = (isVisible) => {
    setShowUpdateModal(isVisible);
  };
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteBranch = () => {
    deleteBranch(deleteDialog.id).then((res) => {
      props.reLoadTable("delete" + Date.now());
      setDeleteDialog({
        delete: false,
        id: "",
      });
    });
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
  const handleClose = () => {
    setAnchorEl(null);
  };
  const hanldeShowDeleteDialog = (visible) => {
    setDeleteDialog(visible);
  };
  return (
    <>
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
                <TableCell>Branch ID</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="left">Update At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {props.branchList.branches?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    console.log(row);
                    setIdBranch(row._id);
                    setBranchSelectedUpdateTemp(row);
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
                            id: idBranch,
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
                          setBranchSelectedUpdate(branchSelectedUpdateTemp);
                          setShowUpdateModal(true);
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
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">
                    {moment(row.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
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
          count={props.branchList?.totalItems}
          rowsPerPage={10}
          page={props.branchList?.currentPage - 1}
          onPageChange={handleChangePage}
        />
      </div>
      {showUpdateModal && (
        <DialogUpdateBranch
          showDialog={showUpdateModal}
          handleShowDialog={handleShowUpdateBranchModal}
          reLoadTable={props.reLoadTable}
          branchSelectedUpdate={branchSelectedUpdate}
        />
      )}
      {deleteDialog.delete && (
        <ConfirmationDialog
          show={deleteDialog.delete}
          hanldeShow={hanldeShowDeleteDialog}
          hanldeAgree={handleDeleteBranch}
          title={"Delete product"}
          content={"Are you sure to delete"}
        />
      )}
    </>
  );
}
