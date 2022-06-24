import React from "react";
import s from "./styles.module.scss";
import blogmain from "../../assets/blogmain.jpg";
import { Link } from "react-router-dom";
import DetailAuthor from "./DetailAuthor";

const Blog = () => {
  return (
    <div className={s.blog}>
      <div className={s.blog_img_main}>
        <img src={blogmain} alt="" />
        <div className={s.blog_general}>
          <span className={s.title_general}>General</span>
          <h2 className={s.desc}>
            <Link to="#" className={s.linkToBlog}>
              Ematelier Introduces Elements Watch Collection Of Unique
              Grand-Feu, Mirror-Polished Enamel Dials
            </Link>
          </h2>
          <DetailAuthor />
        </div>
      </div>
    </div>
  );
};

export default Blog;
