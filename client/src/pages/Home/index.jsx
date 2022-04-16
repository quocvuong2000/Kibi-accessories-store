import React from "react";
import Carousel from "./Carousel/Carousel";
import Category from "./Category/Category";
import MonthlyDeal from './MonthlyDeal/MonthlyDeal'
import RecentsNew from "./RecentsNew/RecentsNew";
import classes from './styles.module.scss';

const Home = () => {

  return (
    <div className={classes.home}>
      <div className={classes.carousel}>
      <Carousel></Carousel>
      </div>
      <div className={classes.categories}>
      <Category></Category>
      </div>
      <div className={classes.monthlyDeal}>
      <MonthlyDeal></MonthlyDeal>
      </div>
      <div className={classes.recentsNew}>
       <RecentsNew></RecentsNew> 
      </div>
      <div className={classes.featured}>
       <RecentsNew></RecentsNew> 
      </div>
      <div className={classes.testimonial}>
       <RecentsNew></RecentsNew> 
      </div>
      <div className={classes.instagram}>
       <RecentsNew></RecentsNew> 
      </div>
    </div>
  );
};

export default Home;
