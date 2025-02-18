import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import homeSearchbar from "./Components/SearchBar/HomeSearchBar.jsx";
import { ThemeProvider } from "@mui/material";
import Theme from "./Theme.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { enGB } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import FlightPage from "./Pages/FlightPage.jsx";
import HotelPage from "./Pages/HotelPage.jsx";
import IndividualHotelPage from "./Pages/IndividualHotelPage.jsx";
import CityHotelsPage from "./Pages/CityHotelsPage.jsx";
import FlightSearchResultsPage from "./Pages/FlightSearchResultsPage.jsx";

function App() {
  return (
    <LocalizationProvider adapterLocale={enGB} dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={Theme}>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/flights' element={<FlightPage />} />
            <Route
              path='/flights/:origin/:destination/:departureDate/:returnDate'
              element={<FlightSearchResultsPage />}
            />
            <Route path='/hotels' element={<HotelPage />} />
            <Route
              path='/hotels/:country/:city/:hotelName/:hotelId'
              element={<IndividualHotelPage />}
            />
            <Route path='/hotels/:country/:city' element={<CityHotelsPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
