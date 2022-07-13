import emailjs from "@emailjs/browser";
import { Button, Form as FormAnt, Input, message } from "antd";
import CryptoJS from "crypto-js";
import { Field, Form, Formik } from "formik";
import { Envelope } from "phosphor-react";
import Verify from "../../../components/Verify";
import s from "./styles.module.scss";
import { emailSchema } from "./validation";

const ForgotPassword = (props) => {
  const sendEmail = (email) => {
    var enc = CryptoJS.AES.encrypt(
      email,
      `${process.env.REACT_APP_PRIVATE_KEY}`
    ).toString();
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    emailjs
      .send(
        "service_3fco6q6",
        "template_t9ihe46",
        {
          to_name: email,
          from_name: "bin01012000@gmail.com",
          link: ` https://localhost:3000/login?email=${email}&prv=${enc}&ps=${result}`,
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

  return (
    <div className={s.container}>
      {props.verify === false ? (
        <Formik
          validationSchema={emailSchema}
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            props.setVerify(true);
            sendEmail(values.email);
            setTimeout(() => props.setVerify(false), 6000);
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form className={s.box_forgot}>
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
                        placeholder="Field your email"
                        prefix={<Envelope size={20} weight="thin" />}
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
        <Verify />
      )}
    </div>
  );
};

export default ForgotPassword;
