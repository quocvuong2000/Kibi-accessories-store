import React, { useState } from "react";
import Logo from "../../../assets/images/logo.svg";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../../utils/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import classes from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../Login/LoginSlice";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hanldeLogOut = () => {
    dispatch(doLogout());
    Cookies.remove("token");
    navigate("/login");
  };
  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  const deCodeToken = jwt_decode(Cookies.get("token"));
  return (
    <>
      <div
        className={classes.bars}
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className={classes.sidebar}
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className={classes.logo}>
          <img src={Logo} alt="logo" />
          <span>
            K<span>i</span>Bi
          </span>
        </div>
        <div className={classes.accountInfo}>
          <div className={classes.type}>
            Hello,{" "}
            <span>{deCodeToken.type === "admin" ? "Admin" : "Staff"}</span>
          </div>
          <div className={classes.role}>
            Your current role
            <span>
              {deCodeToken.role === "none"
                ? "none"
                : `${deCodeToken.role} management`}
            </span>
          </div>
        </div>
        <div className={classes.menu}>
          {SidebarData.map((item, index) => {
            return (
              <Link
                to={item.link}
                className={
                  selected === index
                    ? `${classes.menuItem} ${classes.active}`
                    : `${classes.menuItem}`
                }
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </Link>
            );
          })}
          {/* signoutIcon */}
        </div>
        <div className={classes.menuItemLogout} onClick={hanldeLogOut}>
          <UilSignOutAlt />
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
