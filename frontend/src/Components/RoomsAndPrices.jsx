import React, { useEffect, useState } from 'react';
import { AppBar,Menu, Link, Input, Toolbar, IconButton, Avatar, Typography, Button, Box, Container, Card, CardContent, CardMedia } from '@mui/material';
import roomsandpricesimg  from "../Components/Assets/roomsandpricesimg.png";

const inputStyle = {
    borderRight: "1px solid grey",
    
    
    backgroundColor:"background.paper",
    color:"black",
    
    padding: '20px 15px',
    '&:focus': {
        borderColor: '#5c6f82',
    },
  
  }

  const hotelBookingData = [
    {
      site: "Booking.com",
      logo: "/path/to/booking-logo.png", 
      rooms: [
        {
          type: "Double Room",
          pricePerNight: 150,
          breakfastIncluded: true,
          freeCancellation: false,
          availableFrom: "2024-10-20",
          availableTo: "2024-10-22",
        },
        {
          type: "Suite",
          pricePerNight: 250,
          breakfastIncluded: false,
          freeCancellation: true,
          availableFrom: "2024-10-20",
          availableTo: "2024-10-22",
        }
      ]
    },
    {
      site: "Expedia",
      logo: "/path/to/expedia-logo.png", 
      rooms: [
        {
          type: "Single Room",
          pricePerNight: 120,
          breakfastIncluded: false,
          freeCancellation: true,
          availableFrom: "2024-10-21",
          availableTo: "2024-10-23",
        },
        {
          type: "Double Room",
          pricePerNight: 140,
          breakfastIncluded: true,
          freeCancellation: false,
          availableFrom: "2024-10-21",
          availableTo: "2024-10-23",
        }
      ]
    },
    {
      site: "Agoda",
      logo: "/path/to/agoda-logo.png", 
      rooms: [
        {
          type: "Single Room",
          pricePerNight: 110,
          breakfastIncluded: true,
          freeCancellation: true,
          availableFrom: "2024-10-22",
          availableTo: "2024-10-24",
        },
        {
          type: "Double Room",
          pricePerNight: 160,
          breakfastIncluded: false,
          freeCancellation: true,
          availableFrom: "2024-10-22",
          availableTo: "2024-10-24",
        }
      ]
    }
  ];
  


const RoomsAndPrices = () => {

    const [breakfastFilter, setBreakfastFilter] = useState(false);
const [freeCancellationFilter, setFreeCancellationFilter] = useState(false);

const filteredHotels = hotelBookingData.map(hotel => {
  const availableRooms = hotel.rooms.filter(room => {
    // Apply filter conditions
    const matchesFilters =
      (!breakfastFilter || room.breakfastIncluded) &&
      (!freeCancellationFilter || room.freeCancellation);

    return matchesFilters;
  });

  return {
    ...hotel,
    rooms: availableRooms
  };
});


  const handleFilterChange = (filterType) => {
    if (filterType === 'breakfast') {
      setBreakfastFilter(!breakfastFilter);
    } else if (filterType === 'freeCancellation') {
      setFreeCancellationFilter(!freeCancellationFilter);
    }
  };
  


    return (
        <Container sx={{marginTop:"50px"}}>
            <Typography sx={{fontSize:"43px", fontWeight:"bold",}}>
                Compare rooms and prices
            </Typography>

            <Box sx={{marginLeft:"-18px", marginBottom:"20px"}}>
                <img src={roomsandpricesimg} />
            </Box>

            <Box sx={{width:"auto", backgroundColor:"#eff3f8", borderRadius:"5px"}}>
              
              <Box sx={{display:"flex", gap: 2, padding:"20px 20px"}}>
                <Input placeholder="Date" disableUnderline sx={{ ...inputStyle, width: "20px", height: "55px", flex:1,  border:" 1px solid #c1c7cf", borderRadius:"5px" }} />
                <Input placeholder="Adults, Rooms" disableUnderline sx={{ ...inputStyle, width: "70px", height: "55px", flex:1, border:" 1px solid #c1c7cf", borderRadius:"5px" }} />
                <Button sx={{flex:1, width:"70px",  border:" 1px solid #c1c7cf",  textTransform: "none", backgroundColor:"#05203c", color:"white", borderRadius:"5px",  '&:hover': {backgroundColor:"#154679" }}}>Search rooms and rates</Button>
              </Box>
              
              <Box sx={{display:"flex", alignItems:"center", gap: 2, paddingLeft:"20px", marginBottom:"10px"}}>

                <Typography sx={{fontSize:"14px", fontWeight:"bold"}}>
                  Filter by
                </Typography>
                <Button 
                sx={{
                  backgroundColor: breakfastFilter ? '#05203c' : 'transparent', 
                  color: breakfastFilter ? '#fff' : 'black', 
                  border: '1px solid   #c1c7cf',
                  textTransform: 'none',
                  borderRadius:"10px",
                  fontSize:"12.5px" ,
                  '&:hover': {
                    backgroundColor: breakfastFilter ?  '#05203c' : 'transparent', 
                    borderColor: breakfastFilter ? '#05203c' : '#004687',
                    },
                  }}
                  onClick={() => handleFilterChange('breakfast')}>
                    Breakfast included
                </Button>
                
                <Button
                sx={{            
                  backgroundColor: freeCancellationFilter ? '#05203c' : 'transparent', 
                  color: freeCancellationFilter ? '#fff' : 'black', 
                  border: '1px solid  #c1c7cf  ', 
                  textTransform: 'none', 
                  borderRadius:"10px",
                  fontSize:"12.5px" ,
                  '&:hover': {
                    backgroundColor: freeCancellationFilter ?  '#05203c' : 'transparent',
                    borderColor: freeCancellationFilter ? '#05203c' : '#004687',
                    
                    },
                  }}
                  onClick={() => handleFilterChange('freeCancellation')}>
                    Free cancellation
                </Button>


                
              </Box>

              <Typography sx={{fontSize:"15px", paddingLeft:"20px", marginBottom:"10px"}}>
              Price per night including taxes and fees


              </Typography>
              <Box sx={{padding:"20px"}}>
              {filteredHotels.map((hotel, hotelIndex) => (
                hotel.rooms.map((room, roomIndex) => (
                <Card key={`${hotelIndex}-${roomIndex}`} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p:2 }}>
                  
                  {/* Left Side - Logo and Details */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', flex: 1 }}>
                    <CardMedia
                    component="img"
                    image={hotel.logo}
                    
                    sx={{ width: 50, height: 'auto', mb: 3, color:"black" }}/>
                    <Typography sx={{color:"black", mb:1, fontWeight:"bold", fontSize:"14px"}}>{room.type}</Typography>
                    <Typography sx={{color:"black"}} variant="body2" color="textSecondary">
                      {freeCancellationFilter && room.freeCancellation ? "✓ Free cancellation" : "• Free cancellation"}
                    </Typography>
                    <Typography sx={{color:"black"}} variant="body2" color="textSecondary">
                       {breakfastFilter && room.breakfastIncluded ? "✓ Breakfast included" : "• Breakfast included"}
                     </Typography>
                 </Box>
                 {/* Right Side - Price and Button */}
                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography  variant="h6" sx={{ mb: 1, color:"black" }}>
                    £{room.pricePerNight}
                  </Typography>
                  <Button
                  variant="contained"
                  sx={{ backgroundColor:"#05203c", color: '#fff', '&:hover': {backgroundColor:"#154679" } }}>
                  
                    Go to site
                  </Button>
                </Box>
               </Card>
        ))
      ))}
      </Box>





            </Box>

        </Container>
    )

}




export default RoomsAndPrices;
