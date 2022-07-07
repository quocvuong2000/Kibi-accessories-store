import moment from "moment";
const timeToDate = (time) => {
  const date = moment(time * 1000).format("DD/MM/YYYY");
  return date;
};

export default timeToDate;
