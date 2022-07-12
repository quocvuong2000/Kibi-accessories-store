import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { initialUrl } from "../../../constants/AppConst";
import { ReactComponent as Logo } from "../../../assets/icon/403.svg";
import { motion } from "framer-motion";

const Error403 = () => {
  const navigate = useNavigate();

  const onGoBackToHome = () => {
    navigate(initialUrl);
  };
  return (
    <motion.div
      animate={{
        scale: [0.5, 1],
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        times: [0.1, 0.4],
      }}
    >
      <Box
        sx={{
          py: { xl: 8 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            mb: { xs: 4, xl: 8 },
            width: "100%",
            maxWidth: { xs: 200, sm: 300, xl: 706 },
            "& svg": {
              width: "100%",
              maxWidth: 400,
            },
          }}
        >
          <Logo fill={"#ffcfd1"} />
        </Box>
        <Box sx={{ mb: { xs: 4, xl: 5 } }}>
          <Box
            component="h3"
            sx={{
              mb: { xs: 3, xl: 4 },
              fontSize: { xs: 20, md: 24 },
              fontWeight: 600,
            }}
          >
            Unauthorized
          </Box>
          <Box
            sx={{
              mb: { xs: 4, xl: 5 },
              color: grey[600],
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            <Typography>Bạn không có quyền này</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 600,
              fontSize: 16,
              textTransform: "capitalize",
            }}
            onClick={onGoBackToHome}
          >
            Back to dashboard
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Error403;
