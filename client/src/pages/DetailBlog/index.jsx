import React from "react";
import DetailAuthorOther from "../Blog/DetailAuthor/detailauthor";
import s from "./styles.module.scss";
import imgmain from "../../assets/imgmainblog.jpg";
import { Link } from "react-router-dom";
import SmallBlog from "../Blog/SmallBlog";
import Title from "../Blog/Title";

const DetailBlog = () => {
  return (
    <div className={s.container}>
      <div className={s.left_detailblog}>
        <DetailAuthorOther />
        <div className={s.img}>
          <img src={imgmain} alt="" />
        </div>
        <p className={s.first_line}>
          English watch manufacturer Bremont is no stranger to producing
          limited-edition timepieces, and the brand’s latest release is a
          follow-up to the original Supermarine Waterman watch from 2018.
          Officially called the Bremont Supermarine Waterman Apex, the new
          limited-edition model is produced in collaboration with the non-profit
          organization Bimini Shark Lab, and a percentage of the proceeds from
          each sale will be donated to the foundation to help support its marine
          conservation efforts and to further its goals of better understanding
          the biology of sharks and the role they play within the marine
          ecosystem. Proudly wearing and testing the new Bremont Supermarine
          Waterman Apex is legendary big wave surfer and Bremont brand
          ambassador Laird Hamilton, who embodies the spirit of a true water
          athlete and is the ideal candidate to put the new model through its
          paces during real-world use, both on land and below the surface of the
          ocean.
        </p>
        <div className={s.img}>
          <img src={imgmain} alt="" />
        </div>
        <p className={s.text}>
          English watch manufacturer Bremont is no stranger to producing
          limited-edition timepieces, and the brand’s latest release is a
          follow-up to the original Supermarine Waterman watch from 2018.
          Officially called the Bremont Supermarine Waterman Apex, the new
          limited-edition model is produced in collaboration with the non-profit
          organization Bimini Shark Lab, and a percentage of the proceeds from
          each sale will be donated to the foundation to help support its marine
          conservation efforts and to further its goals of better understanding
          the biology of sharks and the role they play within the marine
          ecosystem. Proudly wearing and testing the new Bremont Supermarine
          Waterman Apex is legendary big wave surfer and Bremont brand
          ambassador Laird Hamilton, who embodies the spirit of a true water
          athlete and is the ideal candidate to put the new model through its
          paces during real-world use, both on{" "}
          <Link to="#" className={s.link}>
            land and below
          </Link>{" "}
          the surface of the ocean.
        </p>
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
