import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IndividualHotelNavbar from "../Components/Navbar/IndividualHotelNavbar";
import BreadCrumbs from "../Components/BreadCrumbs";
import HotelDetailsSection from "../Components/HotelDetailsSection";
import HotelImageSection from "../Components/HotelImageSection";
import IndividualHotelTabs from "../Components/IndividualHotelTabs";
import RoomsAndPrices from "../Components/RoomsAndPrices";
import FastfactsandAmenties from "../Components/FastfactsandAmenties";
import TravellerReviews from "../Components/TravellerReviews";
import HotelMap from "../Components/HotelMap";
import IndividualHotelFAQ from "../Components/IndividualHotelFAQ";
import RecommendedHotels from "../Components/RecommendedHotels";
// import CentredFooter from "../Components/Footer/CentredFooter";
import CentredFooter from "../Components/Footer/HomeFooter";
import { getHotelById } from "../services/hotel";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
const IndividualHotelPage = () => {
  const params = useParams();
  const idParams = params?.hotelId;

  const [hotel, setHotel] = useState();
  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });
  const [error, setError] = useState({
    active: false,
    message: "",
    action: "",
  });

  const fetchHotelWithId = async (id, action) => {
    setLoading({
      active: true,
      action: action,
    });
    const hotelsData = await getHotelById(id);
    if (hotelsData.success) {
      setHotel(hotelsData.data);
    } else {
      setError({
        active: true,
        message: hotelsData.error,
        action: action,
      });
    }
    setLoading({
      active: false,
      action: "",
    });
  };

  useEffect(() => {
    fetchHotelWithId(idParams, "page");
  }, [idParams]);

  const loadingUI = (
    <Box
      minHeight='70vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <CircularProgress size='30px' />
    </Box>
  );
  const errorUI = (
    <Container className='container'>
      <Box
        minHeight='70vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Alert severity='error' sx={{ width: "100%", mt: "20px" }}>
          {error.message}
        </Alert>
      </Box>
    </Container>
  );
  return (
    <>
      <IndividualHotelNavbar />
      {loading.active && loading.action === "page" ? (
        loadingUI
      ) : error.active && error.action === "page" ? (
        errorUI
      ) : (
        <>
          <BreadCrumbs hotel={hotel} />
          <HotelDetailsSection hotel={hotel} />
          <HotelImageSection hotel={hotel} />
          <IndividualHotelTabs hotel={hotel} />
          <RoomsAndPrices hotel={hotel} />
          <FastfactsandAmenties hotel={hotel} />
          <TravellerReviews hotel={hotel} />
          <HotelMap hotel={hotel} />
          <IndividualHotelFAQ hotel={hotel} />
          <RecommendedHotels hotel={hotel} />
        </>
      )}
      <CentredFooter />
    </>
  );
};

export default IndividualHotelPage;
