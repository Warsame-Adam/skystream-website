import React from "react";
import { AppBar,Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import Hotelimg from "../../Components/Assets/HotelHeroimg.jpg";


const inputStyle = {
    borderRight: "1px solid grey",
    
    
    backgroundColor:"background.paper",
    color:"black",
    
    padding: '20px 15px',
    '&:focus': {
        borderColor: 'primary.main',
    },

}






const HeroHotel = () => {


    return (
    <Box sx={{position:"relative"}}> 
        <Box sx={{
        width: '100%',
        height: '700px',
        overflow: 'hidden'
        }}
         >
            <img
            src={Hotelimg}
            alt="Hero"
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}/>
        </Box>
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '1200px',
            backgroundColor: '#002540',
            padding: '20px',
            borderRadius: '8px',
            height:"130px"
      }}>
        <Typography component="div" sx={{marginBottom:"5px", color:"white", fontSize:"11px"}}>
        <span style={{ marginRight: '453px'}}>Where do you want to stay?</span>
        <span style={{ marginRight: '104px' }}>Check in</span>
        <span style={{ marginRight: '98px'}}>Check out</span>
        <span style={{}}>Guests and rooms</span>
      </Typography>


        <Box sx={{display:"flex", alignItems:"center"}}>
            <Input placeholder="Enter destination or hotel name" disableUnderline sx={{ ...inputStyle,width:"590px", height:"55px", borderRadius: '8px 0 0 8px',}} />
            <Input placeholder="Date" disableUnderline sx={{ ...inputStyle, width:"148px", height:"55px" }} />
            <Input placeholder="Date" disableUnderline sx={{ ...inputStyle, width:"148px", height:"55px" }} />
            <Input placeholder="Rooms" disableUnderline sx={{ ...inputStyle, width:"300px", height:"55px",borderRadius: '0 8px 8px 0', }} />

        </Box>
        <Box sx={{marginTop:"10px", display:"flex", alignItems:"center"}}>
            <Typography sx={{marginRight:"20px", color:"white", fontSize:"13px", fontWeight:"bold"}}>
                Popular Filters:
            </Typography>
            <FormControlLabel control={<Checkbox disableRipple />} label="Free cancellation" sx={{color: 'white', fontSize:"10px"}}/>
            <FormControlLabel control={<Checkbox disableRipple />} label="4 stars" sx={{color: 'white', fontSize:"10px", textAlign:"center"}} />
            <FormControlLabel control={<Checkbox disableRipple  />} label="3 stars" sx={{color: 'white', fontSize:"10px"}} />
        </Box>




        </Box>
    </Box>


    )
}


export default HeroHotel;