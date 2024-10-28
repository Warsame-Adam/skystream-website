import React from "react"
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, Grid, TextField, Container, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {toggleFAQ } from "./Slices/FAQVisible";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const IndividualHotelFaqData = [
    {
        hotelName: "Kimpton - Fitzroy London, an IHG Hotel" ,
        faq: [
            {
                question: "Does Kimpton - Fitzroy London, an IHG Hotel have a restaurant?",
                answer: "Yes, Kimpton - Fitzroy London, an IHG Hotel does have a restaurant."
            },

            {
                question: "What time is check-in and check-out at Kimpton - Fitzroy London, an IHG Hotel?",
                answer: "At Kimpton - Fitzroy London, an IHG Hotel you can check in from 15:00, and you'll need to check out before 12:00."
            },

            {
                question: "Does Kimpton - Fitzroy London, an IHG Hotel have parking?",
                answer: `No, there isn't any parking available at Kimpton - Fitzroy London, an IHG Hotel. If you're looking for a hotel with space to park, simply filter by properties which have 'Parking' under 'Amenities' in the search results.`


            },

            {
                question: "How far away from London city centre is Kimpton - Fitzroy London, an IHG Hotel?",
                answer: "Kimpton - Fitzroy London, an IHG Hotel is 1.0 miles away from London city centre."
            }
        ]
    
    }
]

const IndividualHotelFAQ = () => {

    const dispatch = useDispatch();
    
    
    const visibleFAQs = useSelector((state) => state.faqVisible.visibleFAQs);
  
    const handleToggleFAQ = (index) => {
        dispatch(toggleFAQ(index));
      };
    
      return (
        <Container sx={{ marginTop: "50px" }}>
          {IndividualHotelFaqData.map((hotel, hotelIndex) => (
            <Box key={hotelIndex} sx={{ marginBottom: "20px" }}>
              <Typography sx={{ fontWeight: "bold", paddingBottom: "10px", fontSize: "28px" }}>
                {hotel.hotelName}: FAQs
              </Typography>
    
              {hotel.faq.map((faqItem, faqIndex) => (
                <Box key={faqIndex}>
                  <Box
                    onClick={() => handleToggleFAQ(faqIndex)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid grey",
                      cursor: "pointer",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "20px", flex: 1 }}>
                      {faqItem.question}
                    </Typography>
                    <IconButton
                      sx={{
                        color: "black",
                        transform: visibleFAQs[faqIndex] ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Box>
                  
                  {visibleFAQs[faqIndex] && (
                    <Box sx={{ padding: "10px 0"}}>
                      <Typography sx={{ fontSize: "16px", color: "black" }}>
                        {faqItem.answer}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Container>
      );
}


export default IndividualHotelFAQ;