import { Col, Image, message, Popover, Row } from "antd";
import parse from "html-react-parser";
import { Heart } from "phosphor-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleAddToCart } from "../../../api/Cart";
import { getProduct } from "../../../api/Product";
import { addToWishList } from "../../../api/Wishlist";
import imgError from "../../../assets/imgDefault.webp";
import numberWithCommas from "../../../utils/numberWithCommas";
import s from "./styles.module.scss";

export const ProductCardList = (props) => {
  const data = props.data;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [quan, setQuan] = useState(0);
  useEffect(() => {
    getProduct(data._id).then((res) => {
      setQuan(res.product.quantity);
    });
  }, [data._id]);

  const [reload, setReload] = useState(false);

  return (
    <Row align="start" className={s.box__product} gutter={[0, 0]}>
      <Col span={10} lg={5} sm={7} className={s.box__product__image}>
        <Image
          src={data.images[0] ? data.images[0] : imgError}
          alt=""
          loading="lazy"
        />
      </Col>
      <Col
        span={14}
        lg={19}
        sm={17}
        className={s.box__product__content}
        push={1}
      >
        <Popover title={data.title} trigger="hover">
          <Link to={`/detail/${data._id}`}>
            <p className={s.box__product__title}>{data.product}</p>
          </Link>
        </Popover>
        <div className={s.box__product__desc}>
          {parse(`${data.description.content}`)}
        </div>
        <p className={s.box__product__voucher}>
          {data.sale && data.sale !== 0 && data.sale + "% Offs"}
        </p>

        {data.oldPrice && data.oldPrice !== 0 && (
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
                if (user.currentUser) {
                  addToWishList(user.currentUser.username, data._id).then(
                    (res) => {
                      setReload(!reload);
                    }
                  );
                } else {
                  message.error("Please sign in");
                }
              }}
            />
          </Popover>
          <button
            className={s.btnCart}
            onClick={() => {
              if (quan <= 0) {
                message.error(
                  "Hiện tại sản phẩm này không còn hàng tại chi nhánh nào"
                );
              } else {
                if (user.currentUser) {
                  handleAddToCart(
                    dispatch,
                    user.currentUser.username,
                    data._id
                  );
                } else {
                  message.error("Please sign in");
                }
              }
            }}
          >
            {quan <= 0 ? "Out of stock" : "Add to cart"}
          </button>
        </div>
      </Col>
    </Row>
  );
};
