import React from "react";
import s from "./styles.module.scss";
import trending1 from "../../../assets/trending1.jpg";
import trending2 from "../../../assets/trending2.jpg";
import trending3 from "../../../assets/trending3.jpg";
import trending4 from "../../../assets/trending4.jpg";
import Title from "../Title";

const Trending = () => {
  return (
    <div className={s.container}>
      <Title title="TRENDING" />
      <div className={s.list_trending}>
        <div className={s.one_category}>
          <img src={trending1} alt="" />
          <div className={s.name_category}>
            <p className={s.name}>Rakai</p>
          </div>
        </div>
        <div className={s.one_category}>
          <img src={trending2} alt="" />
          <div className={s.name_category}>
            <p className={s.name}>Rakai</p>
          </div>
        </div>
        <div className={s.one_category}>
          <img src={trending3} alt="" />
          <div className={s.name_category}>
            <p className={s.name}>Rakai</p>
          </div>
        </div>
        <div className={s.one_category}>
          <img src={trending4} alt="" />
          <div className={s.name_category}>
            <p className={s.name}>Rakai</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
