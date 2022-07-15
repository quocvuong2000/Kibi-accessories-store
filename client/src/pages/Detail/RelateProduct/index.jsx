import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { getLimitProduct } from "../../../api/Product";
import { ProductCardGrid } from "../../ViewAll/ProductCardGrid";
import styles from "./styles.module.scss";
export const RelateProduct = (props) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    getLimitProduct(4).then((value) => {
      setProduct(value);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.relate}>
        <p className={styles.relate__title}>
          <FormattedMessage id="common.relateproduct" />
        </p>
        <hr className={styles.line} />
        <div className={styles.relate__frame__product}>
          {product.products?.map((item, id) => {
            return <ProductCardGrid data={item} key={id} />;
          })}
        </div>
      </div>
    </div>
  );
};
