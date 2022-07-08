import React from "react";
import s from "./styles.module.scss";

const DotLoading = () => {
  return (
    <div className="col-3">
      <div className="snippet" data-title=".dot-pulse">
        <div className="stage">
          <div className={s.dot_pulse}></div>
        </div>
      </div>
    </div>
  );
};

export default DotLoading;
