import { Pagination } from "antd";
import React from "react";
import SmallBlog from "../Blog/SmallBlog";
import Title from "../Blog/Title";
import s from "./styles.module.scss";

const ViewAllBlog = () => {
  return (
    <div className={s.container}>
      <Title title="ALL BLOG" />
      <div className={s.list_blog}>
        <SmallBlog />
        <SmallBlog />
        <SmallBlog />
        <SmallBlog />
        <SmallBlog />
        <SmallBlog />
        <Pagination
          defaultCurrent={1}
          total={150}
          pageSize={10}
          showSizeChanger={false}
          className={s.pagination}
        />
      </div>
    </div>
  );
};

export default ViewAllBlog;
