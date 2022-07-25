import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/Product";
import { addViewed } from "../../api/Viewed";
import AppLoader from "../../components/AppLoader";
import AllInfo from "./AllInfo";
import Comment from "./Comment";
import ProductView from "./ProductView";
import { RelateProduct } from "./RelateProduct";
import styles from "./styles.module.scss";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    document.title = "KIBI | Detail";
    window.scrollTo(0, 0);
  }, []);
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
          <Empty />
        )}
      </div>
    </>
  );
};

export default Detail;
