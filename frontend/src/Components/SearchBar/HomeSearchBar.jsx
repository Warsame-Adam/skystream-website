import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Box,
  Typography,
  Container,
  Autocomplete,
  TextField, 
  Popper
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import CloseIcon from "@mui/icons-material/Close";


import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  setDepartureDate,
  setReturnDate,
  clearDepartureDate,
  clearReturnDate,
  setIsSelectingDepartDate,
} from "../Slices/dateStore";
import { setTo } from "../Slices/flightSearchSlice";

import { showCalendar } from "../Slices/calendarVisible";
import CalandarLayout from "../CalendarLayout";



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














const HomeSearchbar = () => {
  const dispatch = useDispatch();
  const departureDate = useSelector((state) => state.dates.departureDate);
  const returnDate = useSelector((state) => state.dates.returnDate);
  
  const { from, to } = useSelector((state) => state.flightSearch);

  
  const [showCrossIcons, setShowCrossIcons] = useState(false);

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

  return (
    <Container sx={{transform:"translateX(-35px)" }}>

<Box sx={{
                            display: "flex",
                            marginTop:"-320px",
                            gap:0.5
                            
                            }}>
                            <Button 
                            sx={{
                                fontSize:"13.5px",
                                backgroundColor:"#05203c",
                                color:"white",
                                textTransform:"none",
                                '&:hover': {
                                    backgroundColor:"#154679"
                                },
                                border: "0.5px solid #6a7b8b",
                                borderRadius: "75px",
                                padding:"5px 15px",
                                mx: 0.5,}} 
                                variant="contained" startIcon={<FlightIcon sx={{width:"20px", height:"20px"}} />}>
                                    Flights
                            </Button>
                            <Button 
                            sx={{
                                fontSize:"13.5px",
                                backgroundColor:"#05203c",
                                color:"white",
                                textTransform:"none",
                                '&:hover': {
                                    backgroundColor:"#154679"
                                },
                                border: "0.5px solid #6a7b8b",
                                borderRadius: "75px",
                                padding:"5px 15px",
                            }} 
                            variant="contained" 
                            startIcon={<HotelIcon sx={{width:"17px", height:"20px"}} />}>
                                Hotels
                            </Button>
                        </Box>
      


      
      <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
        <Typography sx={{ fontSize: "30px", color: "white", fontWeight: "bold" }}>
          Millions of cheap flights. One simple search.
        </Typography>
      </Box>

      
      <Box sx={{ display: "flex", justifyContent:"flex-start", gap: 0.5,  }}>
        <Input   value={`${from.city} (${from.code}), ${from.country}`} placeholder="From" disableUnderline sx={{...inputStyle, borderRadius:"10px 0px 0px 10px", width:"242px", fontSize:"15px"}} />
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
          dispatch(setTo(value)); 
        }}
        value={to} 
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
            <FlightIcon style={{ color: "#5a5a5a", transform:"rotate(45deg)" }} />
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
            placeholder="To"
            variant="standard"
            sx={{
              width: "242px",
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
        sx={{ width: "242px" }}
      />


       

        


      
        <Box className="date-input" sx={{ position: "relative" }}>
          <Input
            placeholder="Depart Add date"
            disableUnderline
            value={formattedDepartureDate}
            onClick={handleClickDepart}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            sx={{...inputStyle, width:"210px"}}
          />
          {showCrossIcons && departureDate && (
            <CloseIcon onClick={handleClearDeparture} sx={crossIconStyle} />
          )}
        </Box>

        
        <Box className="date-input" sx={{ position: "relative" }}>
          <Input
            placeholder="Return Add date"
            disableUnderline
            value={formattedReturnDate}
            onClick={handleClickReturn}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            sx={{...inputStyle, width:"210px"}}
          />
          {showCrossIcons && returnDate && (
            <CloseIcon onClick={handleClearReturn} sx={crossIconStyle} />
          )}
        </Box>

        <Input
          placeholder="Travellers and cabin class"
          disableUnderline
          sx={{...inputStyle, borderRadius:"0px 10px 10px 0px", marginRight:"8px", width:"210px"}}
        />
        <Button variant="contained" sx={{...searchButtonStyle, textTransform:"none"}}>
          Search
        </Button>
      </Box>

      
      <CalandarLayout />
    </Container>
  );
};

const inputStyle = {
  border: "1px solid #ccc",
  
  backgroundColor: "background.paper",
  padding: "20px 15px",
  color: "black",
  cursor:"pointer",
  
  flex: "1 0 auto",
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
  width:"70px"
};

export default HomeSearchbar; 

