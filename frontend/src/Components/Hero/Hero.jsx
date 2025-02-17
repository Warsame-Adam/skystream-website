import React from "react";
import {
  Input,
  AppBar,
  Menu,
  Toolbar,
  IconButton,
  Container,
  Avatar,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import HeroImage from "../../Components/Assets/HeroImage.png";
import { Link } from "react-router-dom";

const Hero = () => {
  const HeroStyles = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderRadius: "10px",
    flexGrow: 1,
    cursor: "pointer",
    backgroundColor: "common.blue",
    color: "white",
    "&:hover": {
      backgroundColor: "#054184",
    },
  };

  return (
    <Container
      className='container'
      sx={{
        mt: "40px",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        marginBottom: "15px",
        zIndex: 1,
      }}
    >
      <Grid
        container
        alignItems='center'
        spacing={2}
        sx={{
          marginBottom: "30px",
        }}
      >
        <Grid item sm={4}>
          <Box sx={{ ...HeroStyles }}>
            <IconButton disabled>
              <TravelExploreIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography>Explore Everywhere</Typography>
          </Box>
        </Grid>

        <Grid item sm={4}>
          <Box component={Link} to='/hotels' sx={{ ...HeroStyles }}>
            <IconButton disabled>
              <BedOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography>Hotels</Typography>
          </Box>
        </Grid>

        <Grid item sm={4}>
          <Box
            component={Link}
            to='/hotels'
            sx={{ ...HeroStyles, marginRight: 0 }}
          >
            <IconButton disabled>
              <FlightTakeoffOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography>Flights</Typography>
          </Box>
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
            src={HeroImage}
            alt='Hero'
            style={{
              width: "100%",
              height: "460px",
              borderRadius: "10px",
              objectFit: "cover",
              minWidth: "100%",
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
            style={{
              fontSize: "48px",
              fontWeight: "900",
              letterSpacing: "-.04em",
            }}
          >
            Go further, get <br /> closer
          </Typography>
          <Typography variant='subtitle1' sx={{ paddingBottom: "25px" }}>
            <span style={{}}>
              Sneak off for a romantic hotel stay with prices <br /> you'll
              love.{" "}
            </span>
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
            Find your room
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default Hero;
