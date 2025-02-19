import React from "react";
import {
  AppBar,
  Menu,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import companyLogo from "../../Components/Assets/company-logo.png";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

const NavFlights = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar
      position='static'
      sx={{
        padding: "0",
        backgroundColor: "common.blue",
      }}
    >
      <Container className='container'>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "24px 0px 16px",
          }}
        >
          <Grid container alignItems='center' justifyContent={"space-between"}>
            <Box
              component={Link}
              to='/'
              sx={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton sx={{ p: 0 }}>
                <Avatar src={companyLogo} sx={{ mr: { xs: 1, md: 2 } }} />
              </IconButton>
              <Typography
                variant={matchesSM ? "h6" : "h5"}
                sx={{
                  color: "text.primary",
                  letterSpacing: ".1rem",
                  fontWeight: 700,
                }}
              >
                SkyStream
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {!matchesSM && (
                <Typography
                  underLine='hover'
                  sx={{ fontSize: "14px", cursor: "pointer", mr: "6px" }}
                >
                  Help
                </Typography>
              )}
              <Typography
                variant='subtitle2'
                sx={{
                  padding: matchesSM ? 0 : "6px 16px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  backgroundColor: matchesSM
                    ? "transparent"
                    : "rgba(255, 255, 255, 0.11)",
                  "&:hover": {
                    backgroundColor: "#000",
                  },
                  cursor: "pointer",
                }}
              >
                {matchesSM
                  ? "EN - UK (GBP)"
                  : "United Kingdom - English (UK) • £ GBP"}
              </Typography>

              <IconButton>
                <FavoriteIcon
                  sx={{
                    color: "text.primary",
                    "&:hover": {
                      color: "#82909E",
                    },
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              {matchesSM ? (
                <IconButton sx={{ p: 0 }}>
                  <AccountCircleIcon
                    sx={{
                      color: "text.primary",
                      "&:hover": {
                        color: "#82909E",
                      },
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              ) : (
                <Button
                  variant='contained'
                  sx={{
                    fontFamily: "SkyStreamRelative",
                    fontSize: "16px",
                    textTransform: "none",
                    border: "0",
                    padding: "4px 23px",
                    color: "#000",
                    fontWeight: "bold",
                    backgroundColor: "text.primary",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#c1c7cf",
                    },
                    cursor: "pointer",
                  }}
                >
                  Log in
                </Button>
              )}
            </Box>
          </Grid>

          <Grid
            container
            sx={{
              mt: "24px",
              gap: 0.5,
            }}
          >
            <Link to='/flights'>
              <Button
                sx={{
                  boxSizing: "border-box",
                  fontSize: "13.5px",
                  backgroundColor: "primary.main",
                  color: "text.primary",
                  textTransform: "none",
                  "&:hover": {
                    border: "0.5px solid",
                    borderColor: "primary.main",
                    backgroundColor: "primary.main",
                  },
                  border: "0.5px solid",
                  borderColor: "primary.main",
                  borderRadius: "75px",
                  padding: "5px 15px",
                  mx: 0.5,
                }}
                variant='contained'
                startIcon={
                  <FlightIcon
                    sx={{ rotate: "45deg", width: "20px", height: "20px" }}
                  />
                }
              >
                Flights
              </Button>
            </Link>
            <Link to='/hotels'>
              <Button
                sx={{
                  fontSize: "13.5px",
                  backgroundColor: "transparent",
                  color: "text.primary",
                  textTransform: "none",
                  border: "0.5px solid #6a7b8b",
                  "&:hover": {
                    border: "0.5px solid #154679",

                    backgroundColor: "#154679",
                  },
                  borderRadius: "75px",
                  padding: "5px 15px",
                }}
                variant='contained'
                startIcon={<HotelIcon sx={{ width: "17px", height: "20px" }} />}
              >
                Hotels
              </Button>
            </Link>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavFlights;
