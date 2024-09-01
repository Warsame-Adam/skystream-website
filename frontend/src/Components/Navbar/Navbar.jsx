import React, { useState } from "react"
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import FlagIcon from '@mui/icons-material/Flag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import companyLogo from '../../Components/Assets/company-logo.png';
import RSMenu from "../RSMenu"




const Navbar = ({ open, onClose}) =>{

    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)

    }

    const handleCloseUserMenu =  () => {
        setAnchorElUser(null)
    }

    const [anchorElLanguage, setAnchorElLanguage] = useState(null);

    const handleOpenLanguageMenu = (event) => {
      console.log("Event Target (anchorEl):", event.currentTarget);
      setAnchorElLanguage(event.currentTarget);
      
    };
  
    const handleCloseLanguageMenu = () => {
      setAnchorElLanguage(null);
    };

    const pages = [
       {icon: <FlightIcon />, label: "Flights"},
       {icon:<HotelIcon/>, label:"Hotels"},
       {icon:<FlagIcon />, label:"Regional settings"},
       {icon:<LocalOfferIcon />, label:"Explore Everywhere"},
       {icon: <HelpOutlineIcon />, label:"Help"}
    ];
    const links = [
        {key: 'language',icon:<LanguageIcon/>},
        {key: 'favorite',icon:<FavoriteIcon />},
        { key: 'person',icon:<PersonIcon />},
        { key: 'menu',icon: <MenuIcon />}
    ];
    const iconButtonStyles = {
        color: "white",
        mx: 2,
        width: 'auto',        
        height: '40px',
        borderRadius:"10px",       
        '&:hover': {
          
          backgroundColor:"rgba(74,86,99,255)"
        },
        '&:active': {
          
          outline: '2px solid rgba(rgba(74,86,99,255))',
          backgroundColor:"rgba(rgba(74,86,99,255))"
        }
      };


    


    return (
        <AppBar position="static" sx={{padding:"0", backgroundColor:"primary.dark"}}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'flex-start', height: "300px", mx:3, padding: "25px 16px" }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <Avatar src={companyLogo} sx={{ mx: 2 }} />
            </IconButton>
            <Typography variant="h6" sx={{ fontFamily: "Roboto", letterSpacing: ".1rem" }}>
              SkyStream
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {links.slice(0,2).map((item) => (
                <IconButton key={item.key} sx={iconButtonStyles} onClick={item.key === "language"? handleOpenLanguageMenu: null}>
                    {item.icon}
                </IconButton>
                ))}
                {links.some(link => link.key ==="language") && (
                  anchorElLanguage && (
                  <RSMenu 
                  
                  open={Boolean(anchorElLanguage)}
                  onClose={handleCloseLanguageMenu} 
                  />
                )
                )}
            <IconButton sx={iconButtonStyles}>
                <PersonIcon />
                <Typography variant="body1" sx={{mx:2, color:"background.paper"}}>
                    Login
                </Typography>
            </IconButton>
            {links.slice(3).map((item)=>(
                <IconButton onClick={handleOpenUserMenu} key={item.key} sx={iconButtonStyles}>
                    {item.icon}
                </IconButton>
                

                
            ))}
            <Menu 
            sx={{my:0.5, ml:-5, borderRadius:"10px" }} 
            id="menu-appbar"
            PaperProps={{
                sx: {
                  width: "350px",  // Desired width
                  maxWidth: "none", // Remove max width restriction
                  minWidth: "300px",
                   // Ensure it doesn't get too small
                },
            }}
            anchorOrigin={{
                vertical:"bottom", 
                horizontal:"right",
                }} 
            keepMounted 
            transformOrigin={{
                vertical:"top", 
                horizontal:"left"
                }} 
            anchorEl={anchorElUser} 
            open={Boolean(anchorElUser)} 
            onClose={handleCloseUserMenu}>
                {pages.map((page)=> (
                    <MenuItem key = {page.label} onClick={handleCloseUserMenu}>
                        <IconButton sx={{color:"primary.main", mr:1}}>
                            {page.icon}
                        </IconButton>
                        
                        <Typography sx={{color:"black"}}>{page.label}</Typography>
                    </MenuItem>

                ))}

            </Menu>
            </Box>
            

        </Toolbar>
      </AppBar>
    )
}

export default Navbar;