import {
  UilCheck,
  UilClockNine,
  UilEdit,
  UilSetting,
  UilTimes,
  UilTimesSquare,
} from "@iconscout/react-unicons";
import {
  Alert,
  Box,
  Button,
  Menu,
  Modal,
  Snackbar,
  TablePagination,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import parse from "html-react-parser";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { StyledMenu } from "../../../theme/styledMenu";
import { deleteBlog } from "../BlogAPI";
import DialogUpdateBlog from "../DialogUpdate/DialogUpdateBlog";
import s from "./styles.module.scss";

export default function BlogList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteDialog, setDeleteDialog] = React.useState({
    delete: false,
    id: "",
  });
  const [blogIdSelected, setBlogIdSelected] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [blogSelectedUpdate, setBlogSelectedUpdate] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [openModalContent, setOpenModalContent] = React.useState(false);
  const handleOpenModalContent = () => setOpenModalContent(true);
  const handleCloseModalContent = () => setOpenModalContent(false);
  const [allDes, setAllDes] = useState({
    title: "",
    content: "",
    categoryblog: "",
    author: "",
    categoryname: "",
  });
  const [allDesTemp, setAllDesTemp] = useState({
    title: "",
    content: "",
    categoryblog: "",
    author: "",
    categoryname: "",
  });
  const open = Boolean(anchorEl);

  const hanldeShowUpdateProductModal = (isVisible) => {
    setShowUpdateModal(isVisible);
  };

  const hanldeShowDeleteDialog = (visible) => {
    setDeleteDialog(visible);
  };

  const hanldeDeleteBlog = () => {
    deleteBlog(deleteDialog.id)
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          props.reLoadTable("delete" + Date.now());
          setDeleteDialog({
            delete: false,
            id: "",
          });
        }
      })
      .catch(() => {
        setFailure(true);
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

  const doChooseClass = (type) => {
    switch (type) {
      case "PENDING":
        return <UilClockNine />;
      case "APPROVAL":
        return <UilCheck color="#00FF22" />;
      case "REJECTED":
        return <UilTimes color="#FF3300" />;
      default:
        return "";
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
                <TableCell align="left">Author</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="center">Content</TableCell>
                <TableCell align="left">Category Blog</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {props.blogList?.blogs?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    maxHeight: 440,
                  }}
                  onClick={() => {
                    setBlogIdSelected(row._id);
                    setAllDesTemp({
                      title: row.title,
                      content: row.content,
                      categoryblog: row.categoryblog,
                      author: row.author,
                      categoryname: row.categoryname,
                      thumbnail: row.thumbnail,
                    });
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
                            id: blogIdSelected,
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
                          setAllDes({
                            title: allDesTemp.title,
                            content: allDesTemp.content,
                            categoryblog: allDesTemp.categoryblog,
                            author: allDesTemp.author,
                            categoryname: allDesTemp.categoryname,
                            thumbnail: allDesTemp.thumbnail,
                          });
                          setShowUpdateModal(true);
                          setBlogSelectedUpdate(blogIdSelected);
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
                  <TableCell align="left">{row.author}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <Button
                      onClick={() => {
                        setDate(row.createdAt);
                        setAuthor(row.author);
                        setTitle(row.title);
                        setContent(row.content);
                        handleOpenModalContent();
                      }}
                    >
                      Preview
                    </Button>
                  </TableCell>
                  <TableCell align="left">{row.categoryname}</TableCell>
                  <TableCell align="left">
                    {doChooseClass(row.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[]}
          count={props.blogList?.totalItems || 1}
          rowsPerPage={10}
          page={(props.blogList?.currentPage || 1) - 1}
          onPageChange={handleChangePage}
        />
      </div>
      <ConfirmationDialog
        show={deleteDialog.delete}
        hanldeShow={hanldeShowDeleteDialog}
        hanldeAgree={hanldeDeleteBlog}
        title={"Delete blog"}
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
      {showUpdateModal && (
        <DialogUpdateBlog
          showDialog={showUpdateModal}
          handleShowDialog={hanldeShowUpdateProductModal}
          reLoadTable={props.reLoadTable}
          blogId={blogSelectedUpdate}
          allDes={allDes}
        />
      )}
      <Modal
        open={openModalContent}
        onClose={handleCloseModalContent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, height: 400, overflow: "auto" }}>
          <p style={{ fontSize: "24px", fontWeight: 600 }}>{title}</p>
          <p style={{ fontSize: "12px" }}>
            {moment(date).format("MMM DD YY")} |
            <span style={{ color: "#d84727" }}> {author}</span>
          </p>
          {parse(content)}

          <div className={s.box_endofblog}>
            <div className={s.text_endofblog}>Advertising Message </div>
            <div className={s.text_endofblog}> End Of Advertising Message</div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
