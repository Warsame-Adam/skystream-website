import React, { useState } from "react";
import {
  AppBar,
  Menu,
  Toolbar,
  Input,
  IconButton,
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FlightIcon from "@mui/icons-material/Flight";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Paris from "../../Components/Assets/Paris.png";
import Athens from "../../Components/Assets/athens.png";
import Sydney from "../../Components/Assets/Sydney.png";
import Antalya from "../../Components/Assets/antalya-turkey.png";
import Rome from "../../Components/Assets/rome.png";
import Cardiff from "../../Components/Assets/cardiff.png";
import Edinburgh from "../../Components/Assets/Edinburgh.png";
import Dublin from "../../Components/Assets/Dublin.png";
import Dubai from "../../Components/Assets/dubai.png";
import Amsterdam from "../../Components/Assets/Amsterdam-Netherlands.png";
import Istanbul from "../../Components/Assets/Istanbul-Turkey.png";
import Bangkok from "../../Components/Assets/Bangkok-Thailand.png";
import { Link } from "react-router-dom";
console.log(new Date().toString());
const flightDeals = [
  {
    image: Paris,
    destinationCity: "Paris",
    destinationCountry: "France",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo1.jpg", // Placeholder for the airline logo
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "LTN - FUE with easyJet", // Placeholder for departing airport details
    returnDetails: "FUE - LGW with easyJet", // Placeholder for returning airport details
    price: "£24", // Placeholder for the price
  },
  {
    image: Athens,
    destinationCity: "Athens",
    destinationCountry: "Greece",
    originCity: "Khi",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  {
    image: Sydney,
    destinationCity: "Sydney",
    destinationCountry: "Australia",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  {
    image: Antalya,
    destinationCity: "Antalya",
    destinationCountry: "Turkey",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  {
    image: Rome,
    destinationCity: "Rome",
    destinationCountry: "Italy",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  {
    image: Cardiff,
    destinationCity: "Cardiff",
    destinationCountry: "Wales",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  {
    image: Edinburgh,
    destinationCity: "Edinburgh",
    destinationCountry: "Scotland",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  {
    image: Dublin,
    destinationCity: "Dublin",
    destinationCountry: "Ireland",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  {
    image: Dubai,
    destinationCity: "Dubai",
    destinationCountry: "UAE",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  {
    image: Amsterdam,
    destinationCity: "Amsterdam",
    destinationCountry: "Netherlands",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  {
    image: Istanbul,
    destinationCity: "Istanbul",
    destinationCountry: "Turkey",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  {
    image: Bangkok,
    destinationCity: "Bangkok",
    destinationCountry: "Thailand",
    originCity: "Isl",
    originCountry: "Pakistan",
    airlineLogo: "/path/to/airline-logo2.jpg",
    departDate: "Thu Nov 20 2025 02:40:40 GMT+0500", // Placeholder for the departure date
    returnDate: "Thu Nov 26 2025 02:40:40 GMT+0500", // Placeholder for the return date
    departDetails: "BFS - MAN with easyJet",
    returnDetails: "MAN - BFS with easyJet",
    price: "£24",
  },
  // Add other objects as needed
];

const FlightLocations = () => {
  const [showAll, setShowAll] = useState(true);

  const displayedDeals = showAll ? flightDeals : flightDeals.slice(0, 6);

  return (
    <Container className='container' sx={{ pt: "16px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "#626971",
        }}
      >
        <Typography variant='subtitle1' sx={{ color: "primary.main" }}>
          Home
        </Typography>
        <ArrowRightIcon disabled sx={{ padding: "0", color: "#0003" }} />
        <Typography variant='subtitle1'>Flights</Typography>
      </Box>

      <Grid
        container
        justifyContent='space-between'
        sx={{
          pt: { md: "40px", xs: "20px" },
          mb: "90px",
        }}
        spacing={{ md: 2, xs: 4 }}
      >
        <Grid item md={4} xs={12} sx={{ display: "flex", gap: "12px" }}>
          <FlightIcon sx={{ rotate: "45deg" }} />
          <Typography
            variant='body2'
            sx={{
              lineHeight: "20px",
              color: "#161616",
              fontWeight: "bold",
            }}
          >
            Explore the best flight deals from anywhere, to <br /> everywhere,
            then book with no fees
          </Typography>
        </Grid>
        <Grid item md={4} xs={12} sx={{ display: "flex", gap: "12px" }}>
          <CalendarMonthIcon />
          <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
            Compare flight deals from over 1000 providers and <br /> choose the
            cheapest, fastest or greenest tickets
          </Typography>
        </Grid>
        <Grid item md={4} xs={12} sx={{ display: "flex", gap: "16px" }}>
          <LocalOfferIcon sx={{ rotate: "90deg" }} />
          <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
            Find the cheapest month - or even day - to fly, and set <br /> up
            Price Alerts to book when the price is right
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: "20px" }}>
        <Typography>
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            Flight deals from United Kingdom
          </span>
          <br />
          <span style={{ fontSize: "15px", fontWeight: "normal" }}>
            Here are the flight deals with the lowest prices. Act fast – they
            all depart within the next three months.
          </span>
        </Typography>
      </Box>

      <Box sx={{ padding: 0, marginTop: "20px" }}>
        <Grid container spacing={2}>
          {displayedDeals.map((deal, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link
                to={`/flights/${deal.originCity}/${
                  deal.destinationCity
                }/${new Date(deal.departDate).getTime()}/${new Date(
                  deal.returnDate
                ).getTime()}`}
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
                  {/* Image Section */}
                  <CardMedia
                    sx={{ height: "160px" }}
                    component='img'
                    height='140'
                    image={deal.image}
                    alt={`${deal.city} Image`}
                  />

                  <CardContent>
                    {/* City/Town and Country */}
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: "bold",
                        color: "#000",
                        lineHeight: "24px",
                      }}
                    >
                      {deal.destinationCity}
                    </Typography>
                    <Typography variant='body2' sx={{ color: "#626971" }}>
                      {deal.destinationCountry}
                    </Typography>

                    {/* Departure Ticket Information */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        marginTop: "18px",
                      }}
                    >
                      <img
                        src={deal.airlineLogo}
                        alt='Airline Logo'
                        style={{ width: 20, height: 20 }}
                      />
                      <Box>
                        <Typography
                          variant='body2'
                          sx={{ fontWeight: "bold", color: "black" }}
                        >
                          {new Date(deal.departDate).toDateString()}
                        </Typography>
                        <Typography sx={{ color: "grey", fontSize: "12px" }}>
                          {deal.departDetails}
                        </Typography>
                      </Box>
                      <Typography
                        variant='body2'
                        sx={{
                          marginLeft: "auto",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        Direct
                      </Typography>
                    </Box>

                    {/* Return Ticket Information */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        marginTop: 1,
                      }}
                    >
                      <img
                        src={deal.airlineLogo}
                        alt='Airline Logo'
                        style={{ width: 20, height: 20 }}
                      />
                      <Box>
                        <Typography
                          variant='body2'
                          sx={{ fontWeight: "bold", color: "black" }}
                        >
                          {new Date(deal.returnDate).toDateString()}
                        </Typography>
                        <Typography sx={{ color: "grey", fontSize: "12px" }}>
                          {deal.returnDetails}
                        </Typography>
                      </Box>
                      <Typography
                        variant='body2'
                        sx={{
                          marginLeft: "auto",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        Direct
                      </Typography>
                    </Box>

                    {/* Price Tag */}
                    <Typography
                      sx={{
                        textAlign: "right",
                        marginTop: 2,
                        color: "#0062e3",
                        fontWeight: "bold",
                        fontSize: "14.5px",
                      }}
                    >
                      from {deal.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* "See Fewer Details" or "See More Details" Button */}
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Button onClick={() => setShowAll(!showAll)} variant='text'>
            {showAll ? "See Fewer Details" : "See More Details"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FlightLocations;
