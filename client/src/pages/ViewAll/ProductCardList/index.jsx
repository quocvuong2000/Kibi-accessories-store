import React from "react";
import s from "./styles.module.scss";
import { Popover } from "antd";
import { Heart } from "phosphor-react";

export const ProductCardList = (props) => {
  const data = props.data;

  return (
    <div className={s.box__product}>
      <div className={s.box__product__image}>
        <img src={data.image} alt="" />
      </div>
      <div className={s.box__product__content}>
        <Popover title={data.title} trigger="hover">
          <p className={s.box__product__title}>{data.title}</p>
        </Popover>
        <p className={s.box__product__voucher}>20% Off</p>
        <p className={s.box__product__oldprice}>
          {data.oldPrice}
          <hr className={s.line} />
        </p>
        <p className={s.box__product__price}>{data.newPrice}</p>
        <div className={s.btn}>
          <Popover title="Add to wishlist" trigger="hover">
            <Heart color="#a94242" weight="thin" />
          </Popover>
          <button className={s.btnCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};
