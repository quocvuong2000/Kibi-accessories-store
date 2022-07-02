import { Button, Form, Input, message } from "antd";
import { Envelope } from "phosphor-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./styles.module.scss";
import emailjs from "@emailjs/browser";
import { updateEmail } from "../../../api/User";

const UpdateEmail = (props) => {
  const [email, setEmail] = useState("");

  return (
    <div className={s.container}>
      <div className={s.form}>
        <p className={s.title}>Your email</p>
        <Form className={s.form_email} onFinish={() => props.update(email)}>
          <Form.Item name="email">
            <Input
              placeholder="Field your email"
              className={s.input_email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
