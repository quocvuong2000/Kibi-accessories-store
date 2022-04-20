import React from "react";
import PropsType from "prop-types";
import classes from "./styles.module.scss";
import vawe1 from "../../assets/home/Vector 12.png";
import vawe2 from "../../assets/home/Vector 13.png";
import vawe3 from "../../assets/home/Vector 14.png";
const WaveAnimation = (props) => {
  const absolute = props.absolute ? classes.absolute : "";
  return (
    <div className={`${classes.waveContainer} ${absolute}`}>
      <div className={classes.vaweAnimation}>
        <img src={vawe1} style={{ "--delay": ".12s" }} alt="" />
        <img src={vawe2} style={{ "--delay": ".24s" }} alt="" />
        <img src={vawe3} style={{ "--delay": ".44s" }}alt="" />
      </div>
    </div>
  );
};

WaveAnimation.prototype = {
  absolute: PropsType.bool,
};

export default WaveAnimation;
