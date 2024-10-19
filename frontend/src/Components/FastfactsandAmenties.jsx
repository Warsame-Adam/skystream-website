import React, { useEffect, useState } from 'react';
import { AppBar,Menu, Link, Input, Toolbar, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { AccessTime, FreeBreakfast, Pets, ChildFriendly, Wifi, AcUnit, FitnessCenter, SupportAgent, Restaurant, SmokeFree } from '@mui/icons-material';

const fastFacts = [
    { icon: AccessTime, text1: "Check-in from", text2: "15:00" },
    { icon: AccessTime, text1: "Check out by", text2: "12:00" },
    { icon: FreeBreakfast, text1: "Breakfast", text2: "Breakfast available" },
    { icon: Pets, text1: "Pets", text2: "Pets are allowed." },
    { icon: ChildFriendly, text1: "Children", text2: "Children are welcome at this hotel." }
  ];

  
  const amenities = [
    { icon: Wifi, text: "Wi-Fi" },
    { icon: AcUnit, text: "Air conditioning" },
    { icon: FitnessCenter, text: "Fitness centre" },
    { icon: SupportAgent, text: "Front desk 24 hour" },
    { icon: Restaurant, text: "Restaurant" },
    { icon: SmokeFree, text: "Non-smoking" }
  ];
  






const FastfactsandAmenties = () => {


    return (
        <Box
      sx={{
        maxWidth: '1200px', // Set this to the width you want for alignment
        margin: '0 auto', // Centers the content if needed
        paddingLeft: '0px', // Aligns with the padding of other components
      }}
    >
      <Typography  sx={{ marginBottom: '30px', fontSize:"40px", fontWeight:"bold", marginLeft:"20px",  marginTop:"80px" }}>Fast facts</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // Three columns
          gap: '20px', // Space between the items
          alingItems:"start",
          rowGap:"40px",
          marginLeft:"15px"
        }}
      >
        {fastFacts.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              
            }}
          >
            <item.icon sx={{ fontSize: '30px', marginBottom: '10px' }} /> {/* Icon */}
            <Typography sx={{ fontSize: '16px' }}>{item.text1}</Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{item.text2}</Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="h5" sx={{ marginBottom: '16px', marginTop:"100px", fontSize:"40px", fontWeight:"bold", marginLeft:"10px" }}>Amenities</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)', // Six columns
          gap: '16px', // Space between the items
        }}
      >
        {amenities.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#eff3f8',
             padding:"20px",
          
              borderRadius: '8px',
              textAlign: 'center',
              
              marginRight:"-10px"
            }}
          >
            <item.icon sx={{ fontSize: '25px', marginBottom: '10px', color: '#000' }} /> {/* Icon */}
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>

    </Box>



    )
}


export default FastfactsandAmenties;