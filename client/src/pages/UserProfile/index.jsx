import React from "react";
import s from "./styles.module.scss";
import {
  User,
  MapPin,
  Eye,
  Heart,
  BookOpen,
  CreditCard,
  HandGrabbing,
  Truck,
  Pen,
} from "phosphor-react";
import { Tabs } from "antd";
import MyAccount from "./MyAccount";
import Address from "./Address";
import { useParams } from "react-router-dom";
import Wistlist from "./Wishlist";
import Viewed from "./Viewed";
import Rated from "./Rated";
import OrderManagement from "./OrderManagement";
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
          <Viewed />
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
              <Pen size={24} /> Rated
            </div>
          }
          key="5"
        >
          <Rated />
        </TabPane>

        <TabPane
          tab={
            <div className={s.tab}>
              <BookOpen size={24} /> Oder Management{" "}
            </div>
          }
          key="6"
        >
          <OrderManagement />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserProfile;
