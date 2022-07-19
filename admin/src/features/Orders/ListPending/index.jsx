import { TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { acceptOrder, getByStatus, rejectOrder } from "../OrderAPI";
import OrderListItem from "../OrderListItem";
import { UilCheckCircle, UilTimesCircle } from "@iconscout/react-unicons";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import AppLoader from "../../../components/AppLoader";
import sendEmail from "../../../utils/sendEmail";
import numberWithCommas from "../../../utils/numberWithCommas";
const ListPending = () => {
  const [ListPending, setListPending] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [mess, setMess] = useState("");
  const [typemess, setTypeMess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    delete: false,
    id: "",
    item: {},
  });
  useEffect(() => {
    getByStatus("PENDING", page)
      .then((res) => {
        console.log("res:", res);
        if (res.status === 200) {
          setListPending(res.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, reload]);
  const hanldeShowDeleteDialog = (visible) => {
    setDeleteDialog(visible);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleAcceptOrder = (item) => {
    acceptOrder(item._id).then((res) => {
      if (res.status === 200) {
        setOpen(true);
        sendEmail(
          item.username,
          "Đang được vận chuyển",
          item._id,
          item.products,
          numberWithCommas(
            parseInt(item.totalPrice) - parseInt(item.shippingPrice)
          ),
          numberWithCommas(item.shippingPrice),
          numberWithCommas(item.totalPrice),
          item.recipientName,
          item.recipientPhone
        );
      }
      setTimeout(() => {
        setTypeMess("success");
        setMess("Accept Success");
        setReload(!reload);
      }, 500);
    });
  };
  const handleRejectOrder = () => {
    rejectOrder(deleteDialog.id).then((res) => {
      if (res.status === 200) {
        setOpen(true);
        sendEmail(
          deleteDialog.item.username,
          "Đã bị từ chối",
          deleteDialog.item._id,
          deleteDialog.item.products,
          numberWithCommas(
            parseInt(deleteDialog.item.totalPrice) -
              parseInt(deleteDialog.item.shippingPrice)
          ),
          numberWithCommas(deleteDialog.item.shippingPrice),
          numberWithCommas(deleteDialog.item.totalPrice),
          deleteDialog.item.recipientName,
          deleteDialog.item.recipientPhone
        );
        setDeleteDialog({
          delete: false,
          id: "",
          item: {},
        });
      }
      setTimeout(() => {
        setTypeMess("error");
        setMess("Reject Success");
        setReload(!reload);
      }, 500);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
    setIsLoading(true);
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
                <TableCell align="center">Confirm</TableCell>
                <TableCell align="center">Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {ListPending.orders?.map((item, index) => {
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
                          handleAcceptOrder(item);
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
                              item: item,
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
          count={ListPending.totalItems || 1}
          rowsPerPage={10}
          page={(ListPending.currentPage || 1) - 1}
          onPageChange={handleChangePage}
        />
      </div>
      <ConfirmationDialog
        show={deleteDialog.delete}
        hanldeShow={hanldeShowDeleteDialog}
        hanldeAgree={handleRejectOrder}
        title={"Reject Order"}
        content={"Are you sure to reject"}
      />
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

export default ListPending;
