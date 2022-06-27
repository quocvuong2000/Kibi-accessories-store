import { Radio } from "antd";
import PropsType from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import numberWithCommas from "../../../utils/numberWithCommas";
import classes from "./styles.module.scss";
import { useSelector } from "react-redux";
import { getInfoService, getShippingCost } from "../../../api/Shipping";

const PaymentDetail = (props) => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={classes.paymentDetail}>
      <div className={classes.information}>
        <div className={classes.left}>
          <div className={classes.detailOrder}>
            <div className={classes.title}>Detail Order</div>
            <div className={classes.detailContent}>
              <div className={classes.contentItem}>
                <div className={classes.display}>SubTotal</div>
                <div className={classes.price}>
                  {numberWithCommas(props.cart.totalPrice)} VND
                </div>
              </div>
              <div className={classes.contentItem}>
                <div className={classes.display}>Shipping Cost</div>
                <div className={classes.price}>
                  {numberWithCommas(props.shippingCost)} VND
                </div>
              </div>
              {/* <div className={classes.contentItem}>
                <div className={classes.display}>Promo Code</div>
                <div className={classes.price}>
                  {paymentInfo.detailOrder.promoCode}
                </div>
              </div> */}
              {/* <div className={classes.contentItem}>
                <div className={classes.display}>Packaging</div>
                <div className={classes.price}>
                  {numberWithCommas(paymentInfo.detailOrder.packaging)} VND
                </div>
              </div> */}
              <div className={classes.total}>
                <div className={classes.display}>Grand Total</div>
                <div className={classes.price}>
                  {numberWithCommas(props.cart.totalPrice + props.shippingCost)}{" "}
                  VND
                </div>
              </div>
            </div>
          </div>
          <div className={classes.paymentDetails}>
            <div className={classes.top}>
              <div className={classes.title}>Payment Detail</div>
              <div className={classes.time}>
                {/* {paymentInfo.paymentDetail.timeLitmit} */}
              </div>
            </div>
            <div className={classes.bottom}>
              Please make a payment according with the limit time specified,
              starting from now
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.orderDetail}>
            <div className={classes.title}>Order Detail</div>
            <div className={classes.orderContent}>
              <div className={classes.contentItem}>
                <div className={classes.display}>Order Number</div>
                <div className={classes.OrderNumber}>
                  <div className={classes.number}>
                    {/* {paymentInfo.orderDetail.OrderNumber} */}
                    <span>COPY</span>
                  </div>
                  <div className={classes.note}>
                    Always remember Order Number for easy tracking
                  </div>
                </div>
              </div>
              <div className={classes.contentItem}>
                <div className={classes.display}>Purchase Date</div>
                <div className={classes.price}>
                  {/* {paymentInfo.orderDetail.PurchaseDate} */}
                </div>
              </div>
              <div className={classes.contentItem}>
                <div className={classes.display}>Items</div>
                <div className={classes.itemList}>
                  {props.cart._products?.map((item, index) => {
                    return (
                      <div className={classes.item} key={index}>
                        <div className={classes.productName}>
                          {item.productName}
                        </div>
                        <span>
                          {item.quantity} x{" "}
                          {numberWithCommas(item.productPrice)} VND
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={classes.contentItem}>
                <div className={classes.display}>Name</div>
                <div className={classes.customerName}>
                  {props.user.currentUser.name}
                </div>
              </div>
              <div className={classes.contentItem}>
                <div className={classes.display}>Phone</div>
                <div className={classes.customerPhone}>
                  {props.user.currentUser.phone ?? "N/A"}
                </div>
              </div>
              <div className={classes.contentItem}>
                <div className={classes.display}>Email</div>
                <div className={classes.customerEmail}>
                  {props.user.currentUser.email}
                </div>
              </div>
              <div className={classes.contentItem}>
                <div className={classes.display}>Shipping Address</div>
                <div className={classes.shippingAddress}>
                  {/* {paymentInfo.orderDetail.shippingAddress} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.paymentMethod}>
        <div className={classes.title}>Payment Method</div>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>Credit Card</Radio>
          <Radio value={2}>Cash on delivery</Radio>
        </Radio.Group>
      </div>
      <Link to={"/confirmation"} className={classes.btn}>
        <button>Proceed Payment</button>
      </Link>
    </div>
  );
};
PaymentDetail.propsType = {
  paymentInfo: PropsType.object,
};

export default PaymentDetail;
