import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
  CircularProgress,
  Alert,
} from "@mui/material";
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

import { getFlights } from "../../services/flight";
import { GlobalContext } from "../../context/GlobalContext";

const FlightLocations = () => {
  const { visitorData } = useContext(GlobalContext);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });
  const [error, setError] = useState({
    active: false,
    message: "",
    action: "",
  });
  const [showAll, setShowAll] = useState(true);

  const fetchFlights = async () => {
    setLoading({
      active: true,
      action: "page",
    });
    const res = await getFlights({
      departureLocation: {
        cityCode: visitorData?.cityCode,
        countryCode: visitorData?.countryCode,
      },
      departureTime: new Date().getTime(),
    });
    if (res.success) {
      if (res.data && res.data?.length > 0) setFlights(res.data);
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
    fetchFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayedDeals = showAll ? flights : flights.slice(0, 6);

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
            Flight deals from {visitorData?.country || "United Kingdom"}
          </span>
          <br />
          <span style={{ fontSize: "15px", fontWeight: "normal" }}>
            Here are the flight deals with the lowest prices. Act fast – they
            all depart within the next three months.
          </span>
        </Typography>
      </Box>

      {loading.active && loading.action === "page" ? (
        loadingUI
      ) : error.active && error.action === "page" ? (
        <Alert severity='error' sx={{ mt: "20px" }}>
          {error.message}
        </Alert>
      ) : (
        <Box sx={{ padding: 0, marginTop: "20px" }}>
          <Grid container spacing={2}>
            {displayedDeals.map((deal, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Link
                  to={`/flights/${deal.location?.departureCity?.countryCode}/${
                    deal.location?.departureCity?.cityCode
                  }/${deal.location?.arrivalCity?.countryCode}/${
                    deal.location?.arrivalCity?.cityCode
                  }/${new Date(
                    deal.schedule.departureTime
                  ).getTime()}/${new Date(
                    deal.schedule.arrivalTime
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
                      image={`${process.env.REACT_APP_BACKEND_URL}/flights/${deal.image}`}
                      alt={`${deal.image} Image`}
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
                        {deal.location?.arrivalCity?.cityName}
                      </Typography>
                      <Typography variant='body2' sx={{ color: "#626971" }}>
                        {deal.location?.arrivalCity?.countryName}
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
                          src={`${process.env.REACT_APP_BACKEND_URL}/airlines/${deal.outboundAirline.logo}`}
                          alt='Airline Logo'
                          style={{ width: 20, height: 20 }}
                        />
                        <Box>
                          <Typography
                            variant='body2'
                            sx={{ fontWeight: "bold", color: "black" }}
                          >
                            {new Date(
                              deal.schedule.departureTime
                            ).toDateString()}
                          </Typography>
                          <Typography sx={{ color: "grey", fontSize: "12px" }}>
                            {deal.location?.departureCity?.cityCode} -{" "}
                            {deal.location?.arrivalCity?.cityCode} with{" "}
                            {deal.outboundAirline.name}
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
                          {deal.location?.outboundDirect
                            ? "Direct"
                            : `${deal.location.outboundStops.length} Stop${
                                deal.location.outboundStops.length > 1
                                  ? "s"
                                  : ""
                              }`}
                        </Typography>
                      </Box>

                      {/* Return Ticket Information */}
                      {deal.twoWay && (
                        <Box
                          sx={{
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                            marginTop: 1,
                          }}
                        >
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/airlines/${deal.outboundAirline.logo}`}
                            alt='Airline Logo'
                            style={{ width: 20, height: 20 }}
                          />
                          <Box>
                            <Typography
                              variant='body2'
                              sx={{ fontWeight: "bold", color: "black" }}
                            >
                              {new Date(
                                deal.schedule.returnDepartureTime
                              ).toDateString()}
                            </Typography>
                            <Typography
                              sx={{ color: "grey", fontSize: "12px" }}
                            >
                              {deal.location?.arrivalCity?.cityCode} -{" "}
                              {deal.location?.departureCity?.cityCode} with{" "}
                              {deal.returnAirline.name}
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
                            {deal.location?.returnDirect
                              ? "Direct"
                              : `${deal.location.returnStops.length} Stop${
                                  deal.location.returnStops.length > 1
                                    ? "s"
                                    : ""
                                }`}
                          </Typography>
                        </Box>
                      )}

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
                        from{" "}
                        {deal.classes.reduce(
                          (minClass, currentClass) =>
                            currentClass.price < minClass.price
                              ? currentClass
                              : minClass,
                          deal.classes[0]
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>

          {/* "See Fewer Details" or "See More Details" Button */}
          {flights.length > 6 && (
            <Box sx={{ textAlign: "center", marginTop: 3 }}>
              <Button onClick={() => setShowAll(!showAll)} variant='text'>
                {showAll ? "See Fewer Details" : "See More Details"}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default FlightLocations;
