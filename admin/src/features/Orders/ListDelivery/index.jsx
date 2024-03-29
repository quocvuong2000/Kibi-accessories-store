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
import { completeOrder, getByStatus, rejectOrder } from "../OrderAPI";
import OrderListItem from "../OrderListItem";
import AppLoader from "../../../components/AppLoader";
import { UilCheckCircle, UilTimesCircle } from "@iconscout/react-unicons";
const ListDelivery = () => {
  const [ListDelivery, setListDelivery] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [mess, setMess] = useState("");
  const [typemess, setTypeMess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    delete: false,
    id: "",
  });
  useEffect(() => {
    getByStatus("DELIVERY", page)
      .then((res) => {
        console.log("res:", res);
        if (res.status === 200) {
          setListDelivery(res.data);
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
    setPage(newPage + 1);
    setIsLoading(true);
  };

  const handleAcceptOrder = (id) => {
    completeOrder(id).then((res) => {
      if (res.status === 200) {
        setOpen(true);
      }
      setTimeout(() => {
        setTypeMess("success");
        setMess("Complete Success");
        setReload(!reload);
      }, 500);
    });
  };
  const handleRejectOrder = () => {
    rejectOrder(deleteDialog.id).then((res) => {
      if (res.status === 200) {
        setOpen(true);
        setDeleteDialog({
          delete: false,
          id: "",
        });
      }
      setTimeout(() => {
        setTypeMess("success");
        setMess("Reject Success");
        setReload(!reload);
      }, 500);
    });
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
                <TableCell align="left">Order</TableCell>
                <TableCell align="center">Confirm</TableCell>
                <TableCell align="center">Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {ListDelivery.orders?.map((item, index) => {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      maxHeight: 440,
                    }}
                    key={index}
                  >
                    <TableCell align="left">
                      <OrderListItem
                        orderItem={item}
                        setIsLoading={setIsLoading}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <UilCheckCircle
                        color="#00FF22"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleAcceptOrder(item._id);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <UilTimesCircle
                        color="#FF3300"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          item.paid === false &&
                            setDeleteDialog({
                              delete: true,
                              id: item._id,
                            });
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
          count={ListDelivery.totalItems || 1}
          rowsPerPage={5}
          page={(ListDelivery.currentPage || 1) - 1}
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

export default ListDelivery;
