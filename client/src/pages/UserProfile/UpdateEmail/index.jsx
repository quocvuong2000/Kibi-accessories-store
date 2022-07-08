import { Button, Form as FormAnt, Input } from "antd";
import { Field, Form, Formik } from "formik";
import { Envelope } from "phosphor-react";
import { useState } from "react";
import Verify from "../../../components/Verify";
import s from "./styles.module.scss";
import { emailSchema } from "./validation";
const UpdateEmail = (props) => {
  return (
    <div className={s.container}>
      {props.verify === false ? (
        <div className={s.form}>
          <p className={s.title}>Your email</p>
          <Formik
            validationSchema={emailSchema}
            initialValues={{
              email: "",
            }}
            onSubmit={(values) => {
              props.update(values.email);
            }}
          >
            {({ errors, touched }) => {
              return (
                <Form className={s.form_email}>
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
                          className={s.input_email}
                          prefix={
                            <Envelope
                              size={20}
                              weight="thin"
                              className={s.icon_phone}
                            />
                          }
                        />
                      )}
                    </Field>
                  </FormAnt.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    className={s.update_email}
                  >
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : (
        <Verify />
      )}
    </div>
  );
};

export default UpdateEmail;
