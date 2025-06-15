import React, { useContext, useEffect } from "react";
import Navbar from "../Components/layout/Navbar";
import HomeSearchBar from "../Components/home/HomeSearchBar";
// import CalendarLayout from "../Components/CalendarLayout";
import Hero from "../Components/home/Hero";
import FAQ from "../Components/FAQs/FAQs";
import HomeFooter from "../Components/layout/HomeFooter";
import { GlobalContext } from "../context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { setFrom } from "../Components/Slices/flightSearchSlice";
import { Box } from "@mui/material";

const HomePage = () => {
  const { visitorData, locations } = useContext(GlobalContext);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (visitorData && locations.length > 0) {
      const cityCodeObj = locations.find(
        (x) =>
          x.cityCode.toLowerCase() === visitorData.cityCode?.toLowerCase() &&
          x.countryCode.toLowerCase() === visitorData.countryCode?.toLowerCase()
      );

      if (cityCodeObj) {
        dispatch(
          setFrom({
            cityName: cityCodeObj.cityName,
            cityCode: cityCodeObj.cityCode,
            countryName: cityCodeObj.countryName,
            countryCode: cityCodeObj.countryCode,
          })
        );
      }
    }
  }, [visitorData, locations]);

  return (
    <>
      <Navbar />
      <HomeSearchBar />
      {/* <CalendarLayout /> */}
      <Hero />
      <FAQ />
      <Box sx={{ mt: "2rem" }} />

      <HomeFooter />
    </>
  );
};

export default HomePage;
