import { CalendarCheck, CreditCard, ListChecks } from "phosphor-react";
import React from "react";
import Header from "../../components/Header";
import classes from "./styles.module.scss";
const Payment = () => {
  return (
    <div className={classes.paymentContainer}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.payment}>
        <div className={classes.paymentHeader}>
          <div className={classes.title}>
            1. Checkout
            <div className={classes.icon}>
              <CalendarCheck size={28} weight="fill" />
            </div>
          </div>
          <div className={classes.line}></div>
          <div className={`${classes.title} ${classes.active}`} >
            2. Payment
            <div className={classes.icon}>
              <CreditCard size={28} weight="fill" />
            </div>
          </div>
          <div className={classes.line}></div>
          <div className={classes.title}>
            3. Confirmation
            <div className={classes.icon}>
              <ListChecks size={28} weight="fill" />
            </div>
          </div>
        </div>
        <div className={classes.content}>
          
        </div>
      </div>
    </div>
  );
};

export default Payment;
