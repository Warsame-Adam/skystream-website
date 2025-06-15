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
import PromoBanner from "../../Components/Assets/PromoBanner.jpg";
import bookingImg from "../../Components/Assets/booking.png";
import tripImg from "../../Components/Assets/trip.png";
import hotelsImg from "../../Components/Assets/hotels.png";
import HYATTImg from "../../Components/Assets/HYATT.png";
import ExpediaImg from "../../Components/Assets/Expedia.png";
import IntercontinentalImg from "../../Components/Assets/Intercontinental.png";

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

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0",
            width: "100%",
            zIndex: 1,
          }}
        >
          <img
            src={PromoBanner}
            alt='Hero'
            style={{
              width: "100%",
              height: "465px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Grid
          container
          direction='column'
          justifyContent='center'
          sx={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            // top: "30%",
            // left: "15%",
            // transform: "translate(-30%, -10%)",
            //color: "white",
            zIndex: 2,
            color: "text.primary",
            pl: { md: "40px", xs: "20px" },
          }}
        >
          <Typography
            variant='h1'
            sx={{
              fontWeight: "bold",
              fontSize: "45px",
              lineHeight: "1.2",
              letterSpacing: "-.04em",
              textShadow: "1px 1px 2px rgba(0,0,0, 0.25)",
            }}
          >
            Save on your <br /> next hotel <br /> booking
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              paddingBottom: "25px",
              textShadow: "1px 1px 2px rgba(0,0,0, 0.25)",
            }}
          >
            We've pulled together some top hotel deals, so <br /> you can find
            an amazing room at an even better <br /> price.
          </Typography>

          <Button
            variant='contained'
            sx={{
              textTransform: "none",
              backgroundColor: "text.primary",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "5px",
              //   padding: "5px 15px",
              "&:hover": {
                backgroundColor: "lightgrey",
              },
              width: "fit-content",
            }}
          >
            See hotel deals
          </Button>
        </Grid>
      </Box>

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
