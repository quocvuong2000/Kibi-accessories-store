import { Button, Form as FormAnt, Input, message } from "antd";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import { Phone } from "phosphor-react";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useSelector } from "react-redux";
import { updatePhone } from "../../../api/User";
import { auth } from "../../../firebase/firebase";
import s from "./styles.module.scss";
import { otpSchema, phoneSchema } from "./validation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import startsWith from "lodash.startswith";
const UpdatePhone = (props) => {
  const [otp, setOtp] = useState(false);
  const [numotp, setNumOtp] = useState(0);
  const user = useSelector((state) => state.user);
  const [phone, setPhone] = useState(0);
  const [showTime, setShowTime] = useState(true);
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(30);
  useEffect(() => {
    start === true &&
      seconds > 0 &&
      setTimeout(() => setSeconds(seconds - 1), 1000);

    if (seconds === 0) {
      setShowTime(false);
    }
  }, [seconds, start]);
  const handleChangeOtp = (otp) => {
    setNumOtp(otp);
  };
  const countryCode = "+84";
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const handleSendOtp = (phoneIn) => {
    if (phoneIn.length >= 12) {
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      setOtp(true);
      setStart(true);
      message.success("Please check your sms");
      signInWithPhoneNumber(auth, phoneIn, appVerifier)
        .then((confimationResult) => {
          console.log("confimationResult:", confimationResult);
          window.confimationResult = confimationResult;
        })
        .catch((error) => {
          console.log(error);
        });
      setSeconds(30);
      //console.log(window.confimationResult);
    }
  };
  const verifyOtp = () => {
    if (numotp.length === 6) {
      let confimationResult = window.confimationResult;
      console.log("confimationResult:", confimationResult);
      confimationResult
        .confirm(numotp)
        .then((rs) => {
          console.log("rs:", rs);
          setOtp(false);
          if (rs) {
            updatePhone(user.currentUser._id, phone)
              .then((res) => {
                if (res) {
                  message.success("Update success");
                }
              })
              .finally((res) => {});
          } else {
            message.error("Wrong OTP");
          }
        })
        .catch((error) => {
          message.error("Wrong OTP");
        });
    } else {
      message.error("Wrong format OTP");
    }
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        <div id="recaptcha-container"></div>
        <p className={s.title}>Your phone</p>
        {/* <Formik
          validationSchema={phoneSchema}
          initialValues={{
            phone: "",
            otp: "",
          }}
          onSubmit={handleSendOtp}
        > */}

        {otp === false ? (
          <Formik
            validationSchema={phoneSchema}
            initialValues={{
              phone: "",
            }}
            onSubmit={(values) => {
              //console.log("values.phone:", values.phone);
              // setPhone(values.phone);
              //console.log(phone);
              console.log("phone:", phone);
              handleSendOtp(phone);
              setOtp(true);
            }}
          >
            {({ setFieldValue, errors, touched }) => {
              return (
                <Form className={s.form_phone}>
                  <FormAnt.Item
                    validateStatus={
                      Boolean(touched?.phone && errors?.phone)
                        ? "error"
                        : "success"
                    }
                    help={
                      Boolean(touched?.phone && errors?.phone) && errors?.phone
                    }
                  >
                    <Field name="phone">
                      {({ field }) => (
                        <PhoneInput
                          {...field}
                          country={"vn"}
                          placeholder="Field your phone number"
                          className={s.input_phone}
                          defaultCountry={"vn"}
                          onChange={(value) => {
                            console.log("value:", value);
                            setFieldValue("phone", value);
                            setPhone("+" + value);
                          }}
                          value={phone}
                        />
                      )}
                    </Field>
                  </FormAnt.Item>
                  <small className={s.small_text}>
                    Mã xác thực (OTP) sẽ được gửi đến số điện thoại này để xác
                    minh số điện thoại là của bạn
                  </small>

                  <Button
                    type="primary"
                    htmlType="submit"
                    className={s.update_phone}
                  >
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <Formik
            validationSchema={otpSchema}
            initialValues={{
              otp: "",
            }}
            onSubmit={handleSendOtp}
          >
            {({ errors, touched }) => {
              return (
                <Form className={s.form_phone}>
                  <FormAnt.Item
                    validateStatus={
                      Boolean(touched?.otp && errors?.otp) ? "error" : "success"
                    }
                    help={Boolean(touched?.otp && errors?.otp) && errors?.otp}
                  >
                    <Field name="otp">
                      {({ field }) => (
                        <OtpInput
                          {...field}
                          value={numotp}
                          onChange={handleChangeOtp}
                          numInputs={6}
                          className={s.input_otp}
                        />
                      )}
                    </Field>
                  </FormAnt.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={s.update_phone}
                    onClick={verifyOtp}
                  >
                    Submit
                  </Button>

                  <small className={s.small_text}>
                    Cannot receive your code ?{" "}
                    {showTime === true ? (
                      <span>{seconds}s</span>
                    ) : (
                      <span
                        onClick={() => {
                          handleSendOtp(phone);
                          setSeconds(30);
                          setShowTime(true);
                        }}
                        className={s.send_again}
                      >
                        Send again
                      </span>
                    )}
                  </small>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default UpdatePhone;
