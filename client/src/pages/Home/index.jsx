import React from "react";
import Carousel from "./Carousel/Carousel";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import Instagram from "./Instagram/Instagram";
import MonthlyDeal from "./MonthlyDeal/MonthlyDeal";
import RecentsNew from "./RecentsNew/RecentsNew";
import classes from "./styles.module.scss";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.carousel}>
        <Carousel />
      </div>
      <div className={classes.categories}>
        <Category />
      </div>
      <div className={classes.monthlyDeal}>
        <MonthlyDeal />
      </div>
      <div className={classes.recentsNew}>
        <RecentsNew />
      </div>
      <div className={classes.featured}>
        <Featured />
      </div>
      <div className={classes.testimonial}>
        <Testimonial />
      </div>
      <div className={classes.instagram}>
        <Instagram />
      </div>
    </div>
  );
};

export default Home;
