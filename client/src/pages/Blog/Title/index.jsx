import React from "react";
import s from "./styles.module.scss";

const Title = (props) => {
  return <span className={s.title_general}>{props.title}</span>;
};

export default Title;
