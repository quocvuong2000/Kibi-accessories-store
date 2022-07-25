import { Empty, Tabs } from "antd";
import "antd/dist/antd.min.css";
import parse from "html-react-parser";
import React from "react";
import { useIntl } from "react-intl";
import styles from "./styles.module.scss";
const { TabPane } = Tabs;

const AllInfo = (props) => {
  const intl = useIntl();
  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1" centered tabPosition="top">
        <TabPane
          tab={intl.formatMessage({
            id: "detail.detail",
            defaultMessage: "Detail",
          })}
          key="1"
        >
          <hr className={styles.line} />

          <div className={styles.info}>
            {props.data.product.description.detail ? (
              parse(`${props.data.product.description.detail}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
        <TabPane
          tab={intl.formatMessage({
            id: "detail.warranty",
            defaultMessage: "Warranty",
          })}
          key="2"
        >
          <hr className={styles.line} />
          <div className={styles.info}>
            {props.data.product.description.warrantyDetail ? (
              parse(`${props.data.product.description.warrantyDetail}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
        <TabPane
          tab={intl.formatMessage({
            id: "detail.customengrave",
            defaultMessage: "Custom Engrave",
          })}
          key="3"
        >
          <hr className={styles.line} />
          <div className={styles.info}>
            {props.data.product.description.warrantyDetail ? (
              parse(`${props.data.product.description.warrantyDetail}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
        <TabPane
          tab={intl.formatMessage({
            id: "detail.howtoadjust",
            defaultMessage: "How to Adjust",
          })}
          key="4"
        >
          <hr className={styles.line} />
          <div className={styles.info}>
            {props.data.product.description.howToAdjust ? (
              parse(`${props.data.product.description.howToAdjust}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
        <TabPane
          tab={intl.formatMessage({
            id: "detail.howtocare",
            defaultMessage: "How to Care",
          })}
          key="5"
        >
          <hr className={styles.line} />
          <div className={styles.info}>
            {props.data.product.description.howToCare ? (
              parse(`${props.data.product.description.howToCare}`)
            ) : (
              <Empty />
            )}
          </div>
        </TabPane>
        <TabPane
          tab={intl.formatMessage({
            id: "detail.gallery",
            defaultMessage: "Gallery",
          })}
          key="6"
        >
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
