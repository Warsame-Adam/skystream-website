import React, { useEffect, useState } from "react";
import {
  AppBar,
  Menu,
  Link,
  Input,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { format } from "date-fns";

import {
  setDepartureDate,
  setReturnDate,
  clearDepartureDate,
  clearReturnDate,
  setIsSelectingDepartDate,
} from "./Slices/dateStore";

import { useDispatch, useSelector } from "react-redux";

import HomeTravellersDropDown from "./HomeTravellersDropDown";
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

const hotelBookingData = [
  {
    site: "Booking.com",
    logo: "/path/to/booking-logo.png",
    rooms: [
      {
        type: "Double Room",
        pricePerNight: 150,
        breakfastIncluded: true,
        freeCancellation: false,
        availableFrom: "2024-10-20",
        availableTo: "2024-10-22",
      },
      {
        type: "Suite",
        pricePerNight: 250,
        breakfastIncluded: false,
        freeCancellation: true,
        availableFrom: "2024-10-20",
        availableTo: "2024-10-22",
      },
    ],
  },
  {
    site: "Expedia",
    logo: "/path/to/expedia-logo.png",
    rooms: [
      {
        type: "Single Room",
        pricePerNight: 120,
        breakfastIncluded: false,
        freeCancellation: true,
        availableFrom: "2024-10-21",
        availableTo: "2024-10-23",
      },
      {
        type: "Double Room",
        pricePerNight: 140,
        breakfastIncluded: true,
        freeCancellation: false,
        availableFrom: "2024-10-21",
        availableTo: "2024-10-23",
      },
    ],
  },
  {
    site: "Agoda",
    logo: "/path/to/agoda-logo.png",
    rooms: [
      {
        type: "Single Room",
        pricePerNight: 110,
        breakfastIncluded: true,
        freeCancellation: true,
        availableFrom: "2024-10-22",
        availableTo: "2024-10-24",
      },
      {
        type: "Double Room",
        pricePerNight: 160,
        breakfastIncluded: false,
        freeCancellation: true,
        availableFrom: "2024-10-22",
        availableTo: "2024-10-24",
      },
    ],
  },
];

const RoomsAndPrices = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [travellersAnchorEl, setTravellersAnchorEl] = React.useState(null);

  const [breakfastFilter, setBreakfastFilter] = useState(false);
  const [freeCancellationFilter, setFreeCancellationFilter] = useState(false);
  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);
  const [cabinClass] = useState("Economy");

  const { adults, children, childAges, travellersOpen } = useSelector(
    (state) => state.travellers
  );

  const travellersLabel = React.useMemo(() => {
    const total = adults + children;
    if (total === 1 && adults === 1) {
      return "1 Adult, " + cabinClass;
    } else {
      return `${total} Travellers, ${cabinClass}`;
    }
  }, [adults, children, cabinClass]);

  const filteredHotels = hotelBookingData.map((hotel) => {
    const availableRooms = hotel.rooms.filter((room) => {
      // Apply filter conditions
      const matchesFilters =
        (!breakfastFilter || room.breakfastIncluded) &&
        (!freeCancellationFilter || room.freeCancellation);

      return matchesFilters;
    });

    return {
      ...hotel,
      rooms: availableRooms,
    };
  });

  const handleFilterChange = (filterType) => {
    if (filterType === "breakfast") {
      setBreakfastFilter(!breakfastFilter);
    } else if (filterType === "freeCancellation") {
      setFreeCancellationFilter(!freeCancellationFilter);
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
              sx={{
                ...inputStyle,
                borderRadius: "0px 10px 10px 0px",
              }}
              onClick={handleTravellersInputClick}
              value={travellersLabel}
            />
            <HomeTravellersDropDown
              anchorEl={travellersAnchorEl}
              handleClose={() => setTravellersAnchorEl(null)}
              cabinClass={cabinClass}
            />
          </Box>
          {matchesSM ? (
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
          )}
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
          {filteredHotels.map((hotel, hotelIndex) =>
            hotel.rooms.map((room, roomIndex) => (
              <Card
                elevation={0}
                key={`${hotelIndex}-${roomIndex}`}
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
                    image={hotel.logo}
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
                    {room.type}
                  </Typography>
                  <Typography
                    sx={{ color: "black" }}
                    variant='body2'
                    color='textSecondary'
                  >
                    {freeCancellationFilter && room.freeCancellation
                      ? "✓ Free cancellation"
                      : "• Free cancellation"}
                  </Typography>
                  <Typography
                    sx={{ color: "black" }}
                    variant='body2'
                    color='textSecondary'
                  >
                    {breakfastFilter && room.breakfastIncluded
                      ? "✓ Breakfast included"
                      : "• Breakfast included"}
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
                    £{room.pricePerNight}
                  </Typography>
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
                </Box>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default RoomsAndPrices;
