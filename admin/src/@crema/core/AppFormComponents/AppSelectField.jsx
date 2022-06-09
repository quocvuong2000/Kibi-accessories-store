import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { useField } from "formik";
import React from "react";

const AppSelectField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <>
      <Select {...props} {...field} error={!!errorText} />
      {!props.disabled && (
        <FormHelperText style={{ color: "#f44336" }}>
          {errorText}
        </FormHelperText>
      )}
    </>
  );
};

export default AppSelectField;
