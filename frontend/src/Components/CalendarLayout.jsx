import React, { useEffect, useMemo, useRef, useState } from "react"
import { Input, AppBar, Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, Grid, TextField, ClickAwayListener  } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setFirstMonth, setSecondMonth, updateMonths } from "./Slices/monthsSlice.js";
import { hideCalendar } from "./Slices/calendarVisible.js";
import { setDepartureDate, setReturnDate, setIsSelectingDepartDate } from "./Slices/dateStore.js"







const CustomStaticDatePicker = styled(StaticDatePicker)({

'& .MuiDateCalendar-root': {
  minHeight: '420px', 
  height: 'auto',
  overflow: 'visible',
},


'& .MuiPickersSlideTransition-root': {
  height: '100%',
  overflow: 'visible',
},


'& .MuiDayCalendar-weekDayLabel': {
  height: '44px', 
  width: "50px", 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px', 
  fontWeight: '500',
  color: 'black',
  margin: '0', 
},


'& .MuiDayCalendar-weekContainer': {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around', 
  marginBottom: '20px', 
  gap: '8px',
},


'& .MuiPickersDay-root': {
  height: '44px', 
  width: '38px', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px', 
  borderRadius: '50%',
  fontWeight: 'bold',
  color: 'black',
  margin: '0',
  
},


'& .MuiPickersCalendarHeader-root': {
  display: 'none',
},



  

  

  
  
  
  
  



});



const CalandarLayout = () => {
  const firstMonth = useSelector((state) => state.months.firstMonth);
  const secondMonth = useSelector((state) => state.months.secondMonth);
  const isCalendarVisible = useSelector((state) => state.visible.isCalendarVisible);
  const isSelectingDepartDate = useSelector((state) => state.dates.isSelectingDepartDate);
  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);

  

  const dispatch = useDispatch()
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      
      if (calendarRef.current) {
        
        
        const isClickInsideCalendar = calendarRef.current.contains(event.target);
        const isArrowButton = event.target.closest('.MuiIconButton-root');
        const isDateElement = event.target.closest('.MuiPickersDay-root');
        
      
        if (!isClickInsideCalendar && !isArrowButton && !isDateElement) {
          if (isCalendarVisible) {
            dispatch(hideCalendar());
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarVisible, dispatch]);


  
  

  
  
  if (!firstMonth || !secondMonth) {
    return <div>Loading...</div>;
  }


  

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
  

  const isPreviousMonthDisabled = firstMonth.getMonth() === new Date().getFullYear() && firstMonth.getMonth() < new Date().getMonth();
  const maxForward = secondMonth.getFullYear() === new Date().getFullYear() + 1 && secondMonth.getMonth() === new Date().getMonth();

  return (

    <Box
      ref={calendarRef}
      sx={{
        position: 'absolute',
        top: '345px',
        left: '575px',
        backgroundColor: 'white',
        zIndex: 9999,
        display: isCalendarVisible ? 'block' : 'none',
        padding: 4,
        width: '810px',
        height:"550px",
        margin: 'auto',
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "8px"
      }}
    >


      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <IconButton
            disabled={isPreviousMonthDisabled}
            onClick={() => handleMonthChange(-1)}
          >
            <ArrowBack />
          </IconButton>

          <IconButton onClick={() => handleMonthChange(1)} disabled={maxForward}>
            <ArrowForward />
          </IconButton>
        </Box>
        <Grid container spacing={3} alignItems="stretch" justifyContent="center">
          <Grid item xs={6} sx={{ height: 'auto', minHeight: '500px' }}>
            <Box>
              <Typography variant="h6">
                {firstMonth.toLocaleString('default', { month: "long" })}
              </Typography>
            </Box>
            <CustomStaticDatePicker
              disableHighlightToday={true}
              displayStaticWrapperAs="desktop"
              value={firstMonth}
              onChange={(date) => {
                handleDateChange(date);
              }}
              minDate={new Date()}
              renderInput={(params) => null}
              slotProps={{
                calendar: {
                  sx: {
                    height: 'auto', 
                    minHeight: '380px', 
                  },
                },
              }}
            
             
             
            

            
            />
          </Grid>
          <Grid item xs={6} sx={{ height: 'auto', minHeight: '500px' }}>
            <Box>
              <Typography variant="h6">
                {secondMonth.toLocaleString('default', { month: "long" })}
              </Typography>
            </Box>
            <CustomStaticDatePicker
              disableHighlightToday={false}
              displayStaticWrapperAs="desktop"
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
      </Box>
    </Box>
    
  )
}

export default CalandarLayout;