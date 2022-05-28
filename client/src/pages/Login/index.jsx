import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import styles from "./styles.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const token =
    typeof Cookies.get("token") !== "undefined" ? Cookies.get("token") : "";
  const [active, setActive] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      console.log("first");
      navigate("/");
    }
  }, [token, navigate]);

  const handleClickSU = () => {
    setActive(true);
  };

  const handleClickSI = () => {
    setActive(false);
  };

  const handleLogin = () => {
    login(dispatch, { username, password });
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
          <form id="formRegister" method="post" enctype="multipart/form-data">
            <h1>Create Account</h1>
            <div className={styles.social_container}>
              <a href="#" className={styles.social}>
                <box-icon type="logo" name="facebook"></box-icon>
              </a>
              <a href="#" className={styles.social}>
                <box-icon name="google" type="logo"></box-icon>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="myName" placeholder="Name" />
            <input type="email" name="myEmail" placeholder="Email" />
            <input type="password" name="myPassword" placeholder="Password" />

            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className={`${styles.form_container} ${styles.sign_in_container}`}>
          <form id="formLogin" action="#">
            <h1>Sign in</h1>
            <div className={styles.social_container}>
              <a href="#" className={styles.social}>
                <box-icon type="logo" name="facebook"></box-icon>
              </a>
              <a href="#" className={styles.social}>
                <box-icon name="google" type="logo"></box-icon>
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="text"
              placeholder="Email"
              id="emailLogin"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              id="passwordLogin"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forgot your password?</a>
            <button type="submit" onClick={handleLogin}>
              Sign In
            </button>
          </form>
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
