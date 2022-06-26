import { Modal } from "antd";
import "antd/dist/antd.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, downQty, getAllProductCart, upQty } from "../../api/Cart";
import { getNumber } from "../../redux/cartRedux";
import numberWithCommas from "../../utils/numberWithCommas";
import classes from "./styles2.module.scss";
import EmptyPage from "../../components/Empty";
import { Link } from "react-router-dom";

export const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [update, setUpdate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setUpdate(false);

    if (user.currentUser != null) {
      getAllProductCart(user.currentUser.username).then((res) => {
        if (res) {
          // console.log(res);
          setProduct(res.products);
          dispatch(getNumber(res));
        }
      });
    }
  }, [cart]);

  return (
    <Modal centered visible={props.visible}>
      <div ref={props.aref} style={{ padding: "24px" }}>
        {product?.map((item, index) => {
          return (
            <React.Fragment key={index}>
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
                    <button
                      className={classes.sub}
                      onClick={() => {
                        setDisabled(false);
                        {
                          cart.isFetching === false &&
                            downQty(
                              dispatch,
                              user.currentUser.username,
                              item.productId
                            );
                        }
                      }}
                    >
                      <p className={classes.icon_sub}></p>
                    </button>
                    <p className={classes.count}>{item.quantity}</p>
                    <button
                      className={classes.add}
                      onClick={() => {
                        {
                          cart.isFetching === false &&
                            upQty(
                              dispatch,
                              user.currentUser.username,
                              item.productId
                            );
                        }
                      }}
                    >
                      <p className={classes.icon_add}></p>
                      <p className={classes.icon_add2}></p>
                    </button>

                    <p className={classes.result}>
                      {numberWithCommas(item.productPrice * item.quantity)}đ
                    </p>
                    <button
                      className={classes.delete}
                      onClick={() => {
                        {
                          cart.isFetching === false &&
                            deleteCart(
                              dispatch,
                              user.currentUser.username,
                              item.productId
                            );
                        }
                      }}
                    >
                      <box-icon
                        name="trash"
                        color="#d84727"
                        size="24px"
                        type="solid"
                      ></box-icon>
                    </button>
                  </div>
                </div>
              </div>{" "}
              <br />
            </React.Fragment>
          );
        })}

        <hr className={classes.line_deli} />
        <div className={classes.sub__total}>
          {/* <p className={classes.voucher}>35% OFF</p> */}
          <div className={classes.total}>
            <p className={classes.total__text}>Subtotal</p>
            <div className={classes.total__price}>
              {/* <p className={classes.total__price__voucher}>
                {numberWithCommas(totalPrice)}đ
                <span className={classes.line}></span>
              </p> */}
              <p className={classes.total__price__correct}>
                {numberWithCommas(cart.totalPrice)}đ
              </p>
            </div>
          </div>
        </div>
        <button className={classes.checkout} onClick={() => {}}>
          <Link to="/payment" className={classes.txt}>
            Checkout
          </Link>
        </button>
      </div>
    </Modal>
  );
};
