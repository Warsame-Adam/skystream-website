import React, { useRef, useState } from "react"
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, TextField, MenuItem, Checkbox, FormControlLabel, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paris from "../../Components/Assets/Paris.png";
import Athens from "../../Components/Assets/athens.png";
import Sydney from "../../Components/Assets/Sydney.png";
import Antalya from "../../Components/Assets/antalya-turkey.png";
import Rome from "../../Components/Assets/rome.png";
import Cardiff from "../../Components/Assets/cardiff.png";
import Edinburgh from "../../Components/Assets/Edinburgh.png";
import Dublin from "../../Components/Assets/Dublin.png"
import Dubai from  "../../Components/Assets/dubai.png"
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';




const PopularFlights = () => {

    const [selectedTab, setSelectedTab] = useState('International');
    const [scrollPosition, setScrollPosition] = useState(0);


    const slider = useRef();
    

    const slideForward = () => {
        if (slider.current) {
            const newScrollPosition = scrollPosition + 300;
            slider.current.scrollLeft = newScrollPosition;
            setScrollPosition(newScrollPosition);
          }
        
        

        
      };

    const slideBackword = () => {
        if (slider.current) {
            const newScrollPosition = scrollPosition - 300; 
            slider.current.scrollLeft = newScrollPosition;
            setScrollPosition(newScrollPosition);

        }
        
        
};

const showBackwardArrow = scrollPosition > 0;



    const International = [
        {image:Athens, label:"London to Athens", date: '4 Sept - 11 Sept · Round trip'},
        {image:Rome, label:"London to Rome", date: '4 Sept - 11 Sept · Round trip'},
        {image:Dubai, label:"London to Dubai", date: '4 Sept - 11 Sept · Round trip'},
        {image:Antalya, label:"London to Antalya", date: '4 Sept - 11 Sept · Round trip'},
        {image:Sydney, label:"London to Sydney", date: '4 Sept - 11 Sept · Round trip'},
        {image: Paris, label: "London to Paris", date: '4 Sept - 11 Sept · Round trip'}
    ];

    const Domestic = [
        {image:Cardiff, label:"London to Cardiff", date: '4 Sept - 11 Sept · Round trip'},
        {image:Edinburgh, label:"London to Edinburgh", date: '4 Sept - 11 Sept · Round trip'},
        {image:Dublin, label:"London to Dublin", date: '4 Sept - 11 Sept · Round trip'},
        
    ]

    const destinations = selectedTab === 'International' ? International : Domestic;


    return (
        <Container>
        <Box 
        sx ={{
            display:"flex",
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            mt:15,
            ml:"-1.9%",
            position:"Relative"
    


        }}>
            <Typography variant="h4" sx={{ mb: 4,
                 
              }}>
                <span>Popular flights near you</span>
                <br />
                <span style={{ fontSize: '16px', color: '#666' }}>
                    Find deals on domestic and international flights
                </span>
            </Typography>
            <Box>
                <Typography sx={{mb:2}}>
                    <span 
                    style = 
                    {{
                        marginRight: '10px',
                        cursor: 'pointer',
                        color: selectedTab === 'International' ? 'primary.main' : 'inherit',
                        borderBottom: selectedTab === 'International' ? '2px solid blue' : 'none',
                        padding: '10px',
                        
                        '&:hover': {
                            backgroundColor: 'lightgrey',
                            borderRadius: '5px',
                        },
                        }} 
                        onClick={() => setSelectedTab('International')}>
                            International
                        </span>
                    <span 
                    style = 
                    {{
                        cursor: 'pointer',
                        color: selectedTab === 'Domestic' ? 'primary.main' : 'inherit',
                        borderBottom: selectedTab === 'Domestic' ? '2px solid blue' : 'none',
                        padding: '10px',
                        
                        '&:hover': {
                            backgroundColor: 'lightgrey',
                            borderRadius: '5px',
                        },
                        }} 
                        onClick={() => setSelectedTab('Domestic')}>
                            Domestic
                    </span>
                </Typography>



  {showBackwardArrow && destinations.length > 4 && (
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
    
    
    {destinations.map((destination) => (
        <Box key={destination.label} 
        sx={{
            flex: '0 0 auto',
            width: selectedTab === 'Domestic' ? '30%' : '25%', 
            textAlign: 'center',
            marginRight: '10px',
        }}>
            <img
            src={destination.image}
            alt={destination.label}
            style = 
            {{
                width: '100%',
                height: '200px',
                borderRadius: '8px',
                objectFit: 'cover',
            }}/>
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                {destination.label}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {destination.date}
            </Typography>
            </Box>
        ))}
        </Box>
        {destinations.length > 4 && (
            <IconButton
            onClick={slideForward}
            sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                <KeyboardArrowRightOutlinedIcon />
                </IconButton>
            )}
            </Box>
            </Box>
            </Container>
            )
        }


export default PopularFlights;