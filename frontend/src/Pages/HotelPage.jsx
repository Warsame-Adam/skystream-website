import React, { useEffect } from "react";
import Footer from "../Components/Footer/Footer";
import FlightsNavbar from "../Components/Navbar/FlightsNavbar";
import HeroHotel from "../Components/Hero/HeroHotel";
import HotelBanner from "../Components/PromotionalBanner/HotelBanner";
import LocalHotelSection from "../Components/HotelSelections/LocalHotelSelection";
import CityHotelSelection from "../Components/HotelSelections/CityHotelSelection";
import HotelFAQ from "../Components/FAQs/HotelFAQ";
import HomeFooter from "../Components/Footer/HomeFooter";

import CentredFooter from "../Components/Footer/CentredFooter";
import FastFactsHotels from "../Components/FastFactsHotels";

const HotelPage = () => {
  return (
    <>
      <FlightsNavbar />
      <HeroHotel />
      <HotelBanner />
      <LocalHotelSection />
      <CityHotelSelection />
      <FastFactsHotels />
      <HotelFAQ />
      <HomeFooter />

      {/* <CentredFooter /> */}
    </>
  );
};

export default HotelPage;
