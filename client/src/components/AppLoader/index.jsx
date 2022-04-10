import React from "react";
import classes from "./styles.module.scss";

const AppLoader  = () => {
  return (
    <div className={classes.appLoader}>
      <div className={classes.loaderSpin}>
        <span className={`${classes.cremaDot} ${classes.cremaDotSpin}`}>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </div>
  );
};

export default AppLoader;
