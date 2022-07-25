import { useEffect } from "react";
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
import { useWindowSize } from "../../customHook/useWindowSize";
import { getAllBlog } from "../../api/Blog";
import { useState } from "react";
const Blog = () => {
  const [width] = useWindowSize();
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    document.title = "KIBI | Blog";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllBlog(1).then((res) => {
      console.log("res", res);
      setBlog(res.blogs);
    });
  }, []);

  return (
    <div className={s.blog}>
      <div className={s.blog_img_main}>
        <img src={blogmain} alt="" />
        {blog?.map((item, index) => {
          return (
            <div className={s.blog_general} key={index}>
              <div className={s.title}>
                <Title title="General" />
              </div>
              <h2 className={s.desc}>
                <Link to={`/detailblog/${item?._id}`} className={s.linkToBlog}>
                  {item.title}
                </Link>
              </h2>
              <DetailAuthor item={item} />
            </div>
          );
        })}
      </div>
      <BoxSwipe />
      <LatestArticle />
      {width > 1024 && <Sponsored />}
      <Trending />
      <Popular />
    </div>
  );
};

export default Blog;
