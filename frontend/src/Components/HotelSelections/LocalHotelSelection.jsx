import React, { useContext, useState, useEffect } from "react";
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
  useMediaQuery,
  useTheme,
  Alert,
  CircularProgress,
  Rating,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext.js";
import { getHotels } from "../../services/hotel.js";
const getMinPrice = (hotel) => {
  if (
    !hotel.deals ||
    hotel.deals.length === 0 ||
    hotel.deals.flatMap((deal) => deal.rooms).length === 0
  )
    return 0;
  return hotel.deals
    .flatMap((deal) => deal.rooms) // Flatten rooms from all deals
    .reduce((min, room) => Math.min(min, room.pricePerNight), Infinity);
};
const LocalHotelSelection = () => {
  const { locations, visitorData } = useContext(GlobalContext);
  const homeCities = locations.filter(
    (x) =>
      x.countryCode === visitorData?.countryCode &&
      x.cityCode === visitorData?.cityCode
  );
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("sm"));

  const nCards = matchesXS ? 1 : matchesSM ? 2 : 3;
  const [selectedCity, setSelectedCity] = useState(
    homeCities.length > 0 ? homeCities[0].cityCode : ""
  );
  const [currentIndex, setCurrentIndex] = useState(0);
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
    const currentD = new Date();
    currentD.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

    const res = await getHotels({
      originCountry: visitorData?.countryCode,
      availableFrom: currentD.toString(),
    });
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
  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue);
    setCurrentIndex(0);
  };

  const cityHotels = hotels.filter((x) => x.city.cityCode === selectedCity);
  const visibleHotels = cityHotels.slice(currentIndex, currentIndex + nCards);

  const handleNext = () => {
    if (currentIndex + nCards < cityHotels.length) {
      setCurrentIndex(currentIndex + nCards);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - nCards);
    }
  };

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
    <Container className='container' sx={{ mt: "96px" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "28px" }}>
        Hotels in your home country
      </Typography>
      <Typography sx={{ fontSize: "16px", marginBottom: "15px" }}>
        Your next adventure may be closer than you think. Discover hotels just
        beyond your doorstep.
      </Typography>

      {loading.active && loading.action === "page" ? (
        loadingUI
      ) : error.active && error.action === "page" ? (
        <Alert severity='error' sx={{ mt: "20px" }}>
          {error.message}
        </Alert>
      ) : cityHotels.length > 0 ? (
        <>
          <Tabs
            value={selectedCity}
            onChange={handleCityChange}
            sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTab-root": {
                padding: "5px 8px",
                minHeight: "auto",
                border: "1px solid grey",
                marginRight: "10px",
                borderRadius: "5px",
                color: "black",
                textTransform: "none",
              },
            }}
          >
            {homeCities.map((city, index) => (
              <Tab
                key={index}
                value={city.cityCode}
                label={city.cityName}
                disableRipple
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#05203c !important",
                    color: "white !important",
                  },
                }}
              />
            ))}
          </Tabs>

          <Box
            display='flex'
            justifyContent='center'
            aliSgnItems='center'
            my={4}
          >
            <Grid container spacing={2}>
              {visibleHotels.map((hotel, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Link
                    to={`/hotels/${hotel?.city?.countryCode}/${hotel?.city.cityCode}/${hotel.name}/${hotel._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        borderRadius: "12px",
                        boxShadow: "0 1px 3px 0 #25201f4d",
                        "&:hover": {
                          boxShadow: "0 4px 14px 0 #25201f40",
                        },
                        transition: "all .2s ease-in-out",
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component='img'
                          height='140'
                          src={`${process.env.REACT_APP_BACKEND_URL}/files/hotels/${hotel.cover}`}
                          alt={hotel.name}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 10,
                            left: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant='h6'
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              fontSize: "20px",
                              paddingLeft: "15px",
                            }}
                          >
                            {hotel.name}
                          </Typography>

                          <Rating
                            readOnly
                            value={
                              hotel.reviews.reduce(
                                (acc, review) => acc + review.rating,
                                0
                              ) / hotel.reviews.length
                            }
                          />
                        </Box>
                      </Box>
                      <CardContent
                        sx={{
                          px: "8px",
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
                            variant='subtitle1'
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
          </Box>

          {cityHotels.length > nCards && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                my: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <IconButton
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                  disableRipple
                  sx={{
                    color: currentIndex === 0 ? "#cccccc" : "#0062e3",
                  }}
                >
                  <KeyboardArrowLeftIcon sx={{ fontSize: "35px" }} />
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                {Array.from({ length: cityHotels.length }).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor:
                        currentIndex === index * nCards
                          ? "darkgrey"
                          : "lightgrey",
                    }}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  disabled={currentIndex + nCards >= cityHotels.length}
                  onClick={handleNext}
                  disableRipple
                  sx={{
                    color:
                      currentIndex + nCards >= cityHotels.length
                        ? "#cccccc"
                        : "#0062e3",
                  }}
                >
                  <KeyboardArrowRightIcon sx={{ fontSize: "35px" }} />
                </IconButton>
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Alert severity='error'>No Records Exist</Alert>
      )}
    </Container>
  );
};

export default LocalHotelSelection;
