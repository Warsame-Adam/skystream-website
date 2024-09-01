import React from "react"
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, TextField, MenuItem, Checkbox, FormControlLabel, Container } from '@mui/material';
import { styled } from '@mui/material/styles';


const PopularFlights = () => {

    return (
        <Container>
        <Box 
        sx ={{
            display:"flex",
            
            
            
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            mt:15,
            ml:"-1.9%"
    


        }}>
            <Typography variant="h4" sx={{ mb: 4,  }}>
                <span>Popular flights near you</span>
                <br />
                <span style={{ fontSize: '16px', color: '#666' }}>
                    Find deals on domestic and international flights
                </span>

            </Typography>

            <Typography>
                <span style={{}}>International</span>
                <span style={{}}>Domestic</span>

            </Typography>
            

            

        </Box>
        </Container>

    )
}


export default PopularFlights;