import React, { useState } from "react";
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { cities, hotels } from "../HotelData.js";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity, setCurrentIndex } from "../Slices/hotelSlice";
import { Link } from "react-router-dom";

const LocalHotelSelection = () => {
  const dispatch = useDispatch();

  const selectedCity = useSelector((state) => state.hotels.selectedCity);
  const currentIndex = useSelector((state) => state.hotels.currentIndex);

  const handleCityChange = (event, newValue) => {
    dispatch(setSelectedCity(newValue));
    dispatch(setCurrentIndex(0));
  };

  const visibleHotels = hotels[selectedCity].hotels.slice(
    currentIndex,
    currentIndex + 3
  );

  const handleNext = () => {
    if (currentIndex + 3 < hotels[selectedCity].hotels.length) {
      dispatch(setCurrentIndex(currentIndex + 3));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      dispatch(setCurrentIndex(currentIndex - 3));
    }
  };

  return (
    <Container className='container' sx={{ mt: "96px" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "28px" }}>
        Hotels in your home country
      </Typography>
      <Typography sx={{ fontSize: "16px", marginBottom: "15px" }}>
        Your next adventure may be closer than you think. Discover hotels just
        beyond your doorstep.
      </Typography>

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
        {cities.map((city, index) => (
          <Tab
            key={index}
            label={city}
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

      <Box display='flex' justifyContent='center' aliSgnItems='center' my={4}>
        <Grid container spacing={2}>
          {visibleHotels.map((hotel, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link
                to={`/hotels/${
                  hotels.find((x) => x.city === selectedCity)?.country
                }/${selectedCity}/${hotel.name}/${hotel.id}`}
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
                  <CardMedia
                    component='img'
                    height='140'
                    image={hotel.image}
                    alt={hotel.name}
                  />
                  <CardContent sx={{ padding: 0 }}>
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
                      <span style={{ marginLeft: "80px" }}>
                        {Array.from({ length: 5 }).map((_, starIndex) =>
                          starIndex < hotel.stars ? (
                            <StarIcon
                              key={starIndex}
                              fontSize='small'
                              style={{ color: "#f55d42" }}
                            />
                          ) : (
                            <StarBorderIcon
                              key={starIndex}
                              fontSize='small'
                              style={{ color: "#cccccc" }}
                            />
                          )
                        )}
                      </span>
                    </Typography>
                    <Typography
                      variant='body2'
                      style={{
                        color: "black",
                        fontSize: "13.5px",
                        paddingLeft: "15px",
                      }}
                    >
                      x miles from city centre
                    </Typography>
                    <hr
                      style={{
                        border: "1px solid lightgrey",
                        margin: "10px 0",
                      }}
                    />
                    <Typography
                      variant='body1'
                      style={{
                        color: "black",
                        textAlign: "right",
                        paddingRight: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {hotel.price}
                    </Typography>
                    <Typography
                      style={{
                        color: "grey",
                        textAlign: "right",
                        paddingRight: "15px",
                        fontSize: "12px",
                      }}
                    >
                      per night
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

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
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
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
          {Array.from({ length: 2 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor:
                  currentIndex === index * 3 ? "darkgrey" : "lightgrey",
              }}
            />
          ))}
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            disabled={currentIndex + 3 >= hotels[selectedCity].hotels.length}
            onClick={handleNext}
            disableRipple
            sx={{
              color:
                currentIndex + 3 >= hotels[selectedCity].hotels.length
                  ? "#cccccc"
                  : "#0062e3",
            }}
          >
            <KeyboardArrowRightIcon sx={{ fontSize: "35px" }} />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default LocalHotelSelection;
