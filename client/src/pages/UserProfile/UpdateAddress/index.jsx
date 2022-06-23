import { Button, Form, Input, InputNumber } from "antd";
import React from "react";
import s from "./styles.module.scss";
import { MapPinLine } from "phosphor-react";

const UpdateAddress = () => {
  return (
    <div className={s.container}>
      <div className={s.form}>
        <p className={s.title}>Your address</p>
        <Form className={s.form_phone}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please field your address",
              },
            ]}
          >
            <Input
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
