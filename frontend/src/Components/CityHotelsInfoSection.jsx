import React from "react";
import {
  AppBar,
  Menu,
  Toolbar,
  Input,
  IconButton,
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import KingBedIcon from "@mui/icons-material/KingBed";
import PromoBanner from "../Components/Assets/PromoBanner.jpg";
import bookingImg from "../Components/Assets/booking.png";
import tripImg from "../Components/Assets/trip.png";
import hotelsImg from "../Components/Assets/hotels.png";
import HYATTImg from "../Components/Assets/HYATT.png";
import ExpediaImg from "../Components/Assets/Expedia.png";
import IntercontinentalImg from "../Components/Assets/Intercontinental.png";

const HotelBanner = () => {
  return (
    <Container className='container' sx={{ pt: "16px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "#626971",
        }}
      >
        <Typography variant='subtitle1' sx={{ color: "primary.main" }}>
          Home
        </Typography>
        <ArrowRightIcon disabled sx={{ padding: "0", color: "#0003" }} />
        <Typography variant='subtitle1'>Hotels</Typography>
      </Box>
      <Grid
        container
        justifyContent='space-between'
        sx={{
          pt: { md: "40px", xs: "20px" },
          mb: "90px",
        }}
        spacing={{ md: 2, xs: 4 }}
      >
        <Grid item md={4} xs={12} sx={{ display: "flex", gap: "12px" }}>
          <SearchIcon />
          <Typography
            variant='body2'
            sx={{
              lineHeight: "20px",
              color: "#161616",
              fontWeight: "bold",
            }}
          >
            Find the best-value hotel for your dates, search by price or
            preferences
          </Typography>
        </Grid>
        <Grid item md={4} xs={12} sx={{ display: "flex", gap: "12px" }}>
          <LocalOfferIcon sx={{ rotate: "90deg" }} />
          <Typography
            variant='body2'
            sx={{
              lineHeight: "20px",
              color: "#161616",
              fontWeight: "bold",
            }}
          >
            Find the best-value hotel for your dates, search by price or
            preferences
          </Typography>
        </Grid>
        <Grid item md={4} xs={12} sx={{ display: "flex", gap: "16px" }}>
          <KingBedIcon />
          <Typography
            variant='body2'
            sx={{
              lineHeight: "20px",
              color: "#161616",
              fontWeight: "bold",
            }}
          >
            Look out for hotels with free cancellation or excellent ratings
          </Typography>
        </Grid>
      </Grid>

      <Typography
        sx={{
          color: "black",
          fontSize: "30px",
          fontWeight: "bold",
          marginTop: "50px",
        }}
      >
        Compare hotels across your favourite brands
      </Typography>

      <Grid container gap={"24px"} sx={{ mt: "24px" }}>
        {[
          bookingImg,
          tripImg,
          hotelsImg,
          HYATTImg,
          ExpediaImg,
          IntercontinentalImg,
        ].map((item, i) => (
          <img
            key={i}
            src={item}
            style={{
              width: "120px",
              height: "60px",
            }}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default HotelBanner;
