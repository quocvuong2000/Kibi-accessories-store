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
  // eslint-disable-next-line no-unused-vars
  const [blogList, setBlogList] = useState([]);
  const [catBlog, setCatBlog] = useState({});
  useEffect(() => {
    getCategoryBlogById("62da22af46be379e9f816c22").then((res) => {
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
        breakpoints={{
          600: {
            width: 600,
            slidesPerView: 1,
          },
          768: {
            width: 768,
            slidesPerView: 1,
          },

          1088: {
            width: 1088,
            slidesPerView: 2,
          },
        }}
      >
        {blogList.blogs?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <NormalBlog item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Sponsored;
