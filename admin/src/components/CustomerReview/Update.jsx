import React from "react";
import classes from "./styles.module.scss";
import { UpdatesData } from "../../utils/Data";

const Updates = () => {
  return (
    <div className={classes.updates}>
      {UpdatesData.map((update) => {
        return (
          <div className={classes.update}>
            <img src={update.img} alt="profile" />
            <div className="noti">
              <div  style={{marginBottom: '0.5rem'}}>
                <span>{update.name}</span>
                <span> {update.noti}</span>
              </div>
                <span>{update.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Updates;
