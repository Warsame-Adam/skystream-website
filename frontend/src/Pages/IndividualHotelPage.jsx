import React from "react"
import IndividualHotelNavbar from "../Components/Navbar/IndividualHotelNavbar";
import BreadCrumbs from "../Components/BreadCrumbs";
import HotelDetailsSection from "../Components/HotelDetailsSection";
import HotelImageSection from "../Components/HotelImageSection";
import IndividualHotelTabs from "../Components/IndividualHotelTabs";
import RoomsAndPrices from "../Components/RoomsAndPrices";
import FastfactsandAmenties from "../Components/FastfactsandAmenties";
import TravellerReviews from "../Components/TravellerReviews";

import { Box } from '@mui/material';



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

        <Box sx={{ height: '3000px' }} />
        

        </>
    )
}


export default IndividualHotelPage;