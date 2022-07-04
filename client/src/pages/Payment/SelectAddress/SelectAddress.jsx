import { Col, Radio, Row, Space } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import addressImg from "../../../assets/checkout/Wavy Buddies - Address.png";
import AddressItem from "./AdderssItem/AddressItem";
import classes from "./styles.module.scss";
const SelectAddress = ({ address, hanldeSelectAddress }) => {
  const [value, setValue] = useState(
    address.length !== 0 ? address.find((el) => el.isDefault === true)._id : {}
  );
  const navigate = useNavigate();
  // const defaultAddressId = address.find((el) => el.isDefault === true)._id;
  // console.log(value, defaultAddressId);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Row className={classes.addressSelectContainer}>
      <Col span={12}>
        {address.length === 0 ? (
          <div
            className={classes.continue}
            onClick={() => navigate("/myaccount/2")}
          >
            <button>Create address</button>
          </div>
        ) : (
          <>
            <Radio.Group
              onChange={onChange}
              value={value}
              className={classes.addressList}
            >
              <Space direction="vertical">
                {address.map((item, index) => {
                  return (
                    <Radio value={item._id}>
                      <AddressItem item={item} key={index} />
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
            <div
              className={classes.continue}
              onClick={() => hanldeSelectAddress(value)}
            >
              <button>Continue payment</button>
            </div>
          </>
        )}
      </Col>
      <Col
        span={12}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className={classes.right}
      >
        <div className={classes.image}>
          <img src={addressImg} alt="" />
        </div>
        <div className={classes.title}>Where we can get you?</div>
        <span>Please select your address to continue or</span>
        <Link to={"/myaccount/2"} className={classes.btn}>
          <button>Add new address</button>
        </Link>
      </Col>
    </Row>
  );
};

export default SelectAddress;
