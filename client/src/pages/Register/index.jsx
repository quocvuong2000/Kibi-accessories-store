import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./styles.module.scss";
import { Form as FormAnt, Input, Select } from "antd";
import { Field, Form, Formik } from "formik";
import { registerSchema } from "./validation";
import { doSignUp } from "./RegisterAPI";
import { getDistrict, getProvince, getWard } from "../../api/Shipping";
const { Option } = Select;
const Register = () => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [provinceId, setProvinceId] = useState(202);
  const [districtId, setDistrictId] = useState(3695);
  const [wardId, setWardId] = useState("90768");
  useEffect(() => {
    getProvince().then((res) => {
      if (res) {
        setProvince(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    getDistrict(provinceId).then((res) => {
      if (res) {
        setDistrict(res.data.data);
        setDistrictId(res.data.data[0].DistrictID);
      }
    });
  }, [provinceId]);

  useEffect(() => {
    getWard(districtId).then((res) => {
      if (res) {
        setWard(res.data.data);
        setWardId(res.data.data[0].WardCode);
      }
    });
  }, [districtId]);

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
            <FormAnt.Item className={classes.box_form}>
              <Select
                placeholder="Please choose your province"
                onSelect={(value) => {
                  setProvinceId(value);
                }}
                value={provinceId}
                defaultActiveFirstOption={true}
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {province?.map((item, index) => {
                  return index === 1 ? (
                    <Option
                      value={item.ProvinceID}
                      key={index}
                      selected="selected"
                    >
                      {item.ProvinceName}
                    </Option>
                  ) : (
                    <Option value={item.ProvinceID} key={index}>
                      {item.ProvinceName}
                    </Option>
                  );
                })}
              </Select>

              <Select
                placeholder="Please choose your province"
                onSelect={(value) => {
                  setDistrictId(value);
                }}
                value={districtId}
                defaultActiveFirstOption={true}
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {district?.map((item, index) => {
                  return (
                    <Option value={item.DistrictID} key={index}>
                      {item.DistrictName}
                    </Option>
                  );
                })}
              </Select>

              <Select
                placeholder="Please choose your province"
                defaultActiveFirstOption={true}
                filterOption={false}
                value={wardId}
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {ward?.map((item, index) => {
                  return (
                    <Option value={item.WardCode} key={index}>
                      {item.WardName}
                    </Option>
                  );
                })}
              </Select>
            </FormAnt.Item>
            <FormAnt.Item
              validateStatus={
                Boolean(touched?.address && errors?.address)
                  ? "error"
                  : "success"
              }
              help={
                Boolean(touched?.address && errors?.address) && errors?.address
              }
            >
              <Field name="address">
                {({ field }) => (
                  <Input
                    {...field}
                    className={classes.inputLogin}
                    placeholder="Address"
                  />
                )}
              </Field>
            </FormAnt.Item>
            <FormAnt.Item
              validateStatus={
                Boolean(touched?.phone && errors?.phone) ? "error" : "success"
              }
              help={Boolean(touched?.phone && errors?.phone) && errors?.phone}
            >
              <Field name="phone">
                {({ field }) => (
                  <Input
                    {...field}
                    className={classes.inputLogin}
                    placeholder="Phone"
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
