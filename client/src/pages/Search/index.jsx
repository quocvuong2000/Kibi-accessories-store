import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ListProduct from "../ViewAll/ListProduct";
import { useParams } from "react-router-dom";
import { searchProduct } from "../../api/Product";
import AppLoader from "../../components/AppLoader";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const { kw } = useParams();
  useEffect(() => {
    searchProduct(kw)
      .then((res) => {
        if (res) {
          setProduct(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [kw]);
  return (
    <div className={styles.backgroundContainer}>
      {loading && <AppLoader />}
      <ListProduct data={product} />
    </div>
  );
};

export default Search;
