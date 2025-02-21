import React from "react";
// import CityHotelNavbar from "../Components/Navbar/CityHotelsNavbar";
import FlightsNavbar from "../Components/Navbar/FlightsNavbar";
import CityHotelsSearchBar from "../Components/SearchBar/CityHotelsSearchBar";
import CityHotelsInfoSection from "../Components/CityHotelsInfoSection";
import CityHotelsMap from "../Components/CityHotelsMap";
import CityHotelsList from "../Components/CityHotelsList";
import CityHotelStarRatings from "../Components/CityHotelStarRatings";
import CityHotelsFastFacts from "../Components/CityHotelsFastFacts";
import CityHotelsFAQs from "../Components/CityHotelsFAQs";
// import CentredFooter from "../Components/Footer/CentredFooter";
import HomeFooter from "../Components/Footer/HomeFooter";

const CityHotelsPage = () => {
  return (
    <>
      <FlightsNavbar />
      <CityHotelsSearchBar />
      <CityHotelsInfoSection />
      <CityHotelsMap />
      <CityHotelsList />
      <CityHotelStarRatings />
      <CityHotelsFastFacts />
      <CityHotelsFAQs />
      <HomeFooter />
    </>
  );
};

export default CityHotelsPage;
