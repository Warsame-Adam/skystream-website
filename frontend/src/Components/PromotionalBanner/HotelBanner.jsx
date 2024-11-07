import React from "react"
import { AppBar,Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container,Card, CardContent, CardMedia,Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import KingBedIcon from '@mui/icons-material/KingBed';
import PromoBanner from "../../Components/Assets/PromoBanner.jpg"
import hotels from "../../Components/Assets/hotels.png";









const HotelBanner = () => {



    return (
        <Container sx={{}}>
            <Box sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", marginTop:"40px"}}>
                <Typography>
                    Home
                </Typography>
                <ArrowRightIcon disabled sx={{padding:"0", color:"grey"}}/>
                <Typography sx={{alignItems:"center"}}>
                    Flights
                </Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", marginTop:"40px", gap:2}}>
                <SearchIcon/>
                <Typography sx={{fontWeight:"bold", fontSize:"13px"}}>
                Find the best-value hotel for your dates, search by price or preferences
                </Typography>
                <LocalOfferIcon />
                <Typography sx={{fontWeight:"bold", fontSize:"13px"}}>
                    Find the best-value hotel for your dates, search by price or preferences
                </Typography>
                <KingBedIcon/>
                <Typography sx={{fontWeight:"bold", fontSize:"13px"}}>
                Look out for hotels with free cancellation or excellent ratings
                </Typography>
            </Box>
            
            
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px 0', width: "100%" }}>
                <Box sx={{ position: "relative", width: "100%", maxWidth: '1200px' }}>
                    <img 
                    src={PromoBanner}
                    alt="Hero" 
                    style={{ width: "100%", height: '465px', borderRadius: '10px', objectFit: 'cover' }} />
                    
                    
                <Box sx={{ 
                    position: "absolute", 
                    top: "50%", 
                    left: "20%", 
                    transform: "translate(-50%, -50%)", 
                    color: "white" }}>
                        
                        <Typography sx={{fontWeight:"bold", fontSize:"45px", color:"white",lineHeight: "1.2"}}>
                            Save on your <br /> next hotel <br /> booking
                        </Typography>
                        <Typography sx={{fontsize:"10px", color:"white", marginTop:"10px"}}>
                            We've pulled together some top hotel deals, so <br /> you can find an amazing room at an even better <br /> price.
                        </Typography>
                        <Box sx={{color:"black", backgroundColor:"white", border:"1px solid white", display:"inline-block", padding:"6px 8px", marginTop:"10px", fontWeight:"bold", borderRadius:"5px", cursor:"pointer", '&:hover': {backgroundColor:"#c1c7cf"}}}>
                            See hotel deals
                        </Box>
                </Box>
               </Box>
            </Box>

            <Typography sx={{color:"black", fontSize:"30px",fontWeight:"bold", marginTop:"50px"}}>
            Compare hotels across your favourite brands
            </Typography>

            <Box sx={{marginLeft:-2}}>
                <img src={hotels} />
            </Box>




        </Container>
        

    )
}


export default HotelBanner;