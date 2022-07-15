import { ArrowLeft, EnvelopeSimple } from "phosphor-react";
import React from "react";
import s from "./styles.module.scss";

const VerifyingPage = (props) => {
  return (
    <div className={s.container}>
      <div className={s.circle_big}>
        <div className={s.circle_small}>
          <EnvelopeSimple size={40} color="#d84727" weight="thin" />
        </div>
      </div>
      <p className={s.check}>Check your email</p>
      <p
        className={s.back}
        onClick={() => {
          props.setShowVerifyPage(false);
        }}
      >
        <ArrowLeft size={20} weight="bold" color="#d84727" /> Back to login
      </p>
    </div>
  );
};

export default VerifyingPage;
