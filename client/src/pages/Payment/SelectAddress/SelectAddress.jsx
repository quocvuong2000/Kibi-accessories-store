import { Col, Row } from "antd";
import React from "react";
import addressImg from "../../../assets/checkout/Wavy Buddies - Address.png";
import classes from "./styles.module.scss";
const SelectAddress = () => {
  return (
    <Row>
      <Col span={12}></Col>
      <Col span={12}>
        <div className={classes.image}>
          <img src={addressImg} alt="" />
        </div>
        <div className={classes.title}>Where we can get you?</div>
        <span>Please select your address to continue</span>
      </Col>
    </Row>
  );
};

export default SelectAddress;
