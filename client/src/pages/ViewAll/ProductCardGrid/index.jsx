import React from "react";
import s from "./styles.module.scss";
import { Popover } from "antd";
import { Heart } from "phosphor-react";
import numberWithComas from "../../../utils/numberWithCommas";

export const ProductCardGrid = (props) => {
  const data = props.data;

  return (
    <div className={s.box__product}>
      <div className={s.box__product__image}>
        <img src={data.image} alt="" />
      </div>
      <div className={s.box__product__content}>
        <Popover title={data.product} trigger="hover">
          <p className={s.box__product__title}>{data.product}</p>
        </Popover>
        <p className={s.box__product__voucher}>20% Off</p>
        {data.oldPrice && (
          <p className={s.box__product__oldprice}>
            {data.oldPrice}
            <hr className={s.line} />
          </p>
        )}
        <p className={s.box__product__price}>
          {numberWithComas(data.price)} VND
        </p>
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
