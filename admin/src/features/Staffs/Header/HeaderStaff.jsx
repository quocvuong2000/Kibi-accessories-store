import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import DialogAddStaff from '../DialogAddStaff/DialogAddStaff';

const HeaderStaff = (props) => {
  const [roleFilter, setRoleFilter] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const handleShowDialogAdd = (isVisible) => {
    setShowDialog(isVisible);
  };
  const hanldeRoleFilter = (event) => {
    setRoleFilter(event.target.value);
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
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={roleFilter}
                label="Role"
                size="small"
                onChange={hanldeRoleFilter}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>


          </Grid>
          <Grid
            item
            xs={3}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            display={"flex"}
          >
            <Button variant="contained" onClick={() => setShowDialog(true)}>
              Add New Staff
            </Button>
          </Grid>
        </Grid>
      </Box>
      {showDialog && (
        <DialogAddStaff
          showDialog={showDialog}
          handleShowDialog={handleShowDialogAdd}
          reLoadTable={props.reLoadTable}
        />
      )}
    </div>
  )
}

export default HeaderStaff