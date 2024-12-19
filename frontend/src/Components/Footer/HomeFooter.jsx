import React from "react"
import {Input, AppBar,Menu, Toolbar, IconButton, Container, Avatar, Typography, Button, Box, TextField, MenuItem, Checkbox, FormControlLabel,Accordion, AccordionSummary, AccordionDetails, Link  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const HomeFooter = () => {


    return (
        

        <Box sx={{ backgroundColor: '#05203c', color: 'white', padding: '50px', marginTop: '2rem', }}>
          <Container sx={{ transform: 'translateX(-47px)' }} >
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '2rem', width:"1225px" }}>


        <Box 
  sx={{flex: '1', minWidth: '150px',}}>
  <Typography variant="body2">
    United Kingdom - English (UK) • £ GBP
  </Typography>
</Box>


            
       


       

          



          <Box sx={{ flex: '1', minWidth: '150px', }}>
            <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}> 
                <Link href="#" color="inherit" underline="hover" sx={{ textDecoration: 'none' }}>
                Help
                </Link>
            </Typography>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '0.5rem' }}>
            Privacy Settings
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '0.5rem' }}>
            Log in
            </Link>
        </Box>


        <Box sx={{ flex: '1', minWidth: '150px' }}>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '0.5rem' }}>
              Cookie policy
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '0.5rem' }}>
              Privacy policy
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '0.5rem' }}>
              Terms of service
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '0.5rem' }}>
              Company Details
            </Link>
        </Box>


  
          

          
          
  
          
          <Box sx={{ flex: '1', minWidth: '200px', }}>
            <Accordion sx={{ backgroundColor: 'transparent', color: 'white', boxShadow: 'none', border: 'none' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}     sx={{
      padding: 0,
      borderBottom: 'none',
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiAccordionSummary-content': {
        margin: 0,
      },
    }}
>
                <Typography variant="h7">Explore</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Link href="#" color="inherit" underline="hover">Domestic flights</Link>
                <br />
                <Link href="#" color="inherit" underline="hover">Cities</Link>
                <br />
                <Link href="#" color="inherit" underline="hover">Airports</Link>
                <br />
                <Link href="#" color="inherit" underline="hover">Flights</Link>
                <br />
                <Link href="#" color="inherit" underline="hover">Hotels</Link>
              </AccordionDetails>
            </Accordion>
  
            <Accordion sx={{ backgroundColor: 'transparent', color: 'white', boxShadow: 'none', border: 'none' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}     sx={{
      padding: 0,
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiAccordionSummary-content': {
        margin: 0,
      },
    }}
>
                <Typography variant="h7">Company</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Link href="#" color="inherit" underline="hover">About us</Link>
                <br />
                <Link href="#" color="inherit" underline="hover">Jobs</Link>
                <br />
                <Link href="#" color="inherit" underline="hover">Sustainability</Link>
              </AccordionDetails>
            </Accordion>
  
            <Accordion sx={{ backgroundColor: 'transparent', color: 'white', boxShadow: 'none', border: 'none' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}     sx={{
      padding: 0,
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiAccordionSummary-content': {
        margin: 0,
      },
    }}
>
                <Typography variant="h7">Partners</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Link href="#" color="inherit" underline="hover">Work with us</Link>
                <br />
                <Link href="#" color="inherit" underline="hover">Travel APIs</Link>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
  
        
        <Box sx={{ textAlign: 'center', padding: '1rem 0', borderTop: '1px solid #ffffff40' }}>
          <Typography variant="caption">
            Compare and book cheap flights from anywhere, to everywhere
          </Typography>
          <Typography variant="caption" display="block">
            © SkyStream ltd 2002-2024
          </Typography>
        </Box>
        </Container>
      </Box>
      
  



    )
}


export default  HomeFooter;