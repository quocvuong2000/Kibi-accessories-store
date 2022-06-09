import React from "react";
import s from "./styles.module.scss";
import { Steps, Button, message } from "antd";
import { FirstForm } from "./FirstForm";
import StyledDemo from "./SecondForm";

const { Step } = Steps;

const steps = [
  {
    title: "Fill your profile",
    content: <FirstForm />,
  },
  {
    title: "Choose your avatar",
    content: <StyledDemo />,
  },
  {
    title: "Finished",
    content: "Last-content",
  },
];
export const CompleteProfile = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <div className={s.container}>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};
