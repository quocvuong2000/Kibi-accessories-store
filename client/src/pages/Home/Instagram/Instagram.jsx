import React from "react";
import classes from "./styles.module.scss";
import img1 from "../../../assets/home/instagram/Rectangle 38.png";
import img2 from "../../../assets/home/instagram/Rectangle 39.png";
import img3 from "../../../assets/home/instagram/Rectangle 40.png";
import img4 from "../../../assets/home/instagram/Rectangle 41.png";
import img5 from "../../../assets/home/instagram/Rectangle 42.png";
import { Image } from "antd";

const imgList = [img1, img2, img3, img4, img5];

const Instagram = () => {
  return (
    <div className={classes.instagramContainer}>
      <div className={classes.title}>Instagram</div>
      <div className={classes.instagramList}>
        {imgList.map((item, index) => {
          return (
            <div key={index} className={classes.instagramItem}>
              <Image src={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Instagram;
