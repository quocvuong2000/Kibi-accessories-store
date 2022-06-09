import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { getFourProduct } from "../HomeApi";
import classes from "./styles.module.scss";

const MonthlyDeal = () => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    getFourProduct().then((res) => {
      if (res) {
        setProduct(res);
      }
    });
  });
  console.log(product);
  return (
    <div className={classes.mothlyDealContainer}>
      <div className={classes.title}>Monthly Deals</div>
      <div className={classes.listItem}>
        {product.products?.map((item, index) => {
          return <ProductCard data={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default MonthlyDeal;
