import React from "react";
import product1 from "../../../assets/home/monthly/image 9.png";
import product2 from "../../../assets/home/monthly/image 10.png";
import ProductCard from "../../../components/ProductCard";
import classes from "./styles.module.scss";
import { ProductCardList } from "../ProductCardList";
const fakeProduct = [
  {
    title: "Singo Maple asdsa sada",
    saleOff: "20% Off",
    image: product1,
    oldPrice: "1.500.000 VND",
    newPrice: "1.264.000 VND",
  },
  {
    title: "Singo Maple",
    saleOff: "20% Off",
    image: product2,
    oldPrice: "1.500.000 VND",
    newPrice: "1.264.000 VND",
  },
  {
    title: "Singo Maple",
    saleOff: "20% Off",
    image: product1,
    oldPrice: "1.500.000 VND",
    newPrice: "1.264.000 VND",
  },
  {
    title: "Singo Maple",
    saleOff: "20% Off",
    image: product2,
    oldPrice: "1.500.000 VND",
    newPrice: "1.264.000 VND",
  },
];
const ListProduct = () => {
  return (
    <div className={classes.container}>
      {/* <div className={classes.title}>Category</div> */}
      <div className={classes.image__wrap}>
        <img
          src="https://matoa-indonesia.com/wp-content/uploads/2022/05/Req-10-01-1-scaled.jpg"
          alt=""
        />
      </div>
      <div className={classes.listItem}>
        {fakeProduct.slice(0, 4).map((item, index) => {
          return <ProductCardList data={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ListProduct;
