import React from 'react';
import { Box, Typography, Rating, Paper, Grid, Container } from '@mui/material';

const HotelDetailsSection = () => {
  // Placeholder data
  const hotelName = 'Kimpton – Fitzroy London, an IHG Hotel';
  const address = '1-8 Russell Square, Camden, London, WC1B 5BE, United Kingdom';
  const rating = 4.5;
  const reviews = 1885;
  const reviewBoxes = [
    { text: "This hotel's location is rated 5/5", icon: '🌍' },
    { text: "This hotel's service is rated 5/5", icon: '🛎️' },
    { text: 'Customer review: "We have just stayed at this magnificent hotel..."', icon: '📝' }
  ];

  return (

    <Container sx={{ marginTop: '20px'}}>
    
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingLeft:"60px" }}>
      <Typography  sx={{ marginRight: '10px', fontSize:"45px", fontWeight:"bold"  }}>
        {hotelName}
      </Typography>
      <Rating value={rating} precision={0.5} readOnly sx={{ marginRight: '10px' }} />
    </Box>

    
    <Typography variant="body1" color="black" sx={{ marginBottom: '10px', paddingLeft:"60px" }}>
      {address}
    </Typography>

    
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingLeft:"60px" }}>
      
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
        <Typography variant="h6" sx={{ marginRight: '9px', fontWeight:"bold" }}>
          {rating}
        </Typography>
        <Typography variant="body2" color="black">
          ({reviews} reviews)
        </Typography>
      </Box>

      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {reviewBoxes.map((box, index) => (
          <Paper key={index} sx={{ padding: '20px 10px', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ marginRight: '5px' }}>{box.icon}</Box>
            <Typography variant="body2" color="black" fontSize="0.675rem">
              {box.text}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  </Container>

    

    


  );
};

export default HotelDetailsSection;
