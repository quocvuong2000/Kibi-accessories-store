import React from "react";
import DotLoading from "./DotLoading";
import s from "./styles.module.scss";

const Verify = () => {
  return (
    <div className={s.box_verify}>
      <span className={s.text_verify}>Verify</span>
      <DotLoading />
      <small>Please check your email and verify</small>
    </div>
  );
};

export default Verify;
