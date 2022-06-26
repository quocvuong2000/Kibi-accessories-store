import React, { useEffect, useState } from "react";
import ProductView from "./ProductView";
import AllInfo from "./AllInfo";
import styles from "./styles.module.scss";
import { RelateProduct } from "./RelateProduct";
import { Brand } from "../../components/Brand";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/Product";
import AppLoader from "../../components/AppLoader";
import Comment from "./Comment";
import { addViewed } from "../../api/Viewed";
import { useSelector } from "react-redux";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    getProduct(id)
      .then((value) => {
        if (value) {
          setProduct(value);
        }
      })
      .finally(() => {
        user.currentUser &&
          addViewed(user.currentUser.username, id)
            .then((res) => {})
            .finally(() => {
              setLoading(false);
            });
        !user.currentUser && setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading && <AppLoader />}
      <div className={styles.backgroundContainer}>
        {product.product ? (
          <>
            <ProductView data={product} />
            <AllInfo data={product} />
            <Comment data={product} />
            <RelateProduct data={product} />
          </>
        ) : (
          <p>Không có gì</p>
        )}
        <Brand />
      </div>
    </>
  );
};

export default Detail;
