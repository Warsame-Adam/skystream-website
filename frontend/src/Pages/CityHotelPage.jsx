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
import { useParams, useSearchParams } from "react-router-dom";

const CityHotelsPage = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const countryParams = params?.country;
  const cityParams = params.city;
  const departureDateParams = searchParams.get("availableFrom");
  const returnDateParams = searchParams.get("availableTo");
  const adultsParams = searchParams.get("adults");
  const childrenParams = searchParams.get("children");
  const roomsParams = searchParams.get("children");
  const freeCancellationParams = searchParams.get("freeCancellation");
  const ratingParams = searchParams.get("rating");
  const minReviewParams = searchParams.get("minReview");

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
