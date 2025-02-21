import React from "react";
import IndividualHotelNavbar from "../Components/Navbar/IndividualHotelNavbar";
import BreadCrumbs from "../Components/BreadCrumbs";
import HotelDetailsSection from "../Components/HotelDetailsSection";
import HotelImageSection from "../Components/HotelImageSection";
import IndividualHotelTabs from "../Components/IndividualHotelTabs";
import RoomsAndPrices from "../Components/RoomsAndPrices";
import FastfactsandAmenties from "../Components/FastfactsandAmenties";
import TravellerReviews from "../Components/TravellerReviews";
import HotelMap from "../Components/HotelMap";
import IndividualHotelFAQ from "../Components/IndividualHotelFAQ";
import RecommendedHotels from "../Components/RecommendedHotels";
import CentredFooter from "../Components/Footer/CentredFooter";

const IndividualHotelPage = () => {
  return (
    <>
      <IndividualHotelNavbar />
      <BreadCrumbs />
      <HotelDetailsSection />
      <HotelImageSection />
      <IndividualHotelTabs />
      <RoomsAndPrices />
      <FastfactsandAmenties />
      <TravellerReviews />
      <HotelMap />
      <IndividualHotelFAQ />
      <RecommendedHotels />
      <CentredFooter />
    </>
  );
};

export default IndividualHotelPage;
