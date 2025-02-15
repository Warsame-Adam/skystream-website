import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  Button,
  Box,
  Typography,
  Container,
  Autocomplete,
  TextField,
  Popper,
  ClickAwayListener,
  Menu,
  styled,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setDepartureDate,
  setReturnDate,
  clearDepartureDate,
  clearReturnDate,
  setIsSelectingDepartDate,
} from "../Slices/dateStore";
import { setTo } from "../Slices/flightSearchSlice";
import {
  setAdults,
  setChildAges,
  setChildren,
  handleChangeTravellers,
  setTravellersOpen,
} from "../Slices/HomeTravellersddSlice";

import { showCalendar } from "../Slices/calendarVisible";

import HomeTravellersDropDown from "../HomeTravellersDropDown";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { updateMonths } from "../Slices/monthsSlice.js";

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

const CustomStaticDatePicker = styled(StaticDatePicker)({
  "& .MuiDateCalendar-root": {
    minHeight: "318px",
    height: "auto",
    overflow: "visible",
  },
  "& .MuiPickersCalendarHeader-root": {
    display: "none",
  },
  "& .MuiPickersSlideTransition-root": {
    height: "100%",
    overflow: "visible",
  },

  "& .MuiDayCalendar-header": {
    gap: "0",
  },
  "& .MuiDayCalendar-weekDayLabel": {
    height: "44px",
    width: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "500",
    color: "black",
    margin: "0",
  },

  "& .MuiDayCalendar-weekContainer": {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-around",
    marginBottom: "20px",
    gap: "0px",
  },
  [`& .MuiPickersDay-root`]: {
    minHeight: "36px",
    minWidth: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: 0,
    color: "#000",
    margin: "0px",
  },
  "& .MuiPickersDay-root.Mui-selected ": {
    backgroundColor: "transparent",
  },
  "& .MuiPickersDay-root.selected-range": {
    zIndex: 1,
    color: "#fff",
    paddingLeft: "3px",
    "& .MuiTouchRipple-root": {
      zIndex: "-1",
      borderRadius: "50%",
      backgroundColor: "#0062e3 !important",
      height: "36px",
      width: "36px",
      marginLeft: "4px",
    },
  },
  ["& .MuiPickersDay-root.selected-range-start"]: {
    background: "linear-gradient(to right, #fff 50%,#e3f0ff 50%)",
  },
  ["& .MuiPickersDay-root.selected-range-end"]: {
    background: "linear-gradient(to left, #fff 50%,#e3f0ff 50%)",
  },
});

const CalandarMenu = ({ anchorEl, handleClose }) => {
  const firstMonth = useSelector((state) => state.months.firstMonth);
  const secondMonth = useSelector((state) => state.months.secondMonth);
  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);
  const isSelectingDepartDate = useSelector(
    (state) => state.dates.isSelectingDepartDate
  );
  const dispatch = useDispatch();

  const handleMonthChange = (monthChange) => {
    dispatch(updateMonths({ monthChange }));
  };

  const handleDateChange = (date) => {
    const selectedTimestamp = date.getTime();

    if (departureDate && returnDate) {
      dispatch(setDepartureDate(selectedTimestamp));
      dispatch(setReturnDate(null));
      dispatch(setIsSelectingDepartDate(false));
    } else if (isSelectingDepartDate) {
      dispatch(setDepartureDate(selectedTimestamp));
      dispatch(setIsSelectingDepartDate(false));
    } else {
      if (departureDate && selectedTimestamp < departureDate) {
        dispatch(setDepartureDate(selectedTimestamp));
      } else {
        dispatch(setReturnDate(selectedTimestamp));
        dispatch(setIsSelectingDepartDate(true));
      }
    }
  };

  const isPreviousMonthDisabled =
    firstMonth.getMonth() === new Date().getFullYear() &&
    firstMonth.getMonth() < new Date().getMonth();
  const maxForward =
    secondMonth.getFullYear() === new Date().getFullYear() + 1 &&
    secondMonth.getMonth() === new Date().getMonth();

  useEffect(() => {
    const applyStyles = () => {
      // Get all the date elements
      const dateElements = document.querySelectorAll(".MuiPickersDay-root");

      dateElements.forEach((el) => {
        const timestamp = parseInt(el.getAttribute("data-timestamp"), 10);
        const d = new Date(departureDate);
        d.setHours(0, 0, 0, 0);
        const e = new Date(returnDate);
        e.setHours(0, 0, 0, 0);
        const start = d.getTime();
        const end = e.getTime();

        // Check if the date is between departure and return
        if (returnDate && timestamp > start && timestamp < end) {
          el.style.backgroundColor = "#e3f0ff";
        } else {
          el.style.backgroundColor = "transparent";
        }
        if (timestamp === start) {
          if (returnDate) {
            el.classList.add("selected-range", "selected-range-start");
          } else {
            el.classList.add("selected-range");
          }
        } else if (timestamp === end) {
          el.classList.add("selected-range", "selected-range-end");
        } else {
          el.classList.remove(
            "selected-range",
            "selected-range-start",
            "selected-range-end"
          );
        }
      });
    };
    // Apply styles after MUI renders
    const timeout = setTimeout(applyStyles, 50);

    // Cleanup on unmount or dependency change
    return () => clearTimeout(timeout);
  }, [departureDate, returnDate, firstMonth, anchorEl]);

  return (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      slotProps={{
        paper: {
          sx: {
            "&.MuiPaper-root": {
              mt: "3px",
              //top: "10px !important",
              left: "28% !important",
            },
          },
        },
      }}
    >
      <Grid
        container
        wrap={{ md: "nowrap", xs: "wrap" }}
        sx={{ p: "24px", gap: { lg: "80px", xs: "60px" } }}
        alignItems='stretch'
        justifyContent='center'
      >
        <Grid item xs={6} sx={{ height: "auto" }}>
          <Box sx={{ position: "relative", mb: "24px" }}>
            <Box sx={{ position: "absolute", top: "4px", left: "20px" }}>
              <IconButton
                disabled={isPreviousMonthDisabled}
                onClick={() => handleMonthChange(-1)}
                sx={{ p: 0, color: "#161616", background: "transparent" }}
              >
                <ArrowBackIosIcon fontSize='small' />
              </IconButton>
            </Box>
            <Typography
              variant='h6'
              align='center'
              sx={{ color: "#000", fontWeight: "bold" }}
            >
              {firstMonth.toLocaleString("default", { month: "long" })}
            </Typography>
          </Box>
          <CustomStaticDatePicker
            disableHighlightToday={true}
            displayStaticWrapperAs='desktop'
            value={firstMonth}
            onChange={(date) => {
              handleDateChange(date);
            }}
            minDate={new Date()}
            renderInput={(params) => null}
          />
        </Grid>
        <Grid item xs={6} sx={{ height: "auto" }}>
          <Box sx={{ position: "relative", mb: "24px" }}>
            <Box sx={{ position: "absolute", top: "4px", right: "20px" }}>
              <IconButton
                onClick={() => handleMonthChange(1)}
                disabled={maxForward}
                sx={{ p: 0, color: "#161616", background: "transparent" }}
              >
                <ArrowForwardIosIcon fontSize='small' />
              </IconButton>
            </Box>
            <Typography
              variant='h6'
              align='center'
              sx={{ color: "#000", fontWeight: "bold" }}
            >
              {secondMonth.toLocaleString("default", { month: "long" })}
            </Typography>
          </Box>

          <CustomStaticDatePicker
            disableHighlightToday={false}
            displayStaticWrapperAs='desktop'
            value={secondMonth}
            onChange={(date) => {
              handleDateChange(date);
            }}
            minDate={new Date()}
            renderInput={(params) => null}
            sx={{}}
          />
        </Grid>
      </Grid>

      <Divider />
      <Grid
        container
        alignItems='center'
        justifyContent='space-between'
        sx={{ flex: 1, p: "16px 24px" }}
      >
        <Grid item>
          <Typography variant='subtitle1' sx={{ color: "#000" }}>
            {returnDate
              ? "Search for return"
              : departureDate
              ? "Add a return date"
              : "Select a departure date"}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            sx={{
              ...searchButtonStyle,
              textTransform: "none",
              p: "12px 16px",
              width: "unset",
              fontWeight: 700,
              boxShadow: "none",
              borderRadius: "8px",
            }}
            onClick={handleClose}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
    </Menu>
  );
};
const HomeSearchbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpenDestinationPopup, setIsOpenDestinationPopup] = useState(false);

  const departureDateRef = useRef();
  const destinationRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const origin = useSelector((state) => state.flightSearch.from);
  const destination = useSelector((state) => state.flightSearch.to);

  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);

  const { adults, children, childAges, travellersOpen } = useSelector(
    (state) => state.travellers
  );

  const formatDateToYYMMDD = (date) => {
    const d = new Date(date);
    const year = String(d.getFullYear()).slice(-2);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const handleSearch = () => {
    const originCode = origin?.code || origin;
    const destinationCode = destination?.code || destination;

    const formattedDepDate = formatDateToYYMMDD(departureDate);
    const formattedRetDate = formatDateToYYMMDD(returnDate);

    const path = `/flights/${originCode}/${destinationCode}/${formattedDepDate}/${formattedRetDate}`;

    navigate(path);
  };

  const [showCrossIcons, setShowCrossIcons] = useState(false);

  const [cabinClass] = useState("Economy");

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

  const handleClickDepart = () => {
    setShowCrossIcons(true);
    dispatch(setIsSelectingDepartDate(true));
    dispatch(showCalendar());
  };

  const handleClickReturn = () => {
    setShowCrossIcons(true);
    dispatch(setIsSelectingDepartDate(false));
    dispatch(showCalendar());
  };

  const handleTravellersInputClick = () => {
    dispatch(setTravellersOpen(true));
  };

  return (
    <Container sx={{}}>
      <Box
        sx={{
          display: "flex",
          marginTop: "-320px",
          gap: 0.5,
        }}
      >
        <Button
          sx={{
            fontSize: "13.5px",
            backgroundColor: "#05203c",
            color: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#154679",
            },
            border: "0.5px solid #6a7b8b",
            borderRadius: "75px",
            padding: "5px 15px",
            mx: 0.5,
          }}
          variant='contained'
          startIcon={<FlightIcon sx={{ width: "20px", height: "20px" }} />}
        >
          Flights
        </Button>
        <Button
          sx={{
            fontSize: "13.5px",
            backgroundColor: "#05203c",
            color: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#154679",
            },
            border: "0.5px solid #6a7b8b",
            borderRadius: "75px",
            padding: "5px 15px",
          }}
          variant='contained'
          startIcon={<HotelIcon sx={{ width: "17px", height: "20px" }} />}
        >
          Hotels
        </Button>
      </Box>

      <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
        <Typography
          sx={{ fontSize: "30px", color: "white", fontWeight: "bold" }}
        >
          Millions of cheap flights. One simple search.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 0.5 }}>
        <Box sx={{ position: "relative" }}>
          <Typography
            variant='subtitle2'
            sx={{
              ...inputLableStyle,
            }}
          >
            From
          </Typography>
          <Input
            value={`${origin.city} (${origin.code}), ${origin.country}`}
            placeholder='From'
            disableUnderline
            sx={{
              ...inputStyle,
              borderRadius: "10px 0px 0px 10px",
              width: "242px",
            }}
          />
        </Box>
        <Box sx={{ position: "relative" }}>
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
            open={isOpenDestinationPopup}
            onOpen={() => setIsOpenDestinationPopup(true)}
            onClose={() => setIsOpenDestinationPopup(false)}
            ref={destinationRef}
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
                  style: {},
                  sx: {
                    ...inputStyle,
                  },
                }}
                placeholder='Country, city or airport'
                variant='standard'
                sx={{
                  width: "242px",
                  pb: "13.9px",
                  border: "1px solid #ccc",
                  backgroundColor: "background.paper",
                  "& .MuiAutocomplete-input": {
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
              width: "242px",

              "& .MuiAutocomplete-endAdornment": {
                right: "10px",
                bottom: "30%",
              },
            }}
          />
        </Box>
        <CalandarMenu
          anchorEl={anchorEl}
          handleClose={() => setAnchorEl(null)}
        />
        <Box className='date-input' sx={{ position: "relative" }}>
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
            sx={{ ...inputStyle, width: "210px", cursor: "pointer" }}
          />
          {showCrossIcons && departureDate && (
            <CloseIcon onClick={handleClearDeparture} sx={crossIconStyle} />
          )}
        </Box>

        <Box className='date-input' sx={{ position: "relative" }}>
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
            sx={{ ...inputStyle, width: "210px", cursor: "pointer" }}
          />
          {showCrossIcons && returnDate && (
            <CloseIcon onClick={handleClearReturn} sx={crossIconStyle} />
          )}
        </Box>
        {/* <Box className='date-input' sx={{ position: "relative" }}>
          <Input
            placeholder='Depart Add date'
            disableUnderline
            value={formattedDepartureDate}
            onClick={handleClickDepart}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            sx={{ ...inputStyle, width: "210px" }}
          />
          {showCrossIcons && departureDate && (
            <CloseIcon onClick={handleClearDeparture} sx={crossIconStyle} />
          )}
        </Box>

        <Box className='date-input' sx={{ position: "relative" }}>
          <Input
            placeholder='Return Add date'
            disableUnderline
            value={formattedReturnDate}
            onClick={handleClickReturn}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            sx={{ ...inputStyle, width: "210px" }}
          />
          {showCrossIcons && returnDate && (
            <CloseIcon onClick={handleClearReturn} sx={crossIconStyle} />
          )}
        </Box> */}

        <ClickAwayListener
          onClickAway={() => dispatch(setTravellersOpen(false))}
        >
          <Box sx={{ position: "relative" }}>
            <Typography
              variant='subtitle2'
              sx={{
                ...inputLableStyle,
                cursor: "pointer",
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
                borderRadius: "0px 10px 10px 0px",
                marginRight: "8px",
                width: "210px",
              }}
              onClick={handleTravellersInputClick}
              value={travellersLabel}
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
          onClick={handleSearch}
          disabled={!origin || !destination || !departureDate || !returnDate}
          variant='contained'
          sx={{ ...searchButtonStyle, textTransform: "none" }}
        >
          Search
        </Button>
      </Box>
    </Container>
  );
};

const inputLableStyle = {
  fontWeight: "700",
  position: "absolute",
  color: "#626971",
  px: "16px",
  pt: "14px",
  zIndex: 1,
};

const inputStyle = {
  border: "1px solid #ccc",
  backgroundColor: "background.paper",
  color: "#161616",
  cursor: "pointer",
  flex: "1 0 auto",
  fontWeight: 500,
  fontSize: "15px",
  p: "16px",
  pb: "13.9px",
  pt: "27px",
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
  backgroundColor: "#0062e3",
  padding: "25px 20px",
  borderRadius: "10px",
  "&:hover": { backgroundColor: "#024daf" },
  width: "70px",
};

export default HomeSearchbar;
