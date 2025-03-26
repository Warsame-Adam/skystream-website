import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  Grid,
  Divider,
  FormControl,
  Checkbox,
  FormControlLabel,
  Slider,
  IconButton,
  Collapse,
  Container,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  FavoriteBorder,
  ExpandMore,
  ExpandLess,
  Flight,
  ArrowForward,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { GlobalContext } from "../context/GlobalContext";
import * as moment from "moment";
import { showInterest } from "../services/flight";
import LoginModal from "./Login/LoginModal";

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

const getDurationInHours = (departureTime, arrivalTime) => {
  if (!departureTime || !arrivalTime) return null;

  const diff = Math.abs(new Date(arrivalTime) - new Date(departureTime));
  return (diff / (1000 * 60 * 60)).toFixed(1); // Convert ms to hours (1 decimal place)
};
const getHour = (dateTime) => (dateTime ? new Date(dateTime).getHours() : null);

const FlightSearchResults = ({ loading, error, flights }) => {
  const { user: globalUser, setAuth } = useContext(GlobalContext);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Extract durations from flights
  const allDurations = flights
    .flatMap((flight) => [
      getDurationInHours(
        flight.schedule?.departureTime,
        flight.schedule?.arrivalTime
      ),
      getDurationInHours(
        flight.schedule?.returnDepartureTime,
        flight.schedule?.returnArrivalTime
      ),
    ])
    .filter(Boolean); // Remove null values
  const minDuration = allDurations.length > 0 ? Math.min(...allDurations) : 0;
  const maxDuration = allDurations.length > 0 ? Math.max(...allDurations) : 24;

  const allOutboundTimes = flights
    .map((flight) => getHour(flight.schedule?.departureTime))
    .filter(Boolean);
  const allReturnTimes = flights
    .map((flight) => getHour(flight.schedule?.returnDepartureTime))
    .filter(Boolean);
  const minDepartureTime =
    allOutboundTimes.length > 0 ? Math.min(...allOutboundTimes) : 0;
  const maxDepartureTime =
    allOutboundTimes.length > 0 ? Math.max(...allOutboundTimes) : 24;

  const minReturnTime =
    allReturnTimes.length > 0 ? Math.min(...allReturnTimes) : 0;
  const maxReturnTime =
    allReturnTimes.length > 0 ? Math.max(...allReturnTimes) : 24;
  const [searchParams] = useSearchParams();

  const { airlines } = useContext(GlobalContext);
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const [sortBy, setSortBy] = useState("best");
  const [stops, setStops] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [departureTime, setDepartureTime] = useState([
    minDepartureTime,
    maxDepartureTime,
  ]);
  const [returnTime, setReturnTime] = useState([minReturnTime, maxReturnTime]);

  const [journeyDuration, setJourneyDuration] = useState([
    minDuration,
    maxDuration,
  ]);
  const [expandedSections, setExpandedSections] = useState({
    stops: true,
    departureTimes: true,
    journeyDuration: true,
    airlines: true,
  });

  useEffect(() => {
    if (matchesSM) {
      setExpandedSections({
        stops: false,
        departureTimes: false,
        journeyDuration: false,
        airlines: false,
      });
    }
  }, [matchesSM]);
  useEffect(() => {
    setJourneyDuration([minDuration, maxDuration]);
  }, [minDuration, maxDuration]); // Runs when minDuration/maxDuration update

  const directParams = searchParams.get("direct");
  useEffect(() => {
    if (directParams === "true") {
      setStops([0]);
    }
  }, [directParams]);
  const handleToggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    setSortBy(sortValue);
  };

  const handleStopsChange = (stop) => {
    if (stops.includes(stop)) {
      setStops(stops.filter((s) => s !== stop));
    } else {
      setStops([...stops, stop]);
    }
  };

  const handleAirlineChange = (airline) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  const handleDepartureTimeChange = (event, newValue) => {
    setDepartureTime(newValue);
  };

  const handleReturnTimeChange = (event, newValue) => {
    setReturnTime(newValue);
  };

  const handleJourneyDurationChange = (event, newValue) => {
    setJourneyDuration(newValue);
  };
  const filteredFlights = flights.filter((flight) => {
    const outboundDuration = getDurationInHours(
      flight.schedule?.departureTime,
      flight.schedule?.arrivalTime
    );

    const returnDuration = getDurationInHours(
      flight.schedule?.returnDepartureTime,
      flight.schedule?.returnArrivalTime
    );
    const outboundDepHour = getHour(flight.schedule?.departureTime);
    const returnDepHour = getHour(flight.schedule?.returnDepartureTime);

    // 🛑 Stops Filter
    if (stops.length > 0) {
      const flightStops = flight.location.outboundDirect
        ? 0
        : flight.location.outboundStops.length;
      if (
        !stops.includes(
          flightStops === 0 ? "0" : flightStops === 1 ? "1" : "2+"
        )
      ) {
        return false;
      }
    }

    // 🛑 Airlines Filter
    if (selectedAirlines.length > 0) {
      const outboundAirlineId = flight.outboundAirline._id.toString();
      const returnAirlineId = flight.returnAirline._id.toString();

      if (
        !selectedAirlines.includes(outboundAirlineId) &&
        (!returnAirlineId || !selectedAirlines.includes(returnAirlineId))
      ) {
        return false;
      }
    }

    // 🛑 Journey Duration Filter
    if (
      outboundDuration < journeyDuration[0] ||
      outboundDuration > journeyDuration[1]
    ) {
      return false;
    }
    if (
      returnDuration &&
      (returnDuration < journeyDuration[0] ||
        returnDuration > journeyDuration[1])
    ) {
      return false;
    }

    // 🛑 Departure Time Filter
    if (
      outboundDepHour < departureTime[0] ||
      outboundDepHour > departureTime[1]
    ) {
      return false;
    }
    if (
      returnDepHour &&
      (returnDepHour < returnTime[0] || returnDepHour > returnTime[1])
    ) {
      return false;
    }

    return true;
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    const minPriceA = Math.min(...a.classes.map((cls) => cls.price));
    const minPriceB = Math.min(...b.classes.map((cls) => cls.price));

    const outboundDurationA = getDurationInHours(
      a.schedule?.departureTime,
      a.schedule?.arrivalTime
    );
    const outboundDurationB = getDurationInHours(
      b.schedule?.departureTime,
      b.schedule?.arrivalTime
    );

    const returnDurationA = getDurationInHours(
      a.schedule?.returnDepartureTime,
      a.schedule?.returnArrivalTime
    );
    const returnDurationB = getDurationInHours(
      b.schedule?.returnDepartureTime,
      b.schedule?.returnArrivalTime
    );

    const totalDurationA = outboundDurationA + (returnDurationA || 0);
    const totalDurationB = outboundDurationB + (returnDurationB || 0);

    if (sortBy === "cheapest") {
      return minPriceA - minPriceB;
    } else if (sortBy === "outbound") {
      return outboundDurationA - outboundDurationB;
    } else if (sortBy === "return") {
      return returnDurationA - returnDurationB;
    } else if (sortBy === "fastest") {
      return totalDurationA - totalDurationB;
    } else {
      return (
        minPriceA * 0.5 +
        totalDurationA * 0.5 -
        (minPriceB * 0.5 + totalDurationB * 0.5)
      );
    }
  });

  const favoriteClickHandler = async (flightId) => {
    if (!globalUser) {
      setShowLoginDialog(true);
    }
    const res = await showInterest(flightId);
    if (res.success) {
      setAuth({
        ...globalUser,
        favouritedFlights: res.data.favouritedFlights,
      });
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
    <Box
      sx={{ pb: "2rem", width: "100%", backgroundColor: "#EFF3F8", pt: "30px" }}
    >
      {!globalUser && (
        <LoginModal
          open={showLoginDialog}
          handleClose={() => setShowLoginDialog(false)}
        />
      )}
      <Container className='container'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            {/* Filters */}
            <Card
              sx={{ borderRadius: "12px", boxShadow: "0 1px 3px 0 #25201f4d" }}
            >
              <CardContent>
                {/* Stops Section */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{ color: "#161616", fontWeight: 700 }}
                  >
                    Stops
                  </Typography>
                  <IconButton
                    onClick={() => handleToggleSection("stops")}
                    style={{
                      padding: 0,
                      background: "transparent",
                      color: "#161616",
                    }}
                  >
                    {expandedSections.stops ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
                <Collapse
                  in={expandedSections.stops}
                  timeout='auto'
                  unmountOnExit
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mt: "15px",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={directParams === "true"}
                          checked={stops.includes(0)}
                          onChange={() => handleStopsChange(0)}
                          sx={{
                            color: "#626971",
                            marginRight: "10px",
                            marginLeft: "12px",

                            "&.Mui-checked": { color: "#0062e3" },
                            "&.MuiButtonBase-root": {
                              backgroundColor: "white",
                              width: "18px",
                              height: "10px",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "14px",
                          }}
                        >
                          Direct
                        </Typography>
                      }
                    />
                    {directParams !== "true" && (
                      <>
                        <FormControlLabel
                          sx={{ mt: "15px" }}
                          control={
                            <Checkbox
                              checked={stops.includes(1)}
                              onChange={() => handleStopsChange(1)}
                              sx={{
                                color: "#626971",
                                marginRight: "10px",
                                marginLeft: "12px",
                                "&.Mui-checked": { color: "#0062e3" },
                                "&.MuiButtonBase-root": {
                                  backgroundColor: "white",
                                  width: "18px",
                                  height: "10px",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{ color: "black", fontSize: "14px" }}
                            >
                              One stop
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          sx={{ mt: "15px" }}
                          control={
                            <Checkbox
                              checked={stops.includes("2+")}
                              onChange={() => handleStopsChange("2+")}
                              sx={{
                                color: "#626971",
                                marginRight: "10px",
                                marginLeft: "12px",
                                "&.Mui-checked": { color: "#0062e3" },
                                "&.MuiButtonBase-root": {
                                  backgroundColor: "white",
                                  width: "18px",
                                  height: "10px",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{ color: "black", fontSize: "14px" }}
                            >
                              Two or More stop
                            </Typography>
                          }
                        />
                      </>
                    )}
                  </Box>
                </Collapse>

                <Divider sx={{ my: 2 }} />

                {/* Departure Times Section */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{ color: "#161616", fontWeight: 700 }}
                  >
                    Departure times
                  </Typography>
                  <IconButton
                    onClick={() => handleToggleSection("departureTimes")}
                    style={{
                      padding: 0,
                      background: "transparent",
                      color: "#161616",
                    }}
                  >
                    {expandedSections.departureTimes ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                </Box>
                <Collapse
                  in={expandedSections.departureTimes}
                  timeout='auto'
                  unmountOnExit
                >
                  <Typography
                    variant='subtitle1'
                    sx={{ color: "#161616", mt: "24px" }}
                  >
                    Outbound
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{ color: "#161616", mt: "-2px" }}
                  >
                    {minDepartureTime} hour(s) - {maxDepartureTime} hour(s)
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Slider
                      value={departureTime}
                      onChange={handleDepartureTimeChange}
                      min={minDepartureTime}
                      max={maxDepartureTime}
                      valueLabelDisplay='auto'
                      valueLabelFormat={(value) => `${value}:00`}
                      sx={{
                        width: "calc(100% - 20px)",
                        color: "#0062e3",
                        mt: "3px",
                      }}
                    />
                  </Box>
                  <Typography
                    variant='subtitle1'
                    sx={{ color: "#161616", mt: "16px" }}
                  >
                    Return
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{ color: "#161616", mt: "-2px" }}
                  >
                    {minReturnTime} hour(s) - {maxReturnTime} hour(s)
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Slider
                      value={returnTime}
                      onChange={handleReturnTimeChange}
                      min={minReturnTime}
                      max={maxReturnTime}
                      valueLabelDisplay='auto'
                      valueLabelFormat={(value) => `${value}:00`}
                      sx={{
                        width: "calc(100% - 20px)",
                        color: "#0062e3",
                        mt: "3px",
                      }}
                    />
                  </Box>
                </Collapse>

                <Divider sx={{ my: 2 }} />

                {/* Journey Duration Section */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{ color: "#161616", fontWeight: 700 }}
                  >
                    Journey duration
                  </Typography>
                  <IconButton
                    onClick={() => handleToggleSection("journeyDuration")}
                    style={{
                      padding: 0,
                      background: "transparent",
                      color: "#161616",
                    }}
                  >
                    {expandedSections.journeyDuration ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                </Box>
                <Collapse
                  in={expandedSections.journeyDuration}
                  timeout='auto'
                  unmountOnExit
                >
                  <Typography
                    variant='subtitle1'
                    sx={{ color: "#161616", mt: "16px" }}
                  >
                    {minDuration} hour(s) - {maxDuration} hour(s)
                  </Typography>
                  <Slider
                    value={journeyDuration}
                    onChange={handleJourneyDurationChange}
                    min={minDuration}
                    max={maxDuration}
                    valueLabelDisplay='auto'
                    valueLabelFormat={(value) => `${value} hours`}
                    sx={{
                      width: "calc(100% - 20px)",
                      color: "#0062e3",
                      mt: "3px",
                    }}
                  />
                </Collapse>

                <Divider sx={{ my: 2 }} />

                {/* Airlines Section */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{ color: "#161616", fontWeight: 700 }}
                  >
                    Airlines
                  </Typography>
                  <IconButton
                    style={{
                      padding: 0,
                      background: "transparent",
                      color: "#161616",
                    }}
                    onClick={() => handleToggleSection("airlines")}
                  >
                    {expandedSections.airlines ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                </Box>
                <Collapse
                  in={expandedSections.airlines}
                  timeout='auto'
                  unmountOnExit
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mt: "15px",
                    }}
                  >
                    {airlines.map((airline) => (
                      <FormControlLabel
                        sx={{ mb: "15px" }}
                        key={airline._id}
                        control={
                          <Checkbox
                            checked={selectedAirlines.includes(airline._id)}
                            onChange={() => handleAirlineChange(airline._id)}
                            sx={{
                              color: "#626971",
                              marginRight: "10px",
                              marginLeft: "12px",
                              "&.Mui-checked": { color: "#0062e3" },
                              "&.MuiButtonBase-root": {
                                backgroundColor: "white",
                                width: "18px",
                                height: "10px",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "14px",
                            }}
                          >
                            {airline.name}
                          </Typography>
                        }
                      />
                    ))}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={9}>
            {/* Sort dropdown */}
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant='body2' color='black'>
                {sortedFlights.length} results
              </Typography>
              <FormControl size='small'>
                <Select
                  variant='outlined'
                  value={sortBy}
                  onChange={handleSortChange}
                  sx={{
                    minWidth: 200,
                    color: "black",

                    background: "#fff",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                    },
                  }}
                >
                  <MenuItem sx={{ color: "black" }} value='best'>
                    Best
                  </MenuItem>
                  <MenuItem sx={{ color: "black" }} value='cheapest'>
                    Cheapest first
                  </MenuItem>
                  <MenuItem sx={{ color: "black" }} value='fastest'>
                    Fastest first
                  </MenuItem>
                  <MenuItem sx={{ color: "black" }} value='outbound'>
                    Outbound: Shortest time
                  </MenuItem>
                  <MenuItem sx={{ color: "black" }} value='return'>
                    Return: Shortest time
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            {loading.active && loading.action === "page" ? (
              loadingUI
            ) : error.active && error.action === "page" ? (
              <Alert severity='error' sx={{ mt: "20px" }}>
                {error.message}
              </Alert>
            ) : sortedFlights.length > 0 ? (
              sortedFlights.map((flight) => (
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
                          color: globalUser?.favouritedFlights?.includes(
                            flight._id
                          )
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
                                  {moment(
                                    flight?.schedule?.departureTime
                                  ).format("yy-MM-DD HH:mm")}
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
                                        left: `${54.5 + i * 10}%`,
                                        top: "-4px",
                                        transform: `translateX(-${
                                          50 + i * 10
                                        }%)`,
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
                          <Grid
                            container
                            alignItems='center'
                            sx={{ mt: "24px" }}
                          >
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
                                          left: `${54.5 + i * 10}%`,
                                          top: "-4px",
                                          transform: `translateX(-${
                                            50 + i * 10
                                          }%)`,
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
                              endIcon={
                                <ArrowForward sx={{ fontSize: "20px" }} />
                              }
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
                    Sorry, there aren't any flights that match your filters.
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", my: 4 }}
                  >
                    <img
                      src='https://via.placeholder.com/150'
                      alt='No flights match your filters'
                      style={{ width: "150px", height: "150px" }}
                    />
                  </Box>
                  {filteredFlights.length > 0 && (
                    <Box sx={{ textAlign: "center" }}>
                      <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => {
                          setDepartureTime([0, 24]);
                          setReturnTime([0, 24]);
                          setJourneyDuration([minDuration, maxDuration]);
                        }}
                      >
                        Show all {flights.length} results
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FlightSearchResults;
