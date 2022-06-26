import React from "react";
import { Empty, Tabs } from "antd";
import "antd/dist/antd.min.css";
import styles from "./styles.module.scss";
import img from "../../../assets/detail/size.png";
import parse from "html-react-parser";
const { TabPane } = Tabs;

const AllInfo = (props) => {
  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Detail" key="1">
          <hr className={styles.line} />

          <div className={styles.info}>
            {props.data.product.description.detail ? (
              parse(`${props.data.product.description.detail}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
        <TabPane tab="Warranty" key="2">
          <hr className={styles.line} />
          <div className={styles.info}>
            {props.data.product.description.warrantyDetail ? (
              parse(`${props.data.product.description.warrantyDetail}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
        <TabPane tab="Custom Engrave" key="3">
          <hr className={styles.line} />
          <div className={styles.info}>
            {props.data.product.description.warrantyDetail ? (
              parse(`${props.data.product.description.warrantyDetail}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
        <TabPane tab="How to Adjust" key="4">
          <hr className={styles.line} />
          <div className={styles.info}>
            {props.data.product.description.howToAdjust ? (
              parse(`${props.data.product.description.howToAdjust}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
        <TabPane tab="How to Care" key="5">
          <hr className={styles.line} />
          <div className={styles.info}>
            {props.data.product.description.howToCare ? (
              parse(`${props.data.product.description.howToCare}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
        <TabPane tab="Gallery" key="6">
          <hr className={styles.line} />
          <div className={styles.info}>
            {props.data.product.description.warrantyDetail ? (
              parse(`${props.data.product.description.warrantyDetail}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AllInfo;
