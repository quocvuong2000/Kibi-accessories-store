import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Checkbox } from "antd";
import numberWithCommas from "../../../utils/numberWithCommas";
import s from "./styles.module.scss";
const RangePrice = (props) => {
  const rangeSelector = (event, newValue) => {
    props.setValue(newValue);
    console.log(newValue);
  };
  return (
    <div
      style={{
        margin: "auto",
        display: "block",
        width: "100%",
      }}
    >
      <Typography id="range-slider" gutterBottom>
        Price
      </Typography>

      <p className={s.from_to}>
        {numberWithCommas(props.value[0])} - {numberWithCommas(props.value[1])}
      </p>
      <Slider
        value={props.value}
        onChange={rangeSelector}
        min={1000000}
        max={10000000}
      />
    </div>
  );
};
export default RangePrice;
