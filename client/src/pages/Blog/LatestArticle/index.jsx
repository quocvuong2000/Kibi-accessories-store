import React, { useEffect, useState } from "react";
import Title from "../Title";
import s from "./styles.module.scss";
import NormalBlog from "../NormalBlog";
import SmallBlog from "../SmallBlog";
import { getCategoryBlogById } from "../../../api/CategoryBlog";
import { getBlogByCate } from "../../../api/Blog";

const LatestArticle = () => {
  const [blogList, setBlogList] = useState([]);
  const [catBlog, setCatBlog] = useState({});

  useEffect(() => {
    getCategoryBlogById("62ca8b3a6fa219ccec1fc50e").then((res) => {
      setCatBlog(res);
    });
  }, []);

  useEffect(() => {
    if (catBlog.cate?._id) {
      getBlogByCate(catBlog.cate?._id, 5).then((res) => {
        setBlogList(res);
      });
    }
  }, [catBlog.cate]);

  return (
    <div className={s.container}>
      <Title title={catBlog.cate?.title} id={catBlog.cate?._id} />
      <div className={s.list_blog}>
        {blogList.blogs?.map((item, index) => {
          if (index < 2) {
            return <NormalBlog item={item} key={index} />;
          }
        })}
      </div>
      <div className={s.list_small_blog}>
        {blogList.blogs?.map((item, index) => {
          if (index >= 2) {
            return <SmallBlog item={item} key={index} />;
          }
        })}
      </div>
      {/* <div className={s.list_blog}>
        <NormalBlog />
        <NormalBlog />
      </div> */}
      {/* <div className={s.list_small_blog}>
        <SmallBlog />
        <SmallBlog />
        <SmallBlog />
      </div> */}
    </div>
  );
};

export default LatestArticle;
