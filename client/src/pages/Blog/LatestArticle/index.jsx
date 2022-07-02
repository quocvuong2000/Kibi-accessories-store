import React from "react";
import Title from "../Title";
import s from "./styles.module.scss";
import NormalBlog from "../NormalBlog";
import SmallBlog from "../SmallBlog";

const LatestArticle = () => {
  return (
    <div className={s.container}>
      <Title title="LATEST ARTICLE" />
      <div className={s.list_blog}>
        <NormalBlog />
        <NormalBlog />
      </div>
      <div className={s.list_small_blog}>
        <SmallBlog />
        <SmallBlog />
        <SmallBlog />
      </div>
    </div>
  );
};

export default LatestArticle;
