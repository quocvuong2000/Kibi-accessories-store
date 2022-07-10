import { Col, message, Popconfirm, Row } from "antd";
import React, { useState } from "react";
import { checkTypeItem } from "../../../../utils/checkTypeItem";
import classes from "./styles.module.scss";
import moment from "moment";
import { Link } from "react-router-dom";
import { cancelOrder } from "../../../../api/Order";
const OrderListItem = ({ orderItem, setReload, reload }) => {
  const statusCondition = () => {
    switch (orderItem && orderItem.status) {
      case "PENDING":
        return classes.pending;
      case "DELIVERY":
        return classes.delivery;
      case "STARTING":
        return classes.starting;
      case "CANCELLED":
        return classes.cancel;
      case "REJECTED":
        return classes.cancel;
      case "COMPLETED":
        return classes.complete;
      default:
        return classes.pending;
    }
  };

  const [visible, setVisible] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = (id) => {
    cancelOrder(id).then((res) => {
      if (res.status === 200) {
        setReload(!reload);
        message.success("Delete success");
      }
    });
    setVisible(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div className={classes.container}>
      <Link
        to={`/confirmation/${orderItem._id}`}
        className={classes.orderItemContainer}
      >
        <Row className={classes.orderInfor}>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className={classes.date}>
              {orderItem.createdAt
                ? moment(orderItem.createdAt).format("lll")
                : "N/A"}
            </div>
            <div className={`${classes.status} ${statusCondition()}`}>
              <div className={`${statusCondition()}`}> </div>
              {orderItem.status}
            </div>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div className={classes.code}>#{checkTypeItem(orderItem._id)}</div>
          </Col>
        </Row>
        <Row className={classes.price}>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className={classes.receipient}>
              Recipient name: {checkTypeItem(orderItem.recipientName)}
            </div>
            <div className={classes.receipientPhone}>
              Recipient phone: {checkTypeItem(orderItem.recipientPhone)}
            </div>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div className={classes.code}>
              Total Product: {checkTypeItem(orderItem.products.length)}
            </div>
          </Col>
        </Row>
        <Row className={classes.price}>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className={classes.address}>Address: </div>
            <div className={classes.addressName}>
              {" "}
              {checkTypeItem(orderItem.address)}
            </div>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div className={classes.code}>
              Total Price : {checkTypeItem(orderItem.totalPrice)}
            </div>
          </Col>
        </Row>
      </Link>
      {orderItem.status === "PENDING" && (
        <Popconfirm
          title="Are you sure about that"
          visible={visible}
          onConfirm={() => handleOk(orderItem._id)}
          onCancel={handleCancel}
        >
          <button
            className={`${classes.button_remove} ${
              orderItem.paid === true && classes.disabled
            } `}
            onClick={orderItem.paid === false && showPopconfirm}
          >
            Cancel
          </button>
        </Popconfirm>
      )}
    </div>
  );
};

export default OrderListItem;
