import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import FlightSearchResultsNavbar from "../Components/FlightSearchResultsNavbar";
import FlightsNavbar from "../Components/Navbar/FlightsNavbar";
import FlightSearchUI from "../Components/FlightSearchUI";
import FlightSearchResults from "../Components/FlightSearchResults";
import HomeFooter from "../Components/Footer/HomeFooter";
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
    setLoading({
      active: true,
      action: action,
    });
    const flightsData = await getFlights(filters);
    if (flightsData.success) {
      setFlights(flightsData.data);
    } else {
      setError({
        active: true,
        message: flightsData.error,
        action: action,
      });
    }
    setLoading({
      active: false,
      action: "",
    });
  };
  useEffect(() => {
    if (locations.length === 0) {
      return;
    }
    let query = {};
    if (originCountryParams && originCityParams) {
      let foundCity = locations.find(
        (loc) =>
          loc.countryCode.toLowerCase() ===
            `${originCountryParams}`.toLowerCase() &&
          loc.cityCode.toLowerCase() === `${originCityParams}`.toLowerCase()
      );
      console.log(foundCity, originCountryParams, originCityParams);
      if (foundCity) {
        dispatch(setFrom(foundCity));
        query.originCountry = originCountryParams;
        query.originCity = originCityParams;
      }
    } else if (originCountryParams) {
      let foundCountryDocuments = locations.some(
        (loc) =>
          loc.countryCode.toLowerCase() ===
          `${originCountryParams}`.toLowerCase()
      );
      if (foundCountryDocuments) {
        query.originCountry = originCountryParams;
      }
    }

    if (destinationCountryParams && destinationCityParams) {
      let foundCity = locations.find(
        (loc) =>
          loc.countryCode.toLowerCase() ===
            `${destinationCountryParams}`.toLowerCase() &&
          loc.cityCode.toLowerCase() ===
            `${destinationCityParams}`.toLowerCase()
      );
      if (foundCity) {
        dispatch(setTo(foundCity));
        query.destinationCountry = destinationCountryParams;
        query.destinationCity = destinationCityParams;
      }
    }
    if (departureDateParams && isDate(departureDateParams * 1)) {
      const departureD = new Date(departureDateParams * 1);
      departureD.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

      dispatch(setDepartureDate(departureD.getTime()));
      query.departureTime = departureD.toString();
    }
    if (returnDateParams && isDate(returnDateParams * 1)) {
      const returnD = new Date(returnDateParams * 1);
      returnD.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

      dispatch(setReturnDate(returnD.getTime()));
      query.arrivalTime = returnD.toString();
    }
    if (directParams === "true") {
      query.direct = true;
      setOtherOptions({
        direct: true,
      });
    }
    if (onewayParams === "true") {
      query.oneway = true;
      setSearchType("oneway");
    } else if (onewayParams === "false") {
      query.oneway = false;
      setSearchType("return");
    }

    if (
      adultsParams &&
      adultsParams > 0 &&
      childrenParams &&
      childrenParams > 0 &&
      cabinClassParams &&
      classes.some((x) => x.type === cabinClassParams)
    ) {
      const vacancy = adultsParams + childrenParams;
      const classType = cabinClassParams;
      query.classType = classType;
      query.vacancy = vacancy;

      dispatch(setAdults(adultsParams));
      dispatch(setChildren(childrenParams));
      dispatch(setCabinClass(cabinClassParams));
    }

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
