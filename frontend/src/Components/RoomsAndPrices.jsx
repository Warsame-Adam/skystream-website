import React, { useEffect, useMemo, useState } from "react";
import {
  Input,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardMedia,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import {
  setDepartureDate,
  setReturnDate,
} from "../Components/Slices/dateStore.js";

import HotelTravellersDropDown from "./HotelTravellersDropDown";
import CalandarMenu from "./CalandarMenu";
import roomsandpricesimg from "../Components/Assets/roomsandpricesimg.svg";

const inputStyle = {
  border: "1px solid #ccc",
  backgroundColor: "background.paper",
  color: "#161616",
  cursor: "pointer",
  flex: "1",
  fontWeight: 500,
  fontSize: "16px",
  p: "16px",
  height: "40px",
  "& input": {
    p: 0,
    height: "unset",
    border: "none",
    lineHeight: "21px",
  },
};

const RoomsAndPrices = ({ hotel }) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [travellersAnchorEl, setTravellersAnchorEl] = React.useState(null);

  const [breakfastFilter, setBreakfastFilter] = useState();
  const [freeCancellationFilter, setFreeCancellationFilter] = useState();
  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);
  const { adults, children, rooms } = useSelector(
    (state) => state.hotelTravellers
  );

  useEffect(() => {
    setDepartureDate(null);
    setReturnDate(null);
  }, []);
  const travellersLabel = useMemo(() => {
    const parts = [];
    if (adults > 0) {
      if (adults === 1) {
        parts.push("1 Adult");
      } else {
        parts.push(`${adults} Adults`);
      }
    }

    if (children > 0) {
      if (children === 1) {
        parts.push("1 Child");
      } else {
        parts.push(`${children} Children`);
      }
    }

    if (rooms > 0) {
      if (rooms === 1) {
        parts.push("1 Room");
      } else {
        parts.push(`${rooms} Rooms`);
      }
    }

    return parts.join(", ");
  }, [adults, children, rooms]);

  const filteredDeals = hotel.deals
    .flatMap((deal) =>
      deal.rooms.map((room) => ({
        providerId: deal._id,
        site: deal.site,
        siteLogo: deal.siteLogo,
        ...room,
      }))
    )
    .filter(
      (deal) =>
        (breakfastFilter === undefined ||
          deal.breakfastIncluded === breakfastFilter) &&
        (freeCancellationFilter === undefined ||
          deal.freeCancellation === freeCancellationFilter) &&
        (!departureDate ||
          new Date(deal.availableFrom) >= new Date(departureDate)) &&
        (!returnDate || new Date(deal.availableTo) <= new Date(returnDate))
    )
    .sort((a, b) => a.pricePerNight - b.pricePerNight);

  const handleFilterChange = (filterType) => {
    if (filterType === "breakfast") {
      setBreakfastFilter(breakfastFilter ? !breakfastFilter : true);
    } else if (filterType === "freeCancellation") {
      setFreeCancellationFilter(
        freeCancellationFilter ? !freeCancellationFilter : true
      );
    }
  };

  const handleSearch = () => {
    //const originCode = origin?.code || origin;
    //const destinationCode = destination?.code || destination;
    //const formattedDepDate = formatDateToYYMMDD(departureDate);
    // const formattedRetDate = formatDateToYYMMDD(returnDate);
    //  const path = `/flights/${originCode}/${destinationCode}/${formattedDepDate}/${formattedRetDate}`;
    //navigate(path);
  };

  const handleTravellersInputClick = (e) => {
    setTravellersAnchorEl(e.currentTarget);
    //    dispatch(setTravellersOpen(true));
  };
  return (
    <Container className='container' sx={{ pt: { md: "50px", xs: "30px" } }}>
      <Typography
        variant='h6'
        sx={{
          fontSize: { md: "40px", xs: "20px" },
          fontWeight: "bold",
          //mb: "40px",
          lineHeight: "48px",
        }}
      >
        Compare rooms and prices
      </Typography>
      <Box
        sx={{
          mt: "8px",
          display: "flex",
          flexDirection: { sm: "row", xs: "column" },
          alignItems: { sm: "center", xs: "flex-start" },
        }}
        id='rooms'
      >
        <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
          We compare 100s of sites to get you the best deal
        </Typography>
        <img src={roomsandpricesimg} />
      </Box>

      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          backgroundColor: "#eff3f8",
          p: "16px",
          borderRadius: "5px",
        }}
      >
        <Box sx={{ display: "flex", gap: { md: "10px", xs: "4px" } }}>
          <Box sx={{ display: "flex" }}>
            <Input
              placeholder='Date'
              readOnly
              disableUnderline
              value={
                departureDate && returnDate
                  ? `${format(new Date(departureDate), "dd/MMM")}-${format(
                      new Date(returnDate),
                      "dd/MMM"
                    )}`
                  : ""
              }
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
              sx={{
                ...inputStyle,
                width: "100%",
                cursor: "pointer",
                borderRadius: "10px 0px 0px 10px",
              }}
            />
            <CalandarMenu
              anchorEl={anchorEl}
              handleClose={() => setAnchorEl(null)}
            />
            <Input
              placeholder='Adults, Rooms'
              disableUnderline
              readOnly
              sx={{
                ...inputStyle,
                borderRadius: "0px 10px 10px 0px",
              }}
              onClick={handleTravellersInputClick}
              value={travellersLabel}
            />
            <HotelTravellersDropDown
              anchorEl={travellersAnchorEl}
              handleClose={() => setTravellersAnchorEl(null)}
            />
          </Box>
          {/* {matchesSM ? (
            <IconButton
              sx={{
                p: "8px",
                backgroundColor: "#1e3750",
                borderRadius: "8px",
                color: "text.primary",
              }}
            >
              <SearchIcon />
            </IconButton>
          ) : (
            <Button
              sx={{
                border: "1px solid #c1c7cf",
                textTransform: "none",
                backgroundColor: "#05203c",
                color: "white",
                borderRadius: "5px",
                "&:hover": { backgroundColor: "#154679" },
              }}
            >
              Search rooms and rates
            </Button>
          )} */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "row", xs: "column" },
            alignItems: { sm: "center", xs: "flex-start" },
            gap: { sm: 2, xs: 1 },
            mt: "16px",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            Filter by
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              sx={{
                backgroundColor: breakfastFilter ? "#05203c" : "transparent",
                color: breakfastFilter ? "#fff" : "black",
                border: "1px solid   #c1c7cf",
                textTransform: "none",
                borderRadius: "10px",
                fontSize: "12.5px",
                "&:hover": {
                  backgroundColor: breakfastFilter ? "#05203c" : "transparent",
                  borderColor: breakfastFilter ? "#05203c" : "#004687",
                },
              }}
              onClick={() => handleFilterChange("breakfast")}
            >
              Breakfast included
            </Button>

            <Button
              sx={{
                backgroundColor: freeCancellationFilter
                  ? "#05203c"
                  : "transparent",
                color: freeCancellationFilter ? "#fff" : "black",
                border: "1px solid  #c1c7cf  ",
                textTransform: "none",
                borderRadius: "10px",
                fontSize: "12.5px",
                "&:hover": {
                  backgroundColor: freeCancellationFilter
                    ? "#05203c"
                    : "transparent",
                  borderColor: freeCancellationFilter ? "#05203c" : "#004687",
                },
              }}
              onClick={() => handleFilterChange("freeCancellation")}
            >
              Free cancellation
            </Button>
          </Box>
        </Box>

        <Typography variant='subtitle1' sx={{ mt: "16px" }}>
          Price per night including taxes and fees
        </Typography>
        <Box sx={{ py: "16px" }}>
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal) => (
              <Card
                elevation={0}
                key={deal._id}
                sx={{
                  borderRadius: "12px",
                  display: "flex",
                  gap: { sm: 0, xs: "10px" },
                  flexDirection: { sm: "row", xs: "column" },
                  justifyContent: "space-between",
                  alignItems: { sm: "center", xs: "flex-start" },
                  mb: 2,
                  p: "16px",
                }}
              >
                {/* Left Side - Logo and Details */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <CardMedia
                    component='img'
                    image={deal.siteLogo}
                    sx={{ width: 50, height: "auto", mb: 3, color: "black" }}
                  />
                  <Typography
                    sx={{
                      color: "black",
                      mb: 1,
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {deal.type}
                  </Typography>
                  <Typography
                    sx={{ color: "black" }}
                    variant='body2'
                    color='textSecondary'
                  >
                    {deal.freeCancellation
                      ? "✓ Free cancellation"
                      : "× Free cancellation"}
                  </Typography>
                  <Typography
                    sx={{ color: "black" }}
                    variant='body2'
                    color='textSecondary'
                  >
                    {deal.breakfastIncluded
                      ? "✓ Breakfast included"
                      : "× Breakfast included"}
                  </Typography>
                </Box>
                {/* Right Side - Price and Button */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { sm: "flex-end", xs: "flex-start" },
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{ mb: 1, fontWeight: "bold", color: "#161616" }}
                  >
                    £{deal.pricePerNight}
                  </Typography>
                  <a href={deal.bookingUrl} style={{ textDecoration: "none" }}>
                    <Button
                      variant='contained'
                      sx={{
                        fontSize: "16px",
                        textTransform: "none",
                        backgroundColor: "#05203c",
                        color: "#fff",
                        fontWeight: 700,

                        "&:hover": { backgroundColor: "#154679" },
                      }}
                    >
                      Go to site
                    </Button>
                  </a>
                </Box>
              </Card>
            ))
          ) : (
            <Alert severity='error' sx={{ width: "100%" }}>
              No Deal Available in your applied Filters
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default RoomsAndPrices;
