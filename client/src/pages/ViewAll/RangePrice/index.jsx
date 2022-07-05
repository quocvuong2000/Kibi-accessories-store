import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Checkbox } from "antd";
const RangePrice = (props) => {
  const [value, setValue] = React.useState([0, 1000000]);

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
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
        value={value}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
      />
    </div>
  );
};
export default RangePrice;
