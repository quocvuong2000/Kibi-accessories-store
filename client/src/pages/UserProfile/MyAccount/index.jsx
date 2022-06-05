import React from "react";
import s from "./styles.module.scss";
import Avatar from "react-avatar";
import { Row, Col } from "antd";
import { Form, Input, Button, DatePicker, InputNumber, Select } from "antd";
import moment from "moment";
import { Phone, EnvelopeSimple } from "phosphor-react";
const MyAccount = () => {
  const { Option } = Select;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const dateFormat = "YYYY/MM/DD";
  return (
    <Row className={s.container}>
      <Col className={s.box} span={24}>
        <p className={s.text}>Account Information</p>
        <Row className={s.form_info}>
          <Col>
            <p className={s.text_info}>Personal Information</p>
            <Row>
              <Col span={8}>
                <Avatar
                  googleId="118096717852922241760"
                  size="100"
                  round={true}
                />
              </Col>
              <Col span={16}>
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Full name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please field your name",
                      },
                    ]}
                  >
                    <Input allowClear />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            <Form.Item label="Day of birth" name="dob">
              <DatePicker
                defaultValue={moment("2015/01/01", dateFormat)}
                format={dateFormat}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select placeholder="select your gender" defaultValue="other">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col>
            <p className={s.text_e_p}>Phone and Email</p>
            <p className={s.phone}>
              <Phone size={24} /> Phone{" "}
              <div className={s.button_update}>
                <span></span>
                <button className={s.btn_update}>Update</button>
              </div>
            </p>
            <p className={s.email}>
              <EnvelopeSimple size={24} /> Email
              <div className={s.button_update}>
                <span></span>
                <button className={s.btn_update}>Update</button>
              </div>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MyAccount;
