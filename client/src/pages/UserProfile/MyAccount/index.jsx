import { Col, DatePicker, Form, Input, Row, Select, Button, Modal } from "antd";
import moment from "moment";
import { EnvelopeSimple, Key, Phone } from "phosphor-react";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import s from "./styles.module.scss";
import UpdatePhone from "../UpdatePhone";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const MyAccount = () => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onFinish = (values) => {
    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  const dateFormat = "YYYY/MM/DD";
  return (
    <div className={s.all}>
      <Row className={s.container}>
        <Col className={s.box} span={24}>
          <p className={s.text}>Account Information</p>
          <Row className={s.form_info}>
            <Col span={12}>
              <p className={s.text_info}>Personal Information</p>
              <Row className={s.avatar_name}>
                <Col span={8}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "100%",
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Col>
                <Col span={16}>
                  <Form
                    className={s.input_name}
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
                    <Form.Item
                      label="User name"
                      name="username"
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
              <Form
                initialValues={{
                  ["dob"]: moment("2015/01/01", dateFormat),
                  ["gender"]: "other",
                }}
              >
                <Form.Item
                  labelCol={{
                    span: 7,
                  }}
                  label="Day of birth"
                  name="dob"
                  className={s.date_of_birth}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                  labelCol={{
                    span: 7,
                  }}
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: "Please select gender!" }]}
                  className={s.gender}
                >
                  <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  labelCol={{
                    span: 7,
                  }}
                  label=" "
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={s.button_saveinfo}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>

            <Col span={12}>
              <div className={s.full_content_right}>
                <p className={s.text_info}>Phone and Email</p>
                <div className={s.phone}>
                  <div className={s.title}>
                    <Phone size={24} /> Phone{" "}
                  </div>
                  <div className={s.button_update} onClick={showModal}>
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

                <p className={s.text_info} style={{ marginTop: "40px" }}>
                  Security
                </p>

                <div className={s.password}>
                  <div className={s.title}>
                    <Key size={24} /> Password
                  </div>
                  <div className={s.button_update}>
                    <button className={s.btn_update}>Update</button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className={s.wrapInformation}
      >
        <UpdatePhone />
      </Modal>
    </div>
  );
};

export default MyAccount;
