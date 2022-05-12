import React from "react";
import classes from "./styles.module.scss";
import PropsType from "prop-types";
import img from "../../../assets/confirmation/undraw_completing_6bhr 1.png";
import { Clock, Truck } from "phosphor-react";
import numberWithCommas from "../../../utils/numberWithCommas";

const Confirmation = (props) => {
  const paymentInfo = props.paymentInfo;

  return (
    <div className={classes.confirmationDetail}>
      <div className={classes.left}>
        <div className={classes.image}>
          <img src={img} alt="" />
        </div>
        <div className={classes.title}>Order Confirmed</div>
        <span>
          Your order have been confirmed, please wait and track your order
        </span>
        <div className={classes.btn}>
          <button>Go to track page</button>
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.delivery}>
          <div className={classes.deliveryItem}>
            <Clock weight="light" />
            10 days delivery
          </div>
          <div className={classes.deliveryItem}>
            <Truck weight="light" />
            DHL Express
          </div>
        </div>
        <div className={classes.contentItem}>
          <div className={classes.itemList}>
            {paymentInfo.orderDetail.items.map((item, index) => {
              return (
                <div className={classes.item} key={index}>
                  <div className={classes.productName}>{item.product}</div>
                  <span>
                    {item.quantity} x {numberWithCommas(item.price)} VND
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.contentItem}>
          <div className={classes.display}>SubTotal</div>
          <div className={classes.price}>
            {numberWithCommas(paymentInfo.detailOrder.subTotal)} VND
          </div>
        </div>
        <div className={classes.contentItem}>
          <div className={classes.display}>Shipping Cost</div>
          <div className={classes.price}>
            {numberWithCommas(paymentInfo.detailOrder.shippingCost)} VND
          </div>
        </div>
        <div className={classes.contentItem}>
          <div className={classes.display}>Packaging</div>
          <div className={classes.price}>
            {numberWithCommas(paymentInfo.detailOrder.packaging)} VND
          </div>
        </div>
        <div className={classes.total}>
          <div className={classes.display}>Grand Total</div>
          <div className={classes.price}>
            {numberWithCommas(paymentInfo.detailOrder.grandTotal)} VND
          </div>
        </div>
        <div className={classes.contentAddress}>
          <div className={classes.display}>Shipping Address</div>
          <div className={classes.shippingAddress}>
            {paymentInfo.orderDetail.shippingAddress}
          </div>
        </div>
      </div>
    </div>
  );
};
Confirmation.propsType = {
  paymentInfo: PropsType.object,
};
export default Confirmation;
