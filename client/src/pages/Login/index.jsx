import { Form as FormAnt, Input, message, Modal } from "antd";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import styles from "./styles.module.scss";
import { loginSchema } from "./validation";
import classes from "./styles.module.scss";
import Register from "../Register";
import { loginSuccess } from "../../redux/userRedux";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { googleInfo, socialSignIn, updateForgotPassword } from "../../api/User";
import ForgotPassword from "./ForgotPassword";
import { useLocation, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import CryptoJS from "crypto-js";
import "boxicons";
import VerifyingPage from "../VerifyingPage";

const Login = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [wrongCredentials, setWrongCredential] = React.useState(false);
  const [, setSearchParams] = useSearchParams();
  const [verify, setVerify] = React.useState(false);
  const [showVerifyPage, setShowVerifyPage] = React.useState(false);
  const search = useLocation().search;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query = new URLSearchParams(search);

  const email = new URLSearchParams(search).get("email");
  const prv = new URLSearchParams(search).get("prv");
  const ps = new URLSearchParams(search).get("ps");
  useEffect(() => {
    document.title = "KIBI | Login ";
  }, []);
  useEffect(() => {
    if (prv !== null && prv !== undefined) {
      var tempprv = prv.replaceAll(" ", "+");
      var hashedPassword = CryptoJS.AES.decrypt(
        tempprv,
        `${process.env.REACT_APP_PRIVATE_KEY}`
      );
      var OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    } else {
      OriginalPassword = "";
    }

    if (query.has("email") && OriginalPassword === email && query.has("ps")) {
      updateForgotPassword(email, ps).then((res) => {
        if (res.status === 200) {
          emailjs
            .send(
              "service_3fco6q6",
              "template_vv6fnlq",
              {
                to_name: email,
                from_name: "bin01012000@gmail.com",
                password: `${ps}`,
              },
              "v3GcHX1OV7AjPKEdx"
            )
            .then(
              (res) => {
                if (res.status === 200) {
                  message.success("New password sent to your email");
                }
              },
              (error) => {}
            );
        }
      });
    }
    setSearchParams("");
  }, [email, prv, ps, query, setSearchParams]);

  const dispatch = useDispatch();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const responseFacebook = (res) => {
    if (res) {
      setWrongCredential(false);
      socialSignIn(res.email, res.name, res.picture.data.url).then((value) => {
        message.success("Login success");

        dispatch(loginSuccess(value.data.info));
        navigate("/");
      });
    }
  };
  const handleLoginGoogle = useGoogleLogin({
    onSuccess: (res) => {
      setWrongCredential(false);

      googleInfo(res.access_token).then((info) => {
        socialSignIn(info.data.email, info.data.name, info.data.picture).then(
          (res) => {
            message.success("Login success");
            dispatch(loginSuccess(res.data.info));
            navigate("/");
          }
        );
      });
    },
    onError: (res) => console.log(res),
  });

  const handleClickSU = () => {
    setActive(true);
  };

  const handleClickSI = () => {
    setActive(false);
  };

  return (
    <>
      {showVerifyPage === true ? (
        <VerifyingPage setShowVerifyPage={setShowVerifyPage} />
      ) : (
        <div className={styles.backgroundContainer}>
          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            className={styles.form_forgot}
          >
            <ForgotPassword verify={verify} setVerify={setVerify} />
          </Modal>
          <div
            className={`${styles.container} ${
              active === true ? styles.right_panel_active : ""
            }`}
            id={styles.container}
          >
            <div
              className={`${styles.form_container} ${styles.sign_up_container}`}
            >
              <Register setShowVerifyPage={setShowVerifyPage} />
            </div>
            <div
              className={`${styles.form_container} ${styles.sign_in_container}`}
            >
              <Formik
                validationSchema={loginSchema}
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={async (values) => {
                  login(dispatch, values)
                    .then((res) => {
                      setWrongCredential(false);
                      message.success("Login success");
                      dispatch(loginSuccess(res));
                      navigate("/");
                    })
                    .catch(() => {
                      setWrongCredential(true);
                    });
                }}
              >
                {({ errors, touched }) => {
                  return (
                    <Form>
                      <h1>Sign in</h1>
                      <div className={styles.social_container}>
                        <FacebookLogin
                          appId="753923969369724"
                          fields="name,email,picture"
                          callback={responseFacebook}
                          render={(renderProps) => (
                            <Link
                              to={"#"}
                              className={styles.social}
                              onClick={renderProps.onClick}
                            >
                              <box-icon type="logo" name="facebook"></box-icon>
                            </Link>
                          )}
                        />

                        <Link to="#" className={styles.social}>
                          <box-icon
                            name="google"
                            type="logo"
                            onClick={() => handleLoginGoogle()}
                          ></box-icon>
                        </Link>
                      </div>
                      <span>or use your account</span>
                      {wrongCredentials && (
                        <span style={{ color: "red" }}>
                          The email or password is incorrect
                        </span>
                      )}
                      <FormAnt.Item
                        validateStatus={
                          touched?.email && errors?.email ? "error" : "success"
                        }
                        help={
                          Boolean(touched?.email && errors?.email) &&
                          errors?.email
                        }
                      >
                        <Field name="email">
                          {({ field }) => (
                            <Input
                              {...field}
                              className={classes.inputLogin}
                              placeholder="Email"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>
                      <FormAnt.Item
                        validateStatus={
                          touched?.password && errors?.password
                            ? "error"
                            : "success"
                        }
                        help={
                          Boolean(touched?.password && errors?.password) &&
                          errors?.password
                        }
                      >
                        <Field name="password">
                          {({ field }) => (
                            <Input.Password
                              {...field}
                              className={classes.inputLogin}
                              placeholder="Password"
                            />
                          )}
                        </Field>
                      </FormAnt.Item>

                      <Link
                        to="#"
                        onClick={() => {
                          setIsModalVisible(true);
                        }}
                      >
                        Forgot your password?
                      </Link>
                      <button type="submit">Sign In</button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <div className={styles.overlay_container}>
              <div className={styles.overlay}>
                <div
                  className={`${styles.overlay_panel} ${styles.overlay_left}`}
                >
                  <h1>Welcome Back</h1>
                  <p>KIBI welcomes you back anytime, anywhere</p>
                  <button
                    className={styles.ghost}
                    id="signIn"
                    onClick={handleClickSI}
                  >
                    Sign In
                  </button>
                </div>
                <div
                  className={`${styles.overlay_panel} ${styles.overlay_right}`}
                >
                  <h1>Welcome to KIBI</h1>
                  <p>Let us revamp your beauty</p>
                  <button
                    className={styles.ghost}
                    id="signUp"
                    onClick={handleClickSU}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
