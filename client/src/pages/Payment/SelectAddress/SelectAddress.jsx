import { Col, message, Modal, Radio, Row, Space } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAddress } from "../../../api/Address";
import addressImg from "../../../assets/checkout/Wavy Buddies - Address.png";
import UpdateAddress from "../../UserProfile/UpdateAddress";
import AddressItem from "./AdderssItem/AddressItem";
import classes from "./styles.module.scss";
const SelectAddress = ({ address, hanldeSelectAddress, reload, setReload }) => {
  const [value, setValue] = useState(
    address.length !== 0 ? address.find((el) => el.isDefault === true)._id : {}
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const handleCreateAddress = (
    username,
    reciname,
    reciphone,
    address,
    ward,
    district,
    city
  ) => {
    createAddress(
      username,
      reciname,
      reciphone,
      address,
      ward,
      district,
      city
    ).then((res) => {
      if (res) {
        setReload(!reload);
        message.success("Create success");
      }
    });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className={classes.wrapInformation}
      >
        <UpdateAddress handle={handleCreateAddress} />
      </Modal>
      <Row className={classes.addressSelectContainer}>
        <Col span={12}>
          {address.length === 0 ? (
            <div className={classes.continue} onClick={() => showModal()}>
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
                      <Radio
                        value={item._id}
                        ward={item.ward}
                        district={item.district}
                        city={item.city}
                      >
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
          <div className={classes.btn} onClick={() => showModal()}>
            <button>Add new address</button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SelectAddress;
