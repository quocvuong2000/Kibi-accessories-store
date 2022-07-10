import React from "react";
import s from "./styles.module.scss";
import img1 from "../../../assets/blogproduct1.jpg";
import DetailAuthorOther from "../DetailAuthor/detailauthor";
import { useNavigate } from "react-router-dom";

const NormalBlog = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className={s.container}
      onClick={() => {
        navigate(`/detailblog/${item._id}`);
      }}
    >
      <div className={s.image_blog}>
        <img src={img1} alt="" />
      </div>
      <div className={s.title}>{item?.title}</div>
      <div className={s.author}>
        <DetailAuthorOther item={item} />
      </div>
    </div>
  );
};

export default NormalBlog;
