import React from "react";
import s from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const Title = (props) => {
  const navigate = useNavigate();
  return (
    <span
      className={s.title_general}
      onClick={() => {
        !props.id && message.error("List not yet update");
        props.id && navigate(`/viewallblog/${props.id}`);
      }}
    >
      {props.title}
    </span>
  );
};

export default Title;
