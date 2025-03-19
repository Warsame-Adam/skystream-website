import React, { useEffect, useState, useContext } from "react";
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Container,
  Grid,
} from "@mui/material";
import ThreeStarImage from "../Components/Assets/3StarImage.png";
import FourStarImage from "../Components/Assets/4StarImage.png";
import FiveStarImage from "../Components/Assets/5StarImage.png";
import { GlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { getHotels } from "../services/hotel";

// Function to get hotel count and min price by rating
const getFilteredHotels = (hotels, star) => {
  const filteredHotels = hotels.filter(
    (hotel) => Math.floor(hotel.averageRating) === star
  );

  const minPrice = filteredHotels.length
    ? Math.min(
        ...filteredHotels.flatMap((hotel) =>
          hotel.deals.flatMap((deal) =>
            deal.rooms.map((room) => room.pricePerNight)
          )
        )
      )
    : 0;

  return {
    starRating: star,
    count: filteredHotels.length,
    minPrice: minPrice !== Infinity ? minPrice : 0,
  };
};
const CityHotelStarRatings = () => {
  const { locations } = useContext(GlobalContext);
  const params = useParams();
  const countryParams = params?.country;
  const cityParams = params.city;
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
    let query = {
      minReview: 3,
    };
    if (countryParams && cityParams) {
      let foundCity = locations.find(
        (loc) =>
          loc.countryCode.toLowerCase() === `${countryParams}`.toLowerCase() &&
          loc.cityCode.toLowerCase() === `${cityParams}`.toLowerCase()
      );
      if (foundCity) {
        query.country = countryParams;
        query.city = cityParams;
      }
    }
    fetchHotelsWithSearch(query, "page");
  }, [locations, cityParams, countryParams]);

  let foundCity = locations?.find(
    (loc) =>
      loc.countryCode.toLowerCase() === `${countryParams}`.toLowerCase() &&
      loc.cityCode.toLowerCase() === `${cityParams}`.toLowerCase()
  );

  // Calculate average rating for each hotel
  const hotelsWithRatings = hotels.map((hotel) => {
    if (hotel.reviews.length === 0) {
      hotel.averageRating = 0;
    } else {
      hotel.averageRating =
        hotel.reviews.reduce((acc, review) => acc + review.rating, 0) /
        hotel.reviews.length;
    }
    return hotel;
  });

  // Get data for 4-star and 5-star hotels
  const threeStarData = getFilteredHotels(hotelsWithRatings, 3);
  const fourStarData = getFilteredHotels(hotelsWithRatings, 4);
  const fiveStarData = getFilteredHotels(hotelsWithRatings, 5);

  const StarRatingsData = [
    {
      image: ThreeStarImage,
      starRating: "3-star hotels",
      properties: threeStarData.count,
      PPN: threeStarData.minPrice,
    },
    {
      image: FourStarImage,
      starRating: "4-star hotels",
      properties: fourStarData.count,
      PPN: fourStarData.minPrice,
    },
    {
      image: FiveStarImage,
      starRating: "5-star hotels",
      properties: fiveStarData.count,
      PPN: fiveStarData.minPrice,
    },
  ];

  return (
    <Container className='container' sx={{ mt: "96px" }}>
      <Box sx={{ paddingLeft: "10px" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
          Luxury stay or budget getaway?
        </Typography>

        <Typography sx={{ fontSize: "15px" }}>
          Whether you're after 5-star comfort or ease on your wallet, we do the
          searching so you can sleep easy during your stay in{" "}
          {foundCity?.cityName || "City"}.
        </Typography>
      </Box>
      <Grid
        container
        justifyContent='space-between'
        spacing={1}
        sx={{ mt: "16px" }}
      >
        {StarRatingsData.map((rating, index) => (
          <Grid item md={4} xs={12}>
            <Card
              key={index}
              sx={{
                flex: 1,
                minHeight: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                boxShadow: "0 1px 3px 0 #25201f4d",
                borderRadius: "12px",
                "&:hover": {
                  boxShadow: "0 4px 14px 0 #25201f40",
                },
              }}
            >
              <CardMedia
                component='img'
                height='190px'
                image={rating.image}
                alt={rating.name}
              />
              <CardContent
                sx={{
                  p: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "19px",
                      fontWeight: "bold",
                    }}
                  >
                    {rating.starRating}
                  </Typography>

                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "11px",
                      marginBottom: "8px",
                    }}
                  >
                    {rating.properties} properties
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography sx={{ color: "grey", fontSize: "11px" }}>
                    From
                  </Typography>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    £{rating.PPN}
                  </Typography>
                  <Typography sx={{ color: "grey", fontSize: "11px" }}>
                    per night
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CityHotelStarRatings;
