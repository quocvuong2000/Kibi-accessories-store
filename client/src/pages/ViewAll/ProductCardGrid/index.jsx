import React, { useState } from "react";
import s from "./styles.module.scss";
import { Popover } from "antd";
import { Heart } from "phosphor-react";
import numberWithComas from "../../../utils/numberWithCommas";
import { Link } from "react-router-dom";

export const ProductCardGrid = (props) => {
  const data = props.data;
  const [show, setShow] = useState(false);

  return (
    <div
      className={`${s.box__product} `}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link to={`/detail/${data._id}`}>
        <div className={s.box__product__image}>
          <img src={data.image} alt="" loading="lazy" />
        </div>
      </Link>
      <div className={`${s.add_to_wish} ${show ? s.show_heart : s.hide_heart}`}>
        <Heart size={20} />
      </div>
      <div className={s.box__product__content}>
        <Popover title={data.product} trigger="hover">
          <Link to={`/detail/${data._id}`}>
            <p className={s.box__product__title}>{data.product}</p>
          </Link>
        </Popover>
        {!show ? (
          <div
            className={`${s.box_price} ${show ? s.hide_price : s.show_price}`}
          >
            <p className={s.box__product__price}>
              {numberWithComas(data.price)}đ
            </p>
            {data.oldPrice && (
              <p className={s.box__product__oldprice}>
                {data.oldPrice}
                <hr className={s.line} />
              </p>
            )}
          </div>
        ) : (
          <p className={`${s.txt_add} ${show ? s.show_txt : s.hide_txt}`}>
            + Add to cart
          </p>
        )}

        {/* <div className={s.btn}>
          <Popover title="Add to wishlist" trigger="hover">
            <Heart color="#a94242" weight="thin" />
          </Popover>
          <button className={s.btnCart}>Add to cart</button>
        </div> */}
      </div>
    </div>
  );
};
