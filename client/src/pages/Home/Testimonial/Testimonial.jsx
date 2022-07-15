import React from "react";
import classes from "./styles.module.scss";
import watch from "../../../assets/home/testimonial/sharing-customer-testimonial.png";
import vawe1 from "../../../assets/home/Vector 12.png";
import vawe2 from "../../../assets/home/Vector 13.png";
import vawe3 from "../../../assets/home/Vector 14.png";
import { Image } from "antd";
import { FormattedMessage } from "react-intl";
const Testimonial = () => {
  return (
    <div className={classes.testimonialContainer}>
      <div className={classes.testimonial}>
        <div className={classes.left}>
          <Image src={watch} />
        </div>
        <div className={classes.right}>
          <div className={classes.mainTitle}>
            <FormattedMessage id="home.testimonials" />
          </div>

          <div className={classes.content}>
            <div className={classes.desc}>
              <FormattedMessage id="home.desctesti" />
            </div>
            <div className={classes.author}>Gita Savitri</div>
            <div className={classes.position}>
              <FormattedMessage id="home.creator" />
            </div>
          </div>
        </div>
        <div className={classes.square}></div>
        <div className={classes.image}>
          <img src={vawe1} alt="" />
          <img src={vawe2} alt="" />
          <img src={vawe3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
