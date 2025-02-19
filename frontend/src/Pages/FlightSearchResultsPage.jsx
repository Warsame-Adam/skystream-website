import React from "react";
import FlightSearchResultsNavbar from "../Components/FlightSearchResultsNavbar";
import FlightsNavbar from "../Components/Navbar/FlightsNavbar";

import FlightSearchUI from "../Components/FlightSearchUI";

import FlightSearchResults from "../Components/FlightSearchResults";

const FlightSearchResultsPage = () => {
  return (
    <>
      <FlightsNavbar />
      {/* <FlightSearchResultsNavbar /> */}
      <FlightSearchUI />
      <FlightSearchResults />
    </>
  );
};

export default FlightSearchResultsPage;
