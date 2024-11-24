import React from "react";



import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import companyLogo from '../../Components/Assets/company-logo.png';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import FavoriteIcon from '@mui/icons-material/Favorite';


const CityHotelNavbar = () => {


    return (
        
            <AppBar position="static" sx={{backgroundColor:"#05203c", padding:"20px 310px", height:"400px"}}>
                <Toolbar   sx={{display:"flex",justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <IconButton>
                            <Avatar src={companyLogo} />
                        </IconButton>
                        <Box sx={{
                            display: "flex",
                            mt:2,
                            
                            }}>
                            <Button 
                            sx={{
                                fontSize:"13.5px",
                                backgroundColor:"#05203c",
                                color:"white",
                                textTransform:"none",
                                '&:hover': {
                                    backgroundColor:"#154679"
                                },
                                border: "0.5px solid white",
                                borderRadius: "75px",
                                padding:"5px 15px",
                                mx: 0.5,}} 
                                variant="contained" startIcon={<FlightIcon sx={{width:"20px", height:"20px"}} />}>
                                    Flights
                            </Button>
                            <Button 
                            sx={{
                                fontSize:"13.5px",
                                backgroundColor:"#05203c",
                                color:"white",
                                textTransform:"none",
                                '&:hover': {
                                    backgroundColor:"#154679"
                                },
                                border: "0.5px solid white",
                                borderRadius: "75px",
                                padding:"5px 15px",
                            }} 
                            variant="contained" 
                            startIcon={<HotelIcon sx={{width:"17px", height:"20px"}} />}>
                                Hotels
                            </Button>
                        </Box>
                        
                    </Box>
                    <Box sx={{display:"flex", gap:"6px", alignItems:"center"}}>
                        <Typography underLine="hover" sx={{fontSize:"14px",cursor:"pointer"}}>
                            Help
                        </Typography>
                        <Typography  sx={{border:"0.5px solid grey", 
                            padding:"8px 15px", 
                            borderRadius:"5px",
                            fontSize:"11px", 
                            backgroundColor:"rgba(255, 255, 255, 0.11)",
                            '&:hover': {
                                backgroundColor:"black"},
                                cursor:"pointer"
                            }}>
                            United Kingdom - English (UK) • £ GBP
                        </Typography>
                        
                        <IconButton>
                            <FavoriteIcon sx={{
                                color:"white", 
                                '&:hover': {
                                backgroundColor:"grey"},
                                cursor:"pointer"
                          
                                
                                }} />
                        </IconButton>
                        <Box sx={{ 
                            border:"0.5px solid grey", 
                            padding:"7px 25px",
                            color:"black",
                            fontWeight:"bold",
                            backgroundColor:"#e0e4e9", 
                            borderRadius:"10px",
                            '&:hover': {
                                backgroundColor:"#c1c7cf"},
                                cursor:"pointer"
                          }}>
                            Log in

                        </Box>
                        
                    </Box>


                </Toolbar>
            </AppBar>

        
    )
}

export default CityHotelNavbar;
