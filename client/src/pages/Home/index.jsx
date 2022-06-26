import { motion } from "framer-motion";
import BlogVideo from "./BlogVideo";
import Carousel from "./Carousel/Carousel";
import Category from "./Category/Category";
import Instagram from "./Instagram/Instagram";
import MonthlyDeal from "./MonthlyDeal/MonthlyDeal";
import RecentsNew from "./RecentsNew/RecentsNew";
import classes from "./styles.module.scss";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <div className={classes.home}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className={classes.carousel}>
          <Carousel />
        </div>
        <div className={classes.categories}>
          <Category />
        </div>
        <div className={classes.videoBlog}>
          <BlogVideo />
        </div>
        <div className={classes.monthlyDeal}>
          <MonthlyDeal />
        </div>
        <div className={classes.recentsNew}>
          <RecentsNew />
        </div>
        {/* <div className={classes.featured}>
        <Featured />
      </div> */}
        <div className={classes.testimonial}>
          <Testimonial />
        </div>
        <div className={classes.instagram}>
          <Instagram />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
