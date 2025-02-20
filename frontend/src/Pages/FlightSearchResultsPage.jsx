import React from "react";
import FlightSearchResultsNavbar from "../Components/FlightSearchResultsNavbar";
import FlightsNavbar from "../Components/Navbar/FlightsNavbar";

import FlightSearchUI from "../Components/FlightSearchUI";

import FlightSearchResults from "../Components/FlightSearchResults";
import HomeFooter from "../Components/Footer/HomeFooter";

const FlightSearchResultsPage = () => {
  return (
    <>
      <FlightsNavbar />
      {/* <FlightSearchResultsNavbar /> */}
      <FlightSearchUI />
      <FlightSearchResults />
      <HomeFooter />
    </>
  );
};

export default FlightSearchResultsPage;
