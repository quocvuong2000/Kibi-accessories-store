import {
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Button,
  Modal,
  Progress,
} from "antd";
import moment from "moment";
import { EnvelopeSimple, Key, Phone } from "phosphor-react";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import s from "./styles.module.scss";
import UpdatePhone from "../UpdatePhone";
import UpdateEmail from "../UpdateEmail";
import UpdatePassword from "../UpdatePassword";
import { useSelector } from "react-redux";
import userPlaceholder from "../../../assets/user_avatar.jpg";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase/firebase";
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
  const [url, setUrl] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [update, setUpdate] = useState(0);
  const [progressUpload, setProgressupload] = React.useState(0);
  const user = useSelector((state) => state.user);
  console.log("url:", url);
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
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const uploadButton = (
    <div className={s.btnUpload}>
      <PlusOutlined />
      {/* <div className={s.text}>Change Image</div> */}
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
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {imageUrl ? (
                    <div>
                      {/* <Progress
                        strokeColor={{
                          from: "#108ee9",
                          to: "#87d068",
                        }}
                        percent={progressUpload}
                        type={"circle"}
                        status="active"
                      /> */}
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "120px",
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={userPlaceholder}
                        alt=""
                        style={{
                          width: "120px",
                        }}
                      />
                    </div>
                  )}
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {uploadButton}
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
                      initialValue={
                        user.currentUser !== null ? user.currentUser.name : ""
                      }
                    >
                      <Input
                        allowClear
                        value={
                          user.currentUser !== null ? user.currentUser.name : ""
                        }
                      />
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
                      initialValue={
                        user.currentUser !== null
                          ? user.currentUser?.username
                          : ""
                      }
                    >
                      <Input
                        disabled={true}
                        allowClear
                        value={
                          user.currentUser !== null
                            ? user.currentUser?.username
                            : ""
                        }
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              <Form>
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
                  <div
                    className={s.button_update}
                    onClick={() => {
                      setUpdate(0);
                      showModal();
                    }}
                  >
                    <span></span>
                    <button className={s.btn_update}>Update</button>
                  </div>
                </div>
                <div className={s.email}>
                  <div className={s.title}>
                    <EnvelopeSimple size={24} /> Email
                  </div>
                  <div
                    className={s.button_update}
                    onClick={() => {
                      setUpdate(1);
                      showModal();
                    }}
                  >
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
                  <div
                    className={s.button_update}
                    onClick={() => {
                      setUpdate(2);
                      showModal();
                    }}
                  >
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
        {update === 0 && <UpdatePhone />}
        {update === 1 && <UpdateEmail />}
        {update === 2 && <UpdatePassword />}
      </Modal>
    </div>
  );
};

export default MyAccount;
