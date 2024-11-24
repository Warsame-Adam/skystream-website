import React from "react";
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, Grid, TextField, Container, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {toggleFAQ } from "./Slices/FAQVisible";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const faqData = [
    {
      question: "What’s the weather like in Amsterdam?",
      answer: "In Amsterdam, the expected average temperature in November is 7°C. The warmest month is typically August, which averages 21°C. The coolest month is January, with temperatures averaging 1°C. The rainiest month is November, and the driest month is April."
    },
    {
      question: "Can I cancel or amend my hotel reservation last minute if I need to?",
      answer: "You can always cancel or amend your hotel reservation if you need to, but look out for hotels in Amsterdam with free cancellation or flexible booking options if you want to protect your money. Some hotels allow you to cancel and get your money back if your plans change."
    },
    {
      question: "Can I get a last-minute Amsterdam hotel deal?",
      answer: "Of course - the cheapest hotel deal we found within the next seven days is £23 per night. If you need somewhere in the next 24 hours, we've found you somewhere to stay for £24 per night."
    },
    {
      question: "Is it more expensive to stay in Amsterdam hotels on weekends?",
      answer: "The average price of a hotel during the week is £142 per night, and the average price on weekends is £166. Overall, it looks like the cheapest day to stay in Amsterdam could be Sunday."
    },
    {
      question: "What airports are the closest to the centre of Amsterdam?",
      answer: "The nearest airport to Amsterdam is Amsterdam Schiphol Airport (AMS), which is 6.9 miles from the city centre. Other airports include: Rotterdam Airport, which is 34.3 miles from the city centre."
    },
    {
      question: "What day is cheapest to stay in hotels in Amsterdam?",
      answer: "The cheapest day to stay in a hotel in Amsterdam typically depends on the availability and demand. Sunday is often the most affordable day."
    },
    
  ];
  





const CityHotelsFAQs = () => {

    const dispatch = useDispatch();
    
    
    const visibleFAQs = useSelector((state) => state.faqVisible.visibleFAQs);
  
    const handleToggleFAQ = (index) => {
      dispatch(toggleFAQ(index)); 
    };
    
    
    return (
        <Container sx={{transform: 'translateX(-45px)', marginTop:"30px"}}>
        <Box sx={{width:"75%"}}>
        {faqData.map((faq, index) => (
            <Box>
                <Box  onClick={() => handleToggleFAQ(index)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: '5px' }}>
                    <Typography
                    
                    sx={{
                        borderBottom: '0.5px solid grey',
                        paddingBottom: '5px',
                        flexGrow: 1,
                        fontWeight: 'bold',
                        FontSize:"25px"
                    }}>
                        {faq.question}
                    </Typography>
                    
                    
                    <IconButton
                   
                    sx={{color:"black", marginLeft:-3.5, transform: visibleFAQs[index] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                        <ExpandMoreIcon />
                    </IconButton>
                </Box>
                
                
                {visibleFAQs[index] && (
                    <Typography  sx={{ marginTop: "10px", fontSize:"16px", borderBottom:"1px solid #ccd1d8", marginBottom:"10px",}}>
                        {faq.answer}
                    </Typography>
                )}
            </Box>
        ))}
    </Box>

    </Container>

    )
}



export default CityHotelsFAQs;