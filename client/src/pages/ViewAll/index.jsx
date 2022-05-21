import React from "react";
import styles from "./styles.module.scss";
import ListProduct from "./ListProduct";

const ViewAll = () => {
  return (
    <div className={styles.backgroundContainer}>
      <ListProduct />
    </div>
  );
};

export default ViewAll;
