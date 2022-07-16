import { Slider } from "antd";
import numberWithCommas from "../../../utils/numberWithCommas";
import s from "./styles.module.scss";
const RangePrice = (props) => {
  const rangeSelector = (event, newValue) => {
    props.setValue(newValue);
  };
  return (
    <div
      style={{
        margin: "auto",
        display: "block",
        width: "100%",
      }}
      className={s.container}
    >
      <p>Price</p>
      <p className={s.from_to}>
        {numberWithCommas(props.value[0])} - {numberWithCommas(props.value[1])}
      </p>
      <Slider
        range
        defaultValue={[100000, 10000000]}
        onChange={(value) => {
          props.setValue(value);
        }}
        tooltipVisible={false}
        min={100000}
        max={10000000}
      />
    </div>
  );
};
export default RangePrice;
