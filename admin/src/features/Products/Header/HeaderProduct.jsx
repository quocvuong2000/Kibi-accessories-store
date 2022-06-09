import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DialogAddProduct from "../DiablogAdd/DialogAddProduct";

const HeaderProduct = (props) => {
  const [age, setAge] = React.useState("");
  const [age1, setAge1] = React.useState("");
  const [showDialog, setShowDialog] = useState(false);
  const handleShowDialogAdd = (isVisible) => {
    setShowDialog(isVisible);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChange1 = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              type="search"
              variant="outlined"
              placeholder="Search for name,..."
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">User type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="User type"
                size="small"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">User role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age1}
                label="User role"
                onChange={handleChange1}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={3}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            display={"flex"}
          >
            <Button variant="contained" onClick={() => setShowDialog(true)}>Add New Product</Button>
          </Grid>
        </Grid>
      </Box>
      <DialogAddProduct
      showDialog={showDialog}
      handleShowDialog={handleShowDialogAdd}
      reLoadTable={props.reLoadTable}
        />
    </div>
  );
};

export default HeaderProduct;
