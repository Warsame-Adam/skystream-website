import React, { useContext, useEffect } from "react";
import FlightsNavbar from "../Components/layout/FlightsNavbar";
import HeroFlights from "../Components/flights/HeroFlights";
import ReturnSearchBar from "../Components/shared/ReturnSearchBar";
import FlightLocations from "../Components/flights/FlightLocations";
import FlightFAQ from "../Components/FAQs/FlightFAQ";
import FlightInfoSection from "../Components/flights/FlightInfoSection";
import CentredFooter from "../Components/layout/CentredFooter";
import HomeFooter from "../Components/layout/HomeFooter";
import { useDispatch } from "react-redux";
import { GlobalContext } from "../context/GlobalContext";
import { setFrom } from "../Components/Slices/flightSearchSlice";
import { Box } from "@mui/material";
const FlightPage = () => {
  const { visitorData, locations } = useContext(GlobalContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visitorData && locations.length > 0) {
      const cityCodeObj = locations.find(
        (x) =>
          x.cityCode.toLowerCase() === visitorData.cityCode?.toLowerCase() &&
          x.countryCode.toLowerCase() === visitorData.countryCode?.toLowerCase()
      );
      if (cityCodeObj) {
        dispatch(
          setFrom({
            cityName: cityCodeObj.cityName,
            cityCode: cityCodeObj.cityCode,
            countryName: cityCodeObj.countryName,
            countryCode: cityCodeObj.countryCode,
          })
        );
      }
    }
  }, [visitorData, locations]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <FlightsNavbar />
      <HeroFlights />
      <FlightLocations />
      <FlightFAQ />
      <FlightInfoSection />
      <Box sx={{ mt: "2rem" }} />

      <HomeFooter />
      {/* <CentredFooter /> */}
    </>
  );
};

export default FlightPage;
