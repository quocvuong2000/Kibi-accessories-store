import { TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import AppLoader from "../../../components/AppLoader";
import { checkTypeItem } from "../../../utils/checkTypeItem";

const ListImport = (props) => {
  const handleChangePage = (_event, newPage) => {
    props.takePageImport(newPage + 1);
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
                <TableCell align="left">Branch</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Old Quantity</TableCell>
                <TableCell align="left">New Quantity</TableCell>
                <TableCell align="left">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {props.importList?.branches?.map((item, index) => {
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
                      {item.productName || "N/A"}
                    </TableCell>
                    <TableCell align="left">
                      {checkTypeItem(item.oldQuantity)}
                    </TableCell>
                    <TableCell align="left">
                      {checkTypeItem(item.newQuantity)}
                    </TableCell>
                    <TableCell align="left">
                      {moment(item.createdAt).format("DD/MM/YYYY") || "N/A"}
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
          count={props.importList?.totalItems || 1}
          rowsPerPage={10}
          page={(props.importList?.currentPage || 1) - 1}
          onPageChange={handleChangePage}
        />
      </div>
    </>
  );
};

export default ListImport;
