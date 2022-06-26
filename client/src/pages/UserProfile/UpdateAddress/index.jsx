import { Button, Form as FormAnt, Input } from "antd";
import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import s from "./styles.module.scss";
import { MapPinLine, User, Phone } from "phosphor-react";
import { useSelector } from "react-redux";
import { createAddress } from "../../../api/Address";
import { CreateAddressSchema } from "./validation";

const UpdateAddress = (props) => {
  const user = useSelector((state) => state.user);

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
              values.address
            );
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form className={s.form_phone}>
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
