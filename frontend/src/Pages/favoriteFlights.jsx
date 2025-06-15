import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { ArrowForward, FavoriteBorder, Flight } from "@mui/icons-material";
import * as moment from "moment";
import FlightsNavbar from "../Components/layout/FlightsNavbar";
import { getMyFavFlights, showInterest } from "../services/flight";
import { GlobalContext } from "../context/GlobalContext";
import HomeFooter from "../Components/layout/HomeFooter";

function formatTextToTwoLines(text) {
  const words = text.split(" ");

  if (words.length === 2) {
    return words.join("\n"); // Break between two words
  } else {
    return words.slice(0, 2).join(" ") + "\n" + words.slice(2).join(" ");
  }
}

function formatFlightDuration(departureTime, arrivalTime) {
  const dep = moment(departureTime);
  const arr = moment(arrivalTime);

  const duration = moment.duration(arr.diff(dep)); // Get duration

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  let formattedDuration = "";

  if (days > 0) formattedDuration += `${days}d`;
  if (hours > 0) formattedDuration += ` ${hours}h`;
  if (minutes > 0) formattedDuration += ` ${minutes}m`;

  return formattedDuration.trim(); // Remove extra spaces
}

export default function FavoriteFlights() {
  const { user: globalUser, setAuth } = useContext(GlobalContext);

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
  const fetchFavFlights = async (action = "page") => {
    setLoading({
      active: true,
      action: action,
    });
    const flightsData = await getMyFavFlights(globalUser?.token);
    if (flightsData.success) {
      setFlights(flightsData.data);
    } else {
      setError({
        active: true,
        message: flightsData.error,
        action: action,
      });
    }
    setLoading({
      active: false,
      action: "",
    });
  };
  useEffect(() => {
    if (globalUser) {
      fetchFavFlights();
    }
  }, [globalUser]);

  const favoriteClickHandler = async (flightId) => {
    const res = await showInterest(flightId);
    if (res.success) {
      setAuth({
        ...globalUser,
        favouritedFlights: res.data.favouritedFlights,
      });
      setFlights((f) => f.filter((x) => x._id !== flightId));
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
    <>
      <FlightsNavbar />
      <Container className='container' sx={{ py: "16px", minHeight: "70vh" }}>
        {loading.active && loading.action === "page" ? (
          loadingUI
        ) : error.active && error.action === "page" ? (
          <Alert severity='error' sx={{ mt: "20px" }}>
            {error.message}
          </Alert>
        ) : flights.length > 0 ? (
          flights.map((flight) => (
            <Card
              key={flight.id}
              sx={{
                mb: 2,
                padding: 1,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                boxShadow: "0 1px 3px 0 #25201f4d",
              }}
            >
              <CardContent sx={{ position: "relative" }}>
                <IconButton
                  size='small'
                  sx={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => favoriteClickHandler(flight._id)}
                >
                  <FavoriteBorder
                    sx={{
                      color: globalUser?.favouritedFlights?.includes(flight._id)
                        ? "red"
                        : "unset",
                    }}
                  />
                </IconButton>

                <Grid
                  container
                  spacing={1}
                  alignItems='center'
                  sx={{ mt: { md: 0, xs: "10px" } }}
                >
                  <Grid item md={9} xs={12}>
                    <Grid container alignItems='center'>
                      <Grid item md={3} xs={12}>
                        <Typography
                          variant='subtitle1'
                          color='black'
                          sx={{
                            textAlign: "left",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {flight?.outboundAirline?.name}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ flex: 1, position: "relative" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                            position: "relative",
                            color: "#697279",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant='subtitle2'
                              sx={{ color: "#626971", fontWeight: "700" }}
                            >
                              {moment(flight?.schedule?.departureTime).format(
                                "yy-MM-DD HH:mm"
                              )}
                            </Typography>
                            <Typography
                              variant='subtitle2'
                              sx={{
                                fontSize: "12px",
                                fontWeight: 400,
                                color: "#626971",
                                maxWidth: "120px",
                                // whiteSpace: "break-spaces",
                              }}
                            >
                              {flight?.location?.departureAirport?.name}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              mx: 1,
                              flex: 1,
                              borderTop: "1px solid #ccc",
                              position: "relative",
                              width: "70%",
                            }}
                          >
                            {!flight.location?.outboundDirect &&
                              flight.location.outboundStops.map((_, i) => (
                                <Box
                                  key={i}
                                  sx={{
                                    position: "absolute",
                                    left: `${53.5 + i * 10}%`,
                                    top: "-4px",
                                    transform: `translateX(-${50 + i * 10}%)`,
                                    backgroundColor: "#c6007e",
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                  }}
                                />
                              ))}
                          </Box>
                          <Flight
                            sx={{
                              fontSize: "17px",
                              marginleft: "10px",
                              marginRight: "5px",
                              transform: "rotate(90deg)",
                              color: "#697279",
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant='subtitle2'
                              sx={{ color: "#626971", fontWeight: "700" }}
                            >
                              {moment(flight?.schedule?.arrivalTime).format(
                                "yy-MM-DD HH:mm"
                              )}
                            </Typography>
                            <Typography
                              variant='subtitle2'
                              sx={{
                                fontSize: "12px",
                                fontWeight: 400,
                                color: "#626971",
                                maxWidth: "120px",
                                //whiteSpace: "break-spaces",
                              }}
                            >
                              {flight?.location?.arrivalAirport?.name}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          sx={{
                            position: "absolute",
                            left: 0,
                            bottom: "8px",
                            width: "100%",
                            textAlign: "center",
                            color: "#0c838a",
                            fontSize: "12px",
                            // mb: 3,
                            // mt: "-32px",
                          }}
                        >
                          {!flight.location?.outboundDirect
                            ? `${
                                flight.location.outboundStops.length
                              } stop at ${flight.location.outboundStops
                                .map((x) => x.stopAtCity?.cityCode)
                                .join(",")}`
                            : "Direct"}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='black'
                          sx={{
                            position: "absolute",
                            top: "0px",
                            left: 0,
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          {formatFlightDuration(
                            flight.schedule?.departureTime,
                            flight.schedule?.arrivalTime
                          )}
                        </Typography>
                      </Grid>
                    </Grid>

                    {flight.twoWay && (
                      <Grid container alignItems='center' sx={{ mt: "24px" }}>
                        <Grid item md={3} xs={12}>
                          <Typography
                            variant='subtitle1'
                            color='black'
                            sx={{
                              textAlign: "left",
                              mb: 1,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {flight?.returnAirline?.name}
                          </Typography>
                        </Grid>
                        <Grid item sx={{ flex: 1, position: "relative" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Typography
                                variant='subtitle2'
                                sx={{ color: "#626971", fontWeight: "700" }}
                              >
                                {moment(
                                  flight?.schedule?.returnDepartureTime
                                ).format("yyyy-MM-DD HH:mm")}
                              </Typography>
                              <Typography
                                variant='subtitle2'
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 400,
                                  color: "#626971",
                                  maxWidth: "120px",
                                  // whiteSpace: "break-spaces",
                                }}
                              >
                                {flight?.location?.arrivalAirport?.name}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                mx: 1,
                                flex: 1,
                                borderTop: "1px solid #ccc",
                                position: "relative",
                                width: "70%",
                              }}
                            >
                              {!flight.location?.returnDirect &&
                                flight.location.returnStops.map((_, i) => (
                                  <Box
                                    key={i}
                                    sx={{
                                      position: "absolute",
                                      left: `${53.5 + i * 10}%`,
                                      top: "-4px",
                                      transform: `translateX(-${50 + i * 10}%)`,
                                      backgroundColor: "#c6007e",
                                      width: "8px",
                                      height: "8px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                ))}
                            </Box>
                            <Flight
                              sx={{
                                fontSize: "17px",
                                marginleft: "10px",
                                marginRight: "5px",
                                transform: "rotate(90deg)",
                                color: "#697279",
                              }}
                            />
                            <Box sx={{ ml: "-3px" }}>
                              <Typography
                                variant='subtitle2'
                                sx={{ color: "#626971", fontWeight: "700" }}
                              >
                                {moment(
                                  flight?.schedule?.returnArrivalTime
                                ).format("yyyy-MM-DD HH:mm")}
                              </Typography>
                              <Typography
                                variant='subtitle2'
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 400,
                                  color: "#626971",
                                  maxWidth: "120px",
                                }}
                              >
                                {flight?.location?.departureAirport?.name}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography
                            sx={{
                              position: "absolute",
                              left: 0,
                              bottom: "0px",
                              width: "100%",
                              textAlign: "center",
                              color: "#0c838a",
                              fontSize: "12px",
                              // mb: 2,
                              // mt: "-22px",
                            }}
                          >
                            {!flight.location?.returnDirect
                              ? `${
                                  flight.location.returnStops.length
                                } stop at ${flight.location.returnStops
                                  .map((x) => x.stopAtCity?.cityCode)
                                  .join(",")}`
                              : "Direct"}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='black'
                            sx={{
                              position: "absolute",
                              top: "-1px",
                              left: 0,
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            {formatFlightDuration(
                              flight.schedule?.returnDepartureTime,
                              flight.schedule?.returnArrivalTime
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: { md: 0, xs: "25px" },
                        flexDirection: { md: "column", xs: "row" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "grey",
                            fontSize: "13px",
                            textAlign: "center",
                          }}
                        >
                          deals from
                        </Typography>
                        <Typography
                          variant='h6'
                          gutterBottom
                          sx={{ color: "black", textAlign: "center" }}
                        >
                          £
                          {flight.classes.reduce((minPrice, classObj) => {
                            return Math.min(minPrice, classObj.price);
                          }, Infinity)}
                        </Typography>
                      </Box>
                      <a
                        href={flight.externalURL}
                        target='_blank'
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant='contained'
                          endIcon={<ArrowForward sx={{ fontSize: "20px" }} />}
                          sx={{
                            backgroundColor: "#05203c",
                            padding: "8px 20px",
                            borderRadius: "8px",
                            ":hover": { backgroundColor: "#154679" },
                            textTransform: "none",
                          }}
                        >
                          Select{" "}
                        </Button>
                      </a>

                      {flight.selfTransfer && (
                        <Typography
                          variant='body2'
                          sx={{ mt: 1, color: "#c6007e" }}
                        >
                          🚨 Self transfer
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant='h6' color='black' gutterBottom>
                Sorry, there aren't any flights.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <img
                  src='https://via.placeholder.com/150'
                  alt='No flights match your filters'
                  style={{ width: "150px", height: "150px" }}
                />
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
      <Box sx={{ mt: "2rem" }} />

      <HomeFooter />
    </>
  );
}
