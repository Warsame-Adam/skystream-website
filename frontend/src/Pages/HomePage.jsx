import React, { useContext, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import HomeSearchBar from "../Components/SearchBar/HomeSearchBar";
// import CalendarLayout from "../Components/CalendarLayout";
import Hero from "../Components/Hero/Hero";
import FAQ from "../Components/FAQs/FAQs";
import HomeFooter from "../Components/Footer/HomeFooter";
import { GlobalContext } from "../context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { setFrom } from "../Components/Slices/flightSearchSlice";

const HomePage = () => {
  const { visitorData, locations } = useContext(GlobalContext);
  const dispatch = useDispatch();

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
      <HomeFooter />
    </>
  );
};

export default HomePage;
