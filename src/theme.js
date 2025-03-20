import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F7FAFC", // Light Grayish Blue (Clean & Neutral)
      paper: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
