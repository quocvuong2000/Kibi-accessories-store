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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import moment from "moment";
import { EnvelopeSimple, Key, Phone } from "phosphor-react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { checkExist, updateEmail } from "../../../api/User";
import userPlaceholder from "../../../assets/user_avatar.jpg";
import AppLoader from "../../../components/AppLoader";
import { app } from "../../../firebase/firebase";
import { updateProfile } from "../../../redux/apiCalls";
import { updateEmailRedux, updateSuccess } from "../../../redux/userRedux";
import UpdateEmail from "../UpdateEmail";
import UpdatePassword from "../UpdatePassword";
import UpdatePhone from "../UpdatePhone";
import s from "./styles.module.scss";

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
const token = Cookies.get("tokenClient");
const dateFormat = "YYYY/MM/DD";
const MyAccount = () => {
  const { Option } = Select;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [update, setUpdate] = useState(0);
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = useLocation().search;
  const prv = new URLSearchParams(search).get("prv");
  const showpassword = new URLSearchParams(search).get("showpass");
  const [verify, setVerify] = useState(false);
  const query = new URLSearchParams(search);
  const id = new URLSearchParams(search).get("id");
  const email = new URLSearchParams(search).get("email");

  useEffect(() => {
    if (prv !== null && prv !== undefined) {
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
      updateEmail(user.currentUser?._id, email).then((res) => {
        if (res.status === 200) {
          dispatch(updateEmailRedux(email));
          message.success("Update successful!");
          search.delete("id");
          search.delete("email");
          id = "";
          email = "";
        }
      });
      setVerify(false);
      setSearchParams("");
    }
  }, []);

  useEffect(() => {
    if (showpassword === "true") {
      setUpdate(2);
      showModal();
    }
    setSearchParams("");
  }, [showpassword]);

  const handleUpdateEmail = (email) => {
    checkExist(email).then((res) => {
      if (res.status === 200) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 300; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }

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
              from_name: "kibiaccessories@kibi.vn",
              link: `https://localhost:3000/myaccount/1/?id=${result}&email=${email}&prv=${enc}`,
            },
            "v3GcHX1OV7AjPKEdx"
          )
          .then(
            (res) => {
              if (res.status === 200) {
                setVerify(true);
                message.success("Please check your email and verify");
              }
            },
            (error) => {}
          );
      } else {
        message.error("Email already exists");
      }
    });
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
    setAvatar(info.file.originFileObj);
  };

  const uploadButton = (
    <div className={s.btnUpload}>
      <PlusOutlined />
      {/* <div className={s.text}>Change Image</div> */}
    </div>
  );
  const dispatch = useDispatch();
  return (
    <>
      {loading && <AppLoader />}
      <div className={s.all}>
        <Formik
          // validationSchema={loginSchema}
          initialValues={{
            name: user.currentUser ? user.currentUser?.name : "",
            username: user.currentUser ? user.currentUser?.username : "",
            dob: user.currentUser ? user.currentUser?.dob : "",
            gender: user.currentUser ? user.currentUser?.gender : "",
          }}
          onSubmit={async (values) => {
            // {imageUrl ? : }
            setLoading(true);
            if (avatar) {
              const fileName = new Date().getTime() + avatar.name;
              const storage = getStorage(app);
              const storageRef = ref(storage, fileName);
              const uploadTask = uploadBytesResumable(storageRef, avatar);
              uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {},
                async () => {
                  await getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      updateProfile(
                        dispatch,
                        user.currentUser?._id,
                        values.name,
                        values.dob,
                        values.gender,
                        downloadURL
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
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }
              );
            } else {
              updateProfile(
                dispatch,
                user.currentUser?._id,
                values.name,
                values.dob,
                values.gender
              )
                .then((res) => {
                  if (res) {
                    const obj = {
                      user: res,
                      accessToken: token,
                    };
                    message.success("Update success");
                    dispatch(updateSuccess(obj));
                  }
                })
                .finally(() => {
                  setLoading(false);
                });
            }
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
                      <Col span={24} xl={12} lg={24} sm={24}>
                        <p className={s.text_info}>Personal Information</p>
                        <Row className={s.avatar_name}>
                          <Col
                            span={24}
                            lg={12}
                            xl={8}
                            sm={12}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {avatar ? (
                              <div>
                                <img
                                  src={URL.createObjectURL(avatar)}
                                  alt="avatar"
                                />
                              </div>
                            ) : (
                              <div>
                                <img
                                  src={
                                    user.currentUser?.avatar || userPlaceholder
                                  }
                                  alt=""
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
                          <Col span={24} xl={16} lg={12} sm={12}>
                            <FormAnt.Item
                              validateStatus={
                                touched?.name && errors?.name
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
                                touched?.username && errors?.username
                                  ? "error"
                                  : "success"
                              }
                              help={
                                Boolean(
                                  touched?.username && errors?.username
                                ) && errors?.username
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
                        <div className={s.dob_gender}>
                          <FormAnt.Item
                            validateStatus={
                              touched?.dob && errors?.dob ? "error" : "success"
                            }
                            help={
                              Boolean(touched?.dob && errors?.dob) &&
                              errors?.dob
                            }
                            initialValue={moment(
                              user.currentUser?.dob,
                              dateFormat
                            )}
                          >
                            <Field name="dob">
                              {({ field }) => (
                                <DatePicker
                                  format={dateFormat}
                                  onChange={(value, dateString) =>
                                    setFieldValue("dob", dateString)
                                  }
                                  defaultValue={
                                    user.currentUser?.dob &&
                                    moment(user.currentUser?.dob, dateFormat)
                                  }
                                />
                              )}
                            </Field>
                          </FormAnt.Item>
                          <Field name="gender">
                            {({ field }) => (
                              <Select
                                placeholder="select your gender"
                                defaultValue={user.currentUser?.gender}
                                onChange={(value) =>
                                  setFieldValue("gender", value)
                                }
                              >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                              </Select>
                            )}
                          </Field>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className={s.button_saveinfo_tablet}
                          >
                            Submit
                          </Button>
                        </div>
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
                      <Col span={24} lg={12} sm={24}>
                        <div className={s.full_content_right}>
                          <p className={s.text_info}>Phone and Email</p>
                          <div className={s.phone}>
                            <div className={s.title}>
                              <Phone size={24} /> Phone
                              {user.currentUser?.phone !==
                                `(${user.currentUser?.phone})`}
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
                              <EnvelopeSimple size={24} /> Email (
                              {user.currentUser?.email})
                            </div>
                            <div
                              className={s.button_update}
                              onClick={() => {
                                if (user.currentUser.isSocial !== true) {
                                  setUpdate(1);
                                  showModal();
                                }
                              }}
                              style={{
                                color:
                                  user.currentUser?.isSocial === true && "#999",
                                cursor:
                                  user.currentUser?.isSocial === true &&
                                  "not-allowed",
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
                                if (user.currentUser.isSocial !== true) {
                                  setUpdate(2);
                                  showModal();
                                }
                              }}
                              style={{
                                color:
                                  user.currentUser?.isSocial === true && "#999",
                                cursor:
                                  user.currentUser?.isSocial === true &&
                                  "not-allowed",
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
          {update === 1 && (
            <UpdateEmail
              update={handleUpdateEmail}
              verify={verify}
              setVerify={setVerify}
            />
          )}
          {update === 2 && <UpdatePassword user={user} dispatch={dispatch} />}
        </Modal>
      </div>
    </>
  );
};

export default MyAccount;
