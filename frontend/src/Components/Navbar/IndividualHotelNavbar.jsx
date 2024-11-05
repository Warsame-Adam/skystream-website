import React from "react"
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import companyLogo from '../../Components/Assets/company-logo.png';



const IndividualHotelNavbar = () => {


    return (
        
            <AppBar  sx={{backgroundColor:"#05203c", position:"static", padding:"10px"}}>
                <Container>
                <Toolbar sx={{display:"flex",justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft:"30px" }}>
                        <IconButton >
                            <Avatar src={companyLogo}  />
                        </IconButton>
                    </Box>

                    <Box sx={{display:"flex", gap:"6px", alignItems:"center", padding:"7px"}}>
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
                </Container>
            </AppBar>
            

        

    )
}


export default IndividualHotelNavbar;