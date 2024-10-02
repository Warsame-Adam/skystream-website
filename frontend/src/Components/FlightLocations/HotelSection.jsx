import React, { useState } from 'react';
import { Tabs, Tab, Box, Card, CardMedia, CardContent, Typography, IconButton, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star'; 
import StarBorderIcon from '@mui/icons-material/StarBorder';

const HotelSection = () => {
  const [selectedCity, setSelectedCity] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue);
    setCurrentIndex(0); 
  };

  const cities = ["Edinburgh", "London", "Dublin", "Cardiff"];
  const hotels = [
    {
      city: "Edinburgh",
      hotels: [
        { name: "Edinburgh Hotel 1", price: "£100", image: "placeholder.jpg", stars: 4 },
        { name: "Edinburgh Hotel 2", price: "£150", image: "placeholder.jpg", stars: 3 },
        { name: "Edinburgh Hotel 3", price: "£120", image: "placeholder.jpg", stars: 5 },
        { name: "Edinburgh Hotel 4", price: "£110", image: "placeholder.jpg", stars: 4 },
        { name: "Edinburgh Hotel 5", price: "£130", image: "placeholder.jpg", stars: 2 },
        { name: "Edinburgh Hotel 6", price: "£140", image: "placeholder.jpg", stars: 3 },
      ],
    },
    {
      city: "London",
      hotels: [
        { name: "London Hotel 1", price: "£200", image: "placeholder.jpg", stars: 4 },
        { name: "London Hotel 2", price: "£250", image: "placeholder.jpg", stars: 5 },
        { name: "London Hotel 3", price: "£220", image: "placeholder.jpg", stars: 3 },
        { name: "London Hotel 4", price: "£210", image: "placeholder.jpg", stars: 4 },
        { name: "London Hotel 5", price: "£230", image: "placeholder.jpg", stars: 2 },
        { name: "London Hotel 6", price: "placeholder.jpg", stars: 3 },
      ],
    },
    {
      city: "Dublin",
      hotels: [
        { name: "Dublin Hotel 1", price: "€90", image: "placeholder.jpg", stars: 3 },
        { name: "Dublin Hotel 2", price: "€140", image: "placeholder.jpg", stars: 4 },
        { name: "Dublin Hotel 3", price: "€130", image: "placeholder.jpg", stars: 5 },
        { name: "Dublin Hotel 4", price: "€110", image: "placeholder.jpg", stars: 2 },
        { name: "Dublin Hotel 5", price: "€150", image: "placeholder.jpg", stars: 3 },
        { name: "Dublin Hotel 6", price: "€160", image: "placeholder.jpg", stars: 4 },
      ],
    },
    {
      city: "Cardiff",
      hotels: [
        { name: "Cardiff Hotel 1", price: "£90", image: "placeholder.jpg", stars: 3 },
        { name: "Cardiff Hotel 2", price: "£140", image: "placeholder.jpg", stars: 4 },
        { name: "Cardiff Hotel 3", price: "£130", image: "placeholder.jpg", stars: 5 },
        { name: "Cardiff Hotel 4", price: "£110", image: "placeholder.jpg", stars: 2 },
        { name: "Cardiff Hotel 5", price: "£150", image: "placeholder.jpg", stars: 3 },
        { name: "Cardiff Hotel 6", price: "£160", image: "placeholder.jpg", stars: 4 },
      ],
    },
  ];

  const visibleHotels = hotels[selectedCity].hotels.slice(currentIndex, currentIndex + 3);

  const handleNext = () => {
    if (currentIndex + 3 < hotels[selectedCity].hotels.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
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
      
      <Tabs value={selectedCity} onChange={handleCityChange} sx={{'& .MuiTabs-indicator': {
            display: 'none',}}}  >
        {cities.map((city, index) => (
          <Tab key={index} label={city} sx={{backgroundColor:"white", color:"black", border:"1px solid black", marginRight:"25px", borderRadius:"10px",display:"flex",fontSize:"12px", padding:"0px"}} />
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

export default HotelSection;
