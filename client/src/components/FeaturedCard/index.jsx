import React from "react";
import classes from "./styles.module.scss";
import Propstype from "prop-types";
import { Image } from "antd";

const FeaturedCard = (props) => {
  const item = props.item;
  return (
    <div className={classes.featuredContainer}>
      <div className={classes.left}>
        <img src={item.img} alt="" />
      </div>
      <div className={classes.right}>
        <div className={classes.title}>{item.display}</div>
        <div className={classes.price}>{item.price}</div>
      </div>
    </div>
  );
};

FeaturedCard.prototype = {
  item: Propstype.object,
};

export default FeaturedCard;
