import React from "react";
import s from "./styles.module.scss";
import blogmain from "../../assets/blogmain.jpg";
import { Link } from "react-router-dom";
import DetailAuthor from "./DetailAuthor";
import Carousel from "./Carousel";
import Card from "./Card";
const CARDS = 10;

const Blog = () => {
  return (
    <div className={s.blog}>
      <Carousel>
        {[...new Array(CARDS)].map((_, i) => (
          <Card
            title={"Card " + (i + 1)}
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        ))}
      </Carousel>
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
