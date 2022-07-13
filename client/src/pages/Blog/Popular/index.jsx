import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";
import Title from "../Title";
import SmallBlog from "../SmallBlog";
import { Pagination } from "swiper";
import { getCategoryBlogById } from "../../../api/CategoryBlog";
import { getBlogByCate } from "../../../api/Blog";
const Popular = () => {
  const [blogList, setBlogList] = useState([]);
  const [catBlog, setCatBlog] = useState({});
  useEffect(() => {
    getCategoryBlogById("62ca8b506fa219ccec1fc516").then((res) => {
      setCatBlog(res);
    });
  }, []);

  useEffect(() => {
    if (catBlog.cate?._id) {
      getBlogByCate(catBlog.cate?._id, 10).then((res) => {
        setBlogList(res);
      });
    }
  }, []);

  return (
    <div className={s.container}>
      <Title title={catBlog.cate?.title} id={catBlog.cate?._id} />
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          820: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className={s.swiper_popular}
      >
        <SwiperSlide>
          <SmallBlog />
        </SwiperSlide>
        <SwiperSlide>
          <SmallBlog />
        </SwiperSlide>
        <SwiperSlide>
          <SmallBlog />
        </SwiperSlide>
        <SwiperSlide>
          <SmallBlog />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Popular;
