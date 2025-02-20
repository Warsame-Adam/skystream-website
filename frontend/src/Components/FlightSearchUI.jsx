import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setDepartureDate, setReturnDate } from "./Slices/dateStore.js";
import {
  setAdults,
  setChildAges,
  setChildren,
  handleChangeTravellers,
  setTravellersOpen,
} from "./Slices/HomeTravellersddSlice";
import { setTo } from "./Slices/flightSearchSlice";

import { setShowInputs } from "./Slices/FlightSearchUI.js";
import {
  Container,
  Box,
  Typography,
  Button,
  Input,
  Checkbox,
  FormControlLabel,
  ClickAwayListener,
  Autocomplete,
  Popper,
  TextField,
  Grid,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { format } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import FlightIcon from "@mui/icons-material/Flight";
import HomeTravellersDropDown from "./HomeTravellersDropDown";
import { setActiveInput } from "./Slices/ReusableCalendar";
import ReusableDatePicker from "./ReusableDatePicker.jsx";
import ReturnSearchBar from "./SearchBar/ReturnSearchBar.jsx";

const cities = [
  { city: "Paris", code: "CDG", country: "France" },
  { city: "Athens", code: "ATH", country: "Greece" },
  { city: "Sydney", code: "SYD", country: "Australia" },
  { city: "Antalya", code: "AYT", country: "Turkey" },
  { city: "Rome", code: "FCO", country: "Italy" },
  { city: "Cardiff", code: "CWL", country: "Wales" },
  { city: "Edinburgh", code: "EDI", country: "Scotland" },
  { city: "Dublin", code: "DUB", country: "Ireland" },
  { city: "Dubai", code: "DXB", country: "UAE" },
  { city: "Amsterdam", code: "AMS", country: "Netherlands" },
  { city: "Istanbul", code: "IST", country: "Turkey" },
  { city: "Bangkok", code: "BKK", country: "Thailand" },
];
const isDate = (val) => !isNaN(new Date(val).getTime());

const inputStyle = {
  backgroundColor: "background.paper",
  color: "black",
  margin: "2px",
  padding: "20px 15px",
  "&:focus": {
    borderColor: "primary.main",
  },
};

const FlightSearchUI = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const showInputs = useSelector((state) => state.flightSearchui.showInputs);

  const newOrigin = useSelector((state) => state.flightSearch.from);
  const newDestination = useSelector((state) => state.flightSearch.to);

  const CurrentDepartureDate = useSelector(
    (state) => state.dates.departureDate
  );
  const CurrentReturnDate = useSelector((state) => state.dates.returnDate);

  useEffect(() => {
    dispatch(setShowInputs(false));
    dispatch(setTravellersOpen(false));
  }, []);

  const { origin, destination, departureDate, returnDate } = useParams();

  useEffect(() => {
    if (departureDate && isDate(departureDate * 1)) {
      dispatch(setDepartureDate(departureDate * 1));
    }
    if (returnDate && isDate(returnDate * 1)) {
      dispatch(setReturnDate(returnDate * 1));
    }

    const foundCity = cities.find((city) => city.code === destination);

    if (foundCity) {
      dispatch(setTo(foundCity));
    } else {
      dispatch(setTo({ city: "", code: destination, country: "" }));
    }
  }, [destination, departureDate, returnDate]);

  const { adults, children, childAges, travellersOpen } = useSelector(
    (state) => state.travellers
  );
  const departInputRef = useRef(null);
  const returnInputRef = useRef(null);

  const [cabinClass] = useState("Economy");

  function formatArrowDate(dateObj) {
    return format(dateObj, "EEE, dd MMM");
  }

  function formatInputDate(dateObj) {
    if (!dateObj) return "";
    return format(dateObj, "dd/MM/yyyy");
  }

  const formatDateToYYMMDD = (date) => {
    const d = new Date(date);
    const year = String(d.getFullYear()).slice(-2);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  function toYyMmDd(dateObj) {
    const yy = dateObj.getFullYear() % 100;
    const mm = dateObj.getMonth() + 1; // 1-12
    const dd = dateObj.getDate(); // 1-31

    const yyStr = String(yy).padStart(2, "0");
    const mmStr = String(mm).padStart(2, "0");
    const ddStr = String(dd).padStart(2, "0");

    return yyStr + mmStr + ddStr;
  }

  const handleDateChange = (type, step) => {
    let oldStr =
      type === "departure" ? CurrentDepartureDate : CurrentReturnDate;

    // 1) Parse
    const oldDate = new Date(oldStr);
    if (!oldDate) return;

    oldDate.setDate(oldDate.getDate() + step);

    const newStr = oldDate.getTime();

    if (type === "departure") {
      dispatch(setDepartureDate(newStr));
    } else {
      dispatch(setReturnDate(newStr));
    }
  };

  const formattedDepartureDate = CurrentDepartureDate
    ? formatArrowDate(CurrentDepartureDate)
    : "Departure date";

  const formattedReturnDate = CurrentReturnDate
    ? formatArrowDate(CurrentReturnDate)
    : "Return date";

  const inputFormattedDepartureDate = CurrentDepartureDate
    ? format(new Date(CurrentDepartureDate), "dd/MM/yyyy")
    : "";
  const inputFormattedReturnDate = CurrentReturnDate
    ? format(new Date(CurrentReturnDate), "dd/MM/yyyy")
    : "";

  const travellersLabel = React.useMemo(() => {
    const total = adults + children;
    if (total === 1 && adults === 1) {
      return "1 Adult, " + cabinClass;
    } else {
      return `${total} Travellers, ${cabinClass}`;
    }
  }, [adults, children, cabinClass]);

  const handleClickDepart = (e) => {
    dispatch(setActiveInput("depart"));
    handleClick(e);
  };

  const handleClickReturn = (e) => {
    dispatch(setActiveInput("return"));
    handleClick(e);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    // dispatch(calendarShow());
  };
  const handleTravellersInputClick = () => {
    dispatch(setTravellersOpen(true));
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "common.blue" }}>
      <Container className='container' sx={{ py: "24px" }}>
        <Grid
          container
          gap='8px'
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid
            item
            md={7}
            xs={12}
            sx={{
              backgroundColor: "#1e3750",
              "&:hover": { backgroundColor: "#010913" },
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
              flexShrink: 0,
              cursor: "pointer",
              position: "relative",
              p: "10px 36px",
            }}
            onClick={() => {
              console.log("Current showInputs:", showInputs);
              dispatch(setShowInputs(!showInputs));
              console.log("After dispatch:", !showInputs);
            }}
          >
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                display: "flex",
                alignItems: "center",
                left: "8px",
                px: "10px",
              }}
            >
              <SearchIcon
                sx={{
                  width: "24px",
                  height: "24px",
                  color: "text.primary",
                }}
              />
            </Box>

            <Typography
              variant='subtitle1'
              align='center'
              sx={{
                color: "text.primary",
                width: "100%",
              }}
            >
              {`${newOrigin.city} (${newOrigin.code}) . ${travellersLabel} `}
            </Typography>
          </Grid>

          <Grid item sx={{ flex: 1 }}>
            <Grid
              container
              direction={{ sm: "row", xs: "column" }}
              alignItems='center'
              gap='8px'
              sx={{ wrap: { sm: "nowrap", xs: "nowrap" } }}
            >
              <Grid
                item
                sx={{
                  flex: 1,
                  width: { sm: "unset", xs: "100%" },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "3px",
                  color: "text.primary",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1e3750",
                    "&:hover": { backgroundColor: "#010913" },
                    borderRadius: "5px",
                    cursor: "pointer",
                    p: "12px",
                  }}
                  onClick={() => handleDateChange("departure", -1)}
                >
                  <ArrowBackIosRoundedIcon sx={{ fontSize: "24px" }} />
                </Box>

                <Typography
                  variant='subtitle1'
                  align='center'
                  sx={{ flex: 1 }}
                  ref={departInputRef}
                  onClick={handleClickDepart}
                >
                  {formattedDepartureDate
                    ? formattedDepartureDate
                    : "Departure date"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1e3750",
                    "&:hover": { backgroundColor: "#010913" },
                    borderRadius: "5px",
                    cursor: "pointer",
                    p: "12px",
                  }}
                  onClick={() => handleDateChange("departure", 1)}
                >
                  <ArrowForwardIosRoundedIcon sx={{ fontSize: "24px" }} />
                </Box>
              </Grid>
              <Grid item sx={{ display: { sm: "unset", xs: "none" } }}>
                <FiberManualRecordIcon
                  sx={{ color: "text.primary", fontSize: "0.4rem" }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  width: { sm: "unset", xs: "100%" },
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "3px",
                  color: "text.primary",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1e3750",
                    "&:hover": { backgroundColor: "#010913" },
                    borderRadius: "5px",
                    cursor: "pointer",
                    p: "12px",
                  }}
                  onClick={() => handleDateChange("return", -1)}
                >
                  <ArrowBackIosRoundedIcon sx={{ fontSize: "24px" }} />
                </Box>

                <Typography
                  variant='subtitle1'
                  align='center'
                  sx={{ color: "text.primary" }}
                  ref={returnInputRef}
                  onClick={handleClickReturn}
                >
                  {formattedReturnDate ? formattedReturnDate : "Return date"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1e3750",
                    "&:hover": { backgroundColor: "#010913" },
                    borderRadius: "5px",
                    cursor: "pointer",
                    p: "12px",
                  }}
                  onClick={() => handleDateChange("return", 1)}
                >
                  <ArrowForwardIosRoundedIcon sx={{ fontSize: "24px" }} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {/* <ReusableDatePicker
            anchorEl={anchorEl}
            handleClose={() => setAnchorEl(null)}
            departInputRef={departInputRef}
            returnInputRef={returnInputRef}
          /> */}
        </Grid>

        {showInputs && (
          <Box sx={{ width: "100%", mt: "30px" }}>
            <ReturnSearchBar />
          </Box>
        )}
        {/* {showInputs && (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              width: "100vw",
              marginLeft: 0,
              paddingLeft: "220px",
              paddingRight: "200px",
              backgroundColor: "#05203c",
              paddingBottom: "20px",
              paddingTop: "50px",
              boxSizing: "border-box",
              zIndex: 10,
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "10px",
                gap: "5px",
              }}
            >
              <Input
                value={`${newOrigin.city} (${newOrigin.code}), ${newOrigin.country}`}
                placeholder='From'
                disableUnderline
                sx={{
                  ...inputStyle,
                  borderRadius: "13px 0px 0px 13px",
                  width: "340px",
                }}
              />

              <Autocomplete
                freeSolo
                options={cities}
                getOptionLabel={(option) =>
                  option && option.city && option.code
                    ? `${option.city} (${option.code})`
                    : ""
                }
                filterOptions={(options, state) => {
                  const inputValue = state.inputValue.trim().toLowerCase();
                  if (inputValue === "") {
                    return options.slice(0, 5);
                  }
                  return options.filter(
                    (option) =>
                      option.city.toLowerCase().includes(inputValue) ||
                      option.code.toLowerCase().includes(inputValue) ||
                      option.country.toLowerCase().includes(inputValue)
                  );
                }}
                onChange={(event, value) => {
                  if (value) {
                    dispatch(setTo(value));
                  }
                }}
                value={newDestination}
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
                        {option.city} ({option.code})
                      </div>
                      <div style={{ fontSize: "12px", color: "#5a5a5a" }}>
                        {option.country}
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
                      style: {
                        border: "1px solid #ccc",
                        backgroundColor: "white",
                        padding: "20px 15px",
                        color: "black",
                        cursor: "pointer",
                        height: "74.5px",
                      },
                    }}
                    placeholder='To'
                    variant='standard'
                    sx={{
                      width: "340px",
                      "& .MuiAutocomplete-input": {
                        padding: "0 !important",
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
                sx={{ width: "340px" }}
              />

              <Input
                placeholder='Depart Add date'
                value={inputFormattedDepartureDate}
                disableUnderline
                sx={{ ...inputStyle }}
              />

              <Input
                placeholder='Return Add date'
                value={inputFormattedReturnDate}
                disableUnderline
                sx={{ ...inputStyle }}
              />

              <ClickAwayListener
                onClickAway={() => dispatch(setTravellersOpen(false))}
              >
                <Box sx={{ position: "relative" }}>
                  <Input
                    placeholder='Travellers and cabin class'
                    disableUnderline
                    onClick={handleTravellersInputClick}
                    value={travellersLabel}
                    sx={{
                      ...inputStyle,
                      borderRadius: "0px 10px 10px 0px",
                      marginRight: "15px",
                    }}
                  />

                  {travellersOpen && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        zIndex: 9999,
                      }}
                    >
                      <HomeTravellersDropDown cabinClass={cabinClass} />
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>

              <Button
                variant='contained'
                sx={{
                  marginLeft: "10px",
                  padding: "25px 20px",
                  backgroundColor: "#0062e3",
                  textTransform: "none",
                  borderRadius: "10px",
                  "&:hover": { backgroundColor: "#024daf" },
                }}
              >
                Search
              </Button>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 0.2fr)",
                gap: "5px",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
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
                label='Add nearby airports'
                componentsProps={{
                  typography: {
                    fontSize: "15px",
                    color: "white",
                    marginRight: "20px",
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
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
                label='Direct flights only'
                componentsProps={{
                  typography: {
                    fontSize: "15px",
                    color: "white",
                    marginRight: "20px",
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
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
                label='Other option'
                sx={{ display: "inline-flex" }}
                componentsProps={{
                  typography: {
                    fontSize: "15px",
                    color: "white",
                    marginRight: "20px",
                  },
                }}
              />
            </Box>
          </Box>
        )} */}
      </Container>
    </Box>
  );
};

export default FlightSearchUI;
