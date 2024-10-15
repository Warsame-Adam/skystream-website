import React, { useEffect, useState } from 'react';
import { AppBar,Menu, Link, Input, Toolbar, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BedIcon from '@mui/icons-material/Bed';

const inputStyle = {
  borderRight: "1px solid grey",
  
  
  backgroundColor:"background.paper",
  color:"black",
  
  padding: '20px 15px',
  '&:focus': {
      borderColor: 'primary.main',
  },

}



const IndividualHotelTabs = () => {

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 840 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const stickyHeight = 220;

  
  
  const price = 767;

  



  return (
    <>
    
    {sticky ? (
      <Box sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: 'white', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)' }}>
        <Container sx={{ maxWidth: 'lg' }}>
          {/* Search Bar */}
          <AppBar sx={{ backgroundColor: "primary.dark", padding: "20px 310px", width: '100%' }}>
            <Toolbar sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Input placeholder="Enter destination or hotel name" disableUnderline sx={{ ...inputStyle, width: "590px", height: "55px", borderRadius: '8px 0 0 8px' }} />
                <Input placeholder="Date" disableUnderline sx={{ ...inputStyle, width: "148px", height: "55px" }} />
                <Input placeholder="Date" disableUnderline sx={{ ...inputStyle, width: "148px", height: "55px" }} />
                <Input placeholder="Rooms" disableUnderline sx={{ ...inputStyle, width: "300px", height: "55px", borderRadius: '0 8px 8px 0' }} />
              </Box>
            </Toolbar>
          </AppBar>

          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 3, marginTop: "130px" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Link href="#rooms" underline="none" sx={{ marginX: 2, color: 'black', transition: 'color 0.3s', '&:hover': { color: 'grey' } }}>Rooms and prices</Link>
              <Link href="#amenities" underline="none" sx={{ marginX: 2, color: 'black', transition: 'color 0.3s', '&:hover': { color: 'grey' } }}>Amenities</Link>
              <Link href="#ratings" underline="none" sx={{ marginX: 2, color: 'black', transition: 'color 0.3s', '&:hover': { color: 'grey' } }}>Ratings and reviews</Link>
              <Link href="#explore" underline="none" sx={{ marginX: 2, color: 'black', transition: 'color 0.3s', '&:hover': { color: 'grey' } }}>Explore the area</Link>
            </Box>

            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ marginRight: 2 }}>£{price}</Typography>
              <Button variant="contained" color="primary" size="large">View deals</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    ) : (
      <>
        
        <Container sx={{ textAlign: 'center', marginY: 4 }}>
          {/* Links Section with Price and Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid grey', paddingBottom: 1 }}>
            {/* Links */}
            <Box>
              <Link href="#rooms" underline="none" sx={{ marginX: 2, color: 'black', transition: 'color 0.3s', '&:hover': { color: 'grey' } }}>Rooms and prices</Link>
              <Link href="#amenities" underline="none" sx={{ marginX: 2, color: 'black', transition: 'color 0.3s', '&:hover': { color: 'grey' } }}>Amenities</Link>
              <Link href="#ratings" underline="none" sx={{ marginX: 2, color: 'black', transition: 'color 0.3s', '&:hover': { color: 'grey' } }}>Ratings and reviews</Link>
              <Link href="#explore" underline="none" sx={{ marginX: 2, color: 'black', transition: 'color 0.3s', '&:hover': { color: 'grey' } }}>Explore the area</Link>
            </Box>

            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ marginRight: 2 }}>£{price}</Typography>
              <Button variant="contained" color="primary" size="large">View deals</Button>
            </Box>
          </Box>

          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 7 }}>
            {/* Icons and Text for Each Item */}
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <SearchIcon sx={{ marginRight: 1 }} />
              <Typography variant="caption" sx={{ textAlign: 'left' }}>
                Find the best hotel in London for your dates, by price or preference
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: "center", flex: 1 }}>
              <LocalOfferIcon sx={{ marginRight: 1 }} />
              <Typography variant="caption" sx={{ textAlign: 'left' }}>
                Compare deals for Kimpton - Fitzroy London, an IHG Hotel across hundreds of sites, all in one place
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <BedIcon sx={{ marginRight: 1 }} />
              <Typography variant="caption" sx={{ textAlign: 'left' }}>
                Look out for a deal with free cancellation or <br /> excellent ratings
              </Typography>
            </Box>
          </Box>
        </Container>
      </>
    )}

    
    <Box sx={{ height: sticky ? `${stickyHeight}px` : '0px' }}>
      
    </Box>
  </>
  
    
  );
};

export default IndividualHotelTabs;
