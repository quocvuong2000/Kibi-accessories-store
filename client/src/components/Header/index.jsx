import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import "antd/dist/antd.css";
import { Handbag, MagnifyingGlass, User } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/header/image 5.svg";
import classes from "./styles.module.scss";
const { Search } = Input;
const navItem = [
  {
    display: "Watches",
    link: "/home",
  },
  {
    display: "Eyewear",
    link: "/home",
  },
  {
    display: "Accessories ",
    link: "/home",
  },
  {
    display: "News",
    link: "/home",
  },
];
const onSearch = (value) => console.log(value);

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    menuRef.current.classList.toggle(classes.active);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add(classes.shrink);
      } else {
        headerRef.current.classList.remove(classes.shrink);
      }
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);
  return (
    <>
      <div className={classes.headerContainer} ref={headerRef}>
        <div className={classes.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={classes.navListContainer}>
          <div className={classes.navList}>
            {navItem.map((item, index) => {
              return (
                <Link to={item.link} key={index} className={classes.navItem}>
                  {item.display}
                </Link>
              );
            })}
          </div>
        </div>
        <div className={classes.authentication}>
          <div className={classes.search}>
            <MagnifyingGlass size={32} color="#000" weight="thin" />
          </div>
          <div className={classes.login}>
            <User size={32} color="#000" weight="thin" />
            <div className={classes.loginText}>Log In</div>
          </div>
          <div className={classes.shopingCart}>
            <Handbag size={25} color="#000" weight="thin" />
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
                <div className={classes.loginText}>Log In</div>
              </div>
              <div className={classes.shopingCart}>
                <Handbag size={25} color="#000" weight="thin" />
              </div>
            </div>
          </div>
          <div className={classes.bottom}>
            <div className={classes.navListContainer}>
              <div className={classes.navList}>
                {navItem.map((item, index) => {
                  return (
                    <Link
                      to={item.link}
                      key={index}
                      className={classes.navItem}
                    >
                      {item.display}
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
            {navItem.map((item, index) => {
              return (
                <Link to={item.link} key={index} className={classes.navItem}>
                  {item.display}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* ---------- */}
    </>
  );
};

export default Header;
