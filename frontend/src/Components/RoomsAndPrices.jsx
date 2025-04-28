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
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { format } from "date-fns";
import { useSelector } from "react-redux";

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

  const [anchorEl, setAnchorEl] = useState(null);
  const [travellersAnchorEl, setTravellersAnchorEl] = useState(null);
  const [breakfastFilter, setBreakfastFilter] = useState();
  const [freeCancellationFilter, setFreeCancellationFilter] = useState();
  const [searchTriggered, setSearchTriggered] = useState(false);

  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);
  const { adults, children, rooms } = useSelector((state) => state.hotelTravellers);

  const travellersLabel = useMemo(() => {
    const parts = [];
    if (adults > 0) {
      parts.push(adults === 1 ? "1 Adult" : `${adults} Adults`);
    }
    if (children > 0) {
      parts.push(children === 1 ? "1 Child" : `${children} Children`);
    }
    if (rooms > 0) {
      parts.push(rooms === 1 ? "1 Room" : `${rooms} Rooms`);
    }
    return parts.join(", ");
  }, [adults, children, rooms]);

  const allRooms = hotel.deals.flatMap((deal) =>
    deal.rooms.map((room) => ({
      providerId: deal._id,
      site: deal.site,
      siteLogo: deal.siteLogo,
      ...room,
    }))
  );

  const requiredAdultsPerRoom = Math.ceil(adults / rooms);
  const requiredChildrenPerRoom = Math.ceil(children / rooms);
  const requiredGuestsPerRoom = Math.ceil((adults + children) / rooms);

  const filteredDeals = allRooms
    .filter((deal) => {
      if (breakfastFilter !== undefined) {
        if (deal.breakfastIncluded !== breakfastFilter) return false;
      }
      if (freeCancellationFilter !== undefined) {
        if (deal.freeCancellation !== freeCancellationFilter) return false;
      }
      if (departureDate && returnDate) {
        const from = new Date(deal.availableFrom);
        const to = new Date(deal.availableTo);
        const userDepart = new Date(departureDate);
        const userReturn = new Date(returnDate);
        if (!(from <= userReturn && to >= userDepart)) return false;
      }
      if (
        deal.maxAdults < requiredAdultsPerRoom ||
        deal.maxChildren < requiredChildrenPerRoom ||
        deal.maxGuests < requiredGuestsPerRoom
      ) {
        return false;
      }
      if (!searchTriggered) {
        if (
          deal.maxAdults !== requiredAdultsPerRoom ||
          deal.maxChildren !== requiredChildrenPerRoom ||
          deal.maxGuests !== requiredGuestsPerRoom
        ) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => a.pricePerNight - b.pricePerNight);

  const handleFilterChange = (filterType) => {
    if (filterType === "breakfast") {
      setBreakfastFilter(breakfastFilter ? !breakfastFilter : true);
    } else if (filterType === "freeCancellation") {
      setFreeCancellationFilter(freeCancellationFilter ? !freeCancellationFilter : true);
    }
  };

  const handleTravellersInputClick = (e) => {
    setTravellersAnchorEl(e.currentTarget);
  };

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  return (
    <Container sx={{ pt: { md: "50px", xs: "30px" } }}>
      <Typography variant="h6" sx={{ fontSize: { md: "40px", xs: "20px" }, fontWeight: "bold", lineHeight: "48px" }}>
        Compare rooms and prices
      </Typography>

      <Box sx={{ mt: "8px", display: "flex", flexDirection: { sm: "row", xs: "column" }, alignItems: { sm: "center", xs: "flex-start" } }} id="rooms">
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          We compare 100s of sites to get you the best deal
        </Typography>
        <img src={roomsandpricesimg} alt="Rooms and Prices" />
      </Box>

      <Box sx={{ width: "100%", backgroundColor: "#eff3f8", p: "16px", borderRadius: "5px" }}>
        <Box sx={{ display: "flex", gap: { md: "10px", xs: "4px" } }}>
          <Box sx={{ display: "flex" }}>
            <Input
              placeholder="Date"
              readOnly
              disableUnderline
              value={
                departureDate && returnDate
                  ? `${format(new Date(departureDate), "dd/MMM")}-${format(new Date(returnDate), "dd/MMM")}`
                  : ""
              }
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ ...inputStyle, width: "100%", cursor: "pointer", borderRadius: "10px 0px 0px 10px" }}
            />
            <CalandarMenu anchorEl={anchorEl} handleClose={() => setAnchorEl(null)} />
            <Input
              placeholder="Adults, Rooms"
              disableUnderline
              readOnly
              sx={{ ...inputStyle, borderRadius: "0px 10px 10px 0px" }}
              onClick={handleTravellersInputClick}
              value={travellersLabel}
            />
            <HotelTravellersDropDown anchorEl={travellersAnchorEl} handleClose={() => setTravellersAnchorEl(null)} />
          </Box>

          {matchesSM ? (
            <IconButton sx={{ p: "8px", backgroundColor: "#1e3750", borderRadius: "8px", color: "text.primary" }}>
              <SearchIcon />
            </IconButton>
          ) : (
            <Button
              sx={{ border: "1px solid #c1c7cf", textTransform: "none", backgroundColor: "#05203c", color: "white", borderRadius: "5px", "&:hover": { backgroundColor: "#154679" } }}
              onClick={handleSearch}
            >
              Search rooms and rates
            </Button>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: { sm: "row", xs: "column" }, alignItems: { sm: "center", xs: "flex-start" }, gap: { sm: 2, xs: 1 }, mt: "16px" }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Filter by</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              sx={{ backgroundColor: breakfastFilter ? "#05203c" : "transparent", color: breakfastFilter ? "#fff" : "black", border: "1px solid #c1c7cf", textTransform: "none", borderRadius: "10px", fontSize: "12.5px", "&:hover": { backgroundColor: breakfastFilter ? "#05203c" : "transparent", borderColor: breakfastFilter ? "#05203c" : "#004687" } }}
              onClick={() => handleFilterChange("breakfast")}
            >
              Breakfast included
            </Button>

            <Button
              sx={{ backgroundColor: freeCancellationFilter ? "#05203c" : "transparent", color: freeCancellationFilter ? "#fff" : "black", border: "1px solid #c1c7cf", textTransform: "none", borderRadius: "10px", fontSize: "12.5px", "&:hover": { backgroundColor: freeCancellationFilter ? "#05203c" : "transparent", borderColor: freeCancellationFilter ? "#05203c" : "#004687" } }}
              onClick={() => handleFilterChange("freeCancellation")}
            >
              Free cancellation
            </Button>
          </Box>
        </Box>

        <Typography variant="subtitle1" sx={{ mt: "16px" }}>
          Price per night including taxes and fees
        </Typography>

        <Box sx={{ py: "16px" }}>
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal) => (
              <Card
                elevation={0}
                key={deal._id}
                sx={{ borderRadius: "12px", display: "flex", gap: { sm: 0, xs: "10px" }, flexDirection: { sm: "row", xs: "column" }, justifyContent: "space-between", alignItems: { sm: "center", xs: "flex-start" }, mb: 2, p: "16px" }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column", flex: 1 }}>
                  <CardMedia component="img" image={deal.siteLogo} sx={{ width: 50, height: "auto", mb: 3, color: "black" }} alt={`${deal.site} logo`} />
                  <Typography sx={{ color: "black", mb: 1, fontWeight: "bold", fontSize: "14px" }}>{deal.type}</Typography>
                  <Typography sx={{ color: "black" }} variant="body2">
                    {deal.freeCancellation ? "✓ Free cancellation" : "× Free cancellation"}
                  </Typography>
                  <Typography sx={{ color: "black" }} variant="body2">
                    {deal.breakfastIncluded ? "✓ Breakfast included" : "× Breakfast included"}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: { sm: "flex-end", xs: "flex-start" } }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: "#161616" }}>£{deal.pricePerNight}</Typography>
                  <a href={deal.bookingUrl} style={{ textDecoration: "none" }}>
                    <Button variant="contained" sx={{ fontSize: "16px", textTransform: "none", backgroundColor: "#05203c", color: "#fff", fontWeight: 700, "&:hover": { backgroundColor: "#154679" } }}>
                      Go to site
                    </Button>
                  </a>
                </Box>
              </Card>
            ))
          ) : (
            <Alert severity="error" sx={{ width: "100%" }}>
              No Deal Available in your applied Filters
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default RoomsAndPrices;
