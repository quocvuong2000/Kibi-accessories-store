import React from "react";
import Title from "../Title";
import s from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import NormalBlog from "../NormalBlog";

const Sponsored = () => {
  return (
    <div className={s.container}>
      <Title title="SPONSORED POSTS" />
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
