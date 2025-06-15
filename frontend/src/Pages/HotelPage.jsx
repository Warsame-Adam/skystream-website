import React, { useEffect } from "react";
import FlightsNavbar from "../Components/layout/FlightsNavbar";
import HeroHotel from "../Components/hotels/HeroHotel";
import HotelBanner from "../Components/hotels/HotelBanner";
import LocalHotelSection from "../Components/hotels/LocalHotelSelection";
import CityHotelSelection from "../Components/hotels/CityHotelSelection";
import HotelFAQ from "../Components/FAQs/HotelFAQ";
import HomeFooter from "../Components/layout/HomeFooter";

import FastFactsHotels from "../Components/hotels/FastFactsHotels";
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
