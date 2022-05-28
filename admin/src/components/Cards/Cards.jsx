import React from "react";
import classes from "./styles.module.scss";
import { cardsData } from "../../utils/Data";

import Card from "../Card/Card";

const Cards = () => {
  return (
    <div className={classes.cards}>
      {cardsData.map((card, id) => {
        return (
          <div className={classes.parentContainer} key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
