import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  Popper,
  Autocomplete,
  Input,
  Paper,
  ClickAwayListener,
  Container,
  useMediaQuery,
  useTheme,
  Grid,
  Button,
} from "@mui/material";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FlightIcon from "@mui/icons-material/Flight";
import KingBedIcon from "@mui/icons-material/KingBed";

import { useDispatch, useSelector } from "react-redux";
import { setDepartureDate, setReturnDate } from "../Slices/dateStore";
import HotelTravellersDropDown from "../HotelTravellersDropDown";
import { format } from "date-fns";

import Hotelimg from "../../Components/Assets/HotelHeroimg.jpg";

const Locations = [
  // Cities
  { name: "Paris", type: "city", country: "France" },
  { name: "Athens", type: "city", country: "Greece" },
  { name: "Sydney", type: "city", country: "Australia" },
  { name: "Antalya", type: "city", country: "Turkey" },
  { name: "Rome", type: "city", country: "Italy" },
  { name: "Cardiff", type: "city", country: "Wales" },
  { name: "Edinburgh", type: "city", country: "Scotland" },
  { name: "Dublin", type: "city", country: "Ireland" },
  { name: "Dubai", type: "city", country: "United Arab Emirates" },
  { name: "Amsterdam", type: "city", country: "Netherlands" },
  { name: "Istanbul", type: "city", country: "Turkey" },
  { name: "Bangkok", type: "city", country: "Thailand" },

  // Hotels
  { name: "The Ritz Paris", type: "hotel", city: "Paris", country: "France" },
  {
    name: "Athens Grand Hotel",
    type: "hotel",
    city: "Athens",
    country: "Greece",
  },
  {
    name: "Sydney Harbour Hotel",
    type: "hotel",
    city: "Sydney",
    country: "Australia",
  },
  {
    name: "Antalya Beach Resort",
    type: "hotel",
    city: "Antalya",
    country: "Turkey",
  },
  { name: "Rome City Hotel", type: "hotel", city: "Rome", country: "Italy" },
  {
    name: "Cardiff Bay Hotel",
    type: "hotel",
    city: "Cardiff",
    country: "Wales",
  },
  {
    name: "Edinburgh Castle Hotel",
    type: "hotel",
    city: "Edinburgh",
    country: "Scotland",
  },
  {
    name: "Dublin City Stay",
    type: "hotel",
    city: "Dublin",
    country: "Ireland",
  },
  {
    name: "Hilton Dubai",
    type: "hotel",
    city: "Dubai",
    country: "United Arab Emirates",
  },
  {
    name: "Amsterdam Central Hotel",
    type: "hotel",
    city: "Amsterdam",
    country: "Netherlands",
  },
  {
    name: "Istanbul Grand Palace",
    type: "hotel",
    city: "Istanbul",
    country: "Turkey",
  },
  {
    name: "Bangkok Luxury Stay",
    type: "hotel",
    city: "Bangkok",
    country: "Thailand",
  },

  // Airports
  {
    name: "Charles de Gaulle Airport",
    type: "airport",
    city: "Paris",
    code: "CDG",
    country: "France",
  },
  {
    name: "Athens International Airport",
    type: "airport",
    city: "Athens",
    code: "ATH",
    country: "Greece",
  },
  {
    name: "Sydney Kingsford Smith Airport",
    type: "airport",
    city: "Sydney",
    code: "SYD",
    country: "Australia",
  },
  {
    name: "Antalya Airport",
    type: "airport",
    city: "Antalya",
    code: "AYT",
    country: "Turkey",
  },
  {
    name: "Rome Fiumicino Airport",
    type: "airport",
    city: "Rome",
    code: "FCO",
    country: "Italy",
  },
  {
    name: "Cardiff Airport",
    type: "airport",
    city: "Cardiff",
    code: "CWL",
    country: "Wales",
  },
  {
    name: "Edinburgh Airport",
    type: "airport",
    city: "Edinburgh",
    code: "EDI",
    country: "Scotland",
  },
  {
    name: "Dublin Airport",
    type: "airport",
    city: "Dublin",
    code: "DUB",
    country: "Ireland",
  },
  {
    name: "Dubai International Airport",
    type: "airport",
    city: "Dubai",
    code: "DXB",
    country: "United Arab Emirates",
  },
  {
    name: "Amsterdam Schiphol Airport",
    type: "airport",
    city: "Amsterdam",
    code: "AMS",
    country: "Netherlands",
  },
  {
    name: "Istanbul Airport",
    type: "airport",
    city: "Istanbul",
    code: "IST",
    country: "Turkey",
  },
  {
    name: "Bangkok Suvarnabhumi Airport",
    type: "airport",
    city: "Bangkok",
    code: "BKK",
    country: "Thailand",
  },
];

const HeroHotel = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);
  const [travellersAnchorEl, setTravellersAnchorEl] = React.useState(null);

  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState([]);
  const [rooms, setRooms] = useState(1);

  const travellersLabel = useMemo(() => {
    const parts = [];
    if (adults === 1) {
      parts.push("1 Adult");
    } else {
      parts.push(`${adults} Adults`);
    }

    if (children > 0) {
      if (children === 1) {
        parts.push("1 Child");
      } else {
        parts.push(`${children} Children`);
      }
    }

    if (rooms === 1) {
      parts.push("1 Room");
    } else {
      parts.push(`${rooms} Rooms`);
    }

    return parts.join(", ");
  }, [adults, children, rooms]);

  const handleTravellersInputClick = (e) => {
    setTravellersAnchorEl(e.currentTarget);
  };

  const handleChangeTravellers = ({ adults, children, childAges, rooms }) => {
    setAdults(adults);
    setChildren(children);
    setChildAges(childAges);
    setRooms(rooms);
  };

  useEffect(() => {
    const currentDate = new Date();
    const departure = new Date(currentDate.setDate(currentDate.getDate() + 7));
    dispatch(setDepartureDate(departure.toDateString()));

    const returnD = new Date(departure);
    returnD.setDate(departure.getDate() + 7);
    dispatch(setReturnDate(returnD.toDateString()));
  }, [dispatch]);

  const formattedDepartureDate = departureDate
    ? format(new Date(departureDate), "dd/MM/yyyy")
    : "";
  const formattedReturnDate = returnDate
    ? format(new Date(returnDate), "dd/MM/yyyy")
    : "";

  const content = (
    <>
      <Typography
        variant={"h1"}
        sx={{
          fontSize: { md: "64px", xs: "32px" },
          letterSpacing: "-.04em",
          fontWeight: "900",
          lineHeight: { md: "64px", xs: "48px" },
          color: "text.primary",
          pt: "24px",
          textShadow: "1px 1px 2px rgba(0,0,0, 0.25)",
        }}
      >
        Find the right hotel today
      </Typography>

      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          backgroundColor: "common.blue",
          padding: { md: "20px", xs: "20px 0px" },
          borderRadius: { md: "8px", xs: 0 },
          mt: { md: "24px", xs: "10px" },
        }}
      >
        <Grid
          container
          alignItems='center'
          sx={{ gap: { md: "0px", xs: "10px" } }}
        >
          <Grid item md={6} xs={12}>
            <label htmlFor='#destination'>
              <Typography
                variant='subtitle2'
                sx={{
                  ...inputLableStyle,
                }}
              >
                Where do you want to stay?
              </Typography>
            </label>
            <Autocomplete
              id='destination'
              disableUnderline
              freeSolo
              options={Locations}
              getOptionLabel={(option) => (option?.name ? option.name : "")}
              inputValue={inputValue}
              onInputChange={(_, val) => setInputValue(val)}
              filterOptions={(options, state) => {
                const val = state.inputValue.trim().toLowerCase();
                if (val === "") {
                  return options.filter((opt) => opt.type === "city");
                }

                return options.filter((option) => {
                  const nameMatch = option.name.toLowerCase().includes(val);
                  const cityMatch =
                    option.city && option.city.toLowerCase().includes(val);
                  const codeMatch =
                    option.code && option.code.toLowerCase().includes(val);
                  return nameMatch || cityMatch || codeMatch;
                });
              }}
              renderOption={(props, option) => {
                let IconComp = ApartmentIcon;
                if (option.type === "hotel") IconComp = KingBedIcon;
                if (option.type === "airport") IconComp = FlightIcon;

                const isEmpty = inputValue === "";

                return (
                  <li
                    {...props}
                    style={{
                      display: "flex",
                      justifyContent: isEmpty ? "flex-start" : "space-between",
                      alignItems: "center",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", gap: "6px", alignItems: "start" }}
                    >
                      <IconComp
                        sx={{
                          color: "#5a5a5a",
                          transform:
                            option.type === "airport"
                              ? "rotate(45deg)"
                              : "none",
                          marginTop: "2px",
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "black",
                          }}
                        >
                          {option.name}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "black" }}>
                          {option.country || option.city}
                        </Typography>
                      </Box>
                    </Box>

                    {!isEmpty && (
                      <Box
                        sx={{
                          marginLeft: "auto",
                          textAlign: "right",
                          color: "black",
                        }}
                      >
                        {option.type}
                      </Box>
                    )}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={inputRef}
                  inputProps={{
                    ...params.inputProps,
                    disableUnderline: true,
                    style: {},
                    sx: {
                      ...inputStyle,
                      border: 0,
                    },
                  }}
                  placeholder='Enter destination or hotel name'
                  variant='standard'
                  sx={{
                    width: "100%",
                    "& .MuiAutocomplete-input": {
                      borderRadius: { md: "8px 0 0 8px", xs: "8px" },
                    },
                    "& .MuiInputBase-root": {
                      p: 0,
                    },
                  }}
                />
              )}
              PaperComponent={(paperProps) => {
                const isEmpty = inputValue === "";
                return (
                  <Paper {...paperProps}>
                    {isEmpty && (
                      <Box sx={{ p: 1, mb: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "black",
                            fontSize: "14px",
                            mb: 1,
                          }}
                        >
                          Popular destinations
                        </Typography>
                      </Box>
                    )}
                    {paperProps.children}
                  </Paper>
                );
              }}
              PopperComponent={({ style, ...popperProps }) => (
                <Popper
                  {...popperProps}
                  anchorEl={inputRef.current}
                  placement='bottom-start'
                  style={{
                    ...style,
                    width: "590px",
                    maxHeight: "auto",
                    overflowY: "auto",
                    zIndex: 10,
                  }}
                />
              )}
              ListboxProps={{
                style: {
                  marginTop: "5px",
                  display: inputValue === "" ? "grid" : "block",
                  gridTemplateColumns:
                    inputValue === "" ? "repeat(2, 1fr)" : "unset",
                  gap: "2px",
                  padding: "0px 5px 5px 5px",
                },
              }}
              sx={{
                width: "100%",

                "& .MuiAutocomplete-endAdornment": {
                  right: "10px",
                  bottom: "30%",
                },
              }}
            />
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <label htmlFor='#check-in'>
              <Typography
                variant='subtitle2'
                sx={{
                  ...inputLableStyle,
                }}
              >
                Check-in
              </Typography>
            </label>

            <Input
              id='check-in'
              value={formattedDepartureDate}
              placeholder='Date'
              disableUnderline
              sx={{
                ...inputStyle,
                width: "100%",

                borderRadius: { md: "0", xs: "8px" },
              }}
            />
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <label htmlFor='#check-out'>
              <Typography
                variant='subtitle2'
                sx={{
                  ...inputLableStyle,
                }}
              >
                Check-out
              </Typography>
            </label>
            <Input
              id='check-out'
              value={formattedReturnDate}
              placeholder='Date'
              disableUnderline
              sx={{
                ...inputStyle,
                width: "100%",

                borderRadius: { md: "0", xs: "8px" },
              }}
            />
          </Grid>
          {/* <ReusableDatePicker
          anchorEl={anchorEl}
          handleClose={() => setAnchorEl(null)}
          departInputRef={departInputRef}
          returnInputRef={returnInputRef}
        /> */}
          <Grid item md={3} xs={12} sx={{ position: "relative" }}>
            <label htmlFor='#guest'>
              <Typography
                variant='subtitle2'
                sx={{
                  ...inputLableStyle,
                }}
              >
                Guests and rooms
              </Typography>
            </label>
            <Input
              id='guest'
              placeholder='Rooms'
              disableUnderline
              readOnly
              sx={{
                ...inputStyle,
                width: "100%",
                borderRadius: { md: "0 8px 8px 0", xs: "8px" },
              }}
              value={travellersLabel}
              onClick={handleTravellersInputClick}
            />

            <HotelTravellersDropDown
              anchorEl={travellersAnchorEl}
              adults={adults}
              children={children}
              childAges={childAges}
              rooms={rooms}
              onChange={handleChangeTravellers}
              onClose={() => setTravellersAnchorEl(null)}
            />
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          sx={{ mt: "20px", gap: "10px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              alignItems: { md: "center", xs: "flex-start" },
              width: { md: "unset", xs: "100%" },
              gap: { md: "20px", xs: "10px" },
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              Popular Filters:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  sx={{
                    color: "#626971",
                    marginRight: "10px",
                    "&.Mui-checked": { color: "#0062e3" },
                    "&.MuiButtonBase-root": {
                      backgroundColor: "white",
                      width: "18px",
                      height: "10px",
                    },
                  }}
                />
              }
              label='Free cancellation'
              sx={{
                "&.MuiFormControlLabel-root": {
                  margin: 0,
                },
              }}
              componentsProps={{
                typography: {
                  fontSize: "15px",
                  color: "white",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  sx={{
                    color: "#626971",
                    marginRight: "10px",
                    "&.Mui-checked": { color: "#0062e3" },
                    "&.MuiButtonBase-root": {
                      backgroundColor: "white",
                      width: "18px",
                      height: "10px",
                    },
                  }}
                />
              }
              label='4 stars'
              sx={{
                "&.MuiFormControlLabel-root": {
                  margin: 0,
                },
              }}
              componentsProps={{
                typography: {
                  fontSize: "15px",
                  color: "white",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  sx={{
                    color: "#626971",
                    marginRight: "10px",

                    "&.Mui-checked": { color: "#0062e3" },
                    "&.MuiButtonBase-root": {
                      backgroundColor: "white",
                      width: "18px",
                      height: "10px",
                    },
                  }}
                />
              }
              label='3 stars'
              sx={{
                "&.MuiFormControlLabel-root": {
                  margin: 0,
                },
              }}
              componentsProps={{
                typography: { fontSize: "15px", color: "white" },
              }}
            />
          </Box>

          <Grid
            item
            sx={{
              display: "flex",
              width: { md: "unset", xs: "100%" },
            }}
          >
            <Button
              fullWidth
              variant='contained'
              endIcon={<ArrowForwardOutlinedIcon />}
              sx={{ ...searchButtonStyle, textTransform: "none" }}
            >
              Search hotels
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: { md: "flex", xs: "none" },
          height: "550px",
          overflow: "hidden",
        }}
      >
        <img
          src={Hotelimg}
          alt='Hero'
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        className='container'
        sx={{
          boxSizing: "border-box",
          position: { md: "absolute", xs: "unset" },
          top: { md: "50%", xs: 0 },
          left: { md: "50%", xs: 0 },
          transform: { md: "translate(-50%, -50%)", xs: "unset" },
          width: "100%",
          backgroundColor: { md: "unset", xs: "common.blue" },
        }}
      >
        {matchesSM ? (
          <Container className='container'>{content}</Container>
        ) : (
          content
        )}
      </Box>
    </Box>
  );
};

const inputLableStyle = {
  fontWeight: "700",
  color: "text.primary",
  pb: "8px",
};

const searchButtonStyle = {
  fontWeight: 700,
  fontSize: "16px",
  backgroundColor: "primary.main",
  padding: "10px 16px",
  borderRadius: { md: "10px", xs: "8px" },
  color: "text.primary",
  "&:hover": { backgroundColor: "#024daf" },
  "&.Mui-disabled": {
    backgroundColor: "primary.main",
    color: "text.primary",
  },
  minWidth: "70px",
};
const inputStyle = {
  boxSizing: "border-box",
  height: "48px",
  border: "1px solid #ccc",
  backgroundColor: "background.paper",
  color: "#161616",
  cursor: "pointer",
  flex: "1 0 auto",
  fontWeight: 500,
  fontSize: "16px",
  "&.MuiAutocomplete-input, input": {
    border: "none",
    p: "8px 16px !important",
  },
};
export default HeroHotel;
