const ConvertDate = (date) => {
  var newdate = new Date(date);
  var year = newdate.getFullYear();
  var month = (1 + newdate.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  var day = newdate.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  return year + "/" + month + "/" + day;
};

export default ConvertDate;
