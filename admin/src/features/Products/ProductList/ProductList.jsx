import { UilSetting } from "@iconscout/react-unicons";
import { TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];

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
  const handleChangePage = (_event, newPage) => {
    props.takePage(newPage + 1);
  };
  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Setting</TableCell>
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="left"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <UilSetting />
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
        count={props.productList?.totalItems}
        rowsPerPage={10}
        page={props.productList?.currentPage - 1}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
