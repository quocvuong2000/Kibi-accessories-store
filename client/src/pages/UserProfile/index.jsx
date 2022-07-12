import { Tabs } from "antd";
import {
  BookOpen,
  Eye,
  Heart,
  MapPin,
  Pen,
  Ticket,
  User,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWindowSize } from "../../customHook/useWindowSize";

import Address from "./Address";
import MyAccount from "./MyAccount";
import OrderManagement from "./OrderManagement";
import Rated from "./Rated";
import s from "./styles.module.scss";
import Viewed from "./Viewed";
import Voucher from "./Voucher";
import Wistlist from "./Wishlist";
const UserProfile = () => {
  const { TabPane } = Tabs;
  const { active } = useParams();
  const [width, height] = useWindowSize();
  const [isActive, setIsActive] = useState(active);
  useEffect(() => {
    setIsActive(active);
  }, [active]);
  return (
    <div className={s.container}>
      <p className={s.url}>
        Home / <span className={s.url_main}>My Account</span>
      </p>
      <Tabs
        tabPosition={width > 1024 ? "left" : "top"}
        defaultActiveKey={`${isActive}`}
        ac
      >
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
        <TabPane
          tab={
            <div className={s.tab}>
              <Ticket size={24} /> Voucher
            </div>
          }
          key="7"
        >
          <Voucher />
        </TabPane>
        {/* <TabPane
          tab={
            <div className={s.tab}>
              <ShoppingBagOpen size={24} /> Purchased Product
            </div>
          }
          key="8"
        >
          <OrderManagement />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default UserProfile;
