import React, { useEffect, useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// import CityHotelNavbar from "../Components/Navbar/CityHotelsNavbar";
import FlightsNavbar from "../Components/Navbar/FlightsNavbar";
import CityHotelsSearchBar from "../Components/SearchBar/CityHotelsSearchBar";
import CityHotelsInfoSection from "../Components/CityHotelsInfoSection";
import CityHotelsMap from "../Components/CityHotelsMap";
import CityHotelsList from "../Components/CityHotelsList";
import CityHotelStarRatings from "../Components/CityHotelStarRatings";
import CityHotelsFastFacts from "../Components/CityHotelsFastFacts";
import CityHotelsFAQs from "../Components/CityHotelsFAQs";
// import CentredFooter from "../Components/Footer/CentredFooter";
import HomeFooter from "../Components/Footer/HomeFooter";
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
      dispatch(setDepartureDate(departureDateParams * 1));
      query.availableFrom = departureDateParams;
    }
    if (returnDateParams && isDate(returnDateParams * 1)) {
      dispatch(setReturnDate(returnDateParams * 1));
      query.availableTo = returnDateParams;
    }
    if (freeCancellationParams === "true") {
      query.freeCancellation = true;
      setOtherOptions({
        freeCancellation: true,
      });
    }

    if (minReviewParams) {
      query.minReview = minReviewParams;

      if (minReviewParams == 4) {
        setOtherOptions({
          fourStar: true,
          fiveStar: true,
        });
      }
    }

    if (ratingParams) {
      query.rating = ratingParams;

      if (ratingParams == 4 || ratingParams == 5) {
        setOtherOptions({
          fourStar: ratingParams == 4 ? true : false,
          fiveStar: ratingParams == 5 ? true : false,
        });
      }
    }

    if (
      adultsParams &&
      adultsParams > 0 &&
      childrenParams &&
      childrenParams > 0 &&
      roomsParams
    ) {
      const noOfPersons = adultsParams + childrenParams;
      query.noOfPersons = noOfPersons;
      query.noOfRooms = roomsParams;

      dispatch(setAdults(adultsParams));
      dispatch(setChildren(childrenParams));
      dispatch(setRooms(roomsParams));
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
      <CityHotelsFastFacts />
      <CityHotelsFAQs />
      <HomeFooter />
    </>
  );
};

export default CityHotelsPage;
