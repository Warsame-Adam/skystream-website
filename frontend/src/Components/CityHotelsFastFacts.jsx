import React from "react"
import { Tabs, Tab, Box, Card, CardMedia, CardContent, Typography, IconButton, Container } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';




const CityHotelsFastFacts = () => {


    return (
        <Container sx={{transform: 'translateX(-45px)', marginTop:"50px"}}>

            <Typography sx={{fontSize:"30px", fontWeight:"bold"}}>
            Fast facts
            </Typography>

            <Typography sx={{fontSize:"17px"}}>
            Sleep easy, armed with the stuff that's good to know before you go.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '40px', marginTop: '40px', padding: '20px 0' }}>
    
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: "33.33%", marginBottom: '20px' }}>
        <StarIcon sx={{ fontSize: 25, color: 'black' }} />
        <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '10px' }}>
          Highest rated hotel
        </Typography>
        <Typography variant="h6" sx={{ color: '#1976d2' }}>
          Met Hotel Amsterdam – 5
        </Typography>
      </Box>

      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: "33.33%", marginBottom: '20px' }}>
        <CalendarTodayIcon sx={{ fontSize: 25, color: 'black' }} />
        <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '10px' }}>
          Cheapest month to book
        </Typography>
        <Typography variant="h6" sx={{ color: '#1976d2' }}>
          January
        </Typography>
      </Box>

      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width:"33.33%", marginBottom: '20px' }}>
        <LocalOfferIcon sx={{ fontSize: 25, color: 'black' }} />
        <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '10px' }}>
          Average 4 star hotel price
        </Typography>
        <Typography variant="h6" sx={{ color: '#1976d2' }}>
          £127 per night
        </Typography>
      </Box>

    
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: "33.33%", marginBottom: '20px' }}>
        <LocalOfferIcon sx={{ fontSize: 25, color: 'black' }} />
        <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '10px' }}>
          Average 5 star hotel price
        </Typography>
        <Typography variant="h6" sx={{ color: '#1976d2' }}>
          £278 per night
        </Typography>
      </Box>
    </Box>

          


      


        </Container>

    )
}



export default CityHotelsFastFacts;