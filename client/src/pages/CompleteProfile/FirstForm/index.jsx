// import React from "react";
// import { Form, Input, Button, DatePicker, InputNumber, Select } from "antd";
// export const FirstForm = () => {
//   const { Option } = Select;
//   const onFinish = (values) => {
//     //console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     //console.log("Failed:", errorInfo);
//   };
//   const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//       <Select style={{ width: 70 }}>
//         <Option value="84">+84</Option>
//       </Select>
//     </Form.Item>
//   );
//   return (
//     <Form
//       name="basic"
//       labelCol={{
//         span: 8,
//       }}
//       wrapperCol={{
//         span: 16,
//       }}
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <Form.Item
//         label="Full name"
//         name="name"
//         rules={[
//           {
//             required: true,
//             message: "Please field your name",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item label="Age" name="age">
//         <InputNumber />
//       </Form.Item>
//       <Form.Item label="Day of birth" name="dob">
//         <DatePicker />
//       </Form.Item>

//       <Form.Item
//         name="phone"
//         label="Phone Number"
//         rules={[{ required: true, message: "Please input your phone number!" }]}
//       >
//         <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
//       </Form.Item>
//       <Form.Item
//         name="gender"
//         label="Gender"
//         rules={[{ required: true, message: "Please select gender!" }]}
//       >
//         <Select placeholder="select your gender">
//           <Option value="male">Male</Option>
//           <Option value="female">Female</Option>
//           <Option value="other">Other</Option>
//         </Select>
//       </Form.Item>
//       <Form.Item label="Address">
//         <Form.Item
//           name={["address", "street"]}
//           noStyle
//           rules={[{ required: true, message: "Street is required" }]}
//         >
//           <Input style={{ width: "50%" }} placeholder="Input street" />
//         </Form.Item>
//       </Form.Item>
//       <Form.Item
//         wrapperCol={{
//           offset: 8,
//           span: 16,
//         }}
//       >
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };
