import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useClickOutside } from "@mantine/hooks";
import { Button, Input, Space, notification } from "antd";
import "antd/dist/antd.min.css";
import { Handbag, User } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategory } from "../../api/Category";
import logo from "../../assets/header/image 5.svg";
import { Cart } from "./Cart";
import NumItem from "./NumItemCard";
import classes from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Search } = Input;

const Header = () => {
  const user = useSelector((state) => state.user);
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
  const [qty, setQty] = useState(1);
  const [visible, setVisible] = useState(false);
  const ref = useClickOutside(() => setVisible(false));

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    menuRef.current.classList.toggle(classes.active);
  };

  const upQty = () => {
    setQty(qty + 1);
  };

  const downQty = () => {
    if (qty === 1) {
      return;
    } else {
      setQty(qty - 1);
    }
  };

  const quantity = useSelector((state) => state.cart.quantity);
  // console.log(user);
  useEffect(() => {
    // window.addEventListener("scroll", () => {
    //   if (
    //     document.body.scrollTop > 50 ||
    //     document.documentElement.scrollTop > 50
    //   ) {
    //     headerRef.current.classList.add(classes.shrink);
    //   } else {
    //     headerRef.current.classList.remove(classes.shrink);
    //   }
    //   return () => {
    //     window.removeEventListener("scroll");
    //   };
    // });

    getAllCategory().then((res) => {
      if (res) {
        setCategory(res);
      }
    });
  }, []);
  return (
    <div className={classes.container}>
      <Cart
        visible={visible}
        aref={ref}
        downQty={downQty}
        qty={qty}
        upQty={upQty}
      />
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
              <Link to={"/myaccount/1"} className={classes.login}>
                <User size={32} color="#000" weight="thin" />
                <div className={classes.loginText}>{user.currentUser.name}</div>
              </Link>
            ) : (
              <Link to={"/login"} className={classes.login}>
                <User size={32} color="#000" weight="thin" />
                <div className={classes.loginText}>Log In</div>
              </Link>
            )}

            <div
              className={classes.shopingCart}
              onClick={() => setVisible(true)}
            >
              <Handbag size={25} color="#000" weight="thin" />
              <NumItem item={quantity} />
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
                  {user.currentUser ? user.currentUser.username : "Log In"}
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
