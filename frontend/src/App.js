import "./App.css"
import Navbar from "./Components/Navbar/Navbar"
import SearchBar from "./Components/SearchBar/SearchBar"
import { ThemeProvider } from "@mui/material";
import Theme from "./Theme.js"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';



function App() {
  return (

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={Theme}>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
      </Routes>
    </Router>

      

      </ThemeProvider>
      </LocalizationProvider>

    

  )

}

export default App;
