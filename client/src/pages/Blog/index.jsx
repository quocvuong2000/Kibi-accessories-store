import { Link } from "react-router-dom";
import blogmain from "../../assets/blogmain.jpg";
import BoxSwipe from "./BoxSwipe";
import DetailAuthor from "./DetailAuthor";
import LatestArticle from "./LatestArticle";
import Popular from "./Popular";
import Sponsored from "./Sponsored";
import s from "./styles.module.scss";
import Title from "./Title";
import Trending from "./Trending";

const Blog = () => {
  return (
    <div className={s.blog}>
      <div className={s.blog_img_main}>
        <img src={blogmain} alt="" />
        <div className={s.blog_general}>
          <div className={s.title}>
            <Title title="General" />
          </div>
          <h2 className={s.desc}>
            <Link to="#" className={s.linkToBlog}>
              Ematelier Introduces Elements Watch Collection Of Unique
              Grand-Feu, Mirror-Polished Enamel Dials
            </Link>
          </h2>
          <DetailAuthor />
        </div>
      </div>
      <BoxSwipe />
      <LatestArticle />
      <Sponsored />
      <Trending />
      <Popular />
    </div>
  );
};

export default Blog;
