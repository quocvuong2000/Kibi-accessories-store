import React from "react";
import s from "./styles.module.scss";
import { User, MapPin, Eye, Heart } from "phosphor-react";
import { Tabs } from "antd";
import MyAccount from "./MyAccount";
const UserProfile = () => {
  const { TabPane } = Tabs;
  return (
    <div className={s.container}>
      <p className={s.url}>
        Home / <span className={s.url_main}>My Account</span>
      </p>
      <Tabs tabPosition="left">
        <TabPane
          tab={
            <div className={s.tab}>
              <User size={24} /> Information{" "}
            </div>
          }
          key="1"
        >
          <MyAccount />
        </TabPane>
        <TabPane
          tab={
            <div className={s.tab}>
              <MapPin size={24} /> Address{" "}
            </div>
          }
          key="2"
        >
          Content of Tab 2
        </TabPane>
        <TabPane
          tab={
            <div className={s.tab}>
              <Eye size={24} /> Viewed Products{" "}
            </div>
          }
          key="3"
        >
          Content of Tab 3
        </TabPane>
        <TabPane
          tab={
            <div className={s.tab}>
              <Heart size={24} /> Your Wishlist{" "}
            </div>
          }
          key="4"
        >
          Content of Tab 4
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserProfile;
