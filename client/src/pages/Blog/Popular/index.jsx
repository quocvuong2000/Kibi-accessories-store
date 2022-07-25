import React, { useEffect, useState } from "react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { getBlogByCate } from "../../../api/Blog";
import { getCategoryBlogById } from "../../../api/CategoryBlog";
import SmallBlog from "../SmallBlog";
import Title from "../Title";
import s from "./styles.module.scss";
const Popular = () => {
  // eslint-disable-next-line no-unused-vars
  const [blogList, setBlogList] = useState([]);
  const [catBlog, setCatBlog] = useState({});
  useEffect(() => {
    getCategoryBlogById("62da22cd46be379e9f816c26").then((res) => {
      setCatBlog(res);
    });
  }, []);

  useEffect(() => {
    if (catBlog.cate?._id) {
      getBlogByCate(catBlog.cate?._id, 10).then((res) => {
        setBlogList(res);
      });
    }
  }, [catBlog.cate?._id]);

  return (
    <div className={s.container}>
      <Title title={catBlog.cate?.title} id={catBlog.cate?._id} />
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          368: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
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
        {blogList.blogs?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <SmallBlog item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Popular;
