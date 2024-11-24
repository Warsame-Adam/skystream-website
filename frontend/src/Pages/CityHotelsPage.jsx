import React from "react";
import CityHotelNavbar from "../Components/Navbar/CityHotelsNavbar";
import CityHotelsSearchBar from "../Components/SearchBar/CityHotelsSearchBar";
import CityHotelsInfoSection from "../Components/CityHotelsInfoSection";
import CityHotelsMap from "../Components/CityHotelsMap";
import CityHotelsList from "../Components/CityHotelsList";
import CityHotelStarRatings from "../Components/CityHotelStarRatings";
import CityHotelsFastFacts from "../Components/CityHotelsFastFacts";
import CityHotelsFAQs from "../Components/CityHotelsFAQs";
import CentredFooter from "../Components/Footer/CentredFooter";






const CityHotelsPage = () => {

    return (
        <>
          <CityHotelNavbar />
          <CityHotelsSearchBar />
          <CityHotelsInfoSection />
          <CityHotelsMap />
          <CityHotelsList />
          <CityHotelStarRatings />
          <CityHotelsFastFacts />
          <CityHotelsFAQs />
          <CentredFooter />
           
        </>
      );
      


}







export default CityHotelsPage;