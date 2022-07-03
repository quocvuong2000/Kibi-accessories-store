import { PlusOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import {
  Button,
  Col,
  DatePicker,
  Form as FormAnt,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import CryptoJS from "crypto-js";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import moment from "moment";
import { EnvelopeSimple, Key, Phone } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { updateEmail } from "../../../api/User";
import userPlaceholder from "../../../assets/user_avatar.jpg";
import { updateProfile } from "../../../redux/apiCalls";
import { updateSuccess } from "../../../redux/userRedux";
import UpdateEmail from "../UpdateEmail";
import UpdatePassword from "../UpdatePassword";
import UpdatePhone from "../UpdatePhone";
import s from "./styles.module.scss";

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
const token = Cookies.get("token");
const dateFormat = "YYYY/MM/DD";
const MyAccount = () => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [url, setUrl] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [update, setUpdate] = useState(0);
  const [progressUpload, setProgressupload] = React.useState(0);
  const user = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [randomChar, setRandomChar] = useState("");
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const id = new URLSearchParams(search).get("id");
  const email = new URLSearchParams(search).get("email");
  const prv = new URLSearchParams(search).get("prv");
  useEffect(() => {
    if (prv != null && prv != undefined) {
      var tempprv = prv.replaceAll(" ", "+");
      var hashedPassword = CryptoJS.AES.decrypt(
        tempprv,
        `${process.env.REACT_APP_PRIVATE_KEY}`
      );
      var OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    } else {
      var OriginalPassword = "";
    }

    if (
      id?.length === 300 &&
      query.has("id") &&
      query.has("email") &&
      OriginalPassword === email
    ) {
      updateEmail(user.currentUser._id, email).then((res) => {
        if (res.status === 200) {
          message.success("Update successful!");
          search.delete("id");
          search.delete("email");
          id = "";
          email = "";
        }
      });
    }
    setSearchParams("");
  }, []);

  const handleUpdateEmail = (email) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 300; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setRandomChar(result);
    var enc = CryptoJS.AES.encrypt(
      email,
      `${process.env.REACT_APP_PRIVATE_KEY}`
    ).toString();
    emailjs
      .send(
        "service_3fco6q6",
        "template_t9ihe46",
        {
          to_name: email,
          from_name: "bin01012000@gmail.com",
          message: ` <a href='https://localhost:3000/myaccount/1/?id=${result}&email=${email}&prv=${enc}' target='_blank'> Google </a>`,
        },
        "v3GcHX1OV7AjPKEdx"
      )
      .then(
        (res) => {
          if (res.status === 200) {
            message.success("Please check your email and verify");
          }
        },
        (error) => {
          //console.log(error.text);
        }
      );
  };

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
  const dispatch = useDispatch();
  //console.log(user);
  return (
    <div className={s.all}>
      <Formik
        // validationSchema={loginSchema}
        initialValues={{
          name: user.currentUser !== null ? user.currentUser?.name : "",
          username: user.currentUser !== null ? user.currentUser?.username : "",
          dob: user.currentUser !== null ? user.currentUser?.dob : "",
          gender: user.currentUser !== null ? user.currentUser?.gender : "",
        }}
        onSubmit={async (values) => {
          // {imageUrl ? : }
          updateProfile(
            dispatch,
            user.currentUser?._id,
            values.name,
            values.dob,
            values.gender,
            imageUrl
          ).then((res) => {
            if (res) {
              const obj = {
                user: res,
                accessToken: token,
              };
              message.success("Update success");
              dispatch(updateSuccess(obj));
            }
          });
        }}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form className={s.input_name}>
              <Row className={s.container}>
                <Col className={s.box} span={24}>
                  <div className={s.title}>
                    <h3 className={s.tde}>
                      <span>Account Information</span>
                    </h3>
                  </div>
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
                          {user.currentUser?.avatar ? (
                            <div>
                              <img
                                src={user.currentUser?.avatar}
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
                        initialValue={moment(user.currentUser?.dob, dateFormat)}
                      >
                        <DatePicker
                          format={dateFormat}
                          onChange={(value, dateString) =>
                            setFieldValue("dob", dateString)
                          }
                          value={
                            user.currentUser?.dob
                              ? moment(user.currentUser?.dob, dateFormat)
                              : undefined
                          }
                        />
                      </FormAnt.Item>
                      <FormAnt.Item
                        name="gender"
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
                        initialValue={user.currentUser?.gender}
                      >
                        <Select
                          placeholder="select your gender"
                          defaultValue={user.currentUser?.gender}
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
                            <div className={s.btn_update}>Update</div>
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
                            <div className={s.btn_update}>Update</div>
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
                            <div className={s.btn_update}>Update</div>
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
        {update === 1 && <UpdateEmail update={handleUpdateEmail} />}
        {update === 2 && <UpdatePassword user={user} dispatch={dispatch} />}
      </Modal>
    </div>
  );
};

export default MyAccount;
