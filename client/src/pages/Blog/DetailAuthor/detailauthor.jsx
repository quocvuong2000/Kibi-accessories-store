import moment from "moment";
import React from "react";
import s from "./styles.module.scss";

const DetailAuthorOther = ({ item }) => {
  return (
    <div className={s.detail_other}>
      <div className={s.date_time_other}>
        {moment(item?.createdAt).format("MMM Do YY")}
      </div>
      <div className={s.blog_author_other}>
        by <span className={s.name_author_other}>{item?.author}</span>
      </div>
    </div>
  );
};

export default DetailAuthorOther;
