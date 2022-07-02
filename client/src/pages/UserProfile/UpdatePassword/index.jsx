import { Button, Form as FormAnt, Input, message } from "antd";
import s from "./styles.module.scss";
import { Field, Form, Formik } from "formik";
import { PasswordSchema } from "./passwordvali";
import { updatePassword } from "../../../api/User";
import { updateProfile } from "../../../redux/apiCalls";
import { updateSuccess } from "../../../redux/userRedux";
const UpdatePassword = (props) => {
  const user = props.user;
  const dispatch = props.dispatch;
  return (
    <div className={s.container}>
      <div className={s.form}>
        <p className={s.title}>Update your password</p>
        <Formik
          initialValues={{
            password: "",
            confirmpassword: "",
          }}
          validationSchema={PasswordSchema}
          onSubmit={(values) => {
            updatePassword(
              user.currentUser._id,
              values.oldpassword,
              values.password
            ).then((res) => {
              console.log(res);
              if (res.status === 200) {
                const obj = {
                  user: res.data,
                };
                message.success("Update success");
                dispatch(updateSuccess(obj));
              } else if (res.status === 202) {
                message.error("Wrong old password");
              }
            });
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form className={s.form_password}>
                <FormAnt.Item
                  rules={[
                    {
                      required: true,
                      message: "Please field your old password",
                    },
                  ]}
                >
                  <Field name="oldpassword">
                    {({ field }) => (
                      <Input.Password
                        {...field}
                        placeholder="Field your old password"
                        className={s.input_password}
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
                        placeholder="Field your new password"
                        className={s.input_password}
                      />
                    )}
                  </Field>
                </FormAnt.Item>

                <FormAnt.Item
                  validateStatus={
                    Boolean(touched?.confirmpassword && errors?.confirmpassword)
                      ? "error"
                      : "success"
                  }
                  help={
                    Boolean(
                      touched?.confirmpassword && errors?.confirmpassword
                    ) && errors?.confirmpassword
                  }
                >
                  <Field name="confirmpassword">
                    {({ field }) => (
                      <Input.Password
                        {...field}
                        placeholder="Confirm your password"
                        className={s.input_password}
                      />
                    )}
                  </Field>
                </FormAnt.Item>

                <FormAnt.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={s.update_password}
                  >
                    Submit
                  </Button>
                </FormAnt.Item>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default UpdatePassword;
