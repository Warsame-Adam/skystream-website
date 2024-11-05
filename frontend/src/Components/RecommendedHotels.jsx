import React, { useState } from "react"
import {  Tabs, Tab,Menu, Link, Input, Grid, IconButton, Typography, Button, Box, Container, Card, CardContent, CardMedia,  } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { similarHotelsData, topHotelsData, popularHotelsData } from "./HotelData";
import { setRecommendedHotels } from "./Slices/hotelSlice";
import {useDispatch, useSelector } from "react-redux";

const RecommendedHotels = () => {
    const dispatch = useDispatch();

    const recommendedHotels = useSelector((state) => state.hotels.recommendedHotels);

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {

        setSelectedTab(newValue);
    };

    const [indices, setIndices] = useState({
        0: 0,
        1: 0,
        2: 0,
    });

    const hotelDataMap = {
        0: similarHotelsData,
        1: topHotelsData,
        2: popularHotelsData,
    };

    console.log("Data for selected tab:", hotelDataMap[selectedTab]);
    console.log("Starting index for current tab:", indices[selectedTab]);

    const handleNext = () => {
        setIndices(prevIndices => {
            const maxIndex = hotelDataMap[selectedTab].length - 3;
            const newIndices = { ...prevIndices };
            if (prevIndices[selectedTab] < maxIndex) {
                newIndices[selectedTab] += 3;
            }
            return newIndices;
        });
    };

    const handlePrev = () => {
        setIndices(prevIndices => {
            const newIndices = { ...prevIndices };
            if (prevIndices[selectedTab] > 0) {
                newIndices[selectedTab] -= 3;
            }
            return newIndices;
        });
    };

    const currentHotels = hotelDataMap[selectedTab].slice(
        indices[selectedTab],
        indices[selectedTab] + 3
    );

    console.log("Current hotels to display:", currentHotels);





    





    return (
        <Container sx={{marginTop:"30px", marginBottom:"150px"}}>
            <Typography sx={{fontSize:"30px", fontWeight:"bold", marginBottom:"10px", marginLeft:"17px"}}>
                Other recommended hotels
            </Typography>

            <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" TabIndicatorProps={{ style: { display: 'none' } }} sx={{borderBottom: '1px solid #d4d8de '}}>

                <Tab 
                label="Similar hotels nearby" 
                disableRipple 
                sx={{
                    color:"grey",
                    textTransform:"none",
                    fontSize:"16px", 
                    position:"relative", 
                    '&.Mui-selected': {color:"#0062e3"}, 
                    '&:hover::after': { 
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "3px",
                        backgroundColor: "#e0e4e9",
                                     }
                    }}/>
        
                <Tab 
                label="Top recommended hotels nearby" 
                disableRipple 
                sx={{
                    color:"grey",
                    textTransform:"none", 
                    fontSize:"16px", 
                    position:"relative", 
                    '&.Mui-selected': {color:"#0062e3"}, 
                    '&:hover::after': { 
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "3px",
                        backgroundColor: "#e0e4e9",                   
                                      }
                    }}/>
                    
                <Tab 
                label="Most popular hotels" 
                disableRipple 
                sx={{
                    color:"grey", 
                    textTransform:"none", 
                    fontSize:"16px", 
                    position:"relative", 
                    '&.Mui-selected': {color:"#0062e3"}, 
                    '&:hover::after': { 
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "3px",
                        backgroundColor: "#e0e4e9",
                                      }
                    }}/>


            </Tabs>
            
            
            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1} my={1}>
        <IconButton 
          disabled={indices[selectedTab] === 0} 
          onClick={handlePrev}
          sx={{}}
        >
          <KeyboardArrowLeftOutlinedIcon fontSize="medium" />
        </IconButton>
        
        <IconButton 
        disabled={indices[selectedTab] + 3 >= hotelDataMap[selectedTab].length}
          
          onClick={handleNext}
          sx={{}}
        >
          <KeyboardArrowRightOutlinedIcon fontSize="medium" />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
    {currentHotels.map((hotel, index) => (
        <Card key={index} sx={{ width: 350, borderRadius: 3, boxShadow: 4 }}>
            
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={hotel.hotelImage}
                    alt={hotel.hotelName}
                    sx={{ borderRadius: '12px 12px 0 0' }}
                />
                
                <Box sx={{ 
                    position: 'absolute', 
                    bottom: 10, 
                    left: 10, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}>
                    
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'white', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }}>
                        {hotel.hotelName}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {Array.from({ length: 5 }).map((_, starIndex) =>
                            starIndex < hotel.stars ? (
                                <StarIcon key={starIndex} fontSize="small" sx={{ color: 'orange' }} />
                            ) : (
                                <StarBorderIcon key={starIndex} fontSize="small" sx={{ color: 'white' }} />
                            )
                        )}
                    </Box>
                </Box>
            </Box>

        
            <CardContent sx={{ textAlign: 'center', padding: '8px 16px' }}>
                
                <Typography variant="body2" sx={{ color: '#5c5c5c', fontSize: '0.75rem' }}>
                    {hotel.dFromHotel}
                </Typography>

            
                <Typography variant="h6" sx={{ marginTop: '8px', fontWeight: 'bold', color: 'black', fontSize: '1rem' }}>
                    {hotel.Price}
                </Typography>
            </CardContent>
        </Card>
    ))}
</Box>




     


      


        </Container>
)
}


export default RecommendedHotels;