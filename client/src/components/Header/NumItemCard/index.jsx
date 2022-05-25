import React from "react";
import styles from "./styles.module.scss";

const NumItem = (props) => {
  return (
    <div className={styles.container}>
      <p className={styles.num}>{props.item}</p>
    </div>
  );
};

export default NumItem;
