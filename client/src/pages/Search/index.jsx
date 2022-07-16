import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ListProduct from "../ViewAll/ListProduct";
import { useParams } from "react-router-dom";
import { getAllProduct, searchProduct } from "../../api/Product";
import AppLoader from "../../components/AppLoader";
import { getBrand } from "../../api/Brand";
import { message } from "antd";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({});
  const timeout = useRef(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [listBrand, setListBrand] = useState([]);
  const { kw } = useParams();
  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      searchProduct(kw)
        .then((res) => {
          if (res) {
            setProduct(res);
            setProductList(res.products);
            setTotalPages(res.totalPages);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, [kw]);

  useEffect(() => {
    getBrand().then((res) => {
      if (res.status === 200) {
        setListBrand(res.data);
      }
    });
  }, []);

  const handleFilter = (name, idBrand, fromPrice, toPrice, rating) => {
    setLoading(true);
    getAllProduct("", 1, name, idBrand, fromPrice, toPrice, rating)
      .then((res) => {
        document.getElementsByTagName("body").overflow = "hidden";
        if (res) {
          setProduct(res);
          setProductList(res.products);
          setTotalPages(res.totalPages);
        }
      })
      .catch(() => {
        message.error("Loading list failure");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className={styles.backgroundContainer}>
      {loading && <AppLoader />}
      <ListProduct
        data={product}
        listProduct={productList}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        handleFilter={handleFilter}
        listBrand={listBrand}
      />
    </div>
  );
};

export default Search;
