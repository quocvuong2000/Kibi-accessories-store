import { Button, Form, Input, InputNumber } from "antd";
import React from "react";
import s from "./styles.module.scss";
import { Envelope } from "phosphor-react";

const UpdateEmail = () => {
  return (
    <div className={s.container}>
      <div className={s.form}>
        <p className={s.title}>Your email</p>
        <Form className={s.form_email}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please field your email",
              },
            ]}
          >
            <Input
              placeholder="Field your email"
              className={s.input_email}
              prefix={
                <Envelope size={20} weight="thin" className={s.icon_phone} />
              }
            />
            <small className={s.small_text}>
              Mã xác thực (OTP) sẽ được gửi đến email này để xác minh email là
              của bạn
            </small>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={s.update_email}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateEmail;
