import { Col, Image, Popover, Row } from "antd";
import { Heart } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import numberWithCommas from "../../../utils/numberWithCommas";
import s from "./styles.module.scss";
import parse from "html-react-parser";
import imgError from "../../../assets/imgDefault.webp";
import { useDispatch, useSelector } from "react-redux";
import { handleAddToCart } from "../../../api/Cart";
import { addToWishList, checkExistsWishlist } from "../../../api/Wishlist";

export const ProductCardList = (props) => {
  const data = props.data;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [exist, setExist] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    user.currentUser &&
      checkExistsWishlist(user.currentUser.username, data._id).then((res) => {
        // console.log(res);
        res === 200 && setExist(false);
        res === 201 && setExist(true);
      });
  }, [data, reload]);
  return (
    <Row align="start" className={s.box__product} gutter={[0, 0]}>
      <Col span={5} className={s.box__product__image}>
        <Image
          src={data.images[0] ? data.images[0] : imgError}
          alt=""
          loading="lazy"
        />
      </Col>
      <Col span={19} className={s.box__product__content} push={1}>
        <Popover title={data.title} trigger="hover">
          <Link to={`/detail/${data._id}`}>
            <p className={s.box__product__title}>{data.product}</p>
          </Link>
        </Popover>
        <p className={s.box__product__desc}>
          {parse(`${data.description.content}`)}
        </p>
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
            <Heart
              color="#a94242"
              weight="thin"
              onClick={() => {
                addToWishList(user.currentUser.username, data._id).then(
                  (res) => {
                    setReload(!reload);
                  }
                );
              }}
            />
          </Popover>
          <button
            className={s.btnCart}
            onClick={() =>
              handleAddToCart(dispatch, user.currentUser.username, data._id)
            }
          >
            Add to cart
          </button>
        </div>
      </Col>
    </Row>
  );
};
