import React from 'react'
import classes from 'styles.module.scss';
import PropsType from "prop-types";

const Confirmation = (props) => {
  const paymentInfo = props.paymentInfo;

  return (
    <div className={classes.confirmationDetail}>
      <div className={classes.left}>

      </div>
      <div className={classes.right}>
        
      </div>
    </div>
  )
}
Confirmation.propsType = {
  paymentInfo: PropsType.object,
};
export default Confirmation