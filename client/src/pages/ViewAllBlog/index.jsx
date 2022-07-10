import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import SmallBlog from "../Blog/SmallBlog";
import Title from "../Blog/Title";
import s from "./styles.module.scss";
import { useParams } from "react-router-dom";
import { getBlogByCate } from "../../api/Blog";
import { getCategoryBlogById } from "../../api/CategoryBlog";
import { message } from "antd";

const ViewAllBlog = () => {
  const { id } = useParams();
  const [blogList, setBlogList] = useState([]);
  const [page, setPage] = useState(1);
  const [catBlog, setCatBlog] = useState({});
  useEffect(() => {
    getCategoryBlogById(id)
      .then((res) => {
        setCatBlog(res);
      })
      .catch(() => {
        message.error("Loading list blog fail");
      });
  }, []);

  useEffect(() => {
    getBlogByCate(id, "", page)
      .then((res) => {
        setBlogList(res);
      })
      .catch(() => {
        message.error("Loading list blog fail");
      });
  }, []);
  console.log("blogList:", blogList);
  return (
    <div className={s.container}>
      <Title title={catBlog.cate?.title} />
      <div className={s.list_blog}>
        {blogList.blogs?.map((item, index) => {
          return <SmallBlog item={item} />;
        })}
        {/*
        <SmallBlog />
        <SmallBlog />
        <SmallBlog />
        <SmallBlog />
        <SmallBlog /> */}
        <Pagination
          defaultCurrent={1}
          total={blogList.totalItems || 10}
          pageSize={9}
          showSizeChanger={false}
          className={s.pagination}
        />
      </div>
    </div>
  );
};

export default ViewAllBlog;
