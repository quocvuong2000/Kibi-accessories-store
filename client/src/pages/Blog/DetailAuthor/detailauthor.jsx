import React from "react";
import s from "./styles.module.scss";

const DetailAuthorOther = () => {
  return (
    <div className={s.detail_other}>
      <div className={s.date_time_other}>June 24, 2022</div>
      <div className={s.blog_author_other}>
        by <span className={s.name_author_other}>SponsoredPost</span>
      </div>
    </div>
  );
};

export default DetailAuthorOther;
