import { Button, Form, Input, InputNumber, message } from "antd";
import React, { useState } from "react";
import s from "./styles.module.scss";
import { MapPinLine, User, Phone } from "phosphor-react";
import { useSelector } from "react-redux";
import { createAddress } from "../../../api/Address";

const EditAddress = (props) => {
  const [address, setAddress] = useState("");
  const data = props.address;
  return (
    <div className={s.container}>
      <div className={s.form}>
        <p className={s.title}>Your address</p>
        <Form
          className={s.form_phone}
          onFinish={() => props.handle(props.addressId, data._id, address)}
        >
          <Form.Item initialValue={data.address}>
            <Input
              defaultValue={data.address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              allowClear={true}
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

export default EditAddress;
