import React from "react";
import s from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
const Title = (props) => {
  const navigate = useNavigate();
  return (
    <span
      className={s.title_general}
      onClick={() => navigate(`/viewallblog/${props.id}`)}
    >
      {props.title}
    </span>
  );
};

export default Title;
