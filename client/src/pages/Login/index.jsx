import { Form as FormAnt, Input, message } from "antd";
import { Field, Form, Formik } from "formik";
import React from "react";
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
import { googleInfo, socialSignIn } from "../../api/User";
import { doSignUp } from "../Register/RegisterAPI";

const Login = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState(false);
  const [wrongCredentials, setWrongCredential] = React.useState(false);

  const dispatch = useDispatch();

  const responseFacebook = (res) => {
    if (res) {
      console.log(res);
      setWrongCredential(false);
      socialSignIn(res.email, res.name).then((value) => {
        console.log(res);
        message.success("Login success");
        const obj = {
          username: res.email,
          email: res.email,
          accessToken: value.data.accessToken,
        };
        dispatch(loginSuccess(obj));
        navigate("/");
      });
    }
  };
  const handleLoginGoogle = useGoogleLogin({
    onSuccess: (res) => {
      setWrongCredential(false);

      googleInfo(res.access_token).then((info) => {
        socialSignIn(info.data.email, info.data.name).then((res) => {
          message.success("Login success");
          const obj = {
            username: info.data.email,
            email: info.data.email,
            name: info.data.name,
            accessToken: res.data.accessToken,
          };
          dispatch(loginSuccess(obj));
          navigate("/");
        });
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
    <div className={styles.backgroundContainer}>
      <div
        className={`${styles.container} ${
          active === true ? styles.right_panel_active : ""
        }`}
        id={styles.container}
      >
        <div className={`${styles.form_container} ${styles.sign_up_container}`}>
          <Register />
        </div>
        <div className={`${styles.form_container} ${styles.sign_in_container}`}>
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
                  // console.log(res);
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
                          to="#"
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
                      Boolean(touched?.email && errors?.email)
                        ? "error"
                        : "success"
                    }
                    help={
                      Boolean(touched?.email && errors?.email) && errors?.email
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
                      Boolean(touched?.password && errors?.password)
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

                  <Link to="#">Forgot your password?</Link>
                  <button type="submit">Sign In</button>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className={styles.overlay_container}>
          <div className={styles.overlay}>
            <div className={`${styles.overlay_panel} ${styles.overlay_left}`}>
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
            <div className={`${styles.overlay_panel} ${styles.overlay_right}`}>
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
  );
};

export default Login;
