import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./styles.module.scss";
import { Form as FormAnt, Input } from "antd";
import { Field, Form, Formik } from "formik";
import { registerSchema } from "./validation";
import { doSignUp } from "./RegisterAPI";
const Register = () => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  return (
    <Formik
      validationSchema={registerSchema}
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        doSignUp(values)
          .then(() => {
            setSuccess(true);
            setFailure(false);
          })
          .catch(() => {
            setSuccess(false);
            setFailure(true);
          });
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form>
            <h1>Create Account</h1>
            <div className={classes.social_container}>
              <Link to="#" className={classes.social}>
                <box-icon type="logo" name="facebook"></box-icon>
              </Link>
              <Link to="#" className={classes.social}>
                <box-icon name="google" type="logo"></box-icon>
              </Link>
            </div>
            <span>or use your email for registration</span>
            {success && (
              <span style={{ color: "green" }}>Sign up successful</span>
            )}
            {failure && <span style={{ color: "red" }}>Sign up failure</span>}
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
                    className={classes.inputLogin}
                    placeholder="Username"
                  />
                )}
              </Field>
            </FormAnt.Item>
            <FormAnt.Item
              validateStatus={
                Boolean(touched?.email && errors?.email) ? "error" : "success"
              }
              help={Boolean(touched?.email && errors?.email) && errors?.email}
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
            <button type="submit">Sign Up</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Register;
