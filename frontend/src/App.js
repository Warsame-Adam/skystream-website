import { useContext, useEffect } from "react";
import "./App.css";
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
import { GlobalContext, GlobalProvider } from "./context/GlobalContext.js";
import { jwtKey, visitorDataKey } from "./data/websiteInfo.js";
import axiosInstance, { setupAxiosInterceptors } from "./utils/axios.js";
import {
  getLocations,
  getAirlines,
  getFlightClasses,
  getAirports,
} from "./services/flight.js";
import { useDispatch } from "react-redux";
import { setFrom } from "./Components/Slices/flightSearchSlice";

function AuthCheck({ children }) {
  const {
    user: globalUser,
    setAuth,
    visitorData,
    setVisitorData,
    setLocationsData,
    setAirlinesData,
    setClassesData,
    setAirportsData,
  } = useContext(GlobalContext);
  const dispatch = useDispatch();

  //Setting up Axios Interceptors
  useEffect(() => {
    const getToken = () => (globalUser ? globalUser.token : "");
    setupAxiosInterceptors(getToken);
  }, [globalUser]);

  //Checking for JWT Token in Local Storage
  useEffect(() => {
    const fetchToken = async () => {
      let Token = null;
      try {
        Token = await localStorage.getItem(jwtKey);
      } catch (e) {
        console.log("Error Fetching jwt Token");
      }

      if (Token) {
        try {
          const result = await axiosInstance.post("/auth/validateToken", null, {
            headers: {
              authorization: "Bearer " + Token,
            },
          });
          if (result.data.success) {
            setAuth({ ...result.data.data.user, token: Token });
          }
        } catch (e) {}
      } else {
      }
    };
    fetchToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //Fetching Visitor Data
  useEffect(() => {
    if (visitorData !== null) {
      return;
    }
    let visitorObject = null;
    try {
      visitorObject = localStorage.getItem(visitorDataKey);
      if (visitorObject) {
        visitorObject = JSON.parse(visitorObject);
      }
    } catch (e) {
      visitorObject = null;
    }
    if (visitorObject) {
      let visitorInfo = {
        currency:
          visitorObject?.currency && visitorObject?.currency?.code
            ? visitorObject?.currency
            : {
                code: "GBP",
                name: "Pound",
                symbol: "£",
              },
        country: visitorObject.country
          ? visitorObject.country
          : "United Kingdom",
        countryCode: visitorObject.countryCode
          ? visitorObject.countryCode
          : "UK",
        phoneCode: visitorObject.phoneCode ? visitorObject.phoneCode : "+44",
        capital: visitorObject.capital ? visitorObject.capital : "LHR",
        city: visitorObject.city ? visitorObject.city : "London",
        cityCode: visitorObject.cityCode ? visitorObject.cityCode : "LHR",
        postal: visitorObject.postal ? visitorObject.postal : "",
        state: visitorObject.state ? visitorObject.state : "",
        language: visitorObject.language ? visitorObject.language : "English",
        languageCode: visitorObject.languageCode
          ? visitorObject.languageCode
          : "eng",
        timeZone: visitorObject.timeZone ? visitorObject.timeZone : "GMT",
        timeZoneOffset: visitorObject.timeZoneOffset
          ? visitorObject.timeZoneOffset
          : "UTC +0",
      };
      setVisitorData(visitorInfo);
    } else {
      fetch(
        `https://api.ipregistry.co/?key=${process.env.REACT_APP_GEOLOCATION_API_KEY}`
      )
        .then(function (response) {
          return response.json();
        }) //make sure to update data like if  if (visitorObject) { requirement
        .then(function (payload) {
          let visitorInfo = {
            currency: payload?.currency,
            country: payload?.location?.country?.name,
            countryCode: payload?.location?.country?.code,
            phoneCode: payload?.location?.country?.calling_code,
            capital: payload?.location?.country.capital,
            city: payload?.location?.city,
            postal: payload?.location?.postal,
            state: payload?.location?.region?.name,
            language: payload?.location?.language?.name,
            languageCode: payload?.location?.language?.code,
            timeZone: payload?.time_zone?.id,
            timeZoneOffset: payload?.time_zone?.offset,
          };
          setVisitorData(visitorInfo);
          localStorage.setItem(visitorDataKey, JSON.stringify(visitorInfo));
        })
        .catch((err) => {
          console.log(err);

          let visitorInfo = {
            currency: {
              code: "GBP",
              name: "Pound",
              symbol: "£",
            },
            country: "United Kingdom",
            countryCode: "UK",
            phoneCode: "+44",
            capital: "LHR",
            city: "London",
            cityCode: "LHR",
            postal: "",
            state: "",
            language: "English",
            languageCode: "eng",
            timeZone: "GMT",
            timeZoneOffset: "UTC +0",
          };
          setVisitorData(visitorInfo);
        });
    }
  }, []);

  //initial Data
  useEffect(() => {
    const fetchInitialData = async () => {
      const locationResponse = await getLocations();
      if (locationResponse.success) {
        setLocationsData(locationResponse.data);
      }

      const airlineResponse = await getAirlines();
      if (airlineResponse.success) {
        setAirlinesData(airlineResponse.data);
      }

      const classesResponse = await getFlightClasses();
      if (classesResponse.success) {
        setClassesData(classesResponse.data);
      }

      const airportResponse = await getAirports();
      if (airportResponse.success) {
        setAirportsData(classesResponse.data);
      }
    };
    fetchInitialData();
  }, []);

  //seting up from location automatically based on visitor location
  useEffect(() => {
    if (visitorData) {
      dispatch(
        setFrom({
          cityName: visitorData.city,
          cityCode: visitorData.cityCode,
          countryName: visitorData.country,
          countryCode: visitorData.countryCode,
        })
      );
    }
  }, [visitorData]);
  return children;
}
function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/flights' element={<FlightPage />} />
      <Route
        path='/flights/:originCountry/:originCity/:destinationCountry/:destinationCity/:departureDate/:returnDate'
        element={<FlightSearchResultsPage />}
      />
      <Route path='/hotels' element={<HotelPage />} />
      <Route
        path='/hotels/:country/:city/:hotelName/:hotelId'
        element={<IndividualHotelPage />}
      />
      <Route path='/hotels/:country/:city' element={<CityHotelsPage />} />
    </Routes>
  );
}
function App() {
  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <LocalizationProvider adapterLocale={enGB} dateAdapter={AdapterDateFns}>
          <GlobalProvider>
            <AuthCheck>
              <AppRoutes />
            </AuthCheck>
          </GlobalProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
}
export default App;
