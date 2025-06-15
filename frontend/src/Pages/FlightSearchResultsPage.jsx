import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import FlightSearchResultsNavbar from "../Components/_archive/FlightSearchResultsNavbar";
import FlightsNavbar from "../Components/layout/FlightsNavbar";
import FlightSearchUI from "../Components/flightResults/FlightSearchUI";
import FlightSearchResults from "../Components/flightResults/FlightSearchResults";
import HomeFooter from "../Components/layout/HomeFooter";
import { GlobalContext } from "../context/GlobalContext";
import {
  setFrom,
  setTo,
  setOtherOptions,
} from "../Components/Slices/flightSearchSlice";
import {
  setDepartureDate,
  setReturnDate,
} from "../Components/Slices/dateStore.js";
import {
  setAdults,
  setChildren,
  setCabinClass,
} from "../Components/Slices/HomeTravellersddSlice";
import { setSearchType } from "../Components/Slices/SearchBarSlice";
import { getFlights } from "../services/flight.js";

// Helper to check if a value is a valid date
const isDate = (val) => !isNaN(new Date(val).getTime());

const FlightSearchResultsPage = () => {
  const dispatch = useDispatch();
  const { locations, classes } = useContext(GlobalContext);

  const [searchParams] = useSearchParams();
  const originCountryParams = searchParams.get("originCountry");
  const originCityParams = searchParams.get("originCity");
  const destinationCountryParams = searchParams.get("destinationCountry");
  const destinationCityParams = searchParams.get("destinationCity");
  const departureDateParams = searchParams.get("departureDate");
  const returnDateParams = searchParams.get("returnDate");

  // <<< NEW: We grab these directly from the URL so we can pass them to the server >>>
  const cabinClassParams = searchParams.get("cabinClass"); 
  const adultsParams = searchParams.get("adults");
  const childrenParams = searchParams.get("children");

  const directParams = searchParams.get("direct");
  const onewayParams = searchParams.get("oneway");

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });
  const [error, setError] = useState({
    active: false,
    message: "",
    action: "",
  });

  const fetchFlightsWithSearch = async (filters, action) => {
    setLoading({ active: true, action });
    const flightsData = await getFlights(filters);
    if (flightsData.success) {
      // flightsData.data should hold your actual array (depending on how your service returns it)
      setFlights(flightsData.data);
    } else {
      setError({
        active: true,
        message: flightsData.error,
        action,
      });
    }
    setLoading({ active: false, action: "" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // We can't fetch flights until we know about our "locations" from context
    if (locations.length === 0) return;

    let query = {};

    // --- ORIGIN FILTERS ---
    if (originCountryParams && originCityParams) {
      const foundCity = locations.find(
        (loc) =>
          loc.countryCode.toLowerCase() === originCountryParams.toLowerCase() &&
          loc.cityCode.toLowerCase() === originCityParams.toLowerCase()
      );
      if (foundCity) {
        dispatch(setFrom(foundCity));
        query.originCountry = originCountryParams;
        query.originCity = originCityParams;
      }
    } else if (originCountryParams) {
      // If the user only specified a country, not a city
      const foundCountryDocuments = locations.some(
        (loc) =>
          loc.countryCode.toLowerCase() === originCountryParams.toLowerCase()
      );
      if (foundCountryDocuments) {
        query.originCountry = originCountryParams;
      }
    }

    // --- DESTINATION FILTERS ---
    if (destinationCountryParams && destinationCityParams) {
      const foundCity = locations.find(
        (loc) =>
          loc.countryCode.toLowerCase() ===
            destinationCountryParams.toLowerCase() &&
          loc.cityCode.toLowerCase() === destinationCityParams.toLowerCase()
      );
      if (foundCity) {
        dispatch(setTo(foundCity));
        query.destinationCountry = destinationCountryParams;
        query.destinationCity = destinationCityParams;
      }
    }

    // --- DEPARTURE / RETURN DATES ---
    if (departureDateParams && isDate(departureDateParams * 1)) {
      const departureD = new Date(departureDateParams * 1);
      departureD.setHours(0, 0, 0, 0);
      dispatch(setDepartureDate(departureD.getTime()));
      query.departureTime = departureD.toString();
    }
    if (returnDateParams && isDate(returnDateParams * 1)) {
      const returnD = new Date(returnDateParams * 1);
      returnD.setHours(23, 59, 59, 999);
      dispatch(setReturnDate(returnD.getTime()));
      query.arrivalTime = returnD.toString();
    }

    // --- DIRECT / ONEWAY ---
    if (directParams === "true") {
      query.direct = true;
      dispatch(setOtherOptions({ direct: true }));
    }
    if (onewayParams === "true") {
      query.oneway = true;
      dispatch(setSearchType("oneway"));
    } else if (onewayParams === "false") {
      query.oneway = false;
      dispatch(setSearchType("return"));
    }

    // >>> NEW: ADULTS / CHILDREN / CABINCLASS <<<
    // Even if children=0, let's still pass that to the backend.
    // We can also handle seat vacancy if desired.

    // 1) Parse them as numbers
    const numAdults = parseInt(adultsParams, 10);
    const numChildren = parseInt(childrenParams, 10);

    // 2) If the user gave us valid numbers, attach them to the query
    if (!isNaN(numAdults)) {
      query.adults = numAdults;       // pass to server
      dispatch(setAdults(numAdults)); // store in Redux
    }
    if (!isNaN(numChildren)) {
      query.children = numChildren;       // pass to server
      dispatch(setChildren(numChildren)); // store in Redux
    }

    // 3) For cabinClass, ensure it’s one of your known classes
    if (cabinClassParams && classes.some((x) => x.type === cabinClassParams)) {
      query.cabinClass = cabinClassParams;
      dispatch(setCabinClass(cabinClassParams));
    }

    // 4) If you still want to filter by seat vacancy (so flights must have enough seats),
    //    you can do:
    if (!isNaN(numAdults) || !isNaN(numChildren)) {
      const totalPassengers = (numAdults || 0) + (numChildren || 0);
      if (totalPassengers > 0 && cabinClassParams) {
        query.classType = cabinClassParams; // the field your backend uses for vacancy check
        query.vacancy = totalPassengers;
      }
    }

    // Now we have a query object with all relevant filters
    fetchFlightsWithSearch(query, "page");
  }, [
    locations,
    originCountryParams,
    originCityParams,
    destinationCountryParams,
    destinationCityParams,
    departureDateParams,
    returnDateParams,
    cabinClassParams,
    adultsParams,
    childrenParams,
    directParams,
    onewayParams,
    classes,
    dispatch,
  ]);

  return (
    <>
      <FlightsNavbar />
      {/* <FlightSearchResultsNavbar /> */}
      <FlightSearchUI fetchFlightsWithSearch={fetchFlightsWithSearch} />
      <FlightSearchResults loading={loading} error={error} flights={flights} />
      <HomeFooter />
    </>
  );
};

export default FlightSearchResultsPage;
