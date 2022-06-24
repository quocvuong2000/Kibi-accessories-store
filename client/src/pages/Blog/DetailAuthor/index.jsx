import React from "react";
import s from "./styles.module.scss";

const DetailAuthor = () => {
  return (
    <div className={s.detail}>
      <div className={s.date_time}>June 24, 2022</div>
      <div className={s.blog_author}>
        by <span className={s.name_author}>SponsoredPost</span>
      </div>
    </div>
  );
};

export default DetailAuthor;
