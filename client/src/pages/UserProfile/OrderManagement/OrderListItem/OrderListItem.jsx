import { Col, Row } from "antd";
import React from "react";
import { checkTypeItem } from "../../../../utils/checkTypeItem";
import classes from "./styles.module.scss";
import moment from "moment";
const OrderListItem = (props) => {
  const statusCondition = () => {
    switch (props.data && props.data.service?.status) {
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
  return (
    <div className={classes.orderItemContainer}>
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
            {props.orderItem.createdAt
              ? moment(props.orderItem.createdAt).format("lll")
              : "N/A"}
          </div>
          <div className={`${classes.status} ${statusCondition()}`}>
            <div className={`${statusCondition()}`}> </div>
            {props.orderItem.status}
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
            #{checkTypeItem(props.orderItem._id)}
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
          <div className={classes.date}>
            {props.orderItem.createdAt
              ? props.orderItem.createdAt.toString()
              : "N/A"}
          </div>
          <div className={classes.status}>{props.orderItem.status}</div>
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
            #{checkTypeItem(props.orderItem._id)}
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
          <div className={classes.date}>
            {props.orderItem.createdAt
              ? props.orderItem.createdAt.toString()
              : "N/A"}
          </div>
          <div className={classes.status}>{props.orderItem.status}</div>
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
            #{checkTypeItem(props.orderItem._id)}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderListItem;
