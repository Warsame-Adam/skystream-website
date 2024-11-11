import React from "react"
import { AppBar,Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';





const ReturnSearchBar = () => {

    
    
    const searchType = useSelector((state) => state.search.searchType);





    return (
        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}} >
    
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '10px', alignItems: "center" }}>
                <Input placeholder="From" disableUnderline sx={{ ...inputStyle, borderRadius:"10px 0px 0px 10px"}} />
                <Input placeholder="To" disableUnderline sx={{ ...inputStyle }} />
                <Input placeholder="Depart Add date" disableUnderline sx={{ ...inputStyle, }} />
                <Input 
                    placeholder="Return Add date" 
                    disableUnderline 
                    sx={{ ...inputStyle }} 
                    disabled={searchType === "oneway"} 
                />
                <Input placeholder="Travellers and cabin class" disableUnderline sx={{ ...inputStyle, borderRadius:"0px 10px 10px 0px", marginRight:"15px" }} />
                <Button variant="contained" sx={{ marginLeft: "10px", padding:"25px 20px", backgroundColor:"#0062e3", pointer:"clicker", textTransform:"none", borderRadius:"10px", '&:Hover': {backgroundColor:"#024daf"} }}>Search</Button>
            </Box>

            
            <Box sx={{ display: "grid",
  gridTemplateColumns: " repeat(2, 0.2fr)",
  gap: "5px", 
  alignItems: "center",
  marginLeft:"10px"  }}>
                <FormControlLabel control={<Checkbox sx={{ color: '#626971', marginRight:"10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': {backgroundColor:"white", width:"18px", height:"10px"}  }} />} label="Add nearby airports" componentsProps={{typography: {fontSize:"15px", color:"white", marginRight:"20px",}}} />
                <FormControlLabel control={<Checkbox sx={{ color: '#626971', marginRight:"10px",  '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': {backgroundColor:"white", width:"18px", height:"10px"}  }} />} label="Direct flights only" componentsProps={{typography: {fontSize:"15px", color:"white", marginRight:"20px"}}} />
                <FormControlLabel control={<Checkbox sx={{ color: '#626971', marginRight:"10px", '&.Mui-checked': { color: '#0062e3' }, '&.MuiButtonBase-root': {backgroundColor:"white", width:"18px", height:"10px"}  }} />} label="Other option" sx={{display:"inline-flex"}} componentsProps={{typography: {fontSize:"15px", color:"white", marginRight:"20px",
      
    }}} />
            </Box>
            </Box>
        
    );
};

const inputStyle = {
    
            
            backgroundColor:"background.paper",
            color:"black",
            margin:"2px",
            
            padding: '20px 15px',
            '&:focus': {
                borderColor: 'primary.main',
            },
    
};


    



export default ReturnSearchBar;