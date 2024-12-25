import React, { useEffect, useRef, useState } from "react";
import { AppBar,Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel, Autocomplete, Paper, Popper, RadioGroup, Radio } from '@mui/material';
import { setDepartureDate, setReturnDate } from '../Slices/dateStore';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ApartmentIcon from "@mui/icons-material/Apartment";
import FlightIcon from "@mui/icons-material/Flight";
import KingBedIcon from "@mui/icons-material/KingBed";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";


const Locations = [
    // Cities
    { name: "Paris", type: "city", country: "France" },
    { name: "Athens", type: "city", country: "Greece" },
    { name: "Sydney", type: "city", country: "Australia" },
    { name: "Antalya", type: "city", country: "Turkey" },
    { name: "Rome", type: "city", country: "Italy" },
    { name: "Cardiff", type: "city", country: "Wales" },
    { name: "Edinburgh", type: "city", country: "Scotland" },
    { name: "Dublin", type: "city", country: "Ireland" },
    { name: "Dubai", type: "city", country: "United Arab Emirates" },
    { name: "Amsterdam", type: "city", country: "Netherlands" },
    { name: "Istanbul", type: "city", country: "Turkey" },
    { name: "Bangkok", type: "city", country: "Thailand" },
  
    // Hotels
    { name: "The Ritz Paris", type: "hotel", city: "Paris", country: "France" },
    { name: "Athens Grand Hotel", type: "hotel", city: "Athens", country: "Greece" },
    { name: "Sydney Harbour Hotel", type: "hotel", city: "Sydney", country: "Australia" },
    { name: "Antalya Beach Resort", type: "hotel", city: "Antalya", country: "Turkey" },
    { name: "Rome City Hotel", type: "hotel", city: "Rome", country: "Italy" },
    { name: "Cardiff Bay Hotel", type: "hotel", city: "Cardiff", country: "Wales" },
    { name: "Edinburgh Castle Hotel", type: "hotel", city: "Edinburgh", country: "Scotland" },
    { name: "Dublin City Stay", type: "hotel", city: "Dublin", country: "Ireland" },
    { name: "Hilton Dubai", type: "hotel", city: "Dubai", country: "United Arab Emirates" },
    { name: "Amsterdam Central Hotel", type: "hotel", city: "Amsterdam", country: "Netherlands" },
    { name: "Istanbul Grand Palace", type: "hotel", city: "Istanbul", country: "Turkey" },
    { name: "Bangkok Luxury Stay", type: "hotel", city: "Bangkok", country: "Thailand" },
  
    // Airports
    { name: "Charles de Gaulle Airport", type: "airport", city: "Paris", code: "CDG", country: "France" },
    { name: "Athens International Airport", type: "airport", city: "Athens", code: "ATH", country: "Greece" },
    { name: "Sydney Kingsford Smith Airport", type: "airport", city: "Sydney", code: "SYD", country: "Australia" },
    { name: "Antalya Airport", type: "airport", city: "Antalya", code: "AYT", country: "Turkey" },
    { name: "Rome Fiumicino Airport", type: "airport", city: "Rome", code: "FCO", country: "Italy" },
    { name: "Cardiff Airport", type: "airport", city: "Cardiff", code: "CWL", country: "Wales" },
    { name: "Edinburgh Airport", type: "airport", city: "Edinburgh", code: "EDI", country: "Scotland" },
    { name: "Dublin Airport", type: "airport", city: "Dublin", code: "DUB", country: "Ireland" },
    { name: "Dubai International Airport", type: "airport", city: "Dubai", code: "DXB", country: "United Arab Emirates" },
    { name: "Amsterdam Schiphol Airport", type: "airport", city: "Amsterdam", code: "AMS", country: "Netherlands" },
    { name: "Istanbul Airport", type: "airport", city: "Istanbul", code: "IST", country: "Turkey" },
    { name: "Bangkok Suvarnabhumi Airport", type: "airport", city: "Bangkok", code: "BKK", country: "Thailand" }
  ];
  








const inputStyle = {
    borderRight: "1px solid grey",
    
    
    backgroundColor:"background.paper",
    color:"black",
    
    padding: '20px 15px',
    '&:focus': {
        borderColor: 'primary.main',
    },

}





const CityHotelsSearchBar = () => {

    const dispatch = useDispatch();
    const departureDate = useSelector((state) => state.dates.departureDate);
    const returnDate = useSelector((state) => state.dates.returnDate);

    const inputRef = useRef(null);
      
      const [inputValue, setInputValue] = useState("");

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






    return (
        <Box>
        <Typography sx={{position:"absolute", top:"18%", left:"24.2%",  transform: 'translate(-23%, -24.2%)', color:"white", fontSize:"40px", fontWeight:"bold",}}>
            City Hotels
        </Typography>
        <Box sx={{
            position:"absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '1200px',
            
            padding: '20px',
            borderRadius: '8px',
            height:"130px",
            marginTop:"-165px"
            
      }}>
       
        <Typography component="div" sx={{marginBottom:"5px", color:"white", fontSize:"11px"}}>
        <span style={{ marginRight: '453px'}}>Where do you want to stay?</span>
        <span style={{ marginRight: '104px' }}>Check in</span>
        <span style={{ marginRight: '98px'}}>Check out</span>
        <span style={{}}>Guests and rooms</span>
      </Typography>


        <Box sx={{display:"flex", alignItems:"center"}}>
        <Autocomplete
            freeSolo
            options={Locations}
            getOptionLabel={(option) => (option?.name ? option.name : "")}
            inputValue={inputValue}
            onInputChange={(_, val) => setInputValue(val)}
            
            sx={{
              width: "590px",

              


              "& .MuiInputBase-root": {
                width: "590px !important",
                backgroundColor: "white",
                "&:hover": { backgroundColor: "white" },
                
                paddingRight: "0px !important", 
              },

              " .MuiInputBase-input": {
                width:"590px"
              },

              "& .MuiAutocomplete-endAdornment": {
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                
                "& .MuiIconButton-root": {
                  padding: "4px",
                  marginRight: 0,
                }
              },


              "& .MuiAutocomplete-input": {
                width: "100% !important",
                padding: "0 !important",
                height: "54px",
                
                paddingRight: "0 !important",
              },
            }}
            filterOptions={(options, state) => {
              const val = state.inputValue.trim().toLowerCase();
              if (val === "") {
                
                return options.filter((opt) => opt.type === "city");
              }
              
              return options.filter((option) => {
                const nameMatch = option.name.toLowerCase().includes(val);
                const cityMatch =
                  option.city && option.city.toLowerCase().includes(val);
                const codeMatch =
                  option.code && option.code.toLowerCase().includes(val);
                return nameMatch || cityMatch || codeMatch;
              });
            }}
            renderOption={(props, option) => {
              let IconComp = ApartmentIcon;
              if (option.type === "hotel") IconComp = KingBedIcon;
              if (option.type === "airport") IconComp = FlightIcon;

              const isEmpty = inputValue === "";

              return (
                <li
                  {...props}
                  style={{
                    display: "flex",
                    justifyContent: isEmpty ? "flex-start" : "space-between",
                    alignItems: "center",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  
                  <Box sx={{ display: "flex", gap: "6px", alignItems: "start" }}>
                    <IconComp
                      sx={{
                        color: "#5a5a5a",
                        transform: option.type === "airport" ? "rotate(45deg)" : "none",
                        marginTop: "2px",
                      }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: "13px", color: "black" }}>
                        {option.name}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "black" }}>
                        {option.country || option.city}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {!isEmpty && (
                    <Box sx={{ marginLeft: "auto", textAlign: "right", color: "black" }}>
                      {option.type}
                    </Box>
                  )}
                </li>
              );
            }}
            
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={inputRef}
                inputProps={{
                  ...params.inputProps,
                  disableUnderline: true,
                  style: {
                    border: "1px solid #ccc",
                    backgroundColor: "white",
                    padding: "20px 15px",
                    color: "black",
                    cursor: "pointer",
                  },
                }}
                placeholder="Enter destination or hotel name"
                variant="standard"
                sx={{
                  
                  width: "100%",
                  borderRadius: "8px 0 0 8px",
                  "& .MuiAutocomplete-input": {
                    padding: "0 !important",
                    height: "54px",
                  },
                
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
              />
            )}
            
            PaperComponent={(paperProps) => {
              const isEmpty = inputValue === "";
              return (
                <Paper {...paperProps}>
                  {isEmpty && (
                    <Box sx={{ p: 1, mb: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "14px",
                          mb: 1,
                        }}
                      >
                        Popular destinations
                      </Typography>
                    </Box>
                  )}
                  {paperProps.children}
                </Paper>
              );
            }}
          
            PopperComponent={({ style, ...popperProps }) => (
              <Popper
                {...popperProps}
                anchorEl={inputRef.current}
                placement="bottom-start"
                style={{
                  ...style,
                  width: "590px",
                  maxHeight: "auto",
                  overflowY: "auto",
                  zIndex: 10,
                }}
              />
            )}
            ListboxProps={{
              style: {
                marginTop: "5px",
                display: inputValue === "" ? "grid" : "block",
                gridTemplateColumns: inputValue === "" ? "repeat(2, 1fr)" : "unset",
                gap: "2px",
                padding: "0px 5px 5px 5px",
              },
            }}
          />

        
            <Input value={formattedDepartureDate} placeholder="Date" disableUnderline sx={{ ...inputStyle, width:"148px", height:"55px" }} />
            <Input value={formattedReturnDate} placeholder="Date" disableUnderline sx={{ ...inputStyle, width:"148px", height:"55px" }} />
            <Input placeholder="Rooms" disableUnderline sx={{ ...inputStyle, width:"300px", height:"55px",borderRadius: '0 8px 8px 0', }} />

        </Box>
        
        <Box  sx={{marginTop:"20px", display:"flex", alignItems:"center"}}>
            <Typography sx={{marginRight:"30px", color:"white", fontSize:"13px", fontWeight:"bold"}}>
                Popular Filters:
            </Typography>
            <FormControlLabel control={<Checkbox disableRipple sx={{ color: '#626971', marginRight:"10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': {backgroundColor:"white", width:"18px", height:"10px"}  }} />} label="Free cancellation" componentsProps={{typography: {fontSize:"15px", color:"white", marginRight:"20px"}}}  />
            <FormControlLabel control={<Checkbox disableRipple  sx={{ color: '#626971',marginRight:"10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': {backgroundColor:"white", width:"18px", height:"10px"}  }} />} label="4 stars" componentsProps={{typography: {fontSize:"15px", color:"white", marginRight:"20px"}}} />
            <FormControlLabel control={<Checkbox disableRipple  sx={{ color: '#626971', marginRight:"10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': {backgroundColor:"white", width:"18px", height:"10px"}  }}  />} label="3 stars" componentsProps={{typography: {fontSize:"15px", color:"white"}}} />
        </Box>

        <Box sx={{height:"48px", width:"165px",padding:"-10px 0px", borderRadius:"10px", backgroundColor:"#0062e3", display:"flex", alignItems:"center", gap:"10px", pointer:"clicker", marginLeft:"1020px", marginTop:"-30px",'&:Hover': {backgroundColor:"#024daf"}}}>
                  <Typography sx={{textAlign:"center", paddingLeft:"20px", color:"white"}}>
                    Search hotels
                  </Typography>
                  <ArrowForwardOutlinedIcon sx={{color:"white"}} />

                </Box>
                




        </Box>
        </Box>
    )
}


export default CityHotelsSearchBar;