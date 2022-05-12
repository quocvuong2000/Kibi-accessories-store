import React from "react";
import s from "./styles.module.scss";

export const Lang = () => {

  return (
    <>
      <div className={s.container}>
        <box-icon name="globe" animation="spin" rotate="90"></box-icon>
        <div className={s.popup__lang}>
          <p>VI</p>
          <p>EN</p>
        </div>
      </div>
    </>
  );
};
