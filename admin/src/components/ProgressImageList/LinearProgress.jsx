import { UilCheckCircle } from "@iconscout/react-unicons";
import { Box } from "@mui/material";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

export default function LinearProgressUpload({ progress }) {
  return (
    <Box sx={backDrop}>
      {progress < 100 ? (
        <CircularProgressWithLabel value={progress} />

      ) : (
        <UilCheckCircle style={{ width: 60, height: 60, fill: "lightgreen" }} />
      )}
    </Box>
  );
}
const backDrop = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0, .1)",
};
