import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import classes from "./styles2.module.scss";
import item1 from "../../assets/cart/item1.png";
import { useSelector } from "react-redux";
import numberWithCommas from "../../utils/numberWithCommas";
import { getAllProductCart } from "../../api/Cart";

export const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  // const token = Cookies.get("token");

  const [product, setProduct] = useState([]);
  useEffect(() => {
    if (user.currentUser != null) {
      getAllProductCart(user.currentUser.username).then((res) => {
        if (res) {
          setProduct(res.products);
        }
      });
    }
  }, []);

  console.log(product);

  return (
    <Modal centered visible={props.visible}>
      <div ref={props.aref} style={{ padding: "24px" }}>
        {product?.map((item, index) => {
          return (
            <>
              <div className={classes.cart__item} key={index}>
                <div className={classes.cart__item__left}>
                  <div className={classes.cart__item__left__image}>
                    <img src={item.productImage[0]} alt={item.productName} />
                  </div>
                  <div className={classes.cart__item__left__info}>
                    <p className={classes.title}>{item.productName}</p>
                    {/* <p className={classes.voucher}>
                    Rp {item.priceVoucher}
                    <span className={classes.line}></span>
                  </p> */}
                    <p className={classes.price}>
                      {numberWithCommas(item.productPrice)}đ
                    </p>
                    {/* <p className={classes.detail}>{item.cate}</p> */}
                  </div>
                </div>
                <div className={classes.cart__item__right}>
                  {/* <p className={classes.cart__item__right__select}>
                  Select Packaging
                </p>
                <select className={classes.cart__item__right__price}>
                  <option
                    value="1"
                    className={classes.cart__item__right__price__item}
                  >
                    {item.option}
                  </option>
                </select> */}
                  <div className={classes.cart__item__right__option}>
                    <div
                      className={classes.sub}
                      onClick={() => {
                        item.quantity > 1 && item.quantity--;
                      }}
                    >
                      <p className={classes.icon_sub}></p>
                    </div>
                    <p className={classes.count}>{item.quantity}</p>
                    <div
                      className={classes.add}
                      onClick={() => {
                        item.quantity += 1;
                      }}
                    >
                      <p className={classes.icon_add}></p>
                      <p className={classes.icon_add2}></p>
                    </div>

                    <p className={classes.result}>
                      {numberWithCommas(item.productPrice * item.quantity)}đ
                    </p>
                    <div className={classes.delete}>
                      <box-icon
                        name="trash"
                        color="#d84727"
                        size="24px"
                        type="solid"
                      ></box-icon>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <br />
            </>
          );
        })}

        <hr className={classes.line_deli} />
        <div className={classes.sub__total}>
          <p className={classes.voucher}>35% OFF</p>
          <div className={classes.total}>
            <p className={classes.total__text}>Subtotal</p>
            <div className={classes.total__price}>
              <p className={classes.total__price__voucher}>
                Rp 3.312.000
                <span className={classes.line}></span>
              </p>
              <p className={classes.total__price__correct}>
                {numberWithCommas(cart.total)}
              </p>
            </div>
          </div>
        </div>
        <button className={classes.checkout}>Checkout</button>
      </div>
    </Modal>
  );
};
