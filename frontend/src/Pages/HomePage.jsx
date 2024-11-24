import React from "react"
import Navbar from "../Components/Navbar/Navbar";
import HomeSearchBar from "../Components/SearchBar/HomeSearchBar";
import CalendarLayout from "../Components/CalendarLayout";
import Hero from "../Components/Hero/Hero";
import FAQ from "../Components/FAQs/FAQs";
import Footer from "../Components/Footer/Footer";




const HomePage = () => {

    return (
        <>
        <Navbar />
        <HomeSearchBar />
        <CalendarLayout />
        <Hero/>
        <FAQ/>
        <Footer/>
       
        
        
    
        </>
    )
}

export default HomePage