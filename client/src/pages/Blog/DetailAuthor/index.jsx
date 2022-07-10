import moment from "moment";
import React from "react";
import s from "./styles.module.scss";

const DetailAuthor = ({ item }) => {
  return (
    <div className={s.detail}>
      <div className={s.date_time}>
        {moment(item?.createdAt).format("MMM Do YY")}
      </div>
      <div className={s.blog_author}>
        by <span className={s.name_author}>{item?.author}</span>
      </div>
    </div>
  );
};

export default DetailAuthor;
