import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import { EnvelopeSimple, Phone } from "phosphor-react";
import React from "react";
import Avatar from "react-avatar";
import s from "./styles.module.scss";
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
          <Col span={12}>
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

          <Col span={12}>
            <p className={s.text_e_p}>Phone and Email</p>
            <div className={s.phone}>
              <div className={s.title}>
                <Phone size={24} /> Phone{" "}
              </div>
              <div className={s.button_update}>
                <span></span>
                <button className={s.btn_update}>Update</button>
              </div>
            </div>
            <div className={s.email}>
              <div className={s.title}>
                <EnvelopeSimple size={24} /> Email
              </div>
              <div className={s.button_update}>
                <button className={s.btn_update}>Update</button>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MyAccount;
