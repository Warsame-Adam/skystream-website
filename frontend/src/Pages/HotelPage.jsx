import React, { useEffect } from "react";
import FlightsNavbar from "../Components/Navbar/FlightsNavbar";
import HeroHotel from "../Components/Hero/HeroHotel";
import HotelBanner from "../Components/PromotionalBanner/HotelBanner";
import LocalHotelSection from "../Components/HotelSelections/LocalHotelSelection";
import CityHotelSelection from "../Components/HotelSelections/CityHotelSelection";
import HotelFAQ from "../Components/FAQs/HotelFAQ";
import HomeFooter from "../Components/Footer/HomeFooter";

import FastFactsHotels from "../Components/FastFactsHotels";
import { Box } from "@mui/material";

const HotelPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <>
      <FlightsNavbar />
      <HeroHotel />
      <HotelBanner />
      <LocalHotelSection />
      <CityHotelSelection />
      <FastFactsHotels />
      <HotelFAQ />
      <Box sx={{ mt: "2rem" }} />
      <HomeFooter />

      {/* <CentredFooter /> */}
    </>
  );
};

export default HotelPage;
