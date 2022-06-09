import React, { useEffect, useState } from "react";
import ProductView from "./ProductView";
import AllInfo from "./AllInfo";
import styles from "./styles.module.scss";
import { RelateProduct } from "./RelateProduct";
import { Brand } from "../../components/Brand";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/Product";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProduct(id)
      .then((value) => {
        if (value) {
          setProduct(value);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  });
  return (
    <div className={styles.backgroundContainer}>
      <ProductView data={product} />
      <AllInfo data={product} />
      <RelateProduct data={product} />
      <Brand />
    </div>
  );
};

export default Detail;
