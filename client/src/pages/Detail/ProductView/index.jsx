import { Col, message, Rate, Row } from "antd";
import { motion } from "framer-motion";
import { ShoppingCartSimple, Timer } from "phosphor-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAddToCart } from "../../../api/Cart";
import imgError from "../../../assets/imgDefault.webp";
import numberWithCommas from "../../../utils/numberWithCommas";
import styles from "./styles.module.scss";
import { useWindowSize } from "../../../customHook/useWindowSize";

const ProductView = (props) => {
  const [src, setSrc] = useState(props.data.product.images[0]);
  const [srcMain, setSrcMain] = useState(props.data.product.images[0]);
  const [show, setShow] = useState(false);
  const [qty, setQty] = useState(1);
  const [width, height] = useWindowSize();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setSrcMain(src);
    setShow(true);
  }, [src]);
  useEffect(() => {
    setSrc(props.data.product.images[0]);
  }, [props.data]);

  const handleClickSrcImagePreview = (e) => {
    setSrc(e.target.src);
    setShow(true);
  };

  const handleAnimation = (e) => {
    setShow(false);
  };

  const handleQuantity = (type) => {
    if (type === "desc") {
      qty > 1 && setQty(qty - 1);
    } else {
      setQty(qty + 1);
    }
  };

  return (
    <Col className={`${styles.container}`}>
      <p className={styles.link__to__product}>
        Home / Product / Watches /{" "}
        <span className={styles.name__product}>
          {props.data.product.product ?? ""}{" "}
        </span>
      </p>
      <div className={styles.frame_product}>
        <Col span={24} lg={7} sm={24} className={styles.preview_product}>
          <div
            className={`${styles.img_main} ${show === true ? styles.show : ""}`}
            onAnimationEnd={handleAnimation}
          >
            <motion.div
              animate={{
                scaleX: [1.5, 1],
                scaleY: [1.5, 1],
              }}
            >
              <img src={srcMain ? srcMain : imgError} alt="watch" />
            </motion.div>
          </div>
          <div className={styles.img_preview}>
            {props.data.product.images?.map((item, id) => {
              return (
                <motion.div
                  animate={{
                    scaleX: [1.5, 1],
                    scaleY: [1.5, 1],
                  }}
                >
                  <img src={item} alt="" onClick={handleClickSrcImagePreview} />
                </motion.div>
              );
            })}
          </div>
        </Col>

        <Col
          span={24}
          lg={17}
          sm={24}
          className={styles.frame_info_product}
          push={5}
        >
          <Col className={styles.info_product}>
            <p className={styles.title}>{props.data.product.product ?? ""}</p>

            {props.data.product.sale ? (
              <>
                <p className={styles.price_before}>
                  {numberWithCommas(
                    (props.data.product.price * 100) /
                      (100 - props.data.product.sale)
                  )}
                  đ<span className={styles.line}></span>
                </p>
                <p className={styles.price_after}>
                  {numberWithCommas(props.data.product.price) ?? ""}đ
                </p>
              </>
            ) : (
              <p className={styles.price_after}>
                {numberWithCommas(props.data.product.price) ?? ""}đ
              </p>
            )}

            <Col
              style={
                width <= 1024
                  ? {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }
                  : ""
              }
            >
              <Rate disabled value={props.data.product.avgRating} />
            </Col>
            <Row className={styles.function}>
              <Row className={styles.qty}>
                <div
                  className={styles.sub}
                  onClick={() => handleQuantity("desc")}
                >
                  <p className={styles.icon_sub}></p>
                </div>
                <p className={styles.count}>{qty}</p>
                <div className={styles.add} onClick={handleQuantity}>
                  <p className={styles.icon_add}></p>
                  <p className={styles.icon_add2}></p>
                </div>
              </Row>
              {/* onClick={handleAddToCart} */}
              {props.data?.product && props.data?.product.quantity > 0 ? (
                <button
                  className={styles.add_to_cart}
                  onClick={() => {
                    if (user.currentUser) {
                      handleAddToCart(
                        dispatch,
                        user.currentUser.username,
                        props.data.product._id,
                        qty
                      );
                    } else {
                      message.error("Please sign in");
                    }
                  }}
                >
                  <ShoppingCartSimple size={20} /> Add to cart
                </button>
              ) : (
                <button
                  className={styles.add_to_cart}
                  style={{ cursor: "auto" }}
                >
                  <Timer size={20} /> Coming soon
                </button>
              )}

              <button className={styles.buy_now}>Watch more</button>
            </Row>
          </Col>
        </Col>
      </div>
    </Col>
  );
};

export default ProductView;
