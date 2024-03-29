import { Empty, message, Modal } from "antd";
import "antd/dist/antd.min.css";
import { Trash } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart, downQty, getAllProductCart, upQty } from "../../api/Cart";
import imgError from "../../assets/imgDefault.webp";
import { getNumber } from "../../redux/cartRedux";
import numberWithCommas from "../../utils/numberWithCommas";
import AppLoader from "../AppLoader";
import classes from "./styles2.module.scss";
import Cookies from "js-cookie";
export const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const token = Cookies.get("tokenClient");
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (user.currentUser !== null && user.currentUser !== undefined && token) {
      getAllProductCart(user.currentUser.username)
        .then((res) => {
          if (res) {
            setProduct(res.products);
            dispatch(getNumber(res));
          }
        })
        .finally(() => {
          props.setIsLoading(false);
        });
    }
  }, [cart]);

  return (
    <Modal centered visible={props.visible}>
      {props.isLoading === true && <AppLoader />}
      <div ref={props.aref} style={{ padding: "24px" }}>
        <div className={classes.box_cart_item}>
          {product.length > 0 ? (
            product?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className={classes.cart__item} key={index}>
                    <div className={classes.cart__item__left}>
                      <div className={classes.cart__item__left__image}>
                        <img
                          src={item.productImage[0] || imgError}
                          alt={item.productName}
                        />
                      </div>
                      <div className={classes.cart__item__left__info}>
                        <p className={classes.title}>{item.productName}</p>

                        <p className={classes.price}>
                          {numberWithCommas(item.productPrice)}đ
                        </p>
                      </div>
                    </div>
                    <div className={classes.cart__item__right}>
                      <div className={classes.cart__item__right__option}>
                        <button
                          className={classes.sub}
                          onClick={() => {
                            cart.isFetching === false &&
                              downQty(
                                dispatch,
                                user.currentUser.username,
                                item.productId
                              );
                          }}
                        >
                          <p className={classes.icon_sub}></p>
                        </button>
                        <p className={classes.count}>{item.quantity}</p>
                        <button
                          className={classes.add}
                          onClick={() => {
                            props.setIsLoading(true);
                            cart.isFetching === false &&
                              upQty(
                                dispatch,
                                user.currentUser.username,
                                item.productId
                              ).finally(() => {
                                props.setIsLoading(false);
                              });
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
                            props.setIsLoading(true);
                            cart.isFetching === false &&
                              deleteCart(
                                dispatch,
                                user.currentUser.username,
                                item.productId
                              ).finally(() => props.setIsLoading(false));
                          }}
                        >
                          <Trash size={24} weight="bold" color="#d84727" />
                        </button>
                      </div>
                    </div>
                  </div>{" "}
                  <br />
                </React.Fragment>
              );
            })
          ) : (
            <Empty />
          )}
        </div>
        <hr className={classes.line_deli} />
        <div className={classes.sub__total}>
          <div className={classes.total}>
            <p className={classes.total__text}>Subtotal</p>
            <div className={classes.total__price}>
              <p className={classes.total__price__correct}>
                {numberWithCommas(cart.totalPrice)}đ
              </p>
            </div>
          </div>
        </div>
        <button className={classes.checkout}>
          {product.length > 0 ? (
            <Link
              to="/checkout"
              className={classes.txt}
              onClick={() => props.setVisible(false)}
            >
              Checkout
            </Link>
          ) : (
            <div
              className={classes.txt}
              onClick={() => {
                message.error("Please add something");
              }}
            >
              Checkout
            </div>
          )}
        </button>
      </div>
    </Modal>
  );
};
