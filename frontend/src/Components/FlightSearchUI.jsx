import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import {setDepartureDate, setReturnDate,} from "./Slices/dateStore.js";
import { setAdults, setChildAges, setChildren, handleChangeTravellers, setTravellersOpen } from "./Slices/HomeTravellersddSlice";
import { setTo } from "./Slices/flightSearchSlice";

import {  setShowInputs } from './Slices/FlightSearchUI.js';
import { Container, Box, Typography, Button, Input, Checkbox, FormControlLabel, ClickAwayListener, Autocomplete, Popper, TextField } from '@mui/material';
import { format } from "date-fns";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FlightIcon from "@mui/icons-material/Flight";
import HomeTravellersDropDown from "./HomeTravellersDropDown";


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




const inputStyle = {
    backgroundColor: "background.paper",
    color: "black",
    margin: "2px",
    padding: '20px 15px',
    '&:focus': {
        borderColor: 'primary.main',
    },
};

const FlightSearchUI = () => {
    const dispatch = useDispatch();

    const showInputs = useSelector((state) => state.flightSearchui.showInputs);

    const newOrigin  = useSelector((state) => state.flightSearch.from);
      const newDestination = useSelector((state) => state.flightSearch.to);
     const CurrentDepartureDate = useSelector((state) => state.dates.departureDate);
      const CurrentReturnDate = useSelector((state) => state.dates.returnDate);

    useEffect(() => {
      dispatch(setShowInputs(false));
      dispatch(setTravellersOpen(false));
    }, [])


    const {origin, destination, departureDate, returnDate} = useParams();

    

     

      useEffect(() => {

        dispatch(setDepartureDate(departureDate));
        dispatch(setReturnDate(returnDate));
        
        const foundCity = cities.find(city => city.code === destination);
      
      
        if (foundCity) {
          dispatch(setTo(foundCity));
        } else {
        
          dispatch(setTo({ city: "", code: destination, country: "" }));
        }
      }, [ destination, departureDate, returnDate]);
      

    const {adults, children, childAges, travellersOpen} = useSelector((state) => state.travellers )

    const [cabinClass] = useState("Economy"); 

    function parseYyMmDd(str) {
      
      if (!str || str.length !== 6) return null;
    
      const yy = parseInt(str.slice(0, 2), 10);  
      const mm = parseInt(str.slice(2, 4), 10); 
      const dd = parseInt(str.slice(4, 6), 10); 
    
     
      const fullYear = 2000 + yy; 
    
      
      return new Date(fullYear, mm - 1, dd);
    };


    function formatArrowDate(dateObj) {
      return format(dateObj, "EEE, d MMM");
    };


    function formatInputDate(dateObj) {
      if (!dateObj) return "";
      return format(dateObj, "dd/MM/yyyy");
    };


    const formatDateToYYMMDD = (date) => {
      const d = new Date(date);
      const year = String(d.getFullYear()).slice(-2); 
      const month = String(d.getMonth() + 1).padStart(2, '0'); 
      const day = String(d.getDate()).padStart(2, '0'); 
      return `${year}${month}${day}`;
    };

    function toYyMmDd(dateObj) {
      const yy = dateObj.getFullYear() % 100; 
      const mm = dateObj.getMonth() + 1;      // 1-12
      const dd = dateObj.getDate();           // 1-31
    
      
      const yyStr = String(yy).padStart(2, "0");
      const mmStr = String(mm).padStart(2, "0");
      const ddStr = String(dd).padStart(2, "0");
    
      return yyStr + mmStr + ddStr; 
    };

    const handleDateChange = (type, step) => {
      let oldStr =
        type === "departure" ? CurrentDepartureDate : CurrentReturnDate;
      
      // 1) Parse
      const oldDate = parseYyMmDd(oldStr);
      if (!oldDate) return; 
    
      
      oldDate.setDate(oldDate.getDate() + step);
    
      
      const newStr = toYyMmDd(oldDate);
    
      
      if (type === "departure") {
        dispatch(setDepartureDate(newStr));
      } else {
        dispatch(setReturnDate(newStr));
      }
    };

  const depDateObj = parseYyMmDd(CurrentDepartureDate);
const retDateObj = parseYyMmDd(CurrentReturnDate);

const formattedDepartureDate = depDateObj 
  ? formatArrowDate(depDateObj) 
  : "Departure date";

const formattedReturnDate = retDateObj 
  ? formatArrowDate(retDateObj) 
  : "Return date";

const inputFormattedDepartureDate = depDateObj 
  ? formatInputDate(depDateObj)
  : "";

const inputFormattedReturnDate = retDateObj 
  ? formatInputDate(retDateObj)
  : "";
    
  


















    

    







    

     
   




    

    const travellersLabel = React.useMemo(() => {
        const total = adults + children;
        if (total === 1 && adults === 1) {
          return "1 Adult, " + cabinClass; 
        } else {
          return `${total} Travellers, ${cabinClass}`;
        }
      }, [adults, children, cabinClass]);

    const handleTravellersInputClick = () => {
        dispatch(setTravellersOpen(true)); 
      };

    return (
        <Container sx={{ marginTop: "-70px", marginLeft: "200px" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
                <Box
                    sx={{
                        width: "970px",
                        height: "50px",
                        backgroundColor: "#1e3750",
                        "&:hover": { backgroundColor: "#010913" },
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "10px",
                        flexShrink: 0,
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        console.log('Current showInputs:', showInputs);
                        dispatch(setShowInputs(!showInputs));
                        console.log('After dispatch:', !showInputs);
                    }}
                >
                    <Box
                        sx={{
                            width: "35px",
                            height: "35px",
                            backgroundColor: "#0062e3",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "10px",
                            borderRadius: "5px",
                            "&:hover": { backgroundColor: "#024daf" },
                        }}
                    >
                        <SearchIcon
                            sx={{
                                width: "20px",
                                height: "20px",
                                color: "white",
                            }}
                        />
                    </Box>

                    <Typography
                        sx={{
                            color: "white",
                            marginLeft: "20px",
                            flexGrow: 1,
                            textAlign: "center", 
                        }}
                    >
                    {`${newOrigin.city} (${newOrigin.code}) . ${travellersLabel} `}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between", 
                        alignItems: "center",
                        width: "250px",
                        marginLeft: "10px", 
                        flexShrink: 0, 
                    }}
                >
                    
                    <Box
                        sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#1e3750",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#010913" },
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                        onClick={() => handleDateChange('departure', -1)}
                    >
                        <ArrowBackIosIcon sx={{ color: "white", fontSize: "19px" }} />
                    </Box>

                    
                    <Typography sx={{ color: "white", margin: "0 20px" }}>
                        {formattedDepartureDate ? formattedDepartureDate : 'Departure date'}
                    </Typography>

                  
                    <Box
                        sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#1e3750",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#010913" },
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleDateChange('departure', 1)}
                    >
                        <ArrowForwardIosIcon sx={{ color: "white", fontSize: "19px" }} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between", 
                        alignItems: "center",
                        width: "250px",
                        marginLeft: "10px",
                        flexShrink: 0, 
                    }}
                >
                    
                    <Box
                        sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#1e3750",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#010913" },
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                        onClick={() => handleDateChange('return', -1)}
                    >
                        <ArrowBackIosIcon sx={{ color: "white", fontSize: "19px" }} />
                    </Box>

                    
                    <Typography sx={{ color: "white", margin: "0 20px" }}>
                        {formattedReturnDate ? formattedReturnDate : 'Return date'}
                    </Typography>

                  
                    <Box
                        sx={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#1e3750",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#010913" },
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                        onClick={() => handleDateChange('return', 1)}
                    >
                        <ArrowForwardIosIcon sx={{ color: "white", fontSize: "19px" }} />
                    </Box>
                </Box>
            </Box>

            {showInputs && (
                <Box sx={{  position: 'absolute',
                    left: 0,
                    right: 0,
                    width: '100vw', 
                    marginLeft: 0, 
                    paddingLeft: '220px', 
                    paddingRight: '200px',
                    backgroundColor: "#05203c",
                    paddingBottom: '20px',
                    paddingTop: '50px',
                    boxSizing: 'border-box',
                    zIndex: 10,
                          
             
                  
                 }}>
                    <Box sx={{ display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: "center",
        marginBottom: '10px',
        gap: '5px', 
        
 }}>
                        <Input value={`${newOrigin.city} (${newOrigin.code}), ${newOrigin.country}`} placeholder="From" disableUnderline sx={{ ...inputStyle, borderRadius: "13px 0px 0px 13px", width:"340px" }} />

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
              <FlightIcon style={{ color: "#5a5a5a", transform: "rotate(45deg)" }} />
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
 

                        

                        <Input placeholder="Depart Add date" value={inputFormattedDepartureDate} disableUnderline sx={{ ...inputStyle,  }} />

                        <Input placeholder="Return Add date" value={inputFormattedReturnDate} disableUnderline sx={{ ...inputStyle }} />

                         <ClickAwayListener onClickAway={() => dispatch(setTravellersOpen(false))}>
                                    <Box  sx={{ position: "relative" }}>
                        <Input 
                        placeholder="Travellers and cabin class" 
                        disableUnderline
                        onClick={handleTravellersInputClick}
                        value={travellersLabel} 
                        sx={{ 
                            ...inputStyle, 
                            borderRadius: "0px 10px 10px 0px", 
                            marginRight: "15px" 
                            }} />

{travellersOpen && (
            <Box
            sx={{
              position: "absolute",
              top: "calc(100% + 8px)", 
              left: 0,               
              zIndex: 9999,          
              }}>
                <HomeTravellersDropDown
                cabinClass={cabinClass}
                />
            </Box>
          )}
        </Box>
        </ClickAwayListener>


                        <Button variant="contained" sx={{ marginLeft: "10px", padding: "25px 20px", backgroundColor: "#0062e3", textTransform: "none", borderRadius: "10px", '&:hover': { backgroundColor: "#024daf" } }}>Search</Button>
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
            )}
        </Container>
    );
};

export default FlightSearchUI;
