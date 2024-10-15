import React from "react";
import { AppBar,Menu, Toolbar, IconButton, Avatar, Typography, Button, Box, Container, TextField, MenuItem, Checkbox, FormControlLabel, Breadcrumbs, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';





console.log('Breadcrumbs component rendered');


const BreadCrumbs  = () => {

    const breadcrumbs = [
        <Link underline="hover" key= "1" color="#1d6ee6" href="/" >
          Home
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="#1d6ee6"
          href="/hotels"
          
        >
          Hotels
        </Link>,
        <Link underline="hover" key= "3" color="#1d6ee6" href="" >
            Country
        </Link>,
        <Link underline="hover" key= "4" color="#1d6ee6" href="" >
            City
        </Link>,
        <Typography key="5" sx={{ color: 'grey' }}>
          Hotel Name
        </Typography>,
      ];
    


    return (
      
    <Container sx={{display: "flex", 
      justifyContent: "flex-start", 
      alignItems: "center", 
      marginTop: "20px", 
      padding: "10px", 
       }}>
        <Stack spacing={2}>
        
        

            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" sx={{ color:"grey"  }} />}
            aria-label="breadcrumb">
              {breadcrumbs}

                


            </Breadcrumbs>
            
        </Stack>

        
    </Container>
    )
}

export default BreadCrumbs;


