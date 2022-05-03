import React from "react";
import ProductView from "./ProductView";
import AllInfo from "./AllInfo";
import styles from "./styles.module.scss";
import { RelateProduct } from "./RelateProduct";
import { Brand } from "../../components/Brand";

const Detail = () => {
  return (
    <div className={styles.backgroundContainer}>
      <ProductView />
      <AllInfo />
      <RelateProduct />
      <Brand />
    </div>
  );
};

export default Detail;
