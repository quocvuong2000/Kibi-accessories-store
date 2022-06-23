import { Button, Form, Input } from "antd";
import s from "./styles.module.scss";

const UpdatePassword = () => {
  return (
    <div className={s.container}>
      <div className={s.form}>
        <p className={s.title}>Update your password</p>
        <Form className={s.form_password}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please field your old password",
              },
            ]}
          >
            <Input.Password
              placeholder="Field your old password"
              className={s.input_password}
            />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Please field your new password",
              },
            ]}
          >
            <Input.Password
              placeholder="Field your new password"
              className={s.input_password}
            />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Please field your new password",
              },
            ]}
          >
            <Input.Password
              placeholder="Confirm your password"
              className={s.input_password}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={s.update_password}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePassword;
