import { createTheme } from "@mui/material"; 

const Theme = createTheme({
    palette: {
    primary:{
      main: '#003366', // Deep blue color
      light: '#336699', // Lighter blue color
      dark: '#002244', // Darker shade of blue
    },
    secondary: {
      main: '#00BFFF', // Sky blue color
    },
    background: {
      default: '#0a1f44', // Background color
      paper: '#ffffff', // Paper background color
    },
    text: {
      primary: '#ffffff', // Text color
      secondary: '#00BFFF', // Secondary text color
    },
}
  
});

export default Theme;

    
