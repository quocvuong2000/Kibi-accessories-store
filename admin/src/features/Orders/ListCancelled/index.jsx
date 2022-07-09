import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { getByStatus } from "../OrderAPI";
import OrderListItem from "../OrderListItem";
import AppLoader from "../../../components/AppLoader";
const ListCancelled = () => {
  const [ListCancelled, setListCancelled] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [mess, setMess] = useState("");
  const [typemess, setTypeMess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getByStatus("CANCELLED", page)
      .then((res) => {
        console.log("res:", res);
        if (res.status === 200) {
          setListCancelled(res.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, reload]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };

  return (
    <>
      {isLoading === true && <AppLoader />}
      <div style={{ height: "465px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 650, height: "100%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Voucher</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {ListCancelled.orders?.map((item, index) => {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      maxHeight: 440,
                    }}
                    key={index}
                  >
                    <TableCell align="left">
                      <OrderListItem orderItem={item} />
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
          count={ListCancelled.totalItems || 1}
          rowsPerPage={10}
          page={(ListCancelled.currentPage || 1) - 1}
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

export default ListCancelled;
