import React from "react";
import { Tabs, Tab, Box, Card, CardMedia, CardContent, Typography, IconButton, Container } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {useDispatch, useSelector } from "react-redux";
import { setCurrentFabCityIndex} from '../Slices/hotelSlice';
import { fabCityHotelLocations} from "../HotelData.js";


const CityHotelSelection = () => {

    const dispatch = useDispatch();

  const selectedCity = useSelector((state) => state.hotels.selectedCity);
const currentFabCityIndex = useSelector((state) => state.hotels.currentFabCityIndex);


    const handleNext = () => {
        if (currentFabCityIndex + 3 < fabCityHotelLocations.length) {
           dispatch(setCurrentFabCityIndex(currentFabCityIndex + 3));
        }
      };
    
      const handlePrev = () => {
        if (currentFabCityIndex > 0) {
            dispatch(setCurrentFabCityIndex(currentFabCityIndex - 3));
        }
      };

    const visibleCities = fabCityHotelLocations.slice(currentFabCityIndex, currentFabCityIndex + 3)

    return (
        <Container>
            <Typography sx={{fontWeight:"bold", fontSize:"28px"}}>
            Hotels for fab city breaks
            </Typography>

            <Typography sx={{fontSize:"16px", marginBottom:"15px"}}>
            The key to a great city break? A perfectly-placed base. Check out the best city centre hotels.

            </Typography>

            <Box display="flex" justifyContent="center" alignItems="center" my={4}>

                <Box display="flex" justifyContent="space-between" width="100%">
                {visibleCities.map((hotel, index) => (
                  <Card key={index} sx={{ flex: 1, margin: 1, height: "300px", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardMedia
                    component="img"
                    height="190px"
                    image={hotel.image}
                    alt={hotel.name}
                  />
                  <CardContent sx={{ padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <Typography sx={{ color: 'black', fontSize: "19px", fontWeight: "bold", marginBottom: '4px' }}>
                      {hotel.city}
                    </Typography>
                
                    <Typography sx={{ color: 'black', fontSize: "11px", marginBottom: '8px' }}>
                      {hotel.country}
                    </Typography>
                
                    <Box sx={{ textAlign: 'right', marginTop: '4px', marginBottom: '5px' }}>
                      <Typography sx={{ color: 'grey', fontSize: "11px" }}>
                        From
                      </Typography>
                      <Typography sx={{ color: 'black', fontSize: "15px", fontWeight: "bold" }}>
                        {hotel.price}
                      </Typography>
                      <Typography sx={{ color: 'grey', fontSize: "11px" }}>
                        per night
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                

                

          ))}




                </Box>



            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" gap={1} my={2}>
        <IconButton 
          disabled={currentFabCityIndex === 0} 
          onClick={handlePrev}
          sx={{}}
        >
          <KeyboardArrowLeftIcon fontSize="small" />
        </IconButton>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: currentFabCityIndex === index * 3 ? 'darkgrey' : 'lightgrey',
            }}
          />
        ))}
        <IconButton 
          disabled={currentFabCityIndex + 3 >= fabCityHotelLocations.length} 
          onClick={handleNext}
          sx={{}}
        >
          <KeyboardArrowRightIcon fontSize="small" />
        </IconButton>
      </Box>


            

        </Container>
    )
}


export default CityHotelSelection;