import React from "react";
import s from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";
import Title from "../Title";
import SmallBlog from "../SmallBlog";
import { Pagination } from "swiper";
const Popular = () => {
  return (
    <div className={s.container}>
      <Title title="POPULAR ARTICLES" />
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
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
