import { useEffect, useState } from "react";
import { getProductHome } from "../../../api/Product";
import ProductCard from "../../../components/ProductCard";
import classes from "./styles.module.scss";

const MonthlyDeal = () => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    getProductHome().then((res) => {
      if (res) {
        setProduct(res);
      }
    });
  }, []);
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
