import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
export default function DialogChooseBranch(props) {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const handleClose = () => {
    props.setShowChooseBrach(false);
  };

  return (
    <>
      <Dialog open={props.showDialog} onClose={handleClose}>
        <DialogTitle>Choose branch before continue</DialogTitle>
        <DialogContent>Or continue with default branch</DialogContent>
        <Box sx={{ p: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Branches</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.branchSelected}
              label="Branches"
              size="small"
              // onChange={(e) => }
            >
              {props.branchList.map((el, i) => {
                return (
                  <MenuItem
                    value={el._id}
                    key={i}
                    onClick={() =>
                      {props.hanldeChooseBranches({
                        value: el._id,
                        name: el.address,
                      })
                    
                    }
                    }
                  >
                    {el.address}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" onClick={handleClose}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Choose success
        </Alert>
      </Snackbar>
      <Snackbar
        open={failure}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error
        </Alert>
      </Snackbar>
    </>
  );
}
