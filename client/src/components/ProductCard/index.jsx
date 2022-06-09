import React from "react";
import classes from "./styles.module.scss";
import PropsType from "prop-types";
import { Heart } from "phosphor-react";
import "antd/dist/antd.min.css";
import { Popover } from "antd";
import numberWithCommas from "../../utils/numberWithCommas";

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
          <Popover title={data.product} trigger="click">
            <div className={classes.title}>{data.product}</div>
          </Popover>
          {data.saleOff && (
            <div className={classes.saleOff}>{data.saleOff}</div>
          )}
          {data.oldPrice && (
            <div className={classes.oldPrice}>{data.oldPrice}</div>
          )}
          <div className={classes.newPrice}>
            {numberWithCommas(data.price)} VND
          </div>
        </div>
        <div className={classes.btn}>
          <Heart color="#a94242" weight="thin" />
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
