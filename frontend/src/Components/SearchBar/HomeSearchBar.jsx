import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Input,
  Button,
  Box,
  Typography,
  Container,
  Autocomplete,
  TextField,
  Popper,
  Grid,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  setDepartureDate,
  setReturnDate,
  clearDepartureDate,
  clearReturnDate,
} from "../Slices/dateStore";
import { setFrom, setTo } from "../Slices/flightSearchSlice";
import HomeTravellersDropDown from "../HomeTravellersDropDown";
import CalandarMenu from "../CalandarMenu";
import { GlobalContext } from "../../context/GlobalContext";

const HomeSearchbar = () => {
  const { locations } = useContext(GlobalContext);
  const { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [travellersAnchorEl, setTravellersAnchorEl] = React.useState(null);
  const [isOpenOriginPopup, setIsOpenOriginPopup] = useState(false);
  const [isOpenDestinationPopup, setIsOpenDestinationPopup] = useState(false);

  const originRef = useRef();
  const destinationRef = useRef();
  const departureDateRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const origin = useSelector((state) => state.flightSearch.from);
  const destination = useSelector((state) => state.flightSearch.to);

  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);

  const { cabinClass, adults, children } = useSelector(
    (state) => state.travellers
  );

  const handleSearch = () => {
    const isDate = (val) => !isNaN(new Date(val).getTime());

    if (
      origin &&
      origin.cityCode &&
      destination &&
      destination.cityCode &&
      isDate(departureDate) &&
      isDate(returnDate)
    ) {
      const path = `/flights/search?originCountry=${origin.countryCode}&originCity=${origin.cityCode}&destinationCountry=${destination.countryCode}&destinationCity=${destination.cityCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&children=${children}&cabinClass=${cabinClass}`;
      navigate(path);
    }
  };

  const [showCrossIcons, setShowCrossIcons] = useState(false);

  const travellersLabel = React.useMemo(() => {
    const total = adults + children;
    if (total === 1 && adults === 1) {
      return "1 Adult, " + cabinClass;
    } else {
      return `${total} Travellers, ${cabinClass}`;
    }
  }, [adults, children, cabinClass]);

  useEffect(() => {
    const currentDate = new Date();
    const departure = new Date(currentDate.setDate(currentDate.getDate() + 7));
    dispatch(setDepartureDate(departure.toDateString()));

    const returnD = new Date(departure);
    returnD.setDate(departure.getDate() + 7);
    dispatch(setReturnDate(returnD.toDateString()));

    setShowCrossIcons(false);
  }, [dispatch]);

  const formattedDepartureDate = departureDate
    ? format(new Date(departureDate), "dd/MM/yyyy")
    : "";
  const formattedReturnDate = returnDate
    ? format(new Date(returnDate), "dd/MM/yyyy")
    : "";

  const handleInputFocus = () => {
    setShowCrossIcons(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!departureDate && !returnDate) {
        setShowCrossIcons(false);
      }
    }, 150);
  };

  const handleClearDeparture = () => {
    dispatch(clearDepartureDate());
  };

  const handleClearReturn = () => {
    dispatch(clearReturnDate());
  };

  const handleTravellersInputClick = (e) => {
    setTravellersAnchorEl(e.currentTarget);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "common.blue", pb: "48px" }}>
      <Container className='container' sx={{ pt: "24px", pb: "16px" }}>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
          }}
        >
          <Link to='/flights'>
            <Button
              sx={{
                boxSizing: "border-box",
                fontSize: "13.5px",
                backgroundColor:
                  pathname === "/" || pathname.includes("/flights")
                    ? "primary.main"
                    : "transparent",
                color: "text.primary",
                textTransform: "none",
                "&:hover": {
                  border: "0.5px solid",
                  borderColor:
                    pathname === "/" || pathname.includes("/flights")
                      ? "primary.main"
                      : "#154679",
                  backgroundColor:
                    pathname === "/" || pathname.includes("/flights")
                      ? "primary.main"
                      : "#154679",
                },
                border: "0.5px solid",
                borderColor:
                  pathname === "/" || pathname.includes("/flights")
                    ? "primary.main"
                    : "#6a7b8b",
                borderRadius: "75px",
                padding: "5px 15px",
                mx: 0.5,
              }}
              variant='contained'
              startIcon={
                <FlightIcon
                  sx={{ rotate: "45deg", width: "20px", height: "20px" }}
                />
              }
            >
              Flights
            </Button>
          </Link>
          <Link to='/hotels'>
            <Button
              sx={{
                fontSize: "13.5px",
                backgroundColor: "transparent",
                color: "text.primary",
                textTransform: "none",
                border: "0.5px solid #6a7b8b",
                "&:hover": {
                  border: "0.5px solid #154679",

                  backgroundColor: "#154679",
                },
                borderRadius: "75px",
                padding: "5px 15px",
              }}
              variant='contained'
              startIcon={<HotelIcon sx={{ width: "17px", height: "20px" }} />}
            >
              Hotels
            </Button>
          </Link>
        </Box>

        <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
          <Typography
            variant='h3'
            sx={{
              color: "text.primary",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "40px",
            }}
          >
            Millions of cheap flights. One simple search.
          </Typography>
        </Box>

        <Grid
          container
          alignItems='center'
          gap={0.5}
          sx={{ flexWrap: { md: "nowrap", xs: "wrap" } }}
        >
          {/* From */}
          <Grid
            item
            sx={{ position: "relative", width: { md: "242px", xs: "100%" } }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                ...inputLableStyle,
                cursor: "pointer",
              }}
              onClick={() => {
                setIsOpenOriginPopup(true);
                originRef.current.click();
              }}
            >
              From
            </Typography>
            <Autocomplete
              fullWidth
              open={isOpenOriginPopup}
              onOpen={() => setIsOpenOriginPopup(true)}
              onClose={() => setIsOpenOriginPopup(false)}
              ref={originRef}
              freeSolo
              options={locations}
              getOptionLabel={(option) =>
                option && option.cityName && option.cityCode
                  ? `${option.cityName} (${option.cityCode}) ${option.countryName} (${option.countryCode})`
                  : ""
              }
              filterOptions={(options, state) => {
                const inputValue = state.inputValue.trim().toLowerCase();

                if (inputValue === "") {
                  return options.slice(0, 5);
                }

                return options.filter(
                  (option) =>
                    option.cityName.toLowerCase().includes(inputValue) ||
                    option.cityCode.toLowerCase().includes(inputValue) ||
                    option.countryName.toLowerCase().includes(inputValue) ||
                    option.countryCode.toLowerCase().includes(inputValue)
                );
              }}
              onChange={(event, value) => {
                dispatch(setFrom(value));
              }}
              value={origin}
              renderOption={(props, option) => (
                <li
                  {...props}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px",
                  }}
                >
                  <FlightIcon
                    style={{ color: "#5a5a5a", transform: "rotate(45deg)" }}
                  />
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "14px",
                      }}
                    >
                      {option.cityName} ({option.cityCode})
                    </div>
                    <div style={{ fontSize: "12px", color: "#5a5a5a" }}>
                      {option.countryName} ({option.countryCode})
                    </div>
                  </div>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    style: {},
                    sx: {
                      ...inputStyle,
                      border: 0,
                    },
                  }}
                  placeholder='Country, city'
                  variant='standard'
                  sx={{
                    boxSizing: "border-box",
                    width: "100%",
                    pb: "10.9px",
                    border: "1px solid #ccc",
                    backgroundColor: "background.paper",
                    borderRadius: { md: "10px 0px 0px 10px", xs: "0" },
                    "& .MuiInput-root": {
                      borderRadius: { md: "10px 0px 0px 10px", xs: "0" },
                    },
                    "& .MuiAutocomplete-input": {
                      mt: "-4px",
                      // padding: "0 !important",
                    },
                  }}
                />
              )}
              PopperComponent={({ style, ...props }) => (
                <Popper
                  {...props}
                  style={{
                    ...style,
                    width: "400px",
                    maxHeight: "400px",
                    overflowY: "auto",
                    zIndex: 10,
                  }}
                />
              )}
              sx={{
                width: "100%",

                "& .MuiAutocomplete-endAdornment": {
                  right: "10px",
                  bottom: "30%",
                },
              }}
            />
            {/* <Input
              value={`${origin.cityName} (${origin.cityCode}), ${origin.countryName} (${origin.countryCode})`}
              placeholder='From'
              disableUnderline
              sx={{
                ...inputStyle,
                borderRadius: { md: "10px 0px 0px 10px", xs: "0" },
                width: "100%",
              }}
            /> */}
          </Grid>
          {/* To */}
          <Grid
            item
            sx={{ position: "relative", width: { md: "242px", xs: "100%" } }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                ...inputLableStyle,
                cursor: "pointer",
              }}
              onClick={() => {
                setIsOpenDestinationPopup(true);
                destinationRef.current.click();
              }}
            >
              To
            </Typography>

            <Autocomplete
              fullWidth
              open={isOpenDestinationPopup}
              onOpen={() => setIsOpenDestinationPopup(true)}
              onClose={() => setIsOpenDestinationPopup(false)}
              ref={destinationRef}
              freeSolo
              options={locations}
              getOptionLabel={(option) =>
                option && option.cityName && option.cityCode
                  ? `${option.cityName} (${option.cityCode})`
                  : ""
              }
              filterOptions={(options, state) => {
                const inputValue = state.inputValue.trim().toLowerCase();
                if (inputValue === "") {
                  return options.slice(0, 5);
                }
                return options.filter(
                  (option) =>
                    option.cityName.toLowerCase().includes(inputValue) ||
                    option.cityCode.toLowerCase().includes(inputValue) ||
                    option.countryName.toLowerCase().includes(inputValue) ||
                    option.countryCode.toLowerCase().includes(inputValue)
                );
              }}
              onChange={(event, value) => {
                dispatch(setTo(value));
              }}
              value={destination}
              renderOption={(props, option) => (
                <li
                  {...props}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px",
                  }}
                >
                  <FlightIcon
                    style={{ color: "#5a5a5a", transform: "rotate(45deg)" }}
                  />
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "14px",
                      }}
                    >
                      {option.cityName} ({option.cityCode})
                    </div>
                    <div style={{ fontSize: "12px", color: "#5a5a5a" }}>
                      {option.countryName} ({option.countryCode})
                    </div>
                  </div>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    style: {},
                    sx: {
                      ...inputStyle,
                      border: 0,
                    },
                  }}
                  placeholder='Country, city'
                  variant='standard'
                  sx={{
                    boxSizing: "border-box",

                    width: "100%",
                    pb: "10.9px",
                    border: "1px solid #ccc",
                    backgroundColor: "background.paper",

                    "& .MuiAutocomplete-input": {
                      mt: "-4px",
                      // padding: "0 !important",
                    },
                  }}
                />
              )}
              PopperComponent={({ style, ...props }) => (
                <Popper
                  {...props}
                  style={{
                    ...style,
                    width: "400px",
                    maxHeight: "400px",
                    overflowY: "auto",
                    zIndex: 10,
                  }}
                />
              )}
              sx={{
                width: "100%",

                "& .MuiAutocomplete-endAdornment": {
                  right: "10px",
                  bottom: "30%",
                },
              }}
            />
          </Grid>
          <CalandarMenu
            anchorEl={anchorEl}
            handleClose={() => setAnchorEl(null)}
          />
          {/* depart */}
          <Grid
            item
            className='date-input'
            sx={{ position: "relative", width: { md: "210px", xs: "100%" } }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                ...inputLableStyle,
                cursor: "pointer",
              }}
              onClick={() => departureDateRef.current?.click()}
            >
              Depart
            </Typography>
            <Input
              ref={departureDateRef}
              placeholder='Depart Add date'
              readOnly
              disableUnderline
              value={formattedDepartureDate}
              onClick={(e) => {
                setShowCrossIcons(true);
                setAnchorEl(e.currentTarget);
              }}
              //onFocus={handleInputFocus}
              //onBlur={handleInputBlur}
              sx={{ ...inputStyle, width: "100%", cursor: "pointer" }}
            />
            {showCrossIcons && departureDate && (
              <CloseIcon onClick={handleClearDeparture} sx={crossIconStyle} />
            )}
          </Grid>
          {/* return  */}
          <Grid
            item
            className='date-input'
            sx={{ position: "relative", width: { md: "210px", xs: "100%" } }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                ...inputLableStyle,
                cursor: "pointer",
              }}
              onClick={() => departureDateRef.current?.click()}
            >
              Return
            </Typography>
            <Input
              placeholder='Return Add date'
              disableUnderline
              readOnly
              value={formattedReturnDate}
              onClick={() => departureDateRef.current.click()}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              sx={{ ...inputStyle, width: "100%", cursor: "pointer" }}
            />
            {showCrossIcons && returnDate && (
              <CloseIcon onClick={handleClearReturn} sx={crossIconStyle} />
            )}
          </Grid>

          <Grid
            item
            sx={{ position: "relative", width: { md: "210px", xs: "100%" } }}
          >
            <Typography
              variant='subtitle2'
              sx={{
                ...inputLableStyle,
                cursor: "pointer",
                textWrap: "nowrap",
                textOverflow: "ellipsis",
                boxSizing: "border-box",
                width: "100%",
                overflowX: "hidden",
              }}
              onClick={handleTravellersInputClick}
            >
              Travellers and cabin class
            </Typography>

            <Input
              placeholder='Travellers and cabin class'
              disableUnderline
              sx={{
                ...inputStyle,
                borderRadius: { md: "0px 10px 10px 0px", xs: 0 },
                marginRight: "8px",
                width: "100%",
              }}
              onClick={handleTravellersInputClick}
              value={travellersLabel}
            />
          </Grid>
          <HomeTravellersDropDown
            anchorEl={travellersAnchorEl}
            handleClose={() => setTravellersAnchorEl(null)}
          />
          <Grid
            item
            sx={{
              display: "flex",
              width: { md: "unset", xs: "100%" },
              ml: { md: "6px", xs: 0 },
            }}
          >
            <Button
              fullWidth
              onClick={handleSearch}
              disabled={
                !origin || !destination || !departureDate || !returnDate
              }
              variant='contained'
              sx={{ ...searchButtonStyle, textTransform: "none" }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const inputLableStyle = {
  fontWeight: "700",
  position: "absolute",
  color: "#626971",
  px: "16px",
  pt: "15px",
  zIndex: 1,
};

const inputStyle = {
  border: "1px solid #ccc",
  backgroundColor: "background.paper",
  color: "#161616",
  cursor: "pointer",
  flex: "1 0 auto",
  fontWeight: 500,
  fontSize: "16px",
  p: "16px",
  pt: "33.4px",
  "& input": {
    p: 0,
    height: "unset",
    border: "none",
    lineHeight: "21px",
  },
};

const crossIconStyle = {
  position: "absolute",
  right: "5px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "25px",
  height: "25px",
  backgroundColor: "#f0f0f0",
  borderRadius: "50%",
  color: "#555",
  cursor: "pointer",
};

const searchButtonStyle = {
  backgroundColor: "primary.main",
  padding: { md: "23px 20px", xs: "10px" },
  borderRadius: { md: "10px", xs: 0 },
  color: "text.primary",
  "&:hover": { backgroundColor: "#024daf" },
  "&.Mui-disabled": {
    backgroundColor: "primary.main",
    color: "text.primary",
  },
  minWidth: "70px",
};

export default HomeSearchbar;
