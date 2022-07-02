import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Pagination, Autoplay } from "swiper";
import s from "./styles.module.scss";
import SmallBlog from "../SmallBlog";
const BoxSwipe = () => {
  return (
    <Swiper
      effect={"cube"}
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      modules={[EffectCube, Pagination, Autoplay]}
      className={s.swiper}
      loop={true}
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
  );
};

export default BoxSwipe;
