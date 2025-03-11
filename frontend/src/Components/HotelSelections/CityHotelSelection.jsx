import React from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFabCityIndex } from "../Slices/hotelSlice";
import { fabCityHotelLocations } from "../HotelData.js";
import { Link } from "react-router-dom";
import { getFabCityHotels } from "../../services/hotel.js";
import { useEffect, useState } from "react";

const getMinPrice = (hotel) => {
  return hotel.deals
    .flatMap((deal) => deal.rooms) // Flatten rooms from all deals
    .reduce((min, room) => Math.min(min, room.pricePerNight), Infinity);
};
const CityHotelSelection = () => {
  const dispatch = useDispatch();

  const currentFabCityIndex = useSelector(
    (state) => state.hotels.currentFabCityIndex
  );

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

  const fetchHotels = async () => {
    setLoading({
      active: true,
      action: "page",
    });
    const res = await getFabCityHotels();
    if (res.success) {
      if (res.data && res.data?.length > 0) setHotels(res.data);
    } else {
      setError({
        active: true,
        message: res.error,
        action: "page",
      });
    }

    setLoading({
      active: false,
      action: "",
    });
  };
  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleNext = () => {
    if (currentFabCityIndex + 3 < fabCityHotelLocations.length) {
      dispatch(setCurrentFabCityIndex(currentFabCityIndex + 3));
    }
  };

  const handlePrev = () => {
    if (currentFabCityIndex > 0) {
      dispatch(setCurrentFabCityIndex(currentFabCityIndex - 3));
    }
  };

  const visibleCities = fabCityHotelLocations.slice(
    currentFabCityIndex,
    currentFabCityIndex + 3
  );

  const loadingUI = (
    <Box
      minHeight='80px'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <CircularProgress size='30px' />
    </Box>
  );
  return (
    <Container className='container' sx={{ mt: "80px" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "28px" }}>
        Hotels for fab city breaks
      </Typography>

      <Typography sx={{ fontSize: "16px", marginBottom: "15px" }}>
        The key to a great city break? A perfectly-placed base. Check out the
        best city centre hotels.
      </Typography>

      <Box display='flex' justifyContent='center' alignItems='center' my={4}>
        {loading.active && loading.action === "page" ? (
          loadingUI
        ) : error.active && error.action === "page" ? (
          <Alert severity='error' sx={{ mt: "20px" }}>
            {error.message}
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {hotels.map((hotel, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Link
                  to={`/hotels/${hotel?.city?.countryCode}/${hotel?.city.cityCode}/${hotel.name}/${hotel._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    key={index}
                    sx={{
                      borderRadius: "12px",
                      boxShadow: "0 1px 3px 0 #25201f4d",
                      "&:hover": {
                        boxShadow: "0 4px 14px 0 #25201f40",
                      },
                      transition: "all .2s ease-in-out",
                    }}
                  >
                    <CardMedia
                      component='img'
                      height='190px'
                      src={`${process.env.REACT_APP_BACKEND_URL}/files/hotels/${hotel.cover}`}
                      alt={hotel.name}
                    />
                    <CardContent
                      sx={{
                        padding: "8px",
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
                            marginBottom: "4px",
                          }}
                        >
                          {hotel?.city?.cityName}
                        </Typography>

                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "11px",
                            marginBottom: "8px",
                          }}
                        >
                          {hotel?.city?.countryName}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          marginTop: "10px",
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
                          £{getMinPrice(hotel)}
                        </Typography>
                        <Typography sx={{ color: "grey", fontSize: "11px" }}>
                          per night
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {hotels.length > 3 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            my: 2,
          }}
        >
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
          >
            <IconButton
              disabled={currentFabCityIndex === 0}
              onClick={handlePrev}
              disableRipple
              sx={{
                color: currentFabCityIndex === 0 ? "#cccccc" : "#0062e3",
              }}
            >
              <KeyboardArrowLeftIcon sx={{ fontSize: "35px" }} />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor:
                    currentFabCityIndex === index * 3
                      ? "darkgrey"
                      : "lightgrey",
                }}
              />
            ))}
          </Box>

          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton
              disabled={currentFabCityIndex + 3 >= hotels.length}
              onClick={handleNext}
              disableRipple
              sx={{
                color:
                  currentFabCityIndex + 3 >= hotels.length
                    ? "#cccccc"
                    : "#0062e3",
              }}
            >
              <KeyboardArrowRightIcon sx={{ fontSize: "35px" }} />
            </IconButton>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CityHotelSelection;
