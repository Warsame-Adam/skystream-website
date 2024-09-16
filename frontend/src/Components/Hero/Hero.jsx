import React from "react"
import {Input, AppBar,Menu, Toolbar, IconButton, Container, Avatar, Typography, Button, Box, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import HeroImage  from  "../../Components/Assets/HeroImage.png"





const Hero = () => {




    const HeroStyles = {
        display:"flex",
        alignItems:"center",
        border:"0.5px solid black",
        padding:"15px 180px 15px 10px",
        borderRadius:"10px",
        flexGrow:1,
        minWidth: "200px",
        marginLeft:-3.5,
        marginRight: 6,
        backgroundColor:"primary.dark",
        color:"white",
        '&:hover': {
            backgroundColor:"primary.main"
        },


    }

    return (
        <Container sx={{marginTop:16.5,  display: "flex", justifyContent: "space-evenly", flexDirection:"column"}}>
            <Box sx={{display:"flex", alignItems:"center", marginBottom:"30px"}}>
            <Box sx={{...HeroStyles}}>
                <IconButton disabled>
                    <TravelExploreIcon sx={{ color: "white" }}/>

                </IconButton>
                <Typography>
                    Explore Everywhere
                </Typography>
            </Box>

            <Box sx={{...HeroStyles}}>
                <IconButton disabled>
                    <BedOutlinedIcon sx={{ color: "white" }}/>

                </IconButton>
                <Typography>
                    Hotels
                </Typography>
            </Box>

            <Box sx={{...HeroStyles, marginRight:0}}>
                <IconButton disabled>
                    <FlightTakeoffOutlinedIcon sx={{ color: "white" }}/>

                </IconButton>
                <Typography>
                    Flights
                </Typography>
            </Box>
            </Box>

            <Box sx={{position:"relative"}}>

            <Box 
            sx={{ display: 'flex', justifyContent: 'center', padding: '20px 0', width:"100%"}}>
                <img 
                src={HeroImage}
                alt="Hero" 
                style={{width: "100%" ,maxWidth: '1200px', height: '500px', borderRadius: '10px', objectFit: 'cover' }} />
                
            </Box>

            <Box sx={{position:"absolute",  top: "40%", left: "20%", transform: "translate(-40%, -20%)", color: 'white', zIndex:1 }}>
                <Typography>
                    <span style={{fontWeight:"bold", fontSize:"45px"}}>Go further, get <br /> closer</span>
                    <br />
                    <span>Sneak off for a romantic hotel stay with prices <br/> you'll love. </span>
                </Typography>
                <Box sx={{backgroundColor:"white", color:"black", border:"0.1px solid black", borderRadius:"5px", padding:"5px 15px", display:"inline-block"}}>
                    Find your room
                </Box>

            </Box>
            </Box>




        </Container>
        

        

    )
}



export default Hero;