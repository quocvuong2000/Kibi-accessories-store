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
import DialogAddProduct from "../DialogAdd/DialogAddProduct";
import DialogAddExistingProduct from "../DialogAddExistingProduct/DialogAddExistingProduct";

const HeaderProduct = (props) => {
  const [age, setAge] = useState("");
  const [age1, setAge1] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogExistingProduct, setShowDialogExistingProduct] =
    useState(false);

  const handleShowDialogAdd = (isVisible) => {
    setShowDialog(isVisible);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChange1 = (event) => {
    setAge(event.target.value);
  };
  const hanldeFilterProductByBranch = (e) => {
    setFilterBranch(e.target.value);
  };
  return (
    <div>
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
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
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Brand"
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
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age1}
                label="Category"
                onChange={handleChange1}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Branches</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.branchSelected._id}
                label="Branches"
                size="small"
              >
                {props.branchList.map((el, i) => {
                  return (
                    <MenuItem
                      value={el._id}
                      id={el.address}
                      key={i}
                      onClick={() => {
                        props.hanldeChooseBranches({
                          value: el._id,
                          name: el.address,
                        });
                        props.reLoadTable("choose" + Date.now());
                      }}
                    >
                      {el.address}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={3}
            alignItems={"center"}
            justifyContent={"space-around"}
            display={"flex"}
          >
            <Button
              variant="contained"
              onClick={() => setShowDialog(true)}
              sx={{ fontSize: "14px" }}
            >
              Add New
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowDialogExistingProduct(true)}
              sx={{ fontSize: "14px" }}
            >
              Add Existing
            </Button>
          </Grid>
        </Grid>
      </Box>
      {showDialog && (
        <DialogAddProduct
          showDialog={showDialog}
          handleShowDialog={handleShowDialogAdd}
          reLoadTable={props.reLoadTable}
          branchSelected={props.branchSelected}
        />
      )}
      {showDialogExistingProduct && (
        <DialogAddExistingProduct
          showDialog={showDialogExistingProduct}
          setShowAddExistingProduct={setShowDialogExistingProduct}
          productList={props.productList}
          branchSelected={props.branchSelected}
          reLoadTable={props.reLoadTable}
        />
      )}
    </div>
  );
};

export default HeaderProduct;
