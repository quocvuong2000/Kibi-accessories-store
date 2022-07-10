import React, { useEffect, useState } from "react";
import Title from "../Title";
import s from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import NormalBlog from "../NormalBlog";
import { getCategoryBlogById } from "../../../api/CategoryBlog";
import { getBlogByCate } from "../../../api/Blog";

const Sponsored = () => {
  const [blogList, setBlogList] = useState([]);
  const [catBlog, setCatBlog] = useState({});
  useEffect(() => {
    getCategoryBlogById("62ca8b456fa219ccec1fc512").then((res) => {
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
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className={s.swipe_spon}
      >
        <SwiperSlide>
          <NormalBlog />
        </SwiperSlide>
        <SwiperSlide>
          <NormalBlog />
        </SwiperSlide>
        <SwiperSlide>
          <NormalBlog />
        </SwiperSlide>
        <SwiperSlide>
          <NormalBlog />
        </SwiperSlide>
        <SwiperSlide>
          <NormalBlog />
        </SwiperSlide>
        <SwiperSlide>
          <NormalBlog />
        </SwiperSlide>
        <SwiperSlide>
          <NormalBlog />
        </SwiperSlide>
        <SwiperSlide>
          <NormalBlog />
        </SwiperSlide>
        <SwiperSlide>
          <NormalBlog />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Sponsored;
