import { Col, DatePicker, Row, Select, Button, Modal, Upload } from "antd";
import { Form as FormAnt, Input, message } from "antd";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import { EnvelopeSimple, Key, Phone } from "phosphor-react";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
      <Formik
        // validationSchema={loginSchema}
        initialValues={{
          name: user.currentUser !== null ? user.currentUser.name : "",
          username: user.currentUser !== null ? user.currentUser?.username : "",
          dob: "",
          gender: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form className={s.input_name}>
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
                              <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                  width: "120px",
                                  height: "120px",
                                  objectFit: "cover",
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
                                  height: "120px",
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
                          <FormAnt.Item
                            validateStatus={
                              Boolean(touched?.name && errors?.name)
                                ? "error"
                                : "success"
                            }
                            help={
                              Boolean(touched?.name && errors?.name) &&
                              errors?.name
                            }
                          >
                            <Field name="name">
                              {({ field }) => (
                                <Input {...field} placeholder="Name" />
                              )}
                            </Field>
                          </FormAnt.Item>
                          <FormAnt.Item
                            validateStatus={
                              Boolean(touched?.username && errors?.username)
                                ? "error"
                                : "success"
                            }
                            help={
                              Boolean(touched?.username && errors?.username) &&
                              errors?.username
                            }
                          >
                            <Field name="username">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  disabled
                                  placeholder="Username"
                                />
                              )}
                            </Field>
                          </FormAnt.Item>
                        </Col>
                      </Row>
                      <FormAnt.Item
                        validateStatus={
                          Boolean(touched?.dob && errors?.dob)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.dob && errors?.dob) && errors?.dob
                        }
                      >
                        <DatePicker
                          format={dateFormat}
                          onChange={(value, dateString) =>
                            setFieldValue("dob", dateString)
                          }
                        />
                      </FormAnt.Item>
                      <FormAnt.Item
                        validateStatus={
                          Boolean(touched?.gender && errors?.gender)
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.gender && errors?.gender) &&
                          errors?.gender
                        }
                        className={s.gender}
                      >
                        <Select
                          placeholder="select your gender"
                          onChange={(value) => setFieldValue("gender", value)}
                        >
                          <Option value="male">Male</Option>
                          <Option value="female">Female</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </FormAnt.Item>
                      <FormAnt.Item
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
                      </FormAnt.Item>
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

                        <p
                          className={s.text_info}
                          style={{ marginTop: "40px" }}
                        >
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
            </Form>
          );
        }}
      </Formik>
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
