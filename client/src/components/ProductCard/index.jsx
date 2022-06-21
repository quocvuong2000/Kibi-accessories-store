import React from "react";
import classes from "./styles.module.scss";
import PropsType from "prop-types";
import { Heart } from "phosphor-react";
import "antd/dist/antd.min.css";
import { Popover } from "antd";
import numberWithCommas from "../../utils/numberWithCommas";
import { Link } from "react-router-dom";
import { addToWishList } from "../../api/Wishlist";
import { useSelector } from "react-redux";
import imgDefault from "../../assets/imgDefault.webp";

const ProductCard = (props) => {
  const user = useSelector((state) => state.user);
  const data = props.data;

  return (
    <div className={classes.productCardContainer}>
      <div className={classes.top}></div>
      <div className={classes.bottom}>
        <Link to={`/detail/${data._id}`}>
          <div className={classes.image}>
            <img
              src={data.images[0]}
              alt={data.product}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = { imgDefault };
              }}
            />
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
              {numberWithCommas(data.price)}đ
            </div>
          </div>
        </Link>
        <div className={classes.btn}>
          <Heart
            color="#a94242"
            weight="thin"
            onClick={() => addToWishList(user.currentUser.username, data._id)}
          />
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
