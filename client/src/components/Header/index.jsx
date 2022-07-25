import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import {
  AutoComplete,
  Button,
  Dropdown,
  Input,
  Menu,
  message,
  notification,
  Popover,
  Space,
} from "antd";
import "antd/dist/antd.min.css";
import Cookies from "js-cookie";
import {
  Globe,
  Handbag,
  Heart,
  LockKey,
  SignOut,
  Ticket,
  User,
  UserCircle,
} from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategory } from "../../api/Category";
import { getAllProductNoPage } from "../../api/Product";
import logo from "../../assets/header/image 5.svg";
import placeholderAvatar from "../../assets/user_avatar.jpg";
import useOnClickOutside from "../../customHook/useClickOutSide";
import formatName from "../../utils/formatName";
import { Cart } from "./Cart";
import NumItem from "./NumItemCard";
import classes from "./styles.module.scss";
import { LANGUAGES } from "../../utils/constant";
import { updateLanguage } from "../../redux/userRedux";
import { FormattedMessage } from "react-intl";
import { useWindowSize } from "../../customHook/useWindowSize";
import OneSignal from "react-onesignal";
const { Search } = Input;

const token =
  typeof Cookies.get("tokenClient") !== "undefined"
    ? Cookies.get("tokenClient")
    : "";

const Header = () => {
  let navigate2 = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [allProduct, setAllProduct] = useState([]);
  const [allProductTemp, setAllProductTemp] = useState([]);
  const [width] = useWindowSize();

  useEffect(() => {
    OneSignal.init({
      appId: "4c393bce-fb44-43de-9101-44465cc708d3",
    });
  }, []);

  const changeLanguage = (language) => {
    dispatch(updateLanguage(language));
  };

  const handleSignOut = () => {
    Cookies.remove("tokenClient");
    localStorage.removeItem("persist:root");
    navigate2("/login");
  };

  //-----------GET ALL SHOW PREVIEW SEARCH
  useEffect(() => {
    getAllProductNoPage().then((res) => {
      setAllProduct(res?.products);
      setAllProductTemp(res?.products);
    });
  }, []);

  const handleMenuClick = (e) => {
    setVisibleDropdown(false);
  };

  const content = (
    <Menu defaultChecked={2}>
      <Menu.Item
        style={{ borderRight: "none" }}
        onClick={() => changeLanguage(LANGUAGES.VI)}
        key={1}
      >
        VI
      </Menu.Item>
      <Menu.Item
        key={2}
        style={{ borderRight: "none" }}
        onClick={() => changeLanguage(LANGUAGES.EN)}
      >
        EN
      </Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key={1}
        onClick={() => {
          setVisibleDropdown(false);
          navigate2(`/myaccount/1`);
        }}
      >
        <div className={classes.box_profile}>
          <div className={classes.avatar_menu}>
            <img
              src={
                user.currentUser
                  ? user.currentUser.avatar
                    ? user.currentUser.avatar
                    : placeholderAvatar
                  : placeholderAvatar
              }
              alt=""
            />
          </div>
          <p className={classes.name_avatar}>
            {user.currentUser ? user.currentUser.name : ""}
          </p>
        </div>
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          setVisibleDropdown(false);
          navigate2(`/myaccount/1`);
        }}
      >
        <div className={classes.link_to_profile}>
          <div className={classes.icon}>
            <UserCircle size={24} className={classes.icon_box} />
          </div>
          <FormattedMessage id="common.yourprofile" />
        </div>
      </Menu.Item>
      <Menu.Item
        key={3}
        onClick={() => {
          setVisibleDropdown(false);
          navigate2(`/myaccount/4`);
        }}
      >
        <div className={classes.wish_list}>
          <div className={classes.icon}>
            <Heart size={24} className={classes.icon_box} />
          </div>
          <FormattedMessage id="common.wishlist" />
        </div>
      </Menu.Item>
      <Menu.Item
        key={4}
        onClick={() => {
          setVisibleDropdown(false);
          navigate2(`/myaccount/1?showpass=true`);
        }}
      >
        <div className={classes.wish_list}>
          <div className={classes.icon}>
            <LockKey size={24} className={classes.icon_box} />
          </div>
          <FormattedMessage id="common.changepassword" />
        </div>
      </Menu.Item>
      <Menu.Item
        key={5}
        onClick={() => {
          setVisibleDropdown(false);
          navigate2(`/myaccount/7`);
        }}
      >
        <div className={classes.wish_list}>
          <div className={classes.icon}>
            <Ticket size={24} className={classes.icon_box} />
          </div>
          <FormattedMessage id="common.yourvoucher" />
        </div>
      </Menu.Item>
      {/* <Menu.Item key={6} disabled style={{ cursor: "pointer", color: "#000" }}>
        <Popover
          placement={width >= 768 ? "left" : "right"}
          content={content}
          className={classes.sign_out}
          arrow={false}
          trigger="click"
          overlayClassName={classes.changeLanguage_global}
        >
          <div className={classes.icon}>
            <Globe size={24} className={classes.icon_box} />
          </div>
          <FormattedMessage id="common.changelanguage" />
        </Popover>
      </Menu.Item> */}
      <Menu.Item key={7} onClick={handleSignOut}>
        <div className={classes.sign_out}>
          <div className={classes.icon}>
            <SignOut size={24} className={classes.icon_box} />
          </div>
          <FormattedMessage id="common.signout" />
        </div>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {}, []);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Error",
      description: "Can't fill in special character or empty",
    });
  };

  let navigate = useNavigate();

  const [category, setCategory] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const headerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleDropdown, setVisibleDropdown] = useState(false);

  const options = allProductTemp?.map((item) => ({
    value: item.product,
    label: (
      <div style={{ display: "flex", textAlign: "center" }}>
        {item.product && (
          <span style={{ fontSize: "14px", color: "grey", flex: 1 }}>
            {item.product}
          </span>
        )}
      </div>
    ),
  }));

  const ref = useRef();
  useOnClickOutside(ref, () => setVisible(false));
  const menuref = useRef();
  useOnClickOutside(menuref, () => {
    setCollapsed(false);
  });
  // const ref2 = useClickOutside(() => setVisibleDropdown(false));
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    getAllCategory().then((res) => {
      if (res) {
        setCategory(res);
      }
    });
  }, [cart]);

  const onSearch = (value) => {
    // eslint-disable-next-line no-unused-vars
    var regex = /^[a-zA-Z0-9_ ]*$/g;

    if (value && regex.test(value) && value !== "") {
      navigate(`/search/${value}`);
    } else {
      openNotificationWithIcon("warning");
    }
  };
  return (
    <div className={classes.container}>
      <Cart
        visible={visible}
        aref={ref}
        setVisible={setVisible}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <div className={classes.headerContainer} ref={headerRef}>
        <div className={classes.change_language_unauth}>
          <p
            onClick={() => changeLanguage(LANGUAGES.VI)}
            style={{ color: `${user.language === "vi" ? "#d84727" : "#000"}` }}
          >
            VI /{" "}
          </p>
          <p
            onClick={() => changeLanguage(LANGUAGES.EN)}
            style={{ color: `${user.language === "en" ? "#d84727" : "#000"}` }}
          >
            {" "}
            &nbsp;EN
          </p>
        </div>
        <div className={classes.top}>
          <div className={classes.menu}>
            <Button
              onClick={toggleCollapsed}
              danger
              style={{
                background: "#D84727",
                border: "none",
                borderRadius: "5px",
                outline: "none",
              }}
            >
              {collapsed ? (
                <MenuUnfoldOutlined
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                  }}
                />
              ) : (
                <MenuFoldOutlined
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                  }}
                />
              )}
            </Button>
          </div>
          <Link to={"/"} className={classes.logo}>
            <img src={logo} alt="" />
          </Link>
          <Space
            direction="vertical"
            align="center"
            className={classes.searchContainer}
            style={{ position: "relative" }}
          >
            <AutoComplete
              required={true}
              // onSearch={onSearch}
              options={options}
              onSelect={() => {}}
              onChange={(value) => {
                if (value !== "") {
                  let res = [];
                  allProduct?.forEach((element) => {
                    element?.product
                      .toLowerCase()
                      .includes(value?.toLowerCase()) && res.push(element);
                  });
                  setAllProductTemp(res);
                } else {
                  setAllProductTemp(allProduct);
                }
              }}
            >
              <Search
                onSearch={onSearch}
                className={classes.search}
                placeholder="Search products, accessory, etc..."
              ></Search>
            </AutoComplete>
          </Space>

          <div className={classes.authentication} id="area">
            {/* {!user.accessToken ? ( */}
            {!user.currentUser ? (
              <div
                to={"/login"}
                className={classes.login}
                onClick={() => navigate2("/login")}
              >
                <User size={32} color="#000" weight="thin" />
                <div
                  className={classes.loginText}
                  style={{ maxWidth: "40px", whiteSpace: "nowrap" }}
                >
                  <FormattedMessage id="common.login" />
                </div>
              </div>
            ) : (
              <Dropdown
                overlay={menu}
                placement="bottomLeft"
                arrow
                trigger={["click"]}
                // visible={visibleDropdown}
                overlayClassName={classes.menu_header}
                getPopupContainer={() => document.getElementById("area")}
              >
                <div
                  className={classes.login}
                  onClick={() => setVisibleDropdown(!visibleDropdown)}
                >
                  <User size={32} color="#000" weight="thin" />
                  <div className={classes.loginText}>
                    {formatName(user.currentUser.name)}
                  </div>
                </div>
              </Dropdown>
            )}

            <div
              className={classes.shopingCart}
              onClick={() => {
                if (user.currentUser) {
                  setVisible(true);
                } else {
                  message.error("Please Sign In");
                }
              }}
            >
              <Handbag size={25} color="#000" weight="thin" />
              <NumItem item={cart.numberCart ?? 0} />
            </div>
          </div>
        </div>

        <div className={classes.bottom}>
          <div className={classes.navListContainer}>
            <div className={classes.navList}>
              <Link to={`/viewall`} className={classes.navItem}>
                Product
              </Link>
              {category.categories?.map((item, index) => {
                return (
                  <Link
                    to={`/viewall/${item._id}`}
                    key={index}
                    className={classes.navItem}
                  >
                    {item.category}
                  </Link>
                );
              })}
              <Link to={`/blog`} className={classes.navItem}>
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* TOGGLE MENU MOBILE */}
      <div
        className={`${classes.menuMobile} ${
          collapsed === true ? classes.active : classes.none
        }`}
        ref={menuref}
      >
        <div className={classes.navListContainer}>
          <div className={classes.navList}>
            <Link
              onClick={() => setCollapsed(false)}
              to={`/`}
              className={classes.navItem}
            >
              Home
            </Link>
            <Link to={`/viewall`} className={classes.navItem}>
              Product
            </Link>
            {category.categories?.map((item, index) => {
              return (
                <Link
                  onClick={() => setCollapsed(false)}
                  to={`/viewall/${item._id}`}
                  key={index}
                  className={classes.navItem}
                >
                  {item.category}
                </Link>
              );
            })}
            <Link to={`/blog`} className={classes.navItem}>
              Blog
            </Link>
          </div>
        </div>
      </div>
      {/* ---------- */}
    </div>
  );
};

export default Header;

{
  /* TABLET */
}
//   <div className={classes.tablet}>
//   <div className={classes.top}>
//     <div className={classes.logo}>
//       <img src={logo} alt="" />
//     </div>
//     <Space direction="vertical" align="start">
//       <Search
//         placeholder="Search products, accessory, etc..."
//         onSearch={onSearch}
//         style={{ width: 400, textAlign: "center" }}
//       />
//     </Space>
//     <div className={classes.authentication}>
//       <div className={classes.login}>
//         <User size={32} color="#000" weight="thin" />
//         <div className={classes.loginText}>
//           {user.currentUser ? user.currentUser.name : "Log In"}
//         </div>
//       </div>
//       <div
//         className={classes.shopingCart}
//         onClick={() => setVisible(true)}
//       >
//         <Handbag size={25} color="#000" weight="thin" />
//       </div>
//     </div>
//   </div>
//   <div className={classes.bottom}>
//     <div className={classes.navListContainer}>
//       <div className={classes.navList}>
//         {category.categories?.map((item, index) => {
//           return (
//             <Link
//               to={`/viewall/${item._id}`}
//               key={index}
//               className={classes.navItem}
//             >
//               {item.category}
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   </div>
// </div>

{
  /* ------ */
}
{
  /* MOBILE */
}
{
  /* <div className={classes.mobile}>
  <div className={classes.top}>
    <div className={classes.menu}>
      <Button
        onClick={toggleCollapsed}
        danger
        style={{
          background: "#D84727",
          border: "none",
          borderRadius: "5px",
          outline: "none",
        }}
      >
        {collapsed ? (
          <MenuUnfoldOutlined
            style={{
              color: "#fff",
              fontSize: "18px",
            }}
          />
        ) : (
          <MenuFoldOutlined
            style={{
              color: "#fff",
              fontSize: "18px",
            }}
          />
        )}
      </Button>
    </div>
    <div className={classes.logo}>
      <img src={logo} alt="" />
    </div>
    <div className={classes.authentication}>
      <div className={classes.shopingCart}>
        <Handbag size={25} color="#000" weight="thin" />
      </div>
    </div>
  </div>
  <div className={classes.bottom}>
    <Space direction="vertical" align="start">
      <Search
        placeholder="Search products, accessory, etc..."
        onSearch={onSearch}
        style={{ width: 300, marginBottom: "10px" }}
      />
    </Space>
  </div>
</div> */
}
{
  /* ------ */
}
