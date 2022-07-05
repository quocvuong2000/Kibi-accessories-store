import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useClickOutside } from "@mantine/hooks";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  message,
  notification,
  Space,
} from "antd";
import "antd/dist/antd.min.css";
import Cookies from "js-cookie";
import { Handbag, Heart, SignOut, User, UserCircle } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductCart } from "../../api/Cart";
import { getAllCategory } from "../../api/Category";
import logo from "../../assets/header/image 5.svg";
import { setAuthToken } from "../../services/jwt-axios";
import formatName from "../../utils/formatName";
import { Cart } from "./Cart";
import NumItem from "./NumItemCard";
import classes from "./styles.module.scss";
const { Search } = Input;

const Header = () => {
  let navigate2 = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const handleSignOut = () => {
    Cookies.remove("token");
    localStorage.removeItem("persist:root");
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <div className={classes.box_profile}>
          <div className={classes.avatar_menu}>
            <img src={user.currentUser?.avatar} alt="" />
          </div>
          <p className={classes.name_avatar}>{user.currentUser?.name}</p>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div
          className={classes.link_to_profile}
          onClick={() => navigate2(`/myaccount/1`)}
        >
          <div className={classes.icon}>
            <UserCircle size={24} className={classes.icon_box} />
          </div>
          Your Profile
        </div>
      </Menu.Item>
      <Menu.Item>
        <Link className={classes.wish_list} to={"/myaccount/4"}>
          <div className={classes.icon}>
            <Heart size={24} className={classes.icon_box} />
          </div>
          Wish List
        </Link>
      </Menu.Item>
      <Menu.Item>
        <div className={classes.sign_out} onClick={handleSignOut}>
          <div className={classes.icon}>
            <SignOut size={24} className={classes.icon_box} />
          </div>
          Sign Out
        </div>
      </Menu.Item>
    </Menu>
  );
  if (user.currentUser) {
    if (
      user.currentUser.accessToken !== "" &&
      user.currentUser.accessToken != null
    ) {
      setAuthToken(user.currentUser.accessToken);
      getAllProductCart(user.currentUser.username);
    }
  }

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Error",
      description: "Can't fill in special character",
    });
  };

  let navigate = useNavigate();
  const onSearch = (value) => {
    var regex = /^[a-zA-Z]+$/;
    if (value && regex.test(value)) {
      navigate(`/search/${value}`);
    } else {
      openNotificationWithIcon("warning");
    }
  };

  const [category, setCategory] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const ref = useClickOutside(() => setVisible(false));

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    menuRef.current.classList.toggle(classes.active);
  };

  //console.log(user);
  useEffect(() => {
    getAllCategory().then((res) => {
      if (res) {
        setCategory(res);
      }
    });
  }, [cart]);
  //console.log(user);
  return (
    <div className={classes.container}>
      <Cart visible={visible} aref={ref} setVisible={setVisible} />
      <div className={classes.headerContainer} ref={headerRef}>
        <div className={classes.top}>
          <Link to={"/"} className={classes.logo}>
            <img src={logo} alt="" />
          </Link>
          <Space direction="vertical" align="start">
            <Search
              placeholder="Search products, accessory, etc..."
              required={true}
              onSearch={onSearch}
              style={{ width: 500, textAlign: "center" }}
            />
          </Space>
          <div className={classes.authentication}>
            {/* {!user.accessToken ? ( */}
            {user.currentUser ? (
              <div className={classes.login}>
                <Dropdown
                  overlay={menu}
                  placement="bottomLeft"
                  arrow
                  overlayClassName={classes.menu_header}
                >
                  <User size={32} color="#000" weight="thin" />
                </Dropdown>
                <div className={classes.loginText}>
                  {formatName(user.currentUser.name)}
                </div>
              </div>
            ) : (
              <Link to={"/login"} className={classes.login}>
                <User size={32} color="#000" weight="thin" />
                <div className={classes.loginText}>Log In</div>
              </Link>
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
        {/* TABLET */}
        <div className={classes.tablet}>
          <div className={classes.top}>
            <div className={classes.logo}>
              <img src={logo} alt="" />
            </div>
            <Space direction="vertical" align="start">
              <Search
                placeholder="Search products, accessory, etc..."
                onSearch={onSearch}
                style={{ width: 400, textAlign: "center" }}
              />
            </Space>
            <div className={classes.authentication}>
              <div className={classes.login}>
                <User size={32} color="#000" weight="thin" />
                <div className={classes.loginText}>
                  {user.currentUser ? user.currentUser.name : "Log In"}
                </div>
              </div>
              <div
                className={classes.shopingCart}
                onClick={() => setVisible(true)}
              >
                <Handbag size={25} color="#000" weight="thin" />
              </div>
            </div>
          </div>
          <div className={classes.bottom}>
            <div className={classes.navListContainer}>
              <div className={classes.navList}>
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
              </div>
            </div>
          </div>
        </div>
        {/* ------ */}
        {/* MOBILE */}
        <div className={classes.mobile}>
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
        </div>
        {/* ------ */}
      </div>

      {/* TOGGLE MENU MOBILE */}
      <div className={classes.menuMobile} ref={menuRef}>
        <div className={classes.navListContainer}>
          <div className={classes.navList}>
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
          </div>
        </div>
      </div>
      {/* ---------- */}
    </div>
  );
};

export default Header;
