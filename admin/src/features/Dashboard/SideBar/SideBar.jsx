import React, { useState } from "react";
import Logo from "../../../assets/images/logo.svg";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../../utils/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import classes from "./styles.module.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);
  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
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

        <div className={classes.menu}>
          {SidebarData.map((item, index) => {
            return (
              <Link to={item.link}
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
          <div className={classes.menuItem}>
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
