import React, { useState } from "react";
import DetailAuthorOther from "../Blog/DetailAuthor/detailauthor";
import s from "./styles.module.scss";
import imgmain from "../../assets/imgmainblog.jpg";
import { Link } from "react-router-dom";
import SmallBlog from "../Blog/SmallBlog";
import Title from "../Blog/Title";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailBlog } from "../../api/Blog";
import parse from "html-react-parser";
const DetailBlog = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    document.title = "KIBI | Detail Blog";
  }, []);

  useEffect(() => {
    getDetailBlog(id).then((res) => {
      console.log("res:", res);

      setDetail(res);
    });
  }, []);
  console.log("detail:", detail);
  return (
    <div className={s.container}>
      <div className={s.left_detailblog}>
        <DetailAuthorOther item={detail?.blog} />
        <p className={s.title}>{detail?.blog?.title}</p>
        {parse(detail?.blog?.content ?? "")}
        <div className={s.box_endofblog}>
          <div className={s.text_endofblog}>Advertising Message </div>
          <div className={s.text_endofblog}> End Of Advertising Message</div>
        </div>
      </div>
      <div className={s.right_detailblog}>
        <div className={s.content_right}>
          <Title title="POPULAR" />
          <br />
          <SmallBlog />
          <br />
          <Title title="POPULAR" />
          <br />
          <SmallBlog />
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
