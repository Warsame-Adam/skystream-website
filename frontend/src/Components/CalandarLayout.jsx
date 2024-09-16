import React, { useEffect, useMemo, useRef, useState } from "react"
import {Input, AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box,Grid, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setFirstMonth, setSecondMonth, updateMonths} from "./Slices/monthsSlice.js";
import { hideCalendar } from "./Slices/calendarVisible.js";
import {setDepartureDate, setReturnDate,setIsSelectingDepartDate} from "./Slices/dateStore.js"






const CustomStaticDatePicker = styled(StaticDatePicker)({
    
    '& .MuiPickersCalendarHeader-root': {
        display: 'none',
    },

    '& .MuiDayCalendar-weekDayLabel': {
        color:"black"
    },
    '& .MuiPickersDay-root': {
        color:"black"
    },
    '& .MuiPickersDay-root.Mui-selected': {
        backgroundColor: 'primary.main', 
        color: '#ffffff', 
    },

    


  
});







const getNext12Months = () => {
    const months = [];
    const currentDate = new Date()

    for (let i = 0; i < 12; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
        months.push({
          month: date.toLocaleString('default', { month: 'long' }),
          year: date.getFullYear()
        });
      }
    
      return months;


    
}






const CalandarLayout = () => {

  const firstMonth = useSelector((state)=> state.months.firstMonth)
  const secondMonth = useSelector((state)=> state.months.secondMonth)
  const isCalendarVisible = useSelector((state) => state.visible.isCalendarVisible)
  const isSelectingDepartDate = useSelector((state) => state.dates.isSelectingDepartDate);
  const departureDate = useSelector((state) => state.dates.departureDate);
const returnDate = useSelector((state) => state.dates.returnDate);

const departureDateObjectMemo = useMemo(() => departureDate ? new Date(departureDate) : null, [departureDate]);
const returnDateObjectMemo = useMemo(() => returnDate ? new Date(returnDate) : null, [returnDate]);

console.log("Rendering DatePicker with departureDateObject:", departureDateObjectMemo);
console.log("Rendering DatePicker with returnDateObject:", returnDateObjectMemo);





  const dispatch = useDispatch()
  

 

  const [view, setView] = useState("Specific");

  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        dispatch(hideCalendar());
      }
    };

    if (isCalendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, isCalendarVisible]);



  if (!isCalendarVisible) {
    return null;
  };

  if (!firstMonth || !secondMonth) {
    return <div>Loading...</div>; 
}

 const months = getNext12Months();

  

  
  const handleMonthChange = (monthChange) => {
        dispatch(updateMonths({ monthChange }));
    };

    const handleDateChange = (date) => {
      const selectedTimestamp = date.getTime();  
      const selectedMonth = date.getMonth();  
      const selectedYear = date.getFullYear();  
  
      
      console.log("Raw Selected Date:", date);
      console.log("Timestamp:", selectedTimestamp);
      console.log("Month:", selectedMonth);
      console.log("Year:", selectedYear);
  
      if (departureDate && returnDate) {
          console.log('Setting Departure Date:', selectedTimestamp);
  
          dispatch(setDepartureDate(selectedTimestamp));
          dispatch(setReturnDate(null)); 
  
          dispatch(setIsSelectingDepartDate(false));
      } else if (isSelectingDepartDate) {
          console.log('Setting Departure Date:', selectedTimestamp);
  
          dispatch(setDepartureDate(selectedTimestamp));
          dispatch(setIsSelectingDepartDate(false));
      } else {
          console.log('Setting Return Date:', selectedTimestamp);
  
          dispatch(setReturnDate(selectedTimestamp));
          dispatch(setIsSelectingDepartDate(true));
      }
  
      console.log('Selected Date:', date);
  };

   
    
  
    



    
    

    const isPreviousMonthDisabled = firstMonth.getMonth() <= new Date().getMonth() && firstMonth.getFullYear === new Date().getFullYear

    



    return (
      <Box ref={calendarRef} sx={{ padding: 2, maxWidth: '800px', margin: 'auto' }}>
      <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", my:"2", marginRight:"20px"}}>
        <Button
          variant={view === 'specific' ? 'contained' : 'outlined'}
          onClick={() => setView('specific')}
          sx={{
            backgroundColor: view === 'specific' ? '#1976d2' : 'transparent',
            color: view === 'specific' ? '#fff' : '#1976d2',
          }}
        >
          Specific dates
        </Button>
        <Button
          variant={view === 'flexible' ? 'contained' : 'outlined'}
          onClick={() => setView('flexible')}
          sx={{
            backgroundColor: view === 'flexible' ? '#1976d2' : 'transparent',
            color: view === 'flexible' ? '#fff' : '#1976d2',
          }}
        >
          Flexible dates
        </Button>
      </Box>

      {view === 'specific' ? (
        <Box>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", mb:2}}>
            <IconButton
            disabled={isPreviousMonthDisabled}
             onClick={() => handleMonthChange(-1)}>
              <ArrowBack />
            </IconButton>

            <IconButton onClick={() => handleMonthChange(1)}>
              <ArrowForward />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
            {/* Render two months side by side */}
            <Grid item xs={6}>
              <Box>
                <Typography variant="h6">
                  {firstMonth.toLocaleString('default', {month:"long"})}
                  </Typography>
              </Box>
              <CustomStaticDatePicker
                disableHighlightToday={true}
              
                displayStaticWrapperAs="desktop"
                value={departureDateObjectMemo || null}
                onChange={(date) => { 
                  console.log("Date selected from DatePicker:", date);
                  handleDateChange(date)}}
                  minDate={new Date()}
                
                
                renderInput={(params) => null}
              />
            </Grid>
            <Grid item xs={6}>
            <Box>
                <Typography variant="h6">
                  {secondMonth.toLocaleString('default', {month:"long"})}
                  </Typography>
            </Box>
              <CustomStaticDatePicker
                disableHighlightToday={true}
                displayStaticWrapperAs="desktop"
                value={returnDateObjectMemo || null}
                onChange={(date) => { 
                  console.log("Date selected from DatePicker:", date);
                  handleDateChange(date)}}
                   
                
                
                renderInput={(params) => null}
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
        {months.map((monthInfo, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Button 
              variant="outlined" 
              sx={{ 
                width: "100%", 
                padding: "20px", 
                textAlign: "center", 
                display: "block", 
                backgroundColor: "#f5f5f5",
                borderColor: "#ccc",
                color: "#333",
                borderRadius: "10px",
                fontWeight: "bold"
              }}
            >
              <Typography variant="subtitle1">
                {monthInfo.year}
              </Typography>
              <Typography variant="h6">
                {monthInfo.month}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
  
      )}
      <Box mt={4}>
        <Button variant="contained" color="primary" fullWidth>
          Apply
        </Button>
      </Box>
    </Box>
  );


  





  
      
  
  
}

    

              



                
                
                
                        
      export default CalandarLayout;