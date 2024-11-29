import React, { useEffect, useRef, useMemo } from "react";
import {
  Box,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { calendarHide } from "./Slices/ReusableCalendar";
import { setDepartureDate, setReturnDate } from "./Slices/dateStore";
import { setCurrentMonth, updateMonth } from "./Slices/singleMonthSlice";
import { styled } from '@mui/material/styles';

const CustomStaticDatePicker = styled(StaticDatePicker)({
  '& .MuiPickersCalendarHeader-root': {
    display: 'none',
  },
  '& .MuiDayCalendar-weekDayLabel': {
    color: "black"
  },
  '& .MuiPickersDay-root': {
    color: "black"
  },
  '& .MuiPickersDay-root.Mui-selected': {
    backgroundColor: 'primary.main',
    color: '#ffffff',
  },
});

const ReusableDatePicker = ({ departInputRef, returnInputRef, calendarPosition }) => {
  const isCalendarVisible = useSelector((state) => state.CalendarVisible.isCalendarVisible);
  const activeInput = useSelector((state) => state.CalendarVisible.activeInput);
  const currentMonth = useSelector((state) => state.singleMonth.currentMonth);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !(departInputRef.current.contains(event.target) || 
          returnInputRef.current.contains(event.target) ||
          (selectRef.current && selectRef.current.contains(event.target)))
      ) {
        dispatch(calendarHide());
      }
    };

    if (isCalendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible, departInputRef, returnInputRef, dispatch]);

  const handleDateChange = (date) => {
    const selectedTimestamp = date.getTime();

    if (activeInput === "depart" && departInputRef.current) {
      dispatch(setDepartureDate(selectedTimestamp));
      departInputRef.current.value = date?.toLocaleDateString();
    } else if (activeInput === "return" && returnInputRef.current) {
      dispatch(setReturnDate(selectedTimestamp));
      returnInputRef.current.value = date?.toLocaleDateString();
    }
    dispatch(calendarHide());
  };

  const handleMonthChange = (monthChange) => {
    dispatch(updateMonth(monthChange));
  };

  
  const months = useMemo(() => {
    const monthsList = [];
    const startDate = new Date(currentMonth);
    startDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
      monthsList.push(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
    }
    return monthsList;
  }, [currentMonth]);

  const handleMonthSelect = (event) => {
    const selectedMonthString = event.target.value;
    const [selectedMonthName, selectedYear] = selectedMonthString.split(' ');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = monthNames.indexOf(selectedMonthName);
    
    const newMonth = new Date(parseInt(selectedYear), monthIndex, 1);
    dispatch(setCurrentMonth(newMonth));
  };


  const isPreviousMonthDisabled =
  currentMonth.getFullYear() === new Date().getFullYear() &&
  currentMonth.getMonth() <= new Date().getMonth();
  
  const maxForward =
  currentMonth.getFullYear() === new Date().getFullYear() + 1 &&
  currentMonth.getMonth() === new Date().getMonth();

  

  return (
    <Box
      ref={calendarRef}
      sx={{
        position: 'absolute',
        top: `${calendarPosition.top}px`,
        left: `${calendarPosition.left}px`,
        maxWidth: "300px",
        width: "100%",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "16px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "8px",
          borderBottom: "1px solid #e0e0e0",
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <IconButton onClick={() => handleMonthChange(-1)} disabled={isPreviousMonthDisabled}>
          <ArrowLeftIcon />
        </IconButton>
        <Select
          ref={selectRef}
          value={currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          onChange={handleMonthSelect}
          variant="standard"
          MenuProps={{
            disableScrollLock: true,
            
            onClose: (event) => {
              event.stopPropagation();
            }
          }}
          sx={{
            fontSize: "15px",
            fontWeight: "600",
            textAlign: 'center',
            color:"black",
            margin: '0 8px',
            minWidth: '150px',
            '& .MuiSelect-select': {
              textAlign: 'center'
            },
          }}
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={month}>{month}</MenuItem>
          ))}
        </Select>
        <IconButton onClick={() => handleMonthChange(1)} disabled={maxForward}>
          <ArrowRightIcon />
        </IconButton>
      </Box>

      <CustomStaticDatePicker
        displayStaticWrapperAs="desktop"
        value={currentMonth}
        onChange={handleDateChange}
        disablePast={true}
        minDate={new Date()}
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        
        componentsProps={{
          actionBar: {
            actions: ['cancel']
          },
        }}
        renderInput={(params) => null}
      />
    </Box>
  );
};

export default ReusableDatePicker;