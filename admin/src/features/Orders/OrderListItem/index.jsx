import moment from "moment";
import React from "react";
import s from "./styles.module.scss";
import { checkTypeItem } from "../../../utils/checkTypeItem";
import paid from "../../../assets/images/paid.png";

const OrderListItem = ({ orderItem }) => {
  const statusCondition = () => {
    switch (orderItem && orderItem.status) {
      case "PENDING":
        return s.pending;
      case "DELIVERY":
        return s.delivery;
      case "STARTING":
        return s.starting;
      case "CANCELLED":
        return s.cancel;
      case "REJECTED":
        return s.cancel;
      case "COMPLETED":
        return s.complete;
      default:
        return s.pending;
    }
  };

  const statusbgCondition = () => {
    switch (orderItem && orderItem.status) {
      case "PENDING":
        return s.bgpending;
      case "DELIVERY":
        return s.bgdelivery;
      case "STARTING":
        return s.bgstarting;
      case "CANCELLED":
        return s.bgcancel;
      case "REJECTED":
        return s.bgcancel;
      case "COMPLETED":
        return s.bgcomplete;
      default:
        return s.bgpending;
    }
  };

  return (
    <div className={`${s.container} ${statusbgCondition()}`}>
      <div className={s.one_item}>
        <div className={s.left_item}>
          <div className={s.box_date_status}>
            <p className={s.date_item}>
              {orderItem.createdAt
                ? moment(orderItem.createdAt).format("lll")
                : "N/A"}
            </p>
            <div className={`${s.status_item} ${statusCondition()}`}>
              <span className={`${statusCondition()}`}> </span>
              {orderItem.status}
            </div>
          </div>
          <p className={s.recipient_name_item}>
            Recipient name: {checkTypeItem(orderItem.recipientName)}
          </p>
          <p className={s.recipient_phone_item}>
            Recipient phone: {checkTypeItem(orderItem.recipientPhone)}
          </p>
          <p className={s.address_item}>
            Address: {checkTypeItem(orderItem.address)}
          </p>
        </div>
        <div className={s.right_item}>
          <p className={s.code_item}>#{checkTypeItem(orderItem._id)}</p>
          <p className={s.total_product}>
            Total Product: {checkTypeItem(orderItem.products.length)}
          </p>
          <p className={s.total_price}>
            Total Price : {checkTypeItem(orderItem.totalPrice)}
          </p>
          {orderItem.paid === true && (
            <div className={s.paid}>
              <img src={paid} alt="paid" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderListItem;
