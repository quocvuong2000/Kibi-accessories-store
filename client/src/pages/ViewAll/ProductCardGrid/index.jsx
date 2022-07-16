import { message, Popover } from "antd";
import { Heart, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleAddToCart } from "../../../api/Cart";
import { getProduct } from "../../../api/Product";
import { addToWishList, checkExistsWishlist } from "../../../api/Wishlist";
import imgError from "../../../assets/imgDefault.webp";
import numberWithComas from "../../../utils/numberWithCommas";
import s from "./styles.module.scss";

export const ProductCardGrid = (props) => {
  const data = props.data;
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [exist, setExist] = useState(false);
  const [reload, setReload] = useState(false);
  const [quan, setQuan] = useState(0);
  useEffect(() => {
    user.currentUser &&
      checkExistsWishlist(user.currentUser.username, data._id).then((res) => {
        res === 200 && setExist(false);
        res === 201 && setExist(true);
      });
  }, [data, reload, user.currentUser]);

  useEffect(() => {
    getProduct(data._id).then((res) => {
      setQuan(res.product.quantity);
    });
  }, []);

  return (
    <div
      className={`${s.box__product} `}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {props.isWishlist && props.isWishlist === true && (
        <X
          size={20}
          weight="thin"
          className={`${s.delete_icon} ${show ? s.show_heart : s.hide_heart}`}
          onClick={() => {
            props.handle(user.currentUser.username, data._id);
          }}
        />
      )}
      <Link to={`/detail/${data._id}`}>
        <div className={s.box__product__image}>
          <img
            src={data.images && data.images[0] ? data.images[0] : imgError}
            alt=""
            loading="lazy"
            onError={(e) => (
              (e.target.onerror = null), (e.target.src = imgError)
            )}
          />
        </div>
      </Link>
      <div
        className={`${s.add_to_wish} ${show ? s.show_heart : s.hide_heart}`}
        onClick={() => {
          if (user.currentUser) {
            addToWishList(user.currentUser.username, data._id).then((res) => {
              setReload(!reload);
            });
          } else {
            message.error("Please sign in");
          }
        }}
      >
        {exist === false ? (
          <Heart size={20} />
        ) : (
          <Heart size={20} weight="fill" color="red" />
        )}
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
          <p
            className={`${s.txt_add} ${show ? s.show_txt : s.hide_txt}`}
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
            {quan <= 0 ? "Out of stock" : "+Add to cart"}
          </p>
        )}
      </div>
    </div>
  );
};
