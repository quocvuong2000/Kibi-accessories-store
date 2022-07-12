import React, { useEffect } from "react";
import s from "./styles.module.scss";
import pageerror from "../../assets/500.jpg";

import { Link } from "react-router-dom";

const Page500 = () => {
  useEffect(() => {
    document.title = "KIBI | Not Found";
  }, []);
  return (
    <div className={s.container}>
      <div className={s.box_text}>
        <p className={s.oops}>Opss...</p>
        <p className={s.notfound}>Error</p>
        <p>Sorry for the inconvenience, Our server can be destroyed</p>
        <Link to={"/"} className={s.goback}>
          Go Back
        </Link>
      </div>
      <div className={s.img_error}>
        <img src={pageerror} alt="500" />
      </div>
    </div>
  );
};
export default Page500;
