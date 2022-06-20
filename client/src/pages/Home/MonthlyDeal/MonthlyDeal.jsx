import { useEffect, useState } from "react";
import { getLimitProduct } from "../../../api/Product";
import { ProductCardGrid } from "../../ViewAll/ProductCardGrid";
import classes from "./styles.module.scss";

const MonthlyDeal = () => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    getLimitProduct(4).then((res) => {
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
          return <ProductCardGrid data={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default MonthlyDeal;
