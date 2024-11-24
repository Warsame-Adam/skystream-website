import React from "react";
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, Container, Divider, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import IMG1 from "../Components/Assets/IMG1.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CityHotelsData = [
    {hotelImage: IMG1, hotelName: "Jaz in the city Amsterdam", rating: 4, dFromCityCentre:"4.28", price:"143", },
    {hotelImage: IMG1, hotelName: "Jaz in the city Amsterdam", rating: 4, dFromCityCentre:"4.28", price:"143", },
    {hotelImage: IMG1, hotelName: "Jaz in the city Amsterdam", rating: 4, dFromCityCentre:"4.28", price:"143", },
    {hotelImage: IMG1, hotelName: "Jaz in the city Amsterdam", rating: 4, dFromCityCentre:"4.28", price:"143", },
    {hotelImage: IMG1, hotelName: "Jaz in the city Amsterdam", rating: 4, dFromCityCentre:"4.28", price:"143", },
]





const CityHotelsList = () => {


    return (
        <Container sx={{marginBottom:"200px", transform: 'translateX(-45px)',}}>


            {CityHotelsData.map((city, index) => (
                
                
                <Box
                sx={{
                    width: "100%",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",

                    height: "280px",
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "25px",
                    borderRadius: "10px",
                    
                    }}>
                        
                        
                        
                <Box
                sx={{
                    width: "33%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius:"10px 0px 0px 10px"
                    }}>
                        
                        <img
                        src={city.hotelImage}
                        alt="Hotel Image"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}/>
                        
                </Box>
                
                
                <Box sx={{ width: "47%", display:"flex", flexDirection:"column", paddingLeft:"25px", paddingTop:"30px" }}>
                    <Typography sx={{marginBottom:"10px", fontSize:"25px"}}>
                        {city.hotelName}
                    </Typography>
                    <Typography sx={{fontSize:"15px"}}>
                        <LocationOnIcon sx={{fontSize:"20px", paddingRight:"8px"}} />
                        {city.dFromCityCentre} miles from city centre
                    </Typography>

                    <Typography>
                    
                    </Typography>
                    
                </Box>
                
                
                
                <Divider orientation="vertical" flexItem />

                <Box
  sx={{
    width: "20%",
    height: "100%", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", 
    alignItems: "flex-end", 
    paddingTop:"30px",
    paddingRight:"25px"
  }}
>
  <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
    Lowest price
  </Typography>
  <Typography sx={{ fontSize: "11px" }}>
    We found for this hotel
  </Typography>

  <Typography sx={{fontSize:"35px", marginTop:"50px"}}>
    £{city.price}
  </Typography>
  <Typography sx={{color:"grey"}}>
    a night
  </Typography>

  <Box sx={{backgroundColor:"#05203c", "&:Hover": {backgroundColor:"#154679"}, color:"white", width:"180px", borderRadius:"10px", cursor:"pointer", marginTop:"25px", display:"flex", alignItems:"center", justifyContent: "center", padding:"8px 10px"}}>
    <Typography>
        View hotels
    </Typography>

  </Box>
</Box>

                

                </Box>
                            
            ))}





        </Container>

    )
}


export default CityHotelsList;