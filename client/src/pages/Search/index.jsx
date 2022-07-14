import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ListProduct from "../ViewAll/ListProduct";
import { useParams } from "react-router-dom";
import { searchProduct } from "../../api/Product";
import AppLoader from "../../components/AppLoader";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const timeout = useRef(null);
  const { kw } = useParams();
  useEffect(() => {
    console.log("kw", kw);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      searchProduct(kw)
        .then((res) => {
          if (res) {
            // console.log("res", res);
            setProduct(res.products);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, [kw]);
  return (
    <div className={styles.backgroundContainer}>
      {loading && <AppLoader />}
      <ListProduct data={product} />
    </div>
  );
};

export default Search;
