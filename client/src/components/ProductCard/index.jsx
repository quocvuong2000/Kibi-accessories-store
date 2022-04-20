import React from "react";
import classes from "./styles.module.scss";
import PropsType from "prop-types";
import { Heart } from "phosphor-react";

const ProductCard = (props) => {
  const data = props.data;
  return (
    <div className={classes.productCardContainer}>
      <div className={classes.top}></div>
      <div className={classes.bottom}>
        <div className={classes.image}>
          <img src={data.image} alt="" />
        </div>
        <div className={classes.content}>
          <div className={classes.title}>{data.title}</div>
          <div className={classes.saleOff}>{data.saleOff}</div>
          <div className={classes.oldPrice}>{data.oldPrice}</div>
          <div className={classes.newPrice}>{data.newPrice}</div>
        </div>
        <div className={classes.btn}>
          <Heart size={32} color="#a94242" weight="thin" />
          <button className={classes.btnCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propsType = {
  data: PropsType.object,
};

export default ProductCard;
