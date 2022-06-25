import { Button, Form, Form as FormAnt, Input } from "antd";
import { Field, Formik } from "formik";
import { MapPinLine } from "phosphor-react";
import s from "./styles.module.scss";
import { AddressSchema } from "./validation";
const EditAddress = (props) => {
  const data = props.address;
  return (
    <div className={s.container}>
      <div className={s.form}>
        <p className={s.title}>Your address</p>

        <Formik
          validationSchema={AddressSchema}
          initialValues={{
            address: data.address,
          }}
          onSubmit={async (values) => {
            console.log(values);
            props.handle(props.addressId, data._id, values);
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form className={s.form_phone}>
                <FormAnt.Item
                  initialValue={data.address}
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
                        allowClear={true}
                        placeholder="Field your address"
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
                  <small className={s.small_text}>
                    Hãy chắc chắn rằng bạn nhập đúng thông tin địa chỉ để chúng
                    tôi có thể giao hàng cho bạn bất cứ lúc nào
                  </small>
                </FormAnt.Item>

                <Form.Item>
                  <Button
                    type="submit"
                    htmlType="submit"
                    className={s.update_phone}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditAddress;
