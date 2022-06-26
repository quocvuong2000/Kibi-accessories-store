import React from "react";
import s from "./styles.module.scss";
import empty from "../../assets/empty-state-illustrations.gif";

const EmptyPage = () => {
  return (
    <div className={s.container}>
      <div className={s.img_error}>
        <img src={empty} alt="" />
      </div>
      <p className={s.txt_error}>Nothing </p>
    </div>
  );
};

export default EmptyPage;
