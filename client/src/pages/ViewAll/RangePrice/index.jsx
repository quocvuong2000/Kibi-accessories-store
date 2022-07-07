import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Checkbox } from "antd";
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
        width: "200px",
      }}
    >
      <Typography id="range-slider" gutterBottom>
        Price
      </Typography>
      <Slider
        value={props.value}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
        min={1000000}
        max={10000000}
      />
    </div>
  );
};
export default RangePrice;
