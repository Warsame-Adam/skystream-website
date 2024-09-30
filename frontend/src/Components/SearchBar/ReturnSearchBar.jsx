import React from "react"
import { AppBar,Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';




const ReturnSearchBar = () => {

    const dispatch = useDispatch();
    const isOneWay = useSelector((state) => state.search.isOneWay);





    return (
        <Box >
    
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Input placeholder="From" disableUnderline sx={{ ...inputStyle }} />
                <Input placeholder="To" disableUnderline sx={{ ...inputStyle }} />
                <Input placeholder="Depart Add date" disableUnderline sx={{ ...inputStyle }} />
                <Input 
                    placeholder="Return Add date" 
                    disableUnderline 
                    sx={{ ...inputStyle }} 
                    disabled={isOneWay} 
                />
                <Input placeholder="Travellers and cabin class" disableUnderline sx={{ ...inputStyle }} />
                <Button variant="contained" sx={{ marginLeft: '10px' }}>Search</Button>
            </Box>

            
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                <FormControlLabel control={<Checkbox />} label="Add nearby airports" />
                <FormControlLabel control={<Checkbox />} label="Direct flights only" />
                <FormControlLabel control={<Checkbox />} label="Other option" />
            </Box>
            </Box>
        
    );
};

const inputStyle = {
    
            borderRadius: '4px',
            backgroundColor:"background.paper",
            color:"black",
            marginRight:"5px",
            padding: '20px 15px',
            '&:focus': {
                borderColor: 'primary.main',
            },
    
};


    



export default ReturnSearchBar;