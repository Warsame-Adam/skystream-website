import React, { useEffect, useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// import CityHotelNavbar from "../Components/Navbar/CityHotelsNavbar";
import FlightsNavbar from "../Components/layout/FlightsNavbar";
import CityHotelsSearchBar from "../Components/cityHotels/CityHotelsSearchBar";
import CityHotelsInfoSection from "../Components/cityHotels/CityHotelsInfoSection";
import CityHotelsMap from "../Components/cityHotels/CityHotelsMap";
import CityHotelsList from "../Components/cityHotels/CityHotelsList";
import CityHotelStarRatings from "../Components/cityHotels/CityHotelStarRatings";
import CityHotelsFastFacts from "../Components/cityHotels/CityHotelsFastFacts";
import CityHotelsFAQs from "../Components/FAQs/CityHotelsFAQs";
// import CentredFooter from "../Components/Footer/CentredFooter";
import HomeFooter from "../Components/layout/HomeFooter";
import {
  setDestination,
  setOtherOptions,
} from "../Components/Slices/hotelSearchSlice";

import {
  setDepartureDate,
  setReturnDate,
} from "../Components/Slices/dateStore.js";
import {
  setAdults,
  setChildren,
  setRooms,
} from "../Components/Slices/HotelTravellersddSlice.js";
import { getHotels } from "../services/hotel.js";
import { GlobalContext } from "../context/GlobalContext.js";
import { Box } from "@mui/material";

const isDate = (val) => !isNaN(new Date(val).getTime());

const CityHotelsPage = () => {
  const dispatch = useDispatch();

  const { locations } = useContext(GlobalContext);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const countryParams = params?.country;
  const cityParams = params.city;
  const departureDateParams = searchParams.get("availableFrom");
  const returnDateParams = searchParams.get("availableTo");
  const adultsParams = searchParams.get("adults");
  const childrenParams = searchParams.get("children");
  const roomsParams = searchParams.get("rooms");
  const freeCancellationParams = searchParams.get("freeCancellation");
  const ratingParams = searchParams.get("rating");
  const minReviewParams = searchParams.get("minReview");

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });
  const [error, setError] = useState({
    active: false,
    message: "",
    action: "",
  });

  const fetchHotelsWithSearch = async (filters, action) => {
    setLoading({
      active: true,
      action: action,
    });
    const hotelsData = await getHotels(filters);
    if (hotelsData.success) {
      setHotels(hotelsData.data);
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
    if (locations.length === 0) {
      return;
    }
    let query = {};
    if (countryParams && cityParams) {
      let foundCity = locations.find(
        (loc) =>
          loc.countryCode.toLowerCase() === `${countryParams}`.toLowerCase() &&
          loc.cityCode.toLowerCase() === `${cityParams}`.toLowerCase()
      );
      if (foundCity) {
        dispatch(setDestination(foundCity));
        query.country = countryParams;
        query.city = cityParams;
      }
    } else if (countryParams) {
      let foundCountryDocuments = locations.some(
        (loc) =>
          loc.countryCode.toLowerCase() === `${countryParams}`.toLowerCase()
      );
      if (foundCountryDocuments) {
        query.country = countryParams;
      }
    }

    if (departureDateParams && isDate(departureDateParams * 1)) {
      const departureD = new Date(departureDateParams * 1);
      departureD.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

      dispatch(setDepartureDate(departureD.getTime()));
      query.availableFrom = departureD.toString();
    }
    if (returnDateParams && isDate(returnDateParams * 1)) {
      const returnD = new Date(returnDateParams * 1);
      returnD.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

      dispatch(setReturnDate(returnD.getTime()));
      query.availableTo = returnD.toString();
    }
    if (freeCancellationParams === "true") {
      query.freeCancellation = true;
      setOtherOptions({
        freeCancellation: true,
      });
    }

    if (minReviewParams) {
      query.minReview = minReviewParams * 1;

      if (minReviewParams * 1 == 4) {
        setOtherOptions({
          fourStar: true,
          fiveStar: true,
        });
      }
    }

    if (ratingParams) {
      query.rating = ratingParams * 1;

      if (ratingParams * 1 == 4 || ratingParams * 1 == 5) {
        setOtherOptions({
          fourStar: ratingParams * 1 == 4 ? true : false,
          fiveStar: ratingParams * 1 == 5 ? true : false,
        });
      }
    }

    if (
      adultsParams &&
      adultsParams * 1 > 0 &&
      childrenParams &&
      childrenParams * 1 > 0 &&
      roomsParams &&
      roomsParams * 1 > 0
    ) {
      const noOfPersons = adultsParams * 1 + childrenParams * 1;
      query.noOfPersons = noOfPersons;
      query.noOfRooms = roomsParams * 1;

      dispatch(setAdults(adultsParams * 1));
      dispatch(setChildren(childrenParams * 1));
      dispatch(setRooms(roomsParams * 1));
    }

    fetchHotelsWithSearch(query, "page");
  }, [
    locations,
    countryParams,
    cityParams,
    departureDateParams,
    returnDateParams,
    adultsParams,
    childrenParams,
    roomsParams,
    freeCancellationParams,
    ratingParams,
    minReviewParams,
  ]);

  return (
    <>
      <FlightsNavbar />
      <CityHotelsSearchBar />
      <CityHotelsInfoSection />
      <CityHotelsMap />
      <CityHotelsList loading={loading} error={error} hotels={hotels} />
      <CityHotelStarRatings />
      <CityHotelsFastFacts countryCode={countryParams} cityCode={cityParams} />
      <CityHotelsFAQs />
      <Box sx={{ mt: "2rem" }} />

      <HomeFooter />
    </>
  );
};

export default CityHotelsPage;
