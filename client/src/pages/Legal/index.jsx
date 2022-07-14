import React from "react";
import s from "./styles.module.scss";
import { Collapse } from "antd";
const { Panel } = Collapse;
const Legal = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className={s.container}>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel
          header="IMPORTANT: READ THE INFORMATION BELOW TERMS AND CONDITIONS OF USE AND ACCESS OUR RELATIONSHIP CONTENT"
          key="1"
        >
          <p>
            By accessing this content you agree that all the information on this
            site is not intended to be the final word on any topic, or
            conclusively fact. You are not to rely on any specific facts,
            numbers, prices, dimensions, or otherwise as they are subject to
            change or clarification. Information is provided is true according
            to the individual author’s best knowledge. In the event that any
            information is false or misleading, you are agree not to hold the
            ABLOGTOWATCH.COM, its owners, authors, or contributors liable for
            any types of damages whatsoever.
          </p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  );
};
export default Legal;
