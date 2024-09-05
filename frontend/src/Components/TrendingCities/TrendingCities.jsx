import React, { useRef, useState } from "react"
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, TextField, MenuItem, Checkbox, FormControlLabel, Container, getCheckboxUtilityClass } from '@mui/material';
import { styled } from '@mui/material/styles';
import Amsterdam from  "../../Components/Assets/Amsterdam-Netherlands.png";
import Bangkok from  "../../Components/Assets/Bangkok-Thailand.png";
import Barcelona from  "../../Components/Assets/Barcelona-Spain.png";
import Istanbul          from  "../../Components/Assets/Istanbul-Turkey.png";
import Lisbon from  "../../Components/Assets/Lisbon-Portugal.png";
import Málaga from   "../../Components/Assets/Malaga-Portugal.png";
import Milan from  "../../Components/Assets/Milan-Italy.png";
import Venice from  "../../Components/Assets/Venice-Italy.png";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';




const cities = [
           {image:Amsterdam, label:"Amsterdam, Netherlands", flight:"Flight from London Stansted Airport", date: '4 Sept - 11 Sept · Round trip'},
           {image:Bangkok, label:"Bangkok, Thailand", flight:"Flight from London Stansted Airport", date: '4 Sept - 11 Sept · Round trip'},
           {image:Barcelona, label:"Barcelona, Spain", flight:"Flight from London Stansted Airport", date: '4 Sept - 11 Sept · Round trip'},
           {image:Istanbul, label:"Istanbul, Turkey", flight:"Flight from London Stansted Airport", date: '4 Sept - 11 Sept · Round trip'},
           {image:Lisbon, label:"Lisbon, Portugal", flight:"Flight from London Stansted Airport", date: '4 Sept - 11 Sept · Round trip'},
           {image:Málaga , label:"Málaga, Spain ", flight:"Flight from London Stansted Airport", date: '4 Sept - 11 Sept · Round trip'},
           {image:Milan, label:"Milan, Italy", flight:"Flight from London Stansted Airport", date: '4 Sept - 11 Sept · Round trip'},
           {image:Venice, label:"Venice, Italy", flight:"Flight from London Stansted Airport", date: '4 Sept - 11 Sept · Round trip'},
           
]


const TrendingCities = () => {

    const [scroll, setScroll] = useState(0);

    const slideForward = () => {
        if (slider.current) {
            const newScrollPosition = scroll + 300;
            slider.current.scrollLeft = newScrollPosition;
            setScroll(newScrollPosition);
          }
        
        

        
      };

    const slideBackword = () => {
        if (slider.current) {
            const newScrollPosition = scroll - 300; 
            slider.current.scrollLeft = newScrollPosition;
            setScroll(newScrollPosition);

        }
    }

    const showBackwardArrow = scroll > 0;

    const slider = useRef();

    

    return (
        <Container>
            <Box 
            sx = 
            {{
                display:"flex",
                width: '100%',
                flexDirection: 'column',
                alignItems: 'flex-start',
                mt:5,
                ml:"-1.9%",
                position:"Relative"
    


        }}>
            <Typography variant="h4" 
            sx = 
            {{ 
                mb: 4,
            }}>
                <span>Trending Cities</span>
                <br />
                <span 
                style = 
                {{ 
                    fontSize: '16px', 
                    color: '#666' 
                }}>
                    Book flights to a destination popular with travellers from the United Kingdom
                </span>
            </Typography>

            {showBackwardArrow && (
    <IconButton
      onClick={slideBackword}
      sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
    >
      <KeyboardArrowLeftOutlinedIcon />
    </IconButton>
  )}
            <Box ref={slider}  
            sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                overflowX: 'hidden',
                scrollBehavior: 'smooth',
                width: '100%'}}>
                    {cities.map((City) => (
                        <Box key={City.label} 
                        sx={{
                            flex: '0 0 auto',
                            width: '25%', 
                            textAlign: 'center',
                            marginRight: '10px',}}>
                                <img
                                src={City.image}
                                alt={City.label}
                                style = {{
                                    width: '100%',
                                    height: '200px',
                                    borderRadius: '8px',
                                    objectFit: 'cover',}}/>
                                    <Typography variant="body3" sx={{ mt: 1, fontWeight: 'bold' }}>
                                        {City.label}
                                    </Typography>
                                    <Typography variant="body2" color="grey">
                                        {City.flight}
                                    </Typography>
                                    <Typography variant="body2" color="grey">
                                        {City.date}
                                    </Typography>
                                    </Box>
                                ))}
                                 <IconButton
            onClick={slideForward}
            sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                <KeyboardArrowRightOutlinedIcon />
                </IconButton>

                    
           </Box> 

            </Box>

         </Container>

    )
}



export default TrendingCities;