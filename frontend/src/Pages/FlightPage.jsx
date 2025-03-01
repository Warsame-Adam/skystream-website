import React from "react";
import FlightsNavbar from "../Components/Navbar/FlightsNavbar";
import HeroFlights from "../Components/Hero/HeroFlights";
import ReturnSearchBar from "../Components/SearchBar/ReturnSearchBar";
import FlightLocations from "../Components/FlightLocations/FlightLocations";
import FlightFAQ from "../Components/FAQs/FlightFAQ";
import FlightInfoSection from "../Components/FlightInfoSection";
import CentredFooter from "../Components/Footer/CentredFooter";
import HomeFooter from "../Components/Footer/HomeFooter";
const FlightPage = () => {
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
