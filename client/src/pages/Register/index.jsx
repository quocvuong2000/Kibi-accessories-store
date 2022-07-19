import emailjs from "@emailjs/browser";
import { Form as FormAnt, Input, message, Select } from "antd";
import CryptoJS from "crypto-js";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getDistrict, getProvince, getWard } from "../../api/Shipping";
import { checkExist } from "../../api/User";
import { doSignUp } from "./RegisterAPI";
import classes from "./styles.module.scss";
import { registerSchema } from "./validation";
const { Option } = Select;
const Register = (props) => {
  const [, setSearchParams] = useSearchParams();
  const search = useLocation().search;
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [provinceId, setProvinceId] = useState(202);
  const [districtId, setDistrictId] = useState(3695);
  const [wardId, setWardId] = useState("90768");
  const query = new URLSearchParams(search);
  const id = new URLSearchParams(search).get("id");
  const email = new URLSearchParams(search).get("email");
  const prv = new URLSearchParams(search).get("prv");
  const name = new URLSearchParams(search).get("name");
  const password = new URLSearchParams(search).get("password");
  const cityid = new URLSearchParams(search).get("cityid");
  const districtid = new URLSearchParams(search).get("districtid");
  const wardid = new URLSearchParams(search).get("wardid");
  const address = new URLSearchParams(search).get("address");
  const phone = new URLSearchParams(search).get("phone");

  const handleRegister = (name, email, password, address, phone) => {
    checkExist(email).then((res) => {
      if (res.status === 200) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 300; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        var enc = CryptoJS.AES.encrypt(
          email,
          `${process.env.REACT_APP_PRIVATE_KEY}`
        ).toString();

        emailjs
          .send(
            "service_3fco6q6",
            "template_t9ihe46",
            {
              to_name: email,
              from_name: "kibiaccessories@gmail.com",
              link: `https://kibiaccessories.herokuapp.com/login?id=${result}&email=${email}&prv=${enc}&name=${
                name.includes(" ") ? name.replaceAll(" ", "+") : name
              }&cityid=${provinceId}&wardid=${wardId}&districtid=${districtId}&address=${
                address.includes(" ") ? address.replaceAll(" ", "+") : address
              }&phone=${phone}&password=${password}`,
            },
            "v3GcHX1OV7AjPKEdx"
          )
          .then(
            (res) => {
              if (res.status === 200) {
                message.success("Please check your email and verify");
              }
            },
            (error) => {}
          )
          .finally(() => {
            props.setShowVerifyPage(true);
          });
      } else if (res.status === 201) {
        message.error("Email already exists");
      }
    });
  };

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

    if (
      id?.length === 300 &&
      query.has("id") &&
      query.has("email") &&
      OriginalPassword === email
    ) {
      var values = {
        name: name,
        email: email,
        password: password,
        address: address,
        phone: phone,
        wards: wardid,
        city: cityid,
        district: districtid,
      };
      doSignUp(values)
        .then((res) => {
          if (res.status === 200) {
            message.success("Register Successful");
            setSuccess(true);
            setFailure(false);
          } else if (res.status === 201) {
            message.error("Email already exists");
          }
        })
        .catch((res) => {
          setSuccess(false);
          setFailure(true);
        });
    }

    setSearchParams("");
  }, []);

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
      }
    });
  }, []);

  useEffect(() => {
    getWard(districtId).then((res) => {
      if (res) {
        setWard(res.data.data);
      }
    });
  }, []);

  return (
    <>
      <Formik
        validationSchema={registerSchema}
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          handleRegister(
            values.name,
            values.email,
            values.password,
            values.address,
            values.phone
          );
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
                  touched?.email && errors?.email ? "error" : "success"
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
                  touched?.password && errors?.password ? "error" : "success"
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
              <FormAnt.Item
                validateStatus={
                  touched?.name && errors?.name ? "error" : "success"
                }
                help={Boolean(touched?.name && errors?.name) && errors?.name}
              >
                <Field name="name">
                  {({ field }) => (
                    <Input
                      {...field}
                      className={classes.inputLogin}
                      placeholder="Name"
                    />
                  )}
                </Field>
              </FormAnt.Item>
              <FormAnt.Item className={classes.box_form}>
                <Select
                  placeholder="Please choose your province"
                  onSelect={(value) => {
                    setProvinceId(value);
                    getDistrict(value)
                      .then((res) => {
                        if (res) {
                          setDistrict(res.data.data);
                          setDistrictId(res.data.data[0].DistrictID);
                          getWard(res.data.data[0].DistrictID).then((res) => {
                            if (res) {
                              setWard(res.data.data);
                              setWardId(res.data.data[0].WardCode);
                            }
                          });
                        }
                      })
                      .finally(() => {});
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
                  placeholder="Please choose your district"
                  onSelect={(value) => {
                    setDistrictId(value);
                    getWard(value).then((res) => {
                      if (res) {
                        setWard(res.data.data);
                        setWardId(res.data.data[0].WardCode);
                      }
                    });
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
                  placeholder="Please choose your ward"
                  defaultActiveFirstOption={true}
                  filterOption={false}
                  value={`${wardId}`}
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onSelect={(value) => {
                    setWardId(value);
                  }}
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
                  touched?.address && errors?.address ? "error" : "success"
                }
                help={
                  Boolean(touched?.address && errors?.address) &&
                  errors?.address
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
                  touched?.phone && errors?.phone ? "error" : "success"
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
    </>
  );
};

export default Register;
