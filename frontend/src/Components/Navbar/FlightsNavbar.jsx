import React from "react"
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import companyLogo from '../../Components/Assets/company-logo.png';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import FavoriteIcon from '@mui/icons-material/Favorite';


const navFlights = () => {


    return (
        
            <AppBar position="static" sx={{backgroundColor:"primary.dark", padding:"20px 310px"}}>
                <Toolbar  sx={{display:"flex",justifyContent: 'space-between', alignItems: 'flex-start'}}>
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
                                backgroundColor:"primary.dark",
                                color:"text.primary",
                                textTransform:"none",
                                '&:hover': {
                                    backgroundColor:"rgba(21,70,121,255)"
                                },
                                border: "0.5px solid white",
                                borderRadius: "75px",
                                mx: 0.5,}} 
                                variant="contained" startIcon={<FlightIcon />}>
                                    Flights
                            </Button>
                            <Button 
                            sx={{
                                backgroundColor:"primary.dark",
                                color:"text.primary",
                                textTransform:"none",
                                '&:hover': {
                                    backgroundColor:"primary.light"
                                },
                                border: "0.5px solid white",
                                borderRadius: "75px"
                            }} 
                            variant="contained" 
                            startIcon={<HotelIcon />}>
                                Hotels
                            </Button>
                        </Box>
                        
                    </Box>
                    <Box sx={{display:"flex", gap:"16px", alignItems:"center"}}>
                        <Typography underLine="hover" sx={{fontSize:"14px",cursor:"pointer"}}>
                            Help
                        </Typography>
                        <Typography variant="caption" sx={{border:"0.5px solid grey", 
                            padding:"8px 15px", 
                            borderRadius:"5px", 
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
                            borderRadius:"10px",
                            '&:hover': {
                                backgroundColor:"grey"},
                                cursor:"pointer"
                          }}>
                            Log in

                        </Box>
                    </Box>


                </Toolbar>
            </AppBar>

        
    )
}

export default navFlights;

