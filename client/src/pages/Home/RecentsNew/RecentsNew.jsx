import React from "react";
import classes from "./styles.module.scss";
import watch from "../../../assets/home/recentNews/Mask Group.png";
import vawe1 from "../../../assets/home/Vector 12.png";
import vawe2 from "../../../assets/home/Vector 13.png";
import vawe3 from "../../../assets/home/Vector 14.png";
import { Image } from "antd";
const RecentsNew = () => {
  return (
    <div className={classes.recentNewContainer}>
      <div className={classes.mainTitle}>Recent News</div>
      <div className={classes.recentNews}>
        <div className={classes.left}>
          <div className={classes.content}>
            <div className={classes.where}>Where To Travel</div>
            <div className={classes.title}>
              Matoa Where To Travel? Ho Chi Minh City
            </div>
            <button className={classes.btn}>Discover</button>
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
