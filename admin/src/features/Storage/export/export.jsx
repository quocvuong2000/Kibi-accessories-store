import { TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { useState } from "react";
import AppLoader from "../../../components/AppLoader";

const ListExport = (props) => {
  const handleChangePage = (_event, newPage) => {
    props.takePage(newPage + 1);
  };
  return (
    <>
      {props.loading === true && <AppLoader />}
      <div style={{ height: "465px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 650, height: "100%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Old Quantity</TableCell>
                <TableCell align="left">New Quantity</TableCell>
                <TableCell align="left">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {props.exportList?.branches?.map((item, index) => {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      maxHeight: 440,
                    }}
                    key={index}
                  >
                    <TableCell align="left">{item._id || "N/A"}</TableCell>
                    <TableCell align="left">
                      {item.branchName || "N/A"}
                    </TableCell>
                    <TableCell align="left">
                      {item.ProductName || "N/A"}
                    </TableCell>
                    <TableCell align="left">
                      {item.oldQuantity || "N/A"}
                    </TableCell>
                    <TableCell align="left">
                      {item.newQuantity || "N/A"}
                    </TableCell>
                    <TableCell align="left">
                      {moment(item.createdAt).format("MMM DD, YY") || "N/A"}
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
          count={props.exportList?.totalItems || 1}
          rowsPerPage={10}
          page={(props.exportList?.currentPage || 1) - 1}
          onPageChange={handleChangePage}
        />
      </div>
    </>
  );
};

export default ListExport;
