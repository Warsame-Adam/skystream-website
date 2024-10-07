import React from "react"
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, Grid, TextField, Container, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {toggleFAQ } from "../Slices/FAQVisible";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqArray = [
    {
      question: "How can I find the best-value hotels on Skyscanner?",
      answer: "Search your chosen destination for your selected dates and select ‘Best’. To be clear, by ‘Best’, we’re talking hotels we’ve gathered based on value for money, reviews, and location. If you’re looking for hotel deals specifically, take a look at our hotel deals page."
    },
    {
      question: "Do I book my hotel directly through Skyscanner?",
      answer: "No – as a travel search engine, we’ll show you a range of hotel deals, but we don’t take bookings or payments. Once you’ve chosen a hotel, we’ll transfer you to the hotel provider’s site to complete your booking."
    },
    {
      question: "How do I know I’m getting a price that reflects the best value?",
      answer: "We always show the best-value price we can find from the hotel suppliers we offer, and give you the most up-to-date price overview."
    },
    {
      question: "Are hotels cheaper at certain times of the year than others?",
      answer: "They can be, yes. But it depends on a few things, such as the destination you have in mind, and room availability. There’s no exact science, so our advice would be to look out for hotel deals and promotions."
    }
  ];
  


const HotelFAQ = () => {

    const dispatch = useDispatch();
    
    
    const visibleFAQs = useSelector((state) => state.faqVisible.visibleFAQs);
  
    const handleToggleFAQ = (index) => {
      dispatch(toggleFAQ(index)); 
    };


    return (
        <Container sx={{marginTop:4}}>
            
        <Typography variant="h6" sx={{fontWeight:"bold", paddingBottom:"10px"}}>
        Finding flight deals: frequently asked questions
        </Typography>

        <Box>
            {faqArray.map((faq, index) => (
                <Box>
                    <Box  onClick={() => handleToggleFAQ(index)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: '5px' }}>
                        <Typography
                        
                        sx={{
                            borderBottom: '0.5px solid grey',
                            paddingBottom: '5px',
                            flexGrow: 1,
                            fontWeight: 'bold',
                            FontSize:"20px"
                        }}>
                            {faq.question}
                        </Typography>
                        
                        
                        <IconButton
                       
                        sx={{color:"black", marginLeft:-3.5, transform: visibleFAQs[index] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                            <ExpandMoreIcon />
                        </IconButton>
                    </Box>
                    
                    
                    {visibleFAQs[index] && (
                        <Typography  sx={{ marginTop: "10px", fontSize:"16px"}}>
                            {faq.answer}
                        </Typography>
                    )}
                </Box>
            ))}
        </Box>




    </Container>

    )
}


export default HotelFAQ