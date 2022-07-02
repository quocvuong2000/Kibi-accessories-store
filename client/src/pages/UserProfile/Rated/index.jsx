import React from "react";
import s from "./styles.module.scss";

const Rated = () => {
  return (
    <div className={s.container}>
      <div className={s.one_content}>
        <div className={s.image}></div>
        <div className={s.box_comment}>
          <p className={s.username}></p>
          <p className={s.content_comment}></p>
        </div>
      </div>
    </div>
  );
};

export default Rated;
