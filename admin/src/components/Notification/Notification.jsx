import React from "react";
import classes from "./styles.module.scss";


const Notifications = (props) => {
    return (
        <div className={classes.cardNotifications}>
            <div className={classes.dateNotifications}>{props.date}</div>
            <div className={classes.titleNotifications}>{props.title}</div>
            <div className={classes.textNotifications}>{props.text}</div>
        </div>
    );
};

export default Notifications;
