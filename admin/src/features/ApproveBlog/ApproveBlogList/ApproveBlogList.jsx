import { Alert, Menu, Snackbar, TablePagination } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import parse from "html-react-parser";
import * as React from "react";
import { UilCheck } from "@iconscout/react-unicons";
import { UilCheckCircle, UilTimesCircle } from "@iconscout/react-unicons";
import { updateStatusBlog } from "../../Blogs/BlogAPI";
export default function ApproveBlogList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [blogIdSelected, setBlogIdSelected] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleChangePage = (_event, newPage) => {
    props.takePage(newPage + 1);
  };

  const approveBlog = (id) => {
    updateStatusBlog(id, "APPROVAL").then((res) => {
      if (res.status === 200) {
        props.reLoadTable("delete" + Date.now());
      }
    });
  };

  const rejectBlog = (id) => {
    updateStatusBlog(id, "REJECTED").then((res) => {
      if (res.status === 200) {
        props.reLoadTable("delete" + Date.now());
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
                <TableCell align="left">Author</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="left">Content</TableCell>
                <TableCell align="left">Category Blog</TableCell>
                <TableCell align="center">Approve</TableCell>
                <TableCell align="center">Reject</TableCell>
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
                  }}
                >
                  <TableCell align="left">{row.author}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="left">{parse(row.content)}</TableCell>
                  <TableCell align="left">{row.categoryname}</TableCell>

                  <TableCell align="center">
                    <UilCheckCircle
                      color="#00FF22"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        approveBlog(row._id);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <UilTimesCircle
                      color="#FF3300"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        rejectBlog(row._id);
                      }}
                    />
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
