import React from "react"
import FlightsNavbar from "../Components/Navbar/FlightsNavbar"
import { Container } from "@mui/material"
import HeroFlights from "../Components/Hero/HeroFlights"
import ReturnSearchBar from "../Components/SearchBar/ReturnSearchBar";
import MultiCitySearchBar from "../Components/SearchBar/MultiCitySearchBar";
import FlightLocations  from "../Components/FlightLocations/FlightLocations";
import FlightFAQ from "../Components/FAQs/FlightFAQ";
import FlightInfoSection from "../Components/FlightInfoSection";
import Footer from "../Components/Footer/Footer";




const FlightPage = () => {



    return (
        <>
        
        <FlightsNavbar />
        <HeroFlights />
        <FlightLocations />
        <FlightFAQ />
        <FlightInfoSection />
        <Footer />
        
        
        
        
        
        
        </>


    )
}


export default FlightPage;