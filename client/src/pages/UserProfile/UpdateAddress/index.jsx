import { Button, Form as FormAnt, Input, Select } from "antd";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";
import { MapPinLine, User, Phone } from "phosphor-react";
import { useSelector } from "react-redux";
import { createAddress } from "../../../api/Address";
import { CreateAddressSchema } from "./validation";
import { getDistrict, getProvince, getWard } from "../../../api/Shipping";
const { Option } = Select;
const UpdateAddress = (props) => {
  const user = useSelector((state) => state.user);
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
    <div className={s.container}>
      <div className={s.form}>
        <p className={s.title}>Your address</p>

        <Formik
          validationSchema={CreateAddressSchema}
          initialValues={{
            address: "",
            recipientName: "",
            recipientPhone: "",
          }}
          onSubmit={async (values) => {
            console.log(values);
            props.handle(
              user.currentUser.username,
              values.recipientName,
              values.recipientPhone,
              values.address,
              wardId,
              districtId,
              provinceId
            );
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form className={s.form_phone}>
                <div className={s.box_form}>
                  <Select
                    placeholder="Please choose your province"
                    style={{ width: 240 }}
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
                    style={{ width: 240 }}
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
                    style={{ width: 240 }}
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
                </div>
                <FormAnt.Item
                  validateStatus={
                    Boolean(touched?.recipientName && errors?.recipientName)
                      ? "error"
                      : "success"
                  }
                  help={
                    Boolean(touched?.recipientName && errors?.recipientName) &&
                    errors?.recipientName
                  }
                >
                  <Field name="recipientName">
                    {({ field }) => (
                      <Input
                        {...field}
                        className={s.input_phone}
                        placeholder="Field your recipent's name"
                        name="recipientName"
                        prefix={
                          <User
                            size={20}
                            weight="thin"
                            className={s.icon_phone}
                          />
                        }
                      />
                    )}
                  </Field>
                </FormAnt.Item>

                <FormAnt.Item
                  validateStatus={
                    Boolean(touched?.recipientPhone && errors?.recipientPhone)
                      ? "error"
                      : "success"
                  }
                  help={
                    Boolean(
                      touched?.recipientPhone && errors?.recipientPhone
                    ) && errors?.recipientPhone
                  }
                >
                  <Field name="recipientPhone">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Field your recipent's phone"
                        className={s.input_phone}
                        name="recipientPhone"
                        prefix={
                          <Phone
                            size={20}
                            weight="thin"
                            className={s.icon_phone}
                          />
                        }
                      />
                    )}
                  </Field>
                </FormAnt.Item>
                <FormAnt.Item
                  validateStatus={
                    Boolean(touched?.address && errors?.address)
                      ? "error"
                      : "success"
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
                        className={s.input_phone}
                        placeholder="Field your address"
                        name="address"
                        prefix={
                          <MapPinLine
                            size={20}
                            weight="thin"
                            className={s.icon_phone}
                          />
                        }
                      />
                    )}
                  </Field>
                </FormAnt.Item>
                <small className={s.small_text}>
                  Hãy chắc chắn rằng bạn nhập đúng thông tin địa chỉ để chúng
                  tôi có thể giao hàng cho bạn bất cứ lúc nào
                </small>

                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={isSubmitting}
                  className={s.update_phone}
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateAddress;
