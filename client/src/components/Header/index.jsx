import React from "react";
import classes from "./styles.module.scss";
import logo from "../../assets/header/image 5.svg";
import { Link } from "react-router-dom";
import { Handbag, MagnifyingGlass, User } from "phosphor-react";

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
const Header = () => {
  return (
    <div className={classes.headerContainer}>
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
    </div>
  );
};

export default Header;
