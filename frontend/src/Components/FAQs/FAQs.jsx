import React from "react"
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, Grid, TextField, Container, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import {toggleFAQ } from "../Slices/FAQVisible";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const faqData = [
    { question: 'How does SkyStream work?', answer: 'SkyStream works by allowing you to search and book flights quickly and efficiently...' },
    { question: 'How can I find the cheapest flight?', answer: 'You can find the cheapest flight by using our filters to compare prices from multiple providers.' },
    { question: 'Where should I book a flight to right now?', answer: 'It depends on your preferences, but popular destinations are currently Rome, Bangkok, and Istanbul.' },
    { question: 'Do I book my flight with SkyStream?', answer: 'No, SkyStream allows you to compare flights and book directly with the provider.' },
    { question: 'What happens after I book my flight?', answer: 'You will receive a confirmation email from the airline or provider you booked with.' },
    { question: 'Can I cancel my flight?', answer: 'You can cancel your flight, but it depends on the provider’s cancellation policy.' }
  ];
  
  const FAQs = () => {
    const dispatch = useDispatch();
    
    
    const visibleFAQs = useSelector((state) => state.faqVisible.visibleFAQs);
  
    const handleToggleFAQ = (index) => {
      dispatch(toggleFAQ(index)); 
    };
  
    return (
        <Container sx={{marginTop:3, transform:"translateX(-45px)"}}>
            <Typography variant="h6" sx={{fontWeight:"bold", paddingBottom:"20px"}}>
                Booking flights with SkyStream
            </Typography>
        <Grid container spacing={3} sx={{width:"1250px"}}>
      {faqData.map((faq, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Box>
            <Box onClick={() => handleToggleFAQ(index)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '5px', cursor:"pointer" }}>
              <Typography
                
                sx={{
                  borderBottom: '0.5px solid #c1c7cf',
                  paddingBottom: '10px',
                  flexGrow: 1,
                  fontWeight: 'bold',
                  fontSize:"15px"

                }}
              >
                {faq.question}
              </Typography>
              
              <IconButton
                
                sx={{color:"black", marginLeft:-3.5, transform: visibleFAQs[index] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', }}
              >
                <ExpandMoreIcon sx={{fontSize:"20px"}} />
              </IconButton>
            </Box>

            
            {visibleFAQs[index] && (
              <Typography  sx={{ marginTop: '10px', fontStyle: 'italic', fontSize:"14px"}}>
                {faq.answer}
              </Typography>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
    </Container>
    
     
    );
  };
  


export default FAQs