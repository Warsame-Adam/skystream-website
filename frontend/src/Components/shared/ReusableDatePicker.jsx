import React, { useEffect, useRef, useMemo } from "react";
import {
  Box,
  IconButton,
  Select,
  MenuItem,
  Menu,
  TextField,
} from "@mui/material";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useSelector, useDispatch } from "react-redux";
import { setDepartureDate, setReturnDate } from "../Slices/dateStore";
import { setCurrentMonth, updateMonth } from "../Slices/singleMonthSlice";
import { styled } from "@mui/material/styles";
import * as datefns from "date-fns";
const CustomStaticDatePicker = styled(StaticDatePicker)({
  "& .MuiDateCalendar-root": {
    minHeight: "348px",
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
  "& .MuiDayCalendar-header ": {
    gap: "8px",
    margin: "24px 0px",
    borderBottom: "1px solid #c2c9cd",
  },

  "& .MuiDayCalendar-weekDayLabel": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    color: "#161616",
    fontWeight: 400,
    margin: "0",
    p: "0 8px",
    lineHeight: "16px",
    height: "36px",
    width: "36px",
  },

  "& .MuiPickersLayout-contentWrapper": {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "white",
  },
  "& .MuiPickersFadeTransitionGroup-root": {
    height: "100%",
    overflow: "hidden",
  },
  "& .MuiDayCalendar-weekContainer": {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    // justifyContent: "space-around",
    marginBottom: "20px",
  },

  "& .MuiPickersDay-root": {
    margin: 0,
    fontSize: "14px",
    color: "#000",
    fontWeight: 700,
  },
  "& .MuiPickersDay-today": {
    border: "none !important",
    backgroundColor: "transparent",
    color: "#000",
  },
  "& .MuiPickersDay-root.Mui-selected": {
    border: "none",
    backgroundColor: "transparent",
    color: "#000",
  },
  "& .MuiPickersDay-root.selected-range": {
    zIndex: 1,
    color: "#fff",
    backgroundColor: "#0062e3 !important",
  },
});

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ReusableDatePicker = ({
  anchorEl,
  handleClose,
  returnInputRef,
  departInputRef,
}) => {
  const activeInput = useSelector((state) => state.CalendarVisible.activeInput);
  const { currentMonth: currentMonthIso } = useSelector(s => s.singleMonth);
const currentMonth = new Date(currentMonthIso);
  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const datePickerRef = useRef(null);
  const handleDateChange = (date) => {
    const selectedTimestamp = date.getTime();
    if (activeInput === "depart") {
      dispatch(setDepartureDate(selectedTimestamp));
      if (selectedTimestamp >= returnDate) {
        const daysDiff = new Date(selectedTimestamp + 9 * 24 * 60 * 60 * 1000);
        dispatch(setReturnDate(daysDiff.getTime()));
      }
      if (departInputRef?.current)
        departInputRef.current.value = date?.toLocaleDateString();
    } else if (activeInput === "return") {
      dispatch(setReturnDate(selectedTimestamp));
      if (returnInputRef?.current)
        returnInputRef.current.value = date?.toLocaleDateString();
    }
    handleClose();
    //dispatch(calendarHide());
  };
  useEffect(() => {
    const applyStyles = () => {
      const dateElements = document.querySelectorAll(".MuiPickersDay-root");
      dateElements.forEach((el) => {
        const timestamp = parseInt(el.getAttribute("data-timestamp"), 10);
        const d = new Date(departureDate);
        d.setHours(0, 0, 0, 0);
        const e = new Date(returnDate);
        e.setHours(0, 0, 0, 0);

        const start = d.getTime();
        const end = e.getTime();

        if (activeInput === "depart") {
          if (timestamp === start) {
            el.classList.add("selected-range");
          } else {
            el.classList.remove("selected-range");
          }
        } else {
          if (timestamp === end) {
            el.classList.add("selected-range");
          } else {
            el.classList.remove("selected-range");
          }
        }
      });
    };
    // Apply styles after MUI renders
    const timeout = setTimeout(applyStyles, 50);

    // Cleanup on unmount or dependency change
    return () => clearTimeout(timeout);
  }, [currentMonth, departureDate, returnDate, anchorEl]);
  
  const handleMonthChange = (monthChange) => {
    dispatch(updateMonth(monthChange));
  };

  const months = useMemo(() => {
    const monthsList = [];
    const startDate = new Date(currentMonth);
    startDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 12; i++) {
      const date = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + i,
        1
      );
      monthsList.push(
        date.toLocaleString("default", { month: "long", year: "numeric" })
      );
    }
    return monthsList;
  }, [currentMonth]);

  const handleMonthSelect = (event) => {
    const selectedMonthString = event.target.value;
    const [selectedMonthName, selectedYear] = selectedMonthString.split(" ");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = monthNames.indexOf(selectedMonthName);

    const newMonth = new Date(parseInt(selectedYear), monthIndex, 1);
    dispatch(setCurrentMonth(newMonth));
  };

  const isPreviousMonthDisabled =
     new Date(currentMonth).getFullYear() === new Date().getFullYear() &&
    new Date(currentMonth).getMonth() <= new Date().getMonth();

  const maxForward =
     new Date(currentMonth).getFullYear() === new Date().getFullYear() + 1 &&
    new Date(currentMonth).getMonth() === new Date().getMonth();

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
              border: ".0625rem solid #e0e3e5",
              boxShadow: "0 4px 14px 0 #25201f40",
              borderRadius: "8px",
              ml: { md: "-100px", xs: 0 },
              //top: "10px !important",
              // left: "21% !important",
            },
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
          boxSizing: "border-box",
          mt: "8px",
          px: "14px",
        }}
      >
        <IconButton
          onClick={() => handleMonthChange(-1)}
          disabled={isPreviousMonthDisabled}
          sx={{
            p: 0,
            color: "#161616",
          }}
        >
          <ArrowLeftRoundedIcon sx={{ fontSize: "3rem" }} />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Select
            native
            fullWidth
            size='small'
            variant='outlined'
            ref={selectRef}
            value={currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
            IconComponent={ArrowDropDownRoundedIcon}
            onChange={handleMonthSelect}
            MenuProps={{
              disableScrollLock: true,

              onClose: (event) => {
                event.stopPropagation();
              },
            }}
            sx={{
              fontSize: "15px",
              fontWeight: "400",
              textAlign: "center",
              color: "#000",
              minWidth: "150px",
              "& .MuiSelect-select": {
                textAlign: "center",
              },
              "&:hover.MuiOutlinedInput-root fieldset": {
                borderColor: "#c2c9cd",
              },
              "&:hover.Mui-focused.MuiOutlinedInput-root fieldset": {
                borderColor: "primary.main",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "2rem",
                mr: "-6px",
                color: "#161616",
              },
            }}
          >
            {months.map((month, index) => (
              <option style={{ color: "#000" }} key={index} value={month}>
                {month}
              </option>
            ))}
          </Select>
        </Box>
        <IconButton
          sx={{
            p: 0,
            color: "#161616",
          }}
          onClick={() => handleMonthChange(1)}
          disabled={maxForward}
        >
          <ArrowRightRoundedIcon sx={{ fontSize: "3rem" }} />
        </IconButton>
      </Box>

      <CustomStaticDatePicker
        ref={datePickerRef}
        displayStaticWrapperAs='desktop'
        value={currentMonth}
        onChange={handleDateChange}
        disablePast={true}
        minDate={
          activeInput === "depart" ? new Date() : new Date(departureDate)
        }
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        dayOfWeekFormatter={(date) => weekDays[datefns.getDay(date)]}
        
        sx={{ color: "pink" }}
      />
    </Menu>
  );
};

export default ReusableDatePicker;
