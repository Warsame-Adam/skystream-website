import React, { useState } from "react"
import { AppBar,Menu, Toolbar, Input, IconButton, Avatar, Typography, Button, Box, Container,Card, CardContent, CardMedia,Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
import FlightIcon from '@mui/icons-material/Flight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Paris from "../../Components/Assets/Paris.png";
import Athens from "../../Components/Assets/athens.png";
import Sydney from "../../Components/Assets/Sydney.png";
import Antalya from "../../Components/Assets/antalya-turkey.png";
import Rome from "../../Components/Assets/rome.png";
import Cardiff from "../../Components/Assets/cardiff.png";
import Edinburgh from "../../Components/Assets/Edinburgh.png";
import Dublin from "../../Components/Assets/Dublin.png";
import Dubai from  "../../Components/Assets/dubai.png";
import Amsterdam from  "../../Components/Assets/Amsterdam-Netherlands.png";
import Istanbul          from  "../../Components/Assets/Istanbul-Turkey.png";
import Bangkok from  "../../Components/Assets/Bangkok-Thailand.png";



const flightDeals = [
  {
    image:Paris ,
    city: "Paris",
    country: "France",
    airlineLogo: '/path/to/airline-logo1.jpg', // Placeholder for the airline logo
    departDate: 'Tue, 26 Nov', // Placeholder for the departure date
    departDetails: 'LTN - FUE with easyJet', // Placeholder for departing airport details
    returnDate: 'Tue, 10 Dec', // Placeholder for the return date
    returnDetails: 'FUE - LGW with easyJet', // Placeholder for returning airport details
    price: '£24', // Placeholder for the price
  },
  {
    image: Athens,
    city: "Athens",
    country: "Greece",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  {
    image: Sydney,
    city: "Sydney",
    country: "Australia",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  {
    image: Antalya,
    city: "Antalya",
    country: "Turkey",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  {
    image: Rome,
    city: "Rome",
    country: "Italy",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  {
    image: Cardiff,
    city: "Cardiff",
    country: "Wales",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  {
    image:Edinburgh,
    city: "Edinburgh",
    country: "Scotland",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  {
    image: Dublin,
    city: "Dublin",
    country: "Ireland",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  {
    image: Dubai,
    city: "Dubai",
    country: "UAE",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  {
    image: Amsterdam,
    city: "Amsterdam",
    country: "Netherlands",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  {
    image: Istanbul,
    city: "Istanbul",
    country: "Turkey",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  {
    image: Bangkok,
    city: "Bangkok",
    country: "Thailand",
    airlineLogo: '/path/to/airline-logo2.jpg',
    departDate: 'Mon, 21 Oct',
    departDetails: 'BFS - MAN with easyJet',
    returnDate: 'Wed, 20 Nov',
    returnDetails: 'MAN - BFS with easyJet',
    price: '£24',
  },
  // Add other objects as needed
];




const FlightLocations = () => {


    const [showAll, setShowAll] = useState(true);

  const displayedDeals = showAll ? flightDeals : flightDeals.slice(0, 6);



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
                        <FlightIcon/>
                        <Typography sx={{fontWeight:"bold", fontSize:"13px"}}>
                        Explore the best flight deals from anywhere, to <br /> everywhere, then book with no fees
                        </Typography>
                        
                        <CalendarMonthIcon />
                        <Typography sx={{fontWeight:"bold", fontSize:"13px"}}>
                        Compare flight deals from over 1000 providers, and choose the cheapest, fastest or greenest tickets
                        </Typography>

                        <LocalOfferIcon/>
                        <Typography sx={{fontWeight:"bold", fontSize:"13px"}}>
                        Find the cheapest month - or even day - to fly, and set up Price Alerts to book when the price is right
                        </Typography>
                    </Box>

                    <Box sx={{marginTop:"20px"}}>
                        <Typography>
                            <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                                Flight deals from United Kingdom
                            </span>
                            <br />
                            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                                Here are the flight deals with the lowest prices. Act fast – they all depart within the next three months.
                                </span>
                        </Typography>
                    </Box>


                     <Box sx={{ padding: 0, marginTop:"20px" }}>
      <Grid container spacing={2}>
        {displayedDeals.map((deal, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: '10px', boxShadow: 3 }}>
              {/* Image Section */}
              <CardMedia sx={{height:"160px"}}
                component="img"
                height="140"
                image={deal.image}
                alt={`${deal.city} Image`}
              />

              <CardContent>
                {/* City/Town and Country */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', color:"black" }}>
                  {deal.city}
                </Typography>
                <Typography variant="body2" color="grey">
                  {deal.country}
                </Typography>

                {/* Departure Ticket Information */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                  <CardMedia
                    component="img"
                    image={deal.airlineLogo}
                    alt="Airline Logo"
                    sx={{ width: 20, height: 20, marginRight: 1 }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color:"black" }}>
                      {deal.departDate}
                    </Typography>
                    <Typography  sx={{color:"grey", fontSize:"12px"}}>
                      {deal.departDetails}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ marginLeft: 'auto', color:"black" }}>
                    Direct
                  </Typography>
                </Box>

                {/* Return Ticket Information */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                  <CardMedia
                    component="img"
                    image={deal.airlineLogo}
                    alt="Airline Logo"
                    sx={{ width: 20, height: 20, marginRight: 1 }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color:"black" }}>
                      {deal.returnDate}
                    </Typography>
                    <Typography  sx={{color:"grey", fontSize:"12px"}}>
                      {deal.returnDetails}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ marginLeft: 'auto', color:"black" }}>
                    Direct
                  </Typography>
                </Box>

                {/* Price Tag */}
                <Typography sx={{ textAlign: 'right', marginTop: 2, color: 'blue', fontWeight: 'bold', fontSize:"14.5px" }}>
                  from {deal.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* "See Fewer Details" or "See More Details" Button */}
      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button onClick={() => setShowAll(!showAll)} variant="text">
          {showAll ? 'See Fewer Details' : 'See More Details'}
        </Button>
      </Box>
    </Box>
  




            </Container>

        
    )
}


export default FlightLocations;