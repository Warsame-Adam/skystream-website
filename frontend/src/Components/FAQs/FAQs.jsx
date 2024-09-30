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
        <Container sx={{marginTop:4}}>
            <Typography variant="h6" sx={{fontWeight:"bold", paddingBottom:"10px"}}>
                Frequently asked questions
            </Typography>
        <Grid container spacing={3}>
      {faqData.map((faq, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '5px' }}>
              <Typography
                variant="subtitle1"
                sx={{
                  borderBottom: '0.5px solid grey',
                  paddingBottom: '5px',
                  flexGrow: 1,
                  fontWeight: 'bold'

                }}
              >
                {faq.question}
              </Typography>
              
              <IconButton
                onClick={() => handleToggleFAQ(index)}
                sx={{color:"black", marginLeft:-3.5, transform: visibleFAQs[index] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>

            
            {visibleFAQs[index] && (
              <Typography variant="subtitle1" sx={{ marginTop: '10px', fontStyle: 'italic'}}>
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