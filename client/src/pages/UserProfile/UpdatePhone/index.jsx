import { Button, Form, Input, InputNumber } from "antd";
import React from "react";
import s from "./styles.module.scss";
import { Phone } from "phosphor-react";

const UpdatePhone = () => {
  return (
    <div className={s.container}>
      <div className={s.form}>
        <p className={s.title}>Your phone</p>
        <Form className={s.form_phone}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please field your phone number",
              },
            ]}
          >
            <Input
              placeholder="Field your phone number"
              className={s.input_phone}
              prefix={
                <Phone size={20} weight="thin" className={s.icon_phone} />
              }
            />
            <small className={s.small_text}>
              Mã xác thực (OTP) sẽ được gửi đến số điện thoại này để xác minh số
              điện thoại là của bạn
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

export default UpdatePhone;
