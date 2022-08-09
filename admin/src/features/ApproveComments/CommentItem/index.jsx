import { UilTrashAlt } from "@iconscout/react-unicons";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { TablePagination } from "@mui/material";
import { UilCheckCircle, UilTimesCircle } from "@iconscout/react-unicons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import s from "./styles.module.scss";

import productPlaceholder from "../../../assets/images/product-example.png";
import avatarPlaceholder from "../../../assets/user.jpg";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { deleteComment, updateStatusComment } from "../CommentAPI";
const CommentItem = ({
  comment,
  commentItem,
  page,
  setPage,
  reload,
  setReload,
}) => {
  const [mess, setMess] = useState("");
  const [typemess, setTypeMess] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    delete: false,
    id: "",
  });
  const hanldeShowDeleteDialog = (visible) => {
    setDeleteDialog(visible);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const approveComment = (id) => {
    updateStatusComment(id, "APPROVAL").then((res) => {
      if (res.status === 200) {
        setReload("delete" + Date.now());
      }
    });
  };

  const rejectComment = (id) => {
    updateStatusComment(id, "REJECTED").then((res) => {
      if (res.status === 200) {
        setReload("delete" + Date.now());
      }
    });
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
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="left">Product</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="left">Content</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Approve</TableCell>
                <TableCell align="center">Reject</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {commentItem?.map((item, index) => {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      maxHeight: 440,
                    }}
                    key={index}
                  >
                    <TableCell align="left">
                      <div className={s.avatar}>
                        <img
                          src={item.avatar ? item.avatar : avatarPlaceholder}
                          alt=""
                        />
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div className={s.pImage}>
                        <img
                          src={
                            item.productImage
                              ? item.productImage
                              : productPlaceholder
                          }
                          alt=""
                        />
                      </div>
                    </TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="left">{item.comment}</TableCell>
                    <TableCell align="center">{item.rating}</TableCell>
                    <TableCell align="center">
                      <UilCheckCircle
                        color="#00FF22"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          approveComment(item._id);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <UilTimesCircle
                        color="#FF3300"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          rejectComment(item._id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={comment?.totalItems || 1}
          rowsPerPage={5}
          page={(comment?.currentPage || 1) - 1}
          onPageChange={handleChangePage}
        />
      </div>

      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={typemess}>{mess}</Alert>
      </Snackbar>
    </>
  );
};

export default CommentItem;
