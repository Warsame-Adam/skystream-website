import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import IndividualHotelNavbar from "../Components/layout/IndividualHotelNavbar.jsx";
import BreadCrumbs from "../Components/hotelDetails/BreadCrumbs";
import HotelDetailsSection from "../Components/hotelDetails/HotelDetailsSection";
import HotelImageSection from "../Components/hotelDetails/HotelImageSection";
import IndividualHotelTabs from "../Components/hotelDetails/IndividualHotelTabs";
import RoomsAndPrices from "../Components/hotelDetails/RoomsAndPrices";
import FastfactsandAmenties from "../Components/hotelDetails/FastfactsandAmenties";
import TravellerReviews from "../Components/hotelDetails/TravellerReviews";
import HotelMap from "../Components/hotelDetails/HotelMap";
import IndividualHotelFAQ from "../Components/FAQs/IndividualHotelFAQ";
import RecommendedHotels from "../Components/hotelDetails/RecommendedHotels";
// import CentredFooter from "../Components/Footer/CentredFooter";
import CentredFooter from "../Components/layout/HomeFooter";
import { getHotelById } from "../services/hotel";
import { useDispatch } from "react-redux";
import {
  setAdults,
  setChildren,
  setRooms,
} from "../Components/Slices/HotelTravellersddSlice";
import {
  setDepartureDate,
  setReturnDate,
} from "../Components/Slices/dateStore.js";

const IndividualHotelPage = () => {
  const dispatch = useDispatch();
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
    window.scrollTo(0, 0);
  }, []);

  

  useEffect(() => {
    fetchHotelWithId(idParams, "page");
    dispatch(setAdults(1));
    dispatch(setChildren(0));
    dispatch(setRooms(1));
    setDepartureDate(null);
    setReturnDate(null);
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
      {loading.active && loading.action === "page"
        ? loadingUI
        : error.active && error.action === "page"
        ? errorUI
        : hotel && (
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
      <Box sx={{ mt: "2rem" }} />

      <CentredFooter />
    </>
  );
};

export default IndividualHotelPage;
