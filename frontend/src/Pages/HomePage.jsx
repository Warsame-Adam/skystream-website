import React from "react"
import Navbar from "../Components/Navbar/Navbar";
import SearchBar from "../Components/SearchBar/SearchBar";
import CalandarLayout from "../Components/CalandarLayout";
import Hero from "../Components/Hero/Hero";
import FAQ from "../Components/FAQs/FAQs";
import Footer from "../Components/Footer/Footer";



const HomePage = () => {

    return (
        <>
        <Navbar />
        <SearchBar />
        <CalandarLayout />
        <Hero/>
        <FAQ/>
        <Footer/>
        
        
    
        </>
    )
}

export default HomePage