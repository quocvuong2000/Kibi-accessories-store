import React, { useEffect } from "react";
import classes from "./styles.module.scss";
import PropsType from "prop-types";
import img from "../../../assets/confirmation/undraw_completing_6bhr 1.png";
import { Clock, Truck } from "phosphor-react";
import numberWithCommas from "../../../utils/numberWithCommas";
import { useState } from "react";
import { checkTypeItem } from "../../../utils/checkTypeItem";
import { Link, useLocation } from "react-router-dom";
import { doGetDetailOrder } from "../ConfirmationAPI";
import { Empty, message } from "antd";
import AppLoader from "../../../components/AppLoader";

const Confirmation = (props) => {
  const location = useLocation();
  //console.log(location.pathname.split("/")[2]);
  const [orderDetail, setOrderDetail] = useState();
  const id = location.pathname.split("/")[2];
  useEffect(() => {
    doGetDetailOrder(id)
      .then((res) => {
        //console.log(res);
        setOrderDetail(res);
      })
      .catch(() => {
        message.error("Loading order detail fail");
      });
  }, [id]);
  return (
    <>
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
                10 days delivery
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
                {numberWithCommas(orderDetail.totalPrice)} VND
              </div>
            </div>
            <div className={classes.contentItem}>
              <div className={classes.display}>Shipping Cost</div>
              <div className={classes.price}>
                {numberWithCommas(props.shippingCost)} VND
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
                {numberWithCommas(orderDetail.totalPrice + props.shippingCost)}{" "}
                VND
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
