import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Input, Space, Modal } from "antd";
import "antd/dist/antd.css";
import { Handbag, MagnifyingGlass, User } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/header/image 5.svg";
import classes from "./styles.module.scss";
import item1 from "../../assets/cart/item1.png";
import item2 from "../../assets/cart/item2.png";
import { useOnClickOutside } from "usehooks-ts";

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
  const [modal2Visible, setModal2Visible] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const [qty, setQty] = useState(1);
  const ref = useRef(null);
  const handleClickOutside = () => {
    setModal2Visible(false);
  };

  const handleClickInside = () => {};
  useOnClickOutside(ref, handleClickOutside);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    menuRef.current.classList.toggle(classes.active);
  };
  const upQty = () => {
    setQty(qty + 1);
    console.log(qty);
    console.log("up");
  };

  const downQty = () => {
    if (qty === 1) {
      return;
    } else {
      setQty(qty - 1);
    }
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
          <div
            className={classes.shopingCart}
            onClick={() => setModal2Visible(true)}
          >
            <Handbag size={25} color="#000" weight="thin" />
            <Modal centered visible={false}>
              <div
                className={classes.cart__item}
                ref={ref}
                onClick={handleClickInside}
              >
                <div className={classes.cart__item__left}>
                  <div className={classes.cart__item__left__image}>
                    <img src={item1} alt="item" />
                  </div>
                  <div className={classes.cart__item__left__info}>
                    <p className={classes.title}>Way Kambas Mini Ebony</p>
                    <p className={classes.voucher}>
                      Rp 1.280.000
                      <span className={classes.line}></span>
                    </p>
                    <p className={classes.price}>Rp 1.024.000</p>
                    <p className={classes.detail}>Custom Engrave</p>
                  </div>
                </div>
                <div className={classes.cart__item__right}>
                  <p className={classes.cart__item__right__select}>
                    Select Packaging
                  </p>
                  <select className={classes.cart__item__right__price}>
                    <option
                      value="1"
                      className={classes.cart__item__right__price__item}
                    >
                      Wooden Packaging (Rp 50.000)
                    </option>
                  </select>
                  <div className={classes.cart__item__right__option}>
                    <div className={classes.sub} onClick={downQty}>
                      <p className={classes.icon_sub}></p>
                    </div>
                    <p className={classes.count}>{qty}</p>
                    <div className={classes.add} onClick={upQty}>
                      <p className={classes.icon_add}></p>
                      <p className={classes.icon_add2}></p>
                    </div>

                    <p className={classes.result}>Rp 2.048.000</p>
                    <div className={classes.delete}>
                      <box-icon
                        name="trash"
                        color="#d84727"
                        size="24px"
                        type="solid"
                      ></box-icon>
                    </div>
                  </div>
                </div>
              </div>
              <hr className={classes.line_deli} />
              <div className={classes.sub__total}>
                <p className={classes.voucher}>35% OFF</p>
                <div className={classes.total}>
                  <p className={classes.total__text}>Subtotal</p>
                  <div className={classes.total__price}>
                    <p className={classes.total__price__voucher}>
                      Rp 3.312.000
                      <span className={classes.line}></span>
                    </p>
                    <p className={classes.total__price__correct}>
                      Rp 2.152.000
                    </p>
                  </div>
                </div>
              </div>
              <button className={classes.checkout}>Checkout</button>
            </Modal>
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
              <div
                className={classes.shopingCart}
                onClick={() => setModal2Visible(true)}
              >
                <Handbag size={25} color="#000" weight="thin" />
                <Modal centered visible={modal2Visible}>
                  <div
                    className={classes.cart__item}
                    ref={ref}
                    onClick={handleClickInside}
                  >
                    <div className={classes.cart__item__left}>
                      <div className={classes.cart__item__left__image}>
                        <img src={item1} alt="item" />
                      </div>
                      <div className={classes.cart__item__left__info}>
                        <p className={classes.title}>Way Kambas Mini Ebony</p>
                        <p className={classes.voucher}>
                          Rp 1.280.000
                          <span className={classes.line}></span>
                        </p>
                        <p className={classes.price}>Rp 1.024.000</p>
                        <p className={classes.detail}>Custom Engrave</p>
                      </div>
                    </div>
                    <div className={classes.cart__item__right}>
                      <p className={classes.cart__item__right__select}>
                        Select Packaging
                      </p>
                      <select className={classes.cart__item__right__price}>
                        <option
                          value="1"
                          className={classes.cart__item__right__price__item}
                        >
                          Wooden Packaging (Rp 50.000)
                        </option>
                      </select>
                      <div className={classes.cart__item__right__option}>
                        <div className={classes.sub} onClick={downQty}>
                          <p className={classes.icon_sub}></p>
                        </div>
                        <p className={classes.count}>{qty}</p>
                        <div className={classes.add} onClick={upQty}>
                          <p className={classes.icon_add}></p>
                          <p className={classes.icon_add2}></p>
                        </div>

                        <p className={classes.result}>Rp 2.048.000</p>
                        <div className={classes.delete}>
                          <box-icon
                            name="trash"
                            color="#d84727"
                            size="24px"
                            type="solid"
                          ></box-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className={classes.line_deli} />
                  <div className={classes.sub__total}>
                    <p className={classes.voucher}>35% OFF</p>
                    <div className={classes.total}>
                      <p className={classes.total__text}>Subtotal</p>
                      <div className={classes.total__price}>
                        <p className={classes.total__price__voucher}>
                          Rp 3.312.000
                          <span className={classes.line}></span>
                        </p>
                        <p className={classes.total__price__correct}>
                          Rp 2.152.000
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className={classes.checkout}>Checkout</button>
                </Modal>
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
