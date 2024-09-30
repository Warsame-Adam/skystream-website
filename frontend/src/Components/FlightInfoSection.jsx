import React, { useState } from 'react';
import { Box, Typography, Icon, Tabs, Tab, Grid, Link, Container } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import HotelIcon from '@mui/icons-material/Hotel';

const FlightInfoSection = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const popularCities = [
    'Paris', 'Athens', 'Sydney', 'Antalya', 'Rome', 
    'Cardiff', 'Edinburgh', 'Dublin', 'Dubai', 
    'Amsterdam', 'Istanbul', 'Bangkok'
  ];

  const popularCountries = [
    'France', 'Greece', 'Australia', 'Turkey', 'Italy', 
    'Wales', 'Scotland', 'Ireland', 'United Arab Emirates', 
    'Netherlands', 'Turkey', 'Thailand'
  ];

  const popularFlightRoutes = [
    'London to Athens International', 'London to Rome', 
    'London to Sydney', 'London to Dubai', 'London to Amsterdam',
    'London to Istanbul', 'London to Bangkok'
  ];

  const topAirlines = [
    'British Airways', 'Emirates', 'Qatar Airways', 
    'Turkish Airlines', 'Air France', 'KLM', 'Qantas'
  ];

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      {/* Top Text and Icons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <Box sx={{ textAlign: 'center', maxWidth: '45%', alignItems:"center", display:"flex" }}>
          <Icon component={ChangeCircleIcon} sx={{ fontSize: 30 }} />
          <Typography variant="body2">
  <span style={{ fontWeight: 'bold', display: 'block', fontSize: '1.25rem' }}>Find flexible flight deals</span>
  Explore flexible flight ticket deals so you won't lose out if your flight is changed or cancelled.
</Typography>


        </Box>
        <Box sx={{ textAlign: 'center', maxWidth: '45%', display:"flex", alignItems:"center" }}>
          <Icon component={HotelIcon} sx={{ fontSize: 30 }} />
          <Typography variant="body2">
  <span style={{ fontWeight: 'bold', display: 'block', fontSize: '1.25rem' }}>Add hotels and car hire</span>
  Plan your journey with hotels and car hire, and keep your bookings all in one place.
</Typography>


        </Box>
      </Box>

      {/* Tab Navigation */}
      
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          Ready to start your adventure?
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 3 }}>
          Find the cheapest flight deals to some of the most popular destinations, or pick your favorite airline below.
        </Typography>
        <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" TabIndicatorProps={{ style: { display: 'none' } }}>
          <Tab
          label="Popular cities" 
          sx={{
            padding: '6px 16px',
            borderRadius: '20px',
            backgroundColor: selectedTab === 0 ? 'primary.main' : 'transparent',
            color: selectedTab === 0 ? 'red' : 'black',
            '&.Mui-selected': {
                color: 'white !important',
              },
            
            border: selectedTab === 0 ? 'none' : '1px solid #d3d3d3',
            '&:hover': {
                border: '1px solid #002f6c',
            },
            marginRight: '8px',
            transition: 'all 0.3s ease',
        }}/>
          <Tab 
          label="Popular countries"
          sx={{
            padding: '6px 16px',
            borderRadius: '20px',
            backgroundColor: selectedTab === 1 ? 'primary.main' : 'transparent',
            color: selectedTab === 1 ? 'white' : 'black',
            '&.Mui-selected': {
                color: 'white !important',
              },
            border: selectedTab === 1 ? 'none' : '1px solid #d3d3d3',
            '&:hover': {
                border: '1px solid #002f6c',
            },
            marginRight: '8px',
            transition: 'all 0.3s ease',
          }} 
       />
          <Tab 
          label="Popular flight routes"
          sx={{
            padding: '6px 16px',
            borderRadius: '20px',
            backgroundColor: selectedTab === 2 ? 'primary.main' : 'transparent',
            color: selectedTab === 2 ? 'white' : 'black',
            '&.Mui-selected': {
                color: 'white !important',
              },
            border: selectedTab === 2 ? 'none' : '1px solid #d3d3d3',
            '&:hover': {
                border: '1px solid #002f6c',
            },
            marginRight: '8px',
            transition: 'all 0.3s ease',
          }} 
       />
          <Tab 
          label="Top airlines"
          sx={{
            padding: '6px 16px',
            borderRadius: '20px',
            backgroundColor: selectedTab === 3 ? 'primary.main' : 'transparent',
            color: selectedTab === 3 ? 'white' : 'black',
            '&.Mui-selected': {
                color: 'white !important',
              },
            border: selectedTab === 3 ? 'none' : '1px solid #d3d3d3',
            '&:hover': {
                border: '1px solid #002f6c',
            },
            transition: 'all 0.3s ease',
          }} 
       />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ paddingTop: 3 }}>
          {selectedTab === 0 && (
            <Grid container spacing={2}>
              {popularCities.map((city, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Link href="#" underline="hover">
                    Flights to {city}
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
          {selectedTab === 1 && (
            <Grid container spacing={2}>
              {popularCountries.map((country, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Link href="#" underline="hover">
                    Flights to {country}
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
          {selectedTab === 2 && (
            <Grid container spacing={2}>
              {popularFlightRoutes.map((route, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Link href="#" underline="hover">
                    {route}
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
          {selectedTab === 3 && (
            <Grid container spacing={2}>
              {topAirlines.map((airline, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Link href="#" underline="hover">
                    {airline}
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      
    </Container>
  );
};

export default FlightInfoSection;
