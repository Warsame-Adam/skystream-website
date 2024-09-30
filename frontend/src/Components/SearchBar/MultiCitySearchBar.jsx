import React, { useState } from "react"
import { AppBar,Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


const inputStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: "background.paper",
    color: "black",
    marginRight: "5px",
    padding: '20px 15px',
    flex: '0 0 auto',
    
    '&:focus': {
        borderColor: 'primary.main',
    },
    width: '200px', // Adjust this to control the input width
};

const MultiCitySearchBar = () => {
    const [flights, setFlights] = useState([
        { from: '', to: '', departDate: '' },
        { from: '', to: '', departDate: '' }
    ]);

    const addFlightRow = () => {
        setFlights([...flights, { from: '', to: '', departDate: '' }]);
    };

    const removeFlightRow = (index) => {
        if (flights.length > 2) {
            setFlights(flights.filter((_, i) => i !== index));
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            
            
            
            width: '100%',
            maxWidth: '1200px',
            margin: 'auto',
            
        }}
            
        >
            {/* Flight Rows */}
            <Box sx={{ width: '100%' }}>
                {flights.map((_, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'flex-start' }}>
                        <Input placeholder="From" disableUnderline sx={{...inputStyle, width:"400px", height:"55px", borderRadius:"15px", marginRight:"15px"}} />
                        <Input placeholder="To" disableUnderline sx={{...inputStyle, width:"400px", height:"55px", borderRadius:"15px", marginRight:"15px"}} />
                        <Input placeholder="Depart" disableUnderline sx={{...inputStyle, width:"230px", height:"55px",borderRadius:"15px", marginRight:"15px"}} />

                        <IconButton
                            onClick={() => removeFlightRow(index)}
                            disabled={index < 2}
                            sx={{ color: index < 2 ? 'gray' : 'white' }} 
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>

            {/* Add Another Flight Button */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', padding: '10px 0' }}>
                <Button
                    onClick={addFlightRow}
                    variant="contained"
                    sx={{
                        marginTop: '10px',
                        color: 'white',
                        backgroundColor: '#002540',
                        textTransform: 'none',
                        padding: '10px 15px',
                        width: '220px',
                        display: "flex",
                        justifyContent: "flex-start",
                        marginBottom: "20px"
                    }}
                >
                    + Add another flight
                </Button>
            </Box>

            {/* Travellers and Class Input */}
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-start', padding: '10px 0' }}>
                <Input
                    disableUnderline
                    defaultValue="1 adult, Economy"
                    sx={{
                        ...inputStyle,
                        textAlign: 'center',
                        backgroundColor: "white",
                        color: "black",
                        width: "220px",
                    }}
                />
            </Box>

            {/* Search Button */}
            <Button
                variant="contained"
                sx={{
                    marginTop: '20px',
                    color: 'white',
                    backgroundColor: "#0071c2",
                    padding: '10px 20px',
                    alignSelf: 'flex-end',
                }}
            >
                Search
            </Button>
        </Box>
    );
};










export default MultiCitySearchBar;