import React from "react"
import { AppBar,Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container,Card, CardContent, CardMedia,Grid} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import KingBedIcon from '@mui/icons-material/KingBed';
import hotels from "../Components/Assets/hotels.png";





const CityHotelsInfoSection = () => {

    return (

        <Container sx={{marginTop:"-20px", transform: 'translateX(-45px)',}}>
                        <Box sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", marginTop:"40px"}}>
                <Typography>
                    Home
                </Typography>
                <ArrowRightIcon disabled sx={{padding:"0", color:"grey"}}/>
                <Typography sx={{alignItems:"center"}}>
                    Flights
                </Typography>
            </Box>
            <Box sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", marginTop:"40px", gap:4}}>
                <SearchIcon/>
                <Typography sx={{fontWeight:"bold", fontSize:"13px"}}>
                Find the best Amsterdam hotel for your dates, by <br /> price or preference


                </Typography>
                <LocalOfferIcon />
                <Typography sx={{fontWeight:"bold", fontSize:"13px"}}>
                Compare hotel deals across hundreds of providers, all <br /> in one place
                </Typography>
                <KingBedIcon/>
                <Typography sx={{fontWeight:"bold", fontSize:"13px"}}>
                Look out for Amsterdam hotels with free cancellation <br /> or excellent ratings
                </Typography>
            </Box>

            <Box sx={{marginTop:"80px"}}>
                <Typography sx={{fontSize:"30px", fontWeight:"bold"}}>
                Trusted Amsterdam hotel providers
                </Typography>

            <Box sx={{marginLeft:-2, marginTop:"15px"}}>
                <img src={hotels} />
            </Box>
            </Box>

        </Container>

    )
}


export default CityHotelsInfoSection;