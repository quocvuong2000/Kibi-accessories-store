import React from "react";
import classes from "./styles.module.scss";
import watch from "../../../assets/home/recentNews/Mask Group.png";
import vawe1 from "../../../assets/home/Vector 12.png";
import vawe2 from "../../../assets/home/Vector 13.png";
import vawe3 from "../../../assets/home/Vector 14.png";
import { Image } from "antd";
import { Compass } from "phosphor-react";
import { FormattedMessage } from "react-intl";
const RecentsNew = () => {
  return (
    <div className={classes.recentNewContainer}>
      <div className={classes.mainTitle}>
        <FormattedMessage id="home.recentnews" />
      </div>
      <div className={classes.recentNews}>
        <div className={classes.left}>
          <div className={classes.content}>
            <div className={classes.where}>
              <FormattedMessage id="home.wheretotravel" />
            </div>
            <div className={classes.title}>
              <FormattedMessage id="home.matoawheretotravel" />
            </div>
            <button
              className={classes.btn}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                columnGap: "5px",
              }}
            >
              <FormattedMessage id="home.discover" />{" "}
              <Compass size={22} weight="thin" color="#d84727" />
            </button>
          </div>
        </div>
        <div className={classes.right}>
          <Image src={watch} />
        </div>
        <div className={classes.square}></div>
        <div className={classes.image}>
          <img src={vawe1} alt="" />
          <img src={vawe2} alt="" />
          <img src={vawe3} alt="" />
        </div>
        <div className={classes.image1}>
          <img src={vawe1} alt="" />
          <img src={vawe2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default RecentsNew;
