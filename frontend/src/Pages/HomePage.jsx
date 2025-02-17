import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import HomeSearchBar from "../Components/SearchBar/HomeSearchBar";
import CalendarLayout from "../Components/CalendarLayout";
import Hero from "../Components/Hero/Hero";
import FAQ from "../Components/FAQs/FAQs";
import HomeFooter from "../Components/Footer/HomeFooter";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HomeSearchBar />
      {/* <CalendarLayout /> */}
      <Hero />
      <FAQ />
      <HomeFooter />
    </>
  );
};

export default HomePage;
