import { Button, Form as FormAnt, Input, Select } from "antd";
import { Field, Formik, Form } from "formik";
import { MapPinLine } from "phosphor-react";
import { useEffect, useState } from "react";
import { getDistrict, getProvince, getWard } from "../../../api/Shipping";
import AppLoader from "../../../components/AppLoader";
import s from "./styles.module.scss";
import { AddressSchema } from "./validation";
const { Option } = Select;
const EditAddress = (props) => {
  const data = props.address;
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [provinceId, setProvinceId] = useState(parseInt(data.city));
  const [districtId, setDistrictId] = useState(parseInt(data.district));
  const [wardId, setWardId] = useState(data.ward.toString());
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    getProvince()
      .then((res) => {
        if (res) {
          setProvince(res.data.data);
          setProvinceId(parseInt(data.city));
        }
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [data]);

  useEffect(() => {
    getDistrict(provinceId)
      .then((res) => {
        if (res) {
          setDistrict(res.data.data);
          setDistrictId(parseInt(data.district));
          // setDistrictId(res.data.data[0].DistrictID);
        }
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [provinceId, data]);

  useEffect(() => {
    getWard(districtId)
      .then((res) => {
        if (res) {
          setWard(res.data.data);
          setWardId(data.ward.toString());
          // setWardId(res.data.data[0].WardCode);
        }
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [districtId, data, provinceId]);

  return (
    <>
      {isloading === true && <AppLoader />}
      <div className={s.container}>
        <div className={s.form}>
          <p className={s.title}>Your address</p>

          <Formik
            validationSchema={AddressSchema}
            initialValues={{
              address: data.address || "",
            }}
            onSubmit={async (values) => {
              props.handle(
                props.addressId,
                data._id,
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
                        getDistrict(provinceId)
                          .then((res) => {
                            if (res) {
                              setDistrict(res.data.data);
                              setDistrictId(res.data.data[0].DistrictID);
                            }
                          })
                          .finally(() => {
                            setIsloading(false);
                          });
                        getWard(districtId)
                          .then((res) => {
                            if (res) {
                              setWard(res.data.data);
                              setWardId(res.data.data[0].WardCode);
                            }
                          })
                          .finally(() => {
                            setIsloading(false);
                          });
                      }}
                      value={provinceId}
                      defaultActiveFirstOption={true}
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      defaultValue={data.city}
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
                      style={{ width: 240 }}
                      onSelect={(value) => {
                        setDistrictId(value);
                        getWard(districtId).then((res) => {
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
                      defaultValue={data.district}
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
                      style={{ width: 240 }}
                      defaultActiveFirstOption={true}
                      filterOption={false}
                      value={wardId}
                      onSelect={(value) => {
                        setWardId(value);
                      }}
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      defaultValue={data.ward}
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
                      Hãy chắc chắn rằng bạn nhập đúng thông tin địa chỉ để
                      chúng tôi có thể giao hàng cho bạn bất cứ lúc nào
                    </small>
                  </FormAnt.Item>

                  <Button
                    type="submit"
                    htmlType="submit"
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
    </>
  );
};

export default EditAddress;
