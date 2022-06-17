import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import imgMain from "../../../assets/detail/watch_main.png";
import pre2 from "../../../assets/detail/preview_prod_2.png";
import pre3 from "../../../assets/detail/preview_prod_3.png";
import pre4 from "../../../assets/detail/preview_prod_4.png";
import model1 from "../../../assets/detail/model1.png";
import model2 from "../../../assets/detail/model2.png";
import { ShoppingCartSimple } from "phosphor-react";
import { Row, Col } from "antd";
import { motion } from "framer-motion";
import numberWithCommas from "../../../utils/numberWithCommas";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../../redux/apiCalls";
import { addCartSuccess } from "../../../redux/cartRedux";
import { getAllProductCart } from "../../../api/Cart";

const listImgPreview = [
  {
    src: imgMain,
  },
  {
    src: pre2,
  },
  {
    src: pre3,
  },
  {
    src: pre4,
  },
];

const ProductView = (props) => {
  const [src, setSrc] = useState(imgMain);
  const [srcMain, setSrcMain] = useState(imgMain);
  const [show, setShow] = useState(false);
  const [qty, setQty] = useState(1);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setSrcMain(src);
    setShow(true);
  }, [src]);

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
  const [wrongCredentials, setWrongCredential] = React.useState(false);

  const handleAddToCart = async () => {
    addCart(dispatch, user.currentUser.username, props.data.product._id)
      .then((res) => {
        setWrongCredential(false);
        message.success("Add success");
      })
      .finally(() => {
        getAllProductCart().then((res) => {
          console.log(res);
          dispatch(addCartSuccess(res));
        });
      })
      .catch(() => {
        setWrongCredential(true);
      });
  };

  return (
    <Col className={`${styles.container}`}>
      <p className={styles.link__to__product}>
        Home / Product / Watches /{" "}
        <span className={styles.name__product}>
          {props.data.product.product ?? ""}{" "}
        </span>
      </p>
      <Row className={styles.frame_product}>
        <Col span={12} className={styles.preview_product}>
          <Row className={styles.frame_img_preview} gutter={[0, 24]}>
            {listImgPreview.map((item, id) => {
              return (
                <Col span={24} className={styles.img_preview} key={id}>
                  <motion.div
                    animate={{
                      scaleX: [1.5, 1],
                      scaleY: [1.5, 1],
                    }}
                  >
                    <img
                      src={item.src}
                      alt=""
                      onClick={handleClickSrcImagePreview}
                    />
                  </motion.div>
                </Col>
              );
            })}
            <div
              className={`${styles.img_main} ${
                show === true ? styles.show : ""
              }`}
              onAnimationEnd={handleAnimation}
            >
              <img src={srcMain} alt="watch" />
            </div>
          </Row>
        </Col>

        <Col span={12} className={styles.frame_info_product} push={5}>
          <Col className={styles.info_product}>
            <p className={styles.title}>{props.data.product.product ?? ""}</p>
            {props.data.product.odlprice ? (
              <p className={styles.price_before}>
                Rp 1.280.000
                <span className={styles.line}></span>
              </p>
            ) : (
              ""
            )}

            <p className={styles.price_after}>
              {numberWithCommas(props.data.product.price) ?? ""}đ
            </p>
            <Col className={styles.model}>
              <p className={styles.title_modle}>Choose Model</p>
              <Row className={styles.frame_model}>
                <div className={styles.item_model}>
                  <img src={model1} alt="" className={styles.bo} />
                </div>
                <div className={styles.item_model}>
                  <img src={model2} alt="" className={styles.bo} />
                </div>
              </Row>
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
              <button className={styles.add_to_cart} onClick={handleAddToCart}>
                <ShoppingCartSimple size={20} /> Add to cart
              </button>

              <button className={styles.buy_now}>Buy now</button>
            </Row>
          </Col>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductView;
