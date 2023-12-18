import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingScreen = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0f072c",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999, // Place above other UI elements
    }}
  >
    <CircularProgress size={72} sx={{ color: "#FF5364" }} />
  </Box>
);

export default LoadingScreen;
