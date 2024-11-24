import React from "react";
import { AppBar,Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';


const inputStyle = {
    borderRight: "1px solid grey",
    
    
    backgroundColor:"background.paper",
    color:"black",
    
    padding: '20px 15px',
    '&:focus': {
        borderColor: 'primary.main',
    },

}





const CityHotelsSearchBar = () => {



    return (
        <Box>
        <Typography sx={{position:"absolute", top:"18%", left:"24.2%",  transform: 'translate(-23%, -24.2%)', color:"white", fontSize:"40px", fontWeight:"bold",}}>
            City Hotels
        </Typography>
        <Box sx={{
            position:"absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '1200px',
            
            padding: '20px',
            borderRadius: '8px',
            height:"130px",
            marginTop:"-165px"
            
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
        
        <Box  sx={{marginTop:"20px", display:"flex", alignItems:"center"}}>
            <Typography sx={{marginRight:"30px", color:"white", fontSize:"13px", fontWeight:"bold"}}>
                Popular Filters:
            </Typography>
            <FormControlLabel control={<Checkbox disableRipple sx={{ color: '#626971', marginRight:"10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': {backgroundColor:"white", width:"18px", height:"10px"}  }} />} label="Free cancellation" componentsProps={{typography: {fontSize:"15px", color:"white", marginRight:"20px"}}}  />
            <FormControlLabel control={<Checkbox disableRipple  sx={{ color: '#626971',marginRight:"10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': {backgroundColor:"white", width:"18px", height:"10px"}  }} />} label="4 stars" componentsProps={{typography: {fontSize:"15px", color:"white", marginRight:"20px"}}} />
            <FormControlLabel control={<Checkbox disableRipple  sx={{ color: '#626971', marginRight:"10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': {backgroundColor:"white", width:"18px", height:"10px"}  }}  />} label="3 stars" componentsProps={{typography: {fontSize:"15px", color:"white"}}} />
        </Box>

        <Box sx={{height:"48px", width:"165px",padding:"-10px 0px", borderRadius:"10px", backgroundColor:"#0062e3", display:"flex", alignItems:"center", gap:"10px", pointer:"clicker", marginLeft:"1020px", marginTop:"-30px",'&:Hover': {backgroundColor:"#024daf"}}}>
                  <Typography sx={{textAlign:"center", paddingLeft:"20px", color:"white"}}>
                    Search hotels
                  </Typography>
                  <ArrowForwardOutlinedIcon sx={{color:"white"}} />

                </Box>
                




        </Box>
        </Box>
    )
}


export default CityHotelsSearchBar;