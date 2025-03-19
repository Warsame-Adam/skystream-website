import React, { useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Menu,
  Grid,
  IconButton,
  Divider,
  styled,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import { useDispatch, useSelector } from "react-redux";
import {
  setDepartureDate,
  setReturnDate,
  setIsSelectingDepartDate,
} from "./Slices/dateStore";
import { updateMonths } from "./Slices/monthsSlice.js";

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
    console.log(departureDate, returnDate);
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
        <Grid item sm={6} xs={12} sx={{ height: "auto" }}>
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
        <Grid item sm={6} xs={12} sx={{ height: "auto" }}>
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
              console.log(date);
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

const searchButtonStyle = {
  backgroundColor: "primary.main",
  padding: { md: "23px 20px", xs: "10px" },
  borderRadius: "10px",
  color: "text.primary",
  "&:hover": { backgroundColor: "#024daf" },
  "&.Mui-disabled": {
    backgroundColor: "primary.main",
    color: "text.primary",
  },
  minWidth: "70px",
};
export default CalandarMenu;
