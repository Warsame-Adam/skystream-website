import React, { useState } from 'react';
import { Tabs, Tab, Box, Card, CardMedia, CardContent, Typography, IconButton, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star'; 
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { cities, hotels } from "../HotelData.js";
import {useDispatch, useSelector } from "react-redux";
import { setSelectedCity, setCurrentIndex } from '../Slices/hotelSlice';


const LocalHotelSelection = () => {

  const dispatch = useDispatch();

  const selectedCity = useSelector((state) => state.hotels.selectedCity);
const currentIndex = useSelector((state) => state.hotels.currentIndex);



 

  const handleCityChange = (event, newValue) => {
    dispatch(setSelectedCity(newValue)); 
    dispatch(setCurrentIndex(0));
  };

  

  const visibleHotels = hotels[selectedCity].hotels.slice(currentIndex, currentIndex + 3);

  const handleNext = () => {
    if (currentIndex + 3 < hotels[selectedCity].hotels.length) {
       dispatch(setCurrentIndex(currentIndex + 3));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
        dispatch(setCurrentIndex(currentIndex - 3));
    }
  };

  return (
    <Container>
        
        <Typography sx={{fontWeight:"bold", fontSize:"28px"}}>
            Hotels in your home country
        </Typography>
        <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>
            Your next adventure may be closer than you think. Discover hotels just beyond your doorstep.
        </Typography>
      
      <Tabs value={selectedCity} onChange={handleCityChange}
 sx={{'& .MuiTabs-indicator': {
            display: 'none'}, '& .MuiTab-root': {
      padding: '5px 8px', 
      minHeight: 'auto',
      border:"1px solid grey",
      marginRight:"10px",
      borderRadius:"5px",
      color:"black",
      textTransform: 'none'
    
}, 
} } >
        {cities.map((city, index) => (
          <Tab key={index} label={city} disableRipple
          sx={{ '&.Mui-selected': {
            backgroundColor: 'blue !important', // Override with blue background
            color: 'white !important', // Override with white text
          },}} />
        ))}
      </Tabs>

      

      
      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        
        <Box display="flex" justifyContent="space-between" width="100%">
          {visibleHotels.map((hotel, index) => (
            <Card key={index} sx={{ flex: 1, margin: 1 }}> 
              <CardMedia
                component="img"
                height="140"
                image={hotel.image} 
                alt={hotel.name}
              />
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>
                  {hotel.name}
                  <span style={{ marginLeft: '5px' }}>
                    
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      starIndex < hotel.stars ? (
                        <StarIcon key={starIndex} fontSize="small" style={{ color: 'gold' }} />
                      ) : (
                        <StarBorderIcon key={starIndex} fontSize="small" style={{ color: 'gold' }} />
                      )
                    ))}
                  </span>
                </Typography>
                <Typography variant="body2" style={{ color: 'black' }}>
                  x miles from city centre
                </Typography>
                <hr style={{ border: '1px solid lightgrey', margin: '10px 0' }} />
                <Typography variant="body1" style={{ color: 'black', textAlign: 'right' }}>
                  {hotel.price}
                </Typography>
                <Typography variant="body2" style={{ color: 'grey', textAlign: 'right' }}>
                  per night
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      
      <Box display="flex" justifyContent="center" alignItems="center" gap={1} my={2}>
        <IconButton 
          disabled={currentIndex === 0} 
          onClick={handlePrev}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        {Array.from({ length: 2 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: currentIndex === index * 3 ? 'darkgrey' : 'lightgrey',
            }}
          />
        ))}
        <IconButton 
          disabled={currentIndex + 3 >= hotels[selectedCity].hotels.length} 
          onClick={handleNext}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>
    </Container>
  );
};

export default LocalHotelSelection;
