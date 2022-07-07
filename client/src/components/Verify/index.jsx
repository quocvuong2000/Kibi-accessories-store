import React from "react";
import s from "./styles.module.scss";

const Verify = () => {
  return (
    <div className={s.box_verify}>
      <span className={s.text_verify}>Verify</span>
      <div className="col-3">
        <div className="snippet" data-title=".dot-pulse">
          <div className="stage">
            <div className={s.dot_pulse}></div>
          </div>
        </div>
      </div>
      <small>Please check your email and verify</small>
    </div>
  );
};

export default Verify;
