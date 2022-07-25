import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./styles.module.scss";
import { useEffect } from "react";
import { getRecentOrders } from "../../features/Dashboard/dashboardAPI";
import moment from "moment";

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
  if (status === "COMPLETED") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "CANCELLED") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else if (status === "PENDING") {
    return {
      background: "#59bfff",
      color: "white",
    };
  } else {
    return {
      background: "#5c61f4",
      color: "white",
    };
  }
};

export default function DashboardTable() {
  const [orderList, setOrderList] = React.useState([]);
  useEffect(() => {
    getRecentOrders().then((res) => {
      console.log("res", res);
      setOrderList(res);
    });
  }, []);

  return (
    <div className={classes.table}>
      <h3>Recent Orders</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="left">Tracking ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {orderList.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.branchName}
                </TableCell>
                <TableCell align="left">{row._id}</TableCell>
                <TableCell align="left">
                  {moment(row.date).format("DD MMM YYYY")}
                </TableCell>
                <TableCell align="left">
                  <span
                    className={classes.status}
                    style={makeStyle(row.status)}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.details}>
                  <a
                    href={`https://localhost:3000/confirmation/${row._id}`}
                    rel="nofollow"
                    target="_blank"
                  >
                    Details
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
