import "./App.css"
import Navbar from "./Components/Navbar/Navbar"
import homeSearchbar from "./Components/SearchBar/HomeSearchBar.jsx"
import { ThemeProvider } from "@mui/material";
import Theme from "./Theme.js"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import FlightPage from "./Pages/FlightPage.jsx";



function App() {
  return (

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={Theme}>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path = "/flights" element={<FlightPage />} />
        
      </Routes>
    </Router>

      

      </ThemeProvider>
      </LocalizationProvider>

    

  )

}

export default App;
