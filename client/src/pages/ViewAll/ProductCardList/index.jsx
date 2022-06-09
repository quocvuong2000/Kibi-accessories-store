import { Col, Image, Popover, Row } from "antd";
import { Heart } from "phosphor-react";
import React from "react";
import numberWithCommas from "../../../utils/numberWithCommas";
import s from "./styles.module.scss";

export const ProductCardList = (props) => {
  const data = props.data;

  console.log(data.oldPrice);

  return (
    <Row align="start" className={s.box__product} gutter={[0, 0]}>
      <Col span={4} className={s.box__product__image}>
        <Image src={data.image} alt="" loading="lazy" />
      </Col>
      <Col span={20} className={s.box__product__content} push={1}>
        <Popover title={data.title} trigger="hover">
          <p className={s.box__product__title}>{data.product}</p>
        </Popover>
        <p className={s.box__product__desc}>{data.description}</p>
        <p className={s.box__product__voucher}>20% Off</p>

        {data.oldPrice && (
          <div className={s.box__product__oldprice}>
            {data.oldPrice}
            <hr className={s.line} />
          </div>
        )}

        <p className={s.box__product__price}>
          {numberWithCommas(data.price)} VND
        </p>
        <div className={s.btn}>
          <Popover title="Add to wishlist" trigger="hover">
            <Heart color="#a94242" weight="thin" />
          </Popover>
          <button className={s.btnCart}>Add to cart</button>
        </div>
      </Col>
    </Row>
  );
};
