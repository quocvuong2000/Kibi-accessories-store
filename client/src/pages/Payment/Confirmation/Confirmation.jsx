import { Empty, message } from "antd";
import moment from "moment";
import { Clock, Truck } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getInfoService, getLeadTime } from "../../../api/Shipping";
import { deletedVoucher } from "../../../api/Voucher";
import img from "../../../assets/confirmation/undraw_completing_6bhr 1.png";
import AppLoader from "../../../components/AppLoader";
import { checkTypeItem } from "../../../utils/checkTypeItem";
import numberWithCommas from "../../../utils/numberWithCommas";
import sendEmail from "../../../utils/sendEmail";
import { doGetDetailOrder } from "../ConfirmationAPI";
import classes from "./styles.module.scss";
const Confirmation = (props) => {
  const [serviceId, setServiceId] = useState(0);
  const user = useSelector((state) => state.user);
  const currentWard = props.addressSelected
    ? props.addressSelected.ward
    : props.address[0].ward;
  const currentDistrict = props.addressSelected
    ? props.addressSelected.district
    : props.address[0].district;
  const location = useLocation();

  const [orderDetail, setOrderDetail] = useState();
  const id = location.pathname.split("/")[2];
  const [leadTime, setLeadTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInfoService(props.from, currentDistrict)
      .then((res) => {
        if (res) {
          setServiceId(res.data.data[0].service_id);
        }
      })
      .finally(() => setIsLoading(false));
  }, [props.from]);

  useEffect(() => {
    setIsLoading(true);
    if (parseInt(props.addressSelected?.city) !== props.provinceId) {
      var result = new Date(Date.now());
      result.setDate(result.getDate() + 10);

      setLeadTime(Date.parse(result));
    } else {
      getLeadTime(
        props.from,
        props.fromWard,
        currentDistrict,
        currentWard,
        serviceId,
        props.shopId
      )
        .then((res) => {
          if (res) {
            setLeadTime(res.data?.data?.leadtime);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [props.from, props.fromWard, serviceId, props.shopId]);

  useEffect(() => {
    setIsLoading(true);
    if (id && id !== null && id !== undefined) {
      doGetDetailOrder(id)
        .then((res) => {
          var idVoucher = localStorage.getItem("idVauchoemxiuanhnhe");
          if (idVoucher !== "" && idVoucher) {
            deletedVoucher(idVoucher).then(() => {});
            localStorage.removeItem("idVauchoemxiuanhnhe");
          }
          setOrderDetail(res);
          sendEmail(
            user.currentUser.username,
            "Đang chờ xác nhận",
            res._id,
            res.product,
            numberWithCommas(
              parseInt(orderDetail.totalPrice) -
                parseInt(orderDetail.shippingPrice)
            ),
            numberWithCommas(orderDetail.shippingPrice),
            numberWithCommas(orderDetail.totalPrice),
            orderDetail.recipientName,
            orderDetail.recipientPhone
          );
        })
        .catch(() => {
          message.error("Loading order detail fail");
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <>
      {isLoading === true && <AppLoader />}
      {orderDetail ? (
        <div className={classes.confirmationDetail}>
          <div className={classes.left}>
            <div className={classes.image}>
              <img src={img} alt="" />
            </div>
            <div className={classes.title}>Order Confirmed</div>
            <span>
              Your order have been confirmed, please wait and track your order
            </span>
            <Link to={"/myaccount/6"} className={classes.btn}>
              <button>Go to track page</button>
            </Link>
          </div>
          <div className={classes.right}>
            <div className={classes.delivery}>
              <div className={classes.deliveryItem}>
                <Clock weight="light" />
                {moment(leadTime).format("dddd DD, MMM, YYYY")}
              </div>
              <div className={classes.deliveryItem}>
                <Truck weight="light" />
                GHN Express
              </div>
            </div>
            <div className={classes.contentItem}>
              <div className={classes.display}>Order ID: </div>
              <div className={classes.price}>
                {numberWithCommas(orderDetail._id)}
              </div>
            </div>
            <div className={classes.contentItem}>
              <div className={classes.display}>Items</div>
              <div className={classes.itemList}>
                {orderDetail.products?.map((item, index) => {
                  return (
                    <div className={classes.item} key={index}>
                      <div className={classes.productName}>
                        {item.productName}
                      </div>
                      <span>
                        {item.quantity} x {numberWithCommas(item.productPrice)}{" "}
                        VND
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={classes.contentItem}>
              <div className={classes.display}>Recipient Name</div>
              <div className={classes.price}>
                {checkTypeItem(orderDetail.recipientName)}
              </div>
            </div>
            <div className={classes.contentItem}>
              <div className={classes.display}>Recipient Phone</div>
              <div className={classes.price}>
                {checkTypeItem(orderDetail.recipientPhone)}
              </div>
            </div>
            <div className={classes.contentItem}>
              <div className={classes.display}>SubTotal</div>
              <div className={classes.price}>
                {numberWithCommas(
                  parseInt(orderDetail.totalPrice) -
                    parseInt(orderDetail.shippingPrice)
                )}{" "}
                VND
              </div>
            </div>
            <div className={classes.contentItem}>
              <div className={classes.display}>Shipping Cost</div>
              <div className={classes.price}>
                {numberWithCommas(orderDetail.shippingPrice)} VND
              </div>
            </div>
            {/* <div className={classes.contentItem}>
          <div className={classes.display}>Packaging</div>
          <div className={classes.price}>
            {numberWithCommas(paymentInfo.detailOrder.packaging)} VND
          </div>
        </div> */}
            <div className={classes.total}>
              <div className={classes.display}>Grand Total</div>
              <div className={classes.price}>
                {numberWithCommas(orderDetail.totalPrice)} VND
              </div>
            </div>
            {/* <div className={classes.contentAddress}>
          <div className={classes.display}>Shipping Address</div>
          <div className={classes.shippingAddress}>
            {paymentInfo.orderDetail.shippingAddress}
          </div>
        </div> */}
          </div>
        </div>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={"No Data"}
        />
      )}
    </>
  );
};

export default Confirmation;
