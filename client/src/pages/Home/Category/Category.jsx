import React from "react";
import classes from "./styles.module.scss";
import cat1 from "../../../assets/home/category/image 7.png";
import cat2 from "../../../assets/home/category/image 8.png";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const fakeData = [
  {
    title: "Luxurious Eyewear",
    desc: "See the beauty of exotic world with the luxurious glasses",
    dicover: "Discover Now",
    image: cat1,
    class: classes.cat1,
    id: "62da202146be379e9f816bf6",
  },
  {
    title: "Comfortable Watches",
    desc: "Feels the balancing function and beauty in our wooden watches",
    dicover: "Discover Now",
    image: cat2,
    class: classes.cat2,
    id: "62da201546be379e9f816bf2",
  },
];
const Category = () => {
  return (
    <div className={classes.categoryContainer}>
      {fakeData.map((item, index) => {
        return (
          <div className={classes.categoryItem} key={index}>
            <div className={classes.left}>
              <div className={classes.title}>{item.title}</div>
              <div className={classes.desc}>{item.desc}</div>
              <Link to={`/viewall/${item.id}`} className={classes.discover}>
                <FormattedMessage id={`common.${item.dicover}`} />
              </Link>
            </div>
            <div className={classes.right}>
              <img src={item.image} alt="" className={`${item.class}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
