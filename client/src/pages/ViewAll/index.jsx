import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ListProduct from "./ListProduct";
import { useParams } from "react-router-dom";
import { getAllProduct } from "../../api/Product";
import AppLoader from "../../components/AppLoader";
import { message } from "antd";

const ViewAll = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const { idCate } = useParams();
  useEffect(() => {
    setLoading(true);
    getAllProduct(idCate)
      .then((res) => {
        document.getElementsByTagName("body").overflow = "hidden";
        if (res) {
          setProduct(res);
        }
      })
      .catch(() => {
        message.error("Loading list failure");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idCate]);
  return (
    <>
      <div className={styles.backgroundContainer}>
        <ListProduct data={product} loading={loading} />
      </div>
    </>
  );
};

export default ViewAll;
