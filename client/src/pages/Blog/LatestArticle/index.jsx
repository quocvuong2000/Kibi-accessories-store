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
    getCategoryBlogById("62da228d46be379e9f816c1e").then((res) => {
      setCatBlog(res);
    });
  }, []);

  useEffect(() => {
    if (catBlog.cate?._id) {
      getBlogByCate(catBlog.cate?._id, 5).then((res) => {
        console.log("res:", res);
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
    </div>
  );
};

export default LatestArticle;
