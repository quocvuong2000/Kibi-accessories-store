import React from "react";
import PropsType from "prop-types";
import classes from "./styles.module.scss";
const WaveAnimation = (props) => {
  const absolute = props.absolute ? "absolute" : "";
  return (
    <div
      className={classes.waveContainer}
      style={{ position: { absolute } }}
    >
      <div className={classes.vaweAnimation}>
        <img src="" alt="" />
      </div>
    </div>
  );
};

WaveAnimation.prototype = {
  absolute: PropsType.bool,
};

export default WaveAnimation;
