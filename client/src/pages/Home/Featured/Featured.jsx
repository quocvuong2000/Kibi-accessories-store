import React from "react";
import classes from "./styles.module.scss";
import watch1 from "../../../assets/home/featured/image 15.png";
import watch2 from "../../../assets/home/featured/image 17.png";
import watch3 from "../../../assets/home/featured/image 20.png";
import FeaturedCard from "../../../components/FeaturedCard";
import "antd/dist/antd.min.css";
import { Carousel } from "antd";

const products = [
  {
    display: "Way Kambas Maple",
    price: "1.280.000 đ",
    img: watch1,
  },
  {
    display: "Way Kambas Maple",
    price: "1.280.000 đ",
    img: watch1,
  },
  {
    display: "Way Kambas Maple",
    price: "1.280.000 đ",
    img: watch1,
  },
  {
    display: "Tomia Ebony",
    price: "960.000 đ",
    img: watch2,
  },
  {
    display: "Tomia Ebony",
    price: "960.000 đ",
    img: watch2,
  },
  {
    display: "Tomia Ebony",
    price: "960.000 đ",
    img: watch2,
  },
  {
    display: "Sikka (Ebony & Maple)",
    price: "1.198.000 đ",
    img: watch3,
  },
  {
    display: "Sikka (Ebony & Maple)",
    price: "1.198.000 đ",
    img: watch3,
  },
  {
    display: "Sikka (Ebony & Maple)",
    price: "1.198.000 đ",
    img: watch3,
  },
];
function onChange(a, b, c) {
  // console.log(a, b, c);
}
const Featured = () => {
  return (
    <>
      <div className={classes.featuredContainer}>
        <div className={classes.featuredItem}>
          <div className={classes.title}>Maple Series</div>
          <div className={classes.featuredList}>
            {products.slice(0, 3).map((item, index) => {
              return <FeaturedCard item={item} key={index} />;
            })}
          </div>
        </div>
        <div className={classes.featuredItem}>
          <div className={classes.title}>Ebony Series</div>
          <div className={classes.featuredList}>
            {products.slice(3, 6).map((item, index) => {
              return <FeaturedCard item={item} key={index} />;
            })}
          </div>
        </div>
        <div className={classes.featuredItem}>
          <div className={classes.title}>Featured</div>
          <div className={classes.featuredList}>
            {products.slice(6, 9).map((item, index) => {
              return <FeaturedCard item={item} key={index} />;
            })}
          </div>
        </div>
      </div>
      <div className={classes.featuredMobile}>
        <Carousel afterChange={onChange}>
          <div>
            <div className={classes.featuredItem}>
              <div className={classes.title}>Maple Series</div>
              <div className={classes.featuredList}>
                {products.slice(0, 3).map((item, index) => {
                  return <FeaturedCard item={item} key={index} />;
                })}
              </div>
            </div>
          </div>

          <div>
            <div className={classes.featuredItem}>
              <div className={classes.title}>Ebony Series</div>
              <div className={classes.featuredList}>
                {products.slice(3, 6).map((item, index) => {
                  return <FeaturedCard item={item} key={index} />;
                })}
              </div>
            </div>
          </div>
          <div>
            <div className={classes.featuredItem}>
              <div className={classes.title}>Featured</div>
              <div className={classes.featuredList}>
                {products.slice(6, 9).map((item, index) => {
                  return <FeaturedCard item={item} key={index} />;
                })}
              </div>
            </div>
          </div>
        </Carousel>
      </div>
      <div className={classes.seeMore}>
        <div className={classes.line}></div>
        <div className={classes.btn}>See More</div>
        <div className={classes.line}></div>
      </div>
    </>
  );
};

export default Featured;
