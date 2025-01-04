import React, { useEffect, useRef, useState } from "react"
import { AppBar, Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel, Popper, Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setDepartureDate, setReturnDate } from '../Slices/dateStore';
import { calendarShow, setActiveInput } from "../Slices/ReusableCalendar";
import { setTo } from "../Slices/flightSearchSlice";
import { format } from 'date-fns';
import ReusableDatePicker from '../ReusableDatePicker'; 
import FlightIcon from '@mui/icons-material/Flight';


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





const ReturnSearchBar = () => {
    const dispatch = useDispatch();
    const departureDate = useSelector((state) => state.dates.departureDate);
    const returnDate = useSelector((state) => state.dates.returnDate);
    const searchType = useSelector((state) => state.search.searchType);
    const isCalendarVisible = useSelector((state) => state.CalendarVisible.isCalendarVisible);
    const activeInput = useSelector((state) => state.CalendarVisible.activeInput);
    const { from, to } = useSelector((state) => state.flightSearch);

 
    const handleClickDepart = () => {
        dispatch(setActiveInput("depart"));
        handleClick();
    }

    const handleClickReturn = () => {
        dispatch(setActiveInput("return"));
        handleClick();
    }

    const handleClick = () => {
        dispatch(calendarShow());
    };

    useEffect(() => {
        const currentDate = new Date();
        const departure = new Date(currentDate.setDate(currentDate.getDate() + 7)); 
        dispatch(setDepartureDate(departure.getTime()));

        const returnD = new Date(departure);
        returnD.setDate(departure.getDate() + 7); 
        dispatch(setReturnDate(returnD.getTime()));
    }, [dispatch]);

    const formattedDepartureDate = departureDate 
        ? format(new Date(departureDate), 'dd/MM/yyyy') 
        : ''; 
  
    const formattedReturnDate = returnDate 
        ? format(new Date(returnDate), 'dd/MM/yyyy') 
        : ''; 

    const departInputRef = useRef(null);
    const returnInputRef = useRef(null);

    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

    const handlePositionCalendar = () => {
        if (activeInput === "depart" && departInputRef.current) {
            const { top, left, height } = departInputRef.current.getBoundingClientRect();
            setCalendarPosition({ top: top + height - 300, left: left - 420 });
        } else if (activeInput === "return" && returnInputRef.current) {
            const { top, left, height } = returnInputRef.current.getBoundingClientRect();
            setCalendarPosition({ top: top + height - 300, left: left - 340 });
        }
    }; 
    
    
    

    useEffect(() => {
        handlePositionCalendar();
    }, [activeInput]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }} >
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '10px', alignItems: "center" }}>
                <Input value={`${from.city} (${from.code}),  U.K`}   placeholder="From" disableUnderline sx={{ ...inputStyle, borderRadius: "10px 0px 0px 10px", }} />
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
                height: "72px",
              },
            }}
            placeholder="To"
            variant="standard"
            sx={{
              width: "194.98px",
              
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
        sx={{ width: "194.98px" }}
      />











                <Input 
                    placeholder="Depart Add date" 
                    disableUnderline sx={{ ...inputStyle }}
                    value={formattedDepartureDate} 
                    ref={departInputRef} 
                    onClick={handleClickDepart}
                />
                <Input 
                    placeholder="Return Add date" 
                    disableUnderline 
                    sx={{ ...inputStyle }}
                    value={formattedReturnDate}
                    ref={returnInputRef}
                    onClick={handleClickReturn}
                    disabled={searchType === "oneway"} 
                />
                <Input placeholder="Travellers and cabin class" disableUnderline sx={{ ...inputStyle, borderRadius: "0px 10px 10px 0px", marginRight: "15px" }} />
                <Button variant="contained" sx={{ marginLeft: "10px", padding: "25px 20px", backgroundColor: "#0062e3", pointer: "clicker", textTransform: "none", borderRadius: "10px", '&:Hover': { backgroundColor: "#024daf" } }}>Search</Button>
           
                {isCalendarVisible && (
                    <ReusableDatePicker
                        departInputRef={departInputRef}
                        returnInputRef={returnInputRef}
                        calendarPosition={calendarPosition}
                    />
                )}
            </Box>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 0.2fr)",
                gap: "5px",
                alignItems: "center",
                marginLeft: "10px"
            }}>
                <FormControlLabel control={<Checkbox sx={{ color: '#626971', marginRight: "10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': { backgroundColor: "white", width: "18px", height: "10px" } }} />} label="Add nearby airports" componentsProps={{ typography: { fontSize: "15px", color: "white", marginRight: "20px" } }} />
                <FormControlLabel control={<Checkbox sx={{ color: '#626971', marginRight: "10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': { backgroundColor: "white", width: "18px", height: "10px" } }} />} label="Direct flights only" componentsProps={{ typography: { fontSize: "15px", color: "white", marginRight: "20px" } }} />
                <FormControlLabel control={<Checkbox sx={{ color: '#626971', marginRight: "10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': { backgroundColor: "white", width: "18px", height: "10px" } }} />} label="Other option" sx={{ display: "inline-flex" }} componentsProps={{ typography: { fontSize: "15px", color: "white", marginRight: "20px" } }} />
            </Box>
        </Box>
    );
};

const inputStyle = {
    backgroundColor: "background.paper",
    color: "black",
    margin: "2px",
    padding: '20px 15px',
    '&:focus': {
        borderColor: 'primary.main',
    },
};

export default ReturnSearchBar;
