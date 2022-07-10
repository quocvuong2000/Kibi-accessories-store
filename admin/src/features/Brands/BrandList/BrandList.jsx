import { UilSetting } from "@iconscout/react-unicons";
import { TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import classes from "./styles.module.scss";
import moment from "moment";


export default function BrandList(props) {
  // const [success, setSuccess] = useState(false);
  // const [failure, setFailure] = useState(false);
  const handleChangePage = (_event, newPage) => {
    props.takePage(newPage + 1);
  };
  return (
    <div className={classes.table}>
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
              >
                <TableCell
                  align="left"
                  className={classes.details}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <UilSetting />
                </TableCell>
                <TableCell>{row._id}</TableCell>
                <TableCell align="left">{row.brand}</TableCell>
                <TableCell align="left">
                  {moment(row.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="left">
                  <span
                    className={classes.status}
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
  );
}
