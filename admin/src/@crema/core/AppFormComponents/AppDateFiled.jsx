import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import TextField from "@mui/material/TextField";
import { Field } from "formik";
import React from "react";

const AppDateFiled = (props) => {
  return (
    <Field
      component={DesktopDatePicker}
      variant="outlined"
      inputVariant="outlined"
      format="dd/MM/yyyy"
      mask="__-__-____"
      autoOk
      inputFormat="dd/MM/yyyy"
      {...props}
      renderInput={(params) => (
        <TextField className={props.className} {...params} />
      )}
    />
  );
};

export default AppDateFiled;
