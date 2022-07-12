import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import watch from "../../../assets/home/image 6.png";
import {
  ArrowSquareLeft,
  ArrowSquareRight,
  ShoppingCart,
  Watch,
} from "phosphor-react";
import WaveAnimation from "../../../components/WaveAnimation";
import { getThreeProduct } from "../HomeApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddToCart } from "../../../api/Cart";
import { message } from "antd";
const carouselData = [
  {
    display: "WAY KAMBAS MINI EBONY",
    desc: "MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
    image: watch,
    color: "#F1DDC9",
  },
  {
    display: "WAY KAMBAS MINI E1BONY",
    desc: "MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
    image: watch,
    color: "#F1DDC9",
  },
  {
    display: "WAY KAMBAS MINI E2BONY",
    desc: "MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
    image: watch,
    color: "#F1DDC9",
  },
];

const Carousel = () => {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getThreeProduct().then((res) => {
      setProductList(res.products);
    });
  }, []);

  const getImage = (index) => {
    switch (index) {
      case 0:
        return watch;
      case 1:
        return watch;
      case 2:
        return watch;
      default:
        break;
    }
  };

  const [active, setActive] = useState(0);
  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.carouselContainer}>
        {productList?.map((item, index) => {
          return (
            <div
              className={`${classes.carouselItem} ${
                active === index && classes.active
              }`}
              key={index}
            >
              <div className={classes.left}>
                <img src={getImage(index)} alt="" />
              </div>
              <div className={classes.right}>
                <div className={classes.infoContainer}>
                  <div className={classes.title}>{item.product}</div>
                  <div className={classes.line}></div>
                  <div className={classes.desc}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Libero unde cupiditate, hic natus eligendi tempore veniam
                    impedit placeat laudantium ab voluptatibus rem quasi non,
                    eius et voluptatum officia, illum adipisci.
                  </div>
                  <div className={classes.btn}>
                    <button
                      className={classes.addToCart}
                      onClick={() => {
                        if (user.currentUser) {
                          handleAddToCart(
                            dispatch,
                            user.currentUser.username,
                            item._id
                          );
                        } else {
                          message.error("Please sign in");
                        }
                      }}
                    >
                      <ShoppingCart size={20} weight="light" />
                      Add to cart
                    </button>
                    <button className={classes.watchMore}>
                      <Watch size={20} weight="light" />
                      Watch more
                    </button>
                  </div>
                  <div className={classes.sliderBtn}>
                    <ArrowSquareLeft
                      size={32}
                      color="#D84727"
                      weight="fill"
                      onClick={() => {
                        setActive(
                          active <= 0 ? carouselData.length - 1 : active - 1
                        );
                      }}
                    />
                    <ArrowSquareRight
                      size={32}
                      color="#D84727"
                      weight="fill"
                      onClick={() => {
                        setActive(
                          active === carouselData.length - 1 ? 0 : active + 1
                        );
                      }}
                    />
                  </div>
                  <WaveAnimation absolute={true}></WaveAnimation>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
