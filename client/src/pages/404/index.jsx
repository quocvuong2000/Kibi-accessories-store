import React, { useEffect } from "react";
import s from "./styles.module.scss";
import pageerror from "../../assets/404.png";
import line1 from "../../assets/line1.png";
import line2 from "../../assets/line2.png";
import { Link } from "react-router-dom";

const Page404 = () => {
  useEffect(() => {
    document.title = "KIBI | Not Found";
  }, []);
  return (
    <div className={s.container}>
      <div className={s.box_text}>
        <p className={s.oops}>Opss...</p>
        <p className={s.notfound}>Page not found</p>
        <p>
          Sorry for the inconvenience, We couldn't find the correct link from
          you
        </p>
        <Link to={"/"} className={s.goback}>
          Go Back
        </Link>
      </div>
      <img src={pageerror} alt="404" />
      <div className={s.line1}>
        <img src={line1} alt="" />
      </div>
      <div className={s.line2}>
        <img src={line2} alt="" />
      </div>
    </div>
  );
};
export default Page404;
