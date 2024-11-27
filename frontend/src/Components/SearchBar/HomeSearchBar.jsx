import React, { useState, useEffect } from "react"
import {Input, AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { showCalendar } from "../Slices/calendarVisible";
import {  setDepartureDate,
    setReturnDate,
    clearDepartureDate,
    clearReturnDate,
    setIsSelectingDepartDate,
  } from '../Slices/dateStore';







const HomeSearchbar = () => {

    
    const dispatch = useDispatch();
    const departureDate = useSelector((state) => state.dates.departureDate);
    const returnDate = useSelector((state) => state.dates.returnDate);
    const isSelectingDepartDate = useSelector((state) => state.dates.isSelectingDepartDate);

    useEffect(() => {
      const currentDate = new Date();
      const departure = new Date(currentDate.setDate(currentDate.getDate() + 7)); 
      dispatch(setDepartureDate(departure.toDateString()));

      const returnD = new Date(departure);
      returnD.setDate(departure.getDate() + 7); 
      dispatch(setReturnDate(returnD.toDateString()));
  }, [dispatch]);


    const formattedDepartureDate = departureDate 
  ? format(new Date(departureDate), 'dd/MM/yyyy') 
  : ''; 

const formattedReturnDate = returnDate 
  ? format(new Date(returnDate), 'dd/MM/yyyy') 
  : ''; 


    const handleClearDeparture = () => {
        dispatch(clearDepartureDate());
      };
    
      const handleClearReturn = () => {
        dispatch(clearReturnDate());
      };
    
      const handleClickDepart = () => {
        dispatch(setIsSelectingDepartDate(true));
        handleClick(); 
      };

      const handleClickReturn = () => {
        console.log('Clicking Return. Current Departure Date:', departureDate); 
        if (!departureDate) {
          
          dispatch(setIsSelectingDepartDate(true));
        } else {
          
          dispatch(setIsSelectingDepartDate(false));
        }
        handleClick();  
      };
    
      
    
      const handleClick = () => {
        dispatch(showCalendar());
      };
    
      

return (
        <>
        <Box sx={{display: "flex",
            alignItems:"center",
            mt:-31,
            mx:4
        }}>
            <Button 
              sx={{
                backgroundColor:"primary.dark",
                color:"text.primary",
                textTransform:"none",
                '&:hover': {
                    backgroundColor:"rgba(21,70,121,255)"
                },
                border: "0.5px solid white",
                borderRadius: "75px",
                mx: 0.5

               }} 
              variant="contained" startIcon={<FlightIcon />}>
                Flights
              </Button>
              <Button 
              sx={{
                backgroundColor:"primary.dark",
                color:"text.primary",
                textTransform:"none",
                '&:hover': {
                    backgroundColor:"primary.light"
                },
                border: "0.5px solid white",
                borderRadius: "75px"

              }} 
              variant="contained" 
              startIcon={<HotelIcon />}>
                Hotels
            </Button>
            </Box>
            <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        
        
        
      }}
    >
        <Input
        placeholder="From"
        disableUnderline 
        sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor:"background.paper",
            color:"black",
            marginRight:"5px",
            padding: '20px 15px',
            '&:focus': {
                borderColor: 'primary.main',
            },
            }}
        />

<Input
        placeholder="To"
        disableUnderline 
        sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor:"background.paper",
            color:"black",
            marginRight:"5px",
            padding: '20px 15px',
            '&:focus': {
                borderColor: 'primary.main',
            },
            }}
        />
      <Box>
        <Input
        placeholder="Depart Add date"
        
        disableUnderline
        sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor:"background.paper",
            color:"black",
            marginRight:"5px",
            padding: '20px 15px',
            '&:focus': {
                borderColor: 'primary.main',
            },
            }}
            value={formattedDepartureDate}
        onClick = {handleClickDepart}
      
        endAdornment={
          departureDate ? (
            <button onClick={handleClearDeparture}>✕</button>
          ) : null
        }

    
            
    
        />
<Input
        placeholder="Return Add date"
        disableUnderline 
        sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor:"background.paper",
            color:"black",
            marginRight:"5px",
            padding: '20px 15px',
            '&:focus': {
                borderColor: 'primary.main',
            },
            }}
            value={formattedReturnDate}
            onClick = {handleClickReturn}
          
          
            endAdornment={
              returnDate ? (
                <button onClick={handleClearReturn}>✕</button>
              ) : null
            }
            />


     </Box>

        <Input
        placeholder="Travellers and cabin class"
        disableUnderline 
        sx={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor:"background.paper",
            color:"black",
            marginRight:"5px",
            padding: '20px 15px',
            '&:focus': {
                borderColor: 'primary.main',
            },
            }}

          
            
        />


        

        



      
      <Button variant="contained" color="primary">
        Search
      </Button>
    </Box>
            </>
            
            

          



    )
}


export default HomeSearchbar;