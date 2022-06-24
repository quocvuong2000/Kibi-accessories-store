import { Button, Form, Input, InputNumber, message } from "antd";
import React, { useState } from "react";
import s from "./styles.module.scss";
import { MapPinLine, User, Phone } from "phosphor-react";
import { useSelector } from "react-redux";
import { createAddress } from "../../../api/Address";

const UpdateAddress = () => {
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [address, setAddress] = useState("");
  const user = useSelector((state) => state.user);
  const handleCreateAddress = () => {
    createAddress(
      user.currentUser.username,
      recipientName,
      recipientPhone,
      address
    ).then((res) => {
      if (res) {
        message.success("Create success");
      }
    });
  };
  return (
    <div className={s.container}>
      <div className={s.form}>
        <p className={s.title}>Your address</p>
        <Form className={s.form_phone} onFinish={handleCreateAddress}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please field your recipent's name",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setRecipientName(e.target.value);
              }}
              placeholder="Field your recipent's name"
              className={s.input_phone}
              prefix={<User size={20} weight="thin" className={s.icon_phone} />}
            />
          </Form.Item>
          <Form.Item
            onChange={(e) => {
              setRecipientPhone(e.target.value);
            }}
            rules={[
              {
                required: true,
                message: "Please field your recipent's phone",
              },
            ]}
          >
            <Input
              placeholder="Field your recipent's phone"
              className={s.input_phone}
              prefix={
                <Phone size={20} weight="thin" className={s.icon_phone} />
              }
            />
          </Form.Item>
          <Form.Item>
            <Input
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Field your address"
              className={s.input_phone}
              prefix={
                <MapPinLine size={20} weight="thin" className={s.icon_phone} />
              }
            />
            <small className={s.small_text}>
              Hãy chắc chắn rằng bạn nhập đúng thông tin địa chỉ để chúng tôi có
              thể giao hàng cho bạn bất cứ lúc nào
            </small>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={s.update_phone}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateAddress;
