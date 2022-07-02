import React from "react";
import s from "./styles.module.scss";
import img1 from "../../../assets/blogproduct1.jpg";
import DetailAuthorOther from "../DetailAuthor/detailauthor";
const SmallBlog = () => {
  return (
    <div className={s.container}>
      <div className={s.image_blog}>
        <img src={img1} alt="" />
      </div>
      <div className={s.title}>
        Hands-On: Hermès Arceau Le Temps Voyageur Watch
      </div>
      <div className={s.author}>
        <DetailAuthorOther />
      </div>
    </div>
  );
};

export default SmallBlog;
