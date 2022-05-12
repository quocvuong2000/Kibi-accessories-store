import { Modal } from "antd";
import React from "react";
import "antd/dist/antd.css";
import classes from "./styles.module.scss";
import item1 from "../../assets/cart/item1.png";

export const Cart = (props) => {
  return (
    <Modal centered visible={props.visible}>
      <div ref={props.aref} style={{ padding: "24px" }}>
        <div className={classes.cart__item}>
          <div className={classes.cart__item__left}>
            <div className={classes.cart__item__left__image}>
              <img src={item1} alt="item" />
            </div>
            <div className={classes.cart__item__left__info}>
              <p className={classes.title}>Way Kambas Mini Ebony</p>
              <p className={classes.voucher}>
                Rp 1.280.000
                <span className={classes.line}></span>
              </p>
              <p className={classes.price}>Rp 1.024.000</p>
              <p className={classes.detail}>Custom Engrave</p>
            </div>
          </div>
          <div className={classes.cart__item__right}>
            <p className={classes.cart__item__right__select}>
              Select Packaging
            </p>
            <select className={classes.cart__item__right__price}>
              <option
                value="1"
                className={classes.cart__item__right__price__item}
              >
                Wooden Packaging (Rp 50.000)
              </option>
            </select>
            <div className={classes.cart__item__right__option}>
              <div className={classes.sub} onClick={props.downQty}>
                <p className={classes.icon_sub}></p>
              </div>
              <p className={classes.count}>{props.qty}</p>
              <div className={classes.add} onClick={props.upQty}>
                <p className={classes.icon_add}></p>
                <p className={classes.icon_add2}></p>
              </div>

              <p className={classes.result}>Rp 2.048.000</p>
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
        </div>
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
              <p className={classes.total__price__correct}>Rp 2.152.000</p>
            </div>
          </div>
        </div>
        <button className={classes.checkout}>Checkout</button>
      </div>
    </Modal>
  );
};
