import React, { useContext, useEffect } from "react";
import FlightsNavbar from "../Components/Navbar/FlightsNavbar";
import HeroFlights from "../Components/Hero/HeroFlights";
import ReturnSearchBar from "../Components/SearchBar/ReturnSearchBar";
import FlightLocations from "../Components/FlightLocations/FlightLocations";
import FlightFAQ from "../Components/FAQs/FlightFAQ";
import FlightInfoSection from "../Components/FlightInfoSection";
import CentredFooter from "../Components/Footer/CentredFooter";
import HomeFooter from "../Components/Footer/HomeFooter";
import { useDispatch } from "react-redux";
import { GlobalContext } from "../context/GlobalContext";
import { setFrom } from "../Components/Slices/flightSearchSlice";
const FlightPage = () => {
  const { visitorData, locations } = useContext(GlobalContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visitorData && locations.length > 0) {
      const cityCodeObj = locations.find(
        (x) =>
          x.cityCode === visitorData.cityCode &&
          x.countryCode === visitorData.countryCode
      );
      if (cityCodeObj) {
        dispatch(
          setFrom({
            cityName: cityCodeObj.city,
            cityCode: cityCodeObj.cityCode,
            countryName: cityCodeObj.country,
            countryCode: cityCodeObj.countryCode,
          })
        );
      }
    }
  }, [visitorData, locations]);

  return (
    <>
      <FlightsNavbar />
      <HeroFlights />
      <FlightLocations />
      <FlightFAQ />
      <FlightInfoSection />
      <HomeFooter />
      {/* <CentredFooter /> */}
    </>
  );
};

export default FlightPage;
