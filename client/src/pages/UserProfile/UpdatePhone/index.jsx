import { Button, Form as FormAnt, message } from "antd";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { updatePhone } from "../../../api/User";
import { auth } from "../../../firebase/firebase";
import { updatePhoneRedux } from "../../../redux/userRedux";
import s from "./styles.module.scss";
import { otpSchema, phoneSchema } from "./validation";
import { ArrowLeft } from "phosphor-react";

const UpdatePhone = (props) => {
  const [otp, setOtp] = useState(false);
  const [numotp, setNumOtp] = useState(0);
  const user = useSelector((state) => state.user);
  const [phone, setPhone] = useState(0);
  const [showTime, setShowTime] = useState(true);
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const dispatch = useDispatch();
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
          window.confimationResult = confimationResult;
        })
        .catch((error) => {});
      setSeconds(30);
    }
  };
  const verifyOtp = () => {
    if (numotp.length === 6) {
      let confimationResult = window.confimationResult;
      confimationResult
        ?.confirm(numotp)
        .then((rs) => {
          setOtp(false);
          if (rs) {
            updatePhone(user.currentUser._id, phone)
              .then((res) => {
                dispatch(updatePhoneRedux(phone));
                if (res) {
                  window.location.reload();
                  message.success("Update success");
                }
              })
              .catch((error) => {
                console.log("error:", error);
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

        {otp === false ? (
          <Formik
            validationSchema={phoneSchema}
            initialValues={{
              phone: "",
            }}
            onSubmit={(values) => {
              handleSendOtp(phone);
              setOtp(true);
            }}
          >
            {({ setFieldValue, errors, touched }) => {
              return (
                <Form className={s.form_phone}>
                  <FormAnt.Item
                    validateStatus={
                      touched?.phone && errors?.phone ? "error" : "success"
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
                <>
                  <p>
                    <ArrowLeft
                      size={16}
                      weight="thin"
                      cursor={"pointer"}
                      onClick={() => setOtp(false)}
                    />
                  </p>
                  <Form className={s.form_phone}>
                    <FormAnt.Item
                      validateStatus={
                        touched?.otp && errors?.otp ? "error" : "success"
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
                    <FormAnt.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className={s.update_phone}
                        onClick={verifyOtp}
                      >
                        Submit
                      </Button>
                    </FormAnt.Item>

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
                </>
              );
            }}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default UpdatePhone;
