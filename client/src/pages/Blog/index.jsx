import { Link } from "react-router-dom";
import blogmain from "../../assets/blogmain.jpg";
import DetailAuthor from "./DetailAuthor";
import s from "./styles.module.scss";
import Title from "./Title";

const Blog = () => {
  return (
    <div className={s.blog}>
      <div className={s.blog_img_main}>
        <img src={blogmain} alt="" />
        <div className={s.blog_general}>
          <Title title="General" />
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
