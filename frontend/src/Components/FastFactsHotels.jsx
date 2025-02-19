import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HotelIcon from "@mui/icons-material/Hotel";
import fastfactimg from "../Components/Assets/fastfactshotels.png";

const FastFactsHotels = () => {
  return (
    <Container className='container' sx={{ mt: "80px" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "28px" }}>
        Fast Facts
      </Typography>
      <Typography variant='subtitle1' sx={{ mt: "10px" }}>
        Sleep easy, armed with the stuff that's good to know before you go.
      </Typography>
      <Box
        sx={{
          mt: "30px",
          display: "flex",
          flexDirection: {
            md: "row",
            xs: "column",
          },
          gap: { md: "10px", xs: "30px" },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <ApartmentIcon size='small' />
          <Typography sx={{ fontSize: "15px" }}>
            Hotel brands to choose from
            <br />
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>60+</span>
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <LocationOnIcon size='small' />
          <Typography sx={{ fontSize: "15px" }}>
            Hotel destinations to explore
            <br />
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>5000+</span>
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <HotelIcon size='small' />
          <Typography sx={{ fontSize: "15px" }}>
            Hotels available worldwide
            <br />
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              3.2 million
            </span>
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          mt: "60px",

          //   height: "700px",
          //  overflow: "hidden",
          //  marginTop: "-50px",
        }}
      >
        <img
          src={fastfactimg}
          alt='Hero'
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "12px",
          }}
        />
      </Box>
    </Container>
  );
};

export default FastFactsHotels;
