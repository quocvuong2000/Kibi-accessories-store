import React from "react";
import Carousel from "./Carousel/Carousel";
import Category from "./Category/Category";
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
    </div>
  );
};

export default Home;
