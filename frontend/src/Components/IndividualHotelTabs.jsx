import React, { useEffect, useState } from "react";
import {
  AppBar,
  Menu,
  Link,
  Input,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  Divider,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BedIcon from "@mui/icons-material/Bed";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const inputStyle = {
  borderRight: "1px solid grey",

  backgroundColor: "background.paper",
  color: "black",

  padding: "20px 15px",
  "&:focus": {
    borderColor: "primary.main",
  },
};

const IndividualHotelTabs = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 840 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const stickyHeight = 220;

  const price = 767;

  return (
    <>
      {sticky ? (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Container sx={{ maxWidth: "lg" }}>
            {/* Search Bar */}
            <AppBar
              sx={{
                backgroundColor: "primary.dark",
                padding: "20px 310px",
                width: "100%",
              }}
            >
              <Toolbar
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Input
                    placeholder='Enter destination or hotel name'
                    disableUnderline
                    sx={{
                      ...inputStyle,
                      width: "450px",
                      height: "55px",
                      borderRadius: "8px 0 0 8px",
                    }}
                  />
                  <Input
                    placeholder='Date'
                    disableUnderline
                    sx={{ ...inputStyle, width: "110px", height: "55px" }}
                  />
                  <Input
                    placeholder='Date'
                    disableUnderline
                    sx={{ ...inputStyle, width: "110px", height: "55px" }}
                  />
                  <Input
                    placeholder='Rooms'
                    disableUnderline
                    sx={{ ...inputStyle, width: "210px", height: "55px" }}
                  />
                  <Box
                    sx={{
                      height: "55px",
                      width: "170px",
                      backgroundColor: "#0062e3",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      "&:hover": { backgroundColor: "#024daf" },
                    }}
                  >
                    <Typography
                      sx={{ textAlign: "center", paddingLeft: "20px" }}
                    >
                      Search hotels
                    </Typography>
                    <ArrowForwardOutlinedIcon />
                  </Box>
                </Box>
              </Toolbar>
            </AppBar>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 3,
                marginTop: "130px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: "35px",
                }}
              >
                <Link
                  href='#rooms'
                  underline='none'
                  sx={{
                    marginX: 2,
                    color: "black",
                    transition: "color 0.3s",
                    fontWeight: "bold",
                    "&:hover": { color: "grey" },
                  }}
                >
                  Rooms and prices
                </Link>
                <Link
                  href='#amenities'
                  underline='none'
                  sx={{
                    marginX: 2,
                    color: "black",
                    transition: "color 0.3s",
                    fontWeight: "bold",
                    "&:hover": { color: "grey" },
                  }}
                >
                  Amenities
                </Link>
                <Link
                  href='#ratings'
                  underline='none'
                  sx={{
                    marginX: 2,
                    color: "black",
                    transition: "color 0.3s",
                    fontWeight: "bold",
                    "&:hover": { color: "grey" },
                  }}
                >
                  Ratings and reviews
                </Link>
                <Link
                  href='#explore'
                  underline='none'
                  sx={{
                    marginX: 2,
                    color: "black",
                    transition: "color 0.3s",
                    fontWeight: "bold",
                    "&:hover": { color: "grey" },
                  }}
                >
                  Explore the area
                </Link>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant='h5'
                  sx={{ marginRight: 2, paddingRight: "10px" }}
                >
                  £{price}
                </Typography>
                <Button
                  sx={{
                    backgroundColor: "#05203c",
                    marginRight: "50px",
                    textTransform: "none",
                    fontSize: "14px",
                    "&:hover": { backgroundColor: "#154679" },
                  }}
                  variant='contained'
                >
                  View deals
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      ) : (
        <>
          <Container sx={{ textAlign: "center", marginY: 4 }}>
            {/* Links Section with Price and Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #d4d8de ",
                paddingBottom: 1,
                paddingLeft: "20px",
              }}
            >
              {/* Links */}
              <Box>
                <Link
                  href='#rooms'
                  underline='none'
                  sx={{
                    marginX: 2,
                    color: "black",
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "grey",
                      borderBottom: "3px solid #e0e4e9",
                    },
                    paddingBottom: "14px",
                  }}
                >
                  Rooms and prices
                </Link>
                <Link
                  href='#amenities'
                  underline='none'
                  sx={{
                    marginX: 2,
                    color: "black",
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "grey",
                      borderBottom: "3px solid #e0e4e9",
                    },
                    paddingBottom: "14px",
                  }}
                >
                  Amenities
                </Link>
                <Link
                  href='#ratings'
                  underline='none'
                  sx={{
                    marginX: 2,
                    color: "black",
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "grey",
                      borderBottom: "3px solid #e0e4e9",
                    },
                    paddingBottom: "14px",
                  }}
                >
                  Ratings and reviews
                </Link>
                <Link
                  href='#explore'
                  underline='none'
                  sx={{
                    marginX: 2,
                    color: "black",
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "grey",
                      borderBottom: "3px solid #e0e4e9",
                    },
                    paddingBottom: "14px",
                  }}
                >
                  Explore the area
                </Link>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography variant='h5' sx={{ marginRight: 2 }}>
                  £{price}
                </Typography>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: "#05203c",
                    textTransform: "none",
                    fontSize: "14px",
                    "&:hover": { backgroundColor: "#154679" },
                  }}
                >
                  View deals
                </Button>
              </Box>
            </Box>

            <Grid
              container
              justifyContent='space-between'
              sx={{
                pt: { md: "40px", xs: "20px" },
                mb: "30px",
              }}
              spacing={{ md: 2, xs: 4 }}
            >
              <Grid item md={4} xs={12} sx={{ display: "flex", gap: "12px" }}>
                <SearchIcon />
                <Typography
                  variant='body2'
                  sx={{
                    textAlign: { md: "center", xs: "left" },
                    lineHeight: "20px",
                    color: "#161616",
                    fontWeight: "bold",
                  }}
                >
                  Find the best hotel in London for your dates, by price or
                  preference
                </Typography>
              </Grid>
              <Grid item md={4} xs={12} sx={{ display: "flex", gap: "12px" }}>
                <LocalOfferIcon sx={{ rotate: "90deg" }} />
                <Typography
                  variant='body2'
                  sx={{
                    textAlign: { md: "center", xs: "left" },
                    lineHeight: "20px",
                    color: "#161616",
                    fontWeight: "bold",
                  }}
                >
                  Compare deals for Kimpton - Fitzroy London, an IHG Hotel
                  across hundreds of sites, all in one place
                </Typography>
              </Grid>
              <Grid item md={4} xs={12} sx={{ display: "flex", gap: "16px" }}>
                <BedIcon />
                <Typography
                  variant='body2'
                  sx={{
                    textAlign: { md: "center", xs: "left" },

                    lineHeight: "20px",
                    color: "#161616",
                    fontWeight: "bold",
                  }}
                >
                  Look out for a deal with free cancellation or excellent
                  ratings
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </>
      )}

      <Box sx={{ height: sticky ? `${stickyHeight}px` : "0px" }}></Box>
    </>
  );
};

export default IndividualHotelTabs;
