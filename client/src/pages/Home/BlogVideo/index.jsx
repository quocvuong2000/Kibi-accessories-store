import React from "react";
import s from "./styles.module.scss";
import videoblog from "../../../assets/videoblog/tomford_ft0516_889214046635_folded_anim.mp4";
import { FormattedMessage } from "react-intl";

const BlogVideo = () => {
  return (
    <div className={s.contanier}>
      <p className={s.title}>
        <FormattedMessage id="home.welcome" />
      </p>
      <video src={videoblog} autoPlay muted loop></video>
    </div>
  );
};

export default BlogVideo;
