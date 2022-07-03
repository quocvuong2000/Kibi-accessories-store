import { Steps } from "antd";
import "antd/dist/antd.css";
import { CreditCard, HandGrabbing, Truck } from "phosphor-react";
import { useState } from "react";
const { Step } = Steps;

const OrderManagement = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value) => {
    console.log("onChange:", current);
    setCurrent(value);
  };

  return (
    <div>
      <Steps current={current} onChange={onChange}>
        <Step status="finish" title="Login" icon={<CreditCard />} />
        <Step status="finish" title="Verification" icon={<Truck />} />
        <Step status="process" title="Pay" icon={<HandGrabbing />} />
      </Steps>
    </div>
  );
};

export default OrderManagement;
