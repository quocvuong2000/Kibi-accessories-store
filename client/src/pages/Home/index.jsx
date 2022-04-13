import React from "react";
import classes from "./styles.module.scss";
import watch from "../../assets/home/image 6.png";
import {ShoppingCart, Watch} from 'phosphor-react'
import WaveAnimation from "../../components/WaveAnimation";
const caroselData = [
  {
    display: "WAY KAMBAS MINI EBONY",
    desc: "MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
    image: watch,
    color: "#F1DDC9",
  },
  {
    display: "WAY KAMBAS MINI EBONY",
    desc: "MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
    image: watch,
    color: "#F1DDC9",
  },
  {
    display: "WAY KAMBAS MINI EBONY",
    desc: "MATOA Way Kambas - This wood is chosen to represent the Sumatran Rhino's skin which is designed with an overlap effect on its strap to represent Rhino's skin.",
    image: watch,
    color: "#F1DDC9",
  },
];

const Home = () => {
  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.caroselContainer}>
        {caroselData.map((item, index) => {
          return (
            <div className={classes.caroselItem} key={index}>
              <div className={classes.left}>
                <img src={item.image} alt="" />
              </div>
              <div className={classes.right}>
                <div className={classes.infoContainer}>
                  <div className={classes.title}>
                    {item.display}
                  </div>
                  <div className={classes.line}></div>
                  <div className={classes.desc}>
                    {item.desc}
                  </div>
                  <div className={classes.btn}>
                    <button className={classes.addToCart}>
                    <ShoppingCart size={20} weight="light" />
                      Add to cart</button>
                    <button className={classes.watchMore}>
                    <Watch size={20} weight="light" />
                      Watch more</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <WaveAnimation></WaveAnimation>
      </div>
    </div>
  );
};

export default Home;
