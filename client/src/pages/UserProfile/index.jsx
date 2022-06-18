import React from "react";
import s from "./styles.module.scss";
import { User, MapPin, Eye, Heart, BookOpen } from "phosphor-react";
import { Tabs } from "antd";
import MyAccount from "./MyAccount";
import Address from "./Address";
import { useParams } from "react-router-dom";
import Wistlist from "./Wishlist";
const UserProfile = () => {
  const { TabPane } = Tabs;
  const { active } = useParams();

  return (
    <div className={s.container}>
      <p className={s.url}>
        Home / <span className={s.url_main}>My Account</span>
      </p>
      <Tabs tabPosition="left" defaultActiveKey={`${active}`}>
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
          <Address />
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
          <Wistlist />
        </TabPane>

        <TabPane
          tab={
            <div className={s.tab}>
              <BookOpen size={24} /> Oder Management{" "}
            </div>
          }
          key="5"
        >
          Content of Tab 4
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserProfile;
