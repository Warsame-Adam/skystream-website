import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#0062e3", // Deep blue color
      light: "#336699", // Lighter blue color
      dark: "#024daf", // Darker shade of blue
    },
    secondary: {
      main: "#ffffff", // Sky blue color
    },
    common: {
      blue: "#05203c",
    },
    background: {
      default: "#0a1f44", // Background color
      paper: "#ffffff", // Paper background color
    },
    text: {
      primary: "#ffffff", // Text color
      secondary: "#00BFFF", // Secondary text color
    },
  },
  typography: {
    fontFamily:
      '"SkyStreamRelative", -apple-system, BlinkMacSystemFont, "Segoe UI","Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans","Helvetica Neue", sans-serif',
  },
});

export default Theme;
