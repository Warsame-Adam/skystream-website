import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Menu,
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
  Tabs,
  Tab,
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

  const renderTabs = (
    <Tabs
      //value={selectedTab}
      // onChange={handleTabChange}
      variant='scrollable'
      scrollButtons='auto'
      TabIndicatorProps={{
        sx: {},
      }}
    >
      {[
        {
          label: "Rooms and prices",
          link: "rooms",
        },
        {
          label: "Amenities",
          link: "amenities",
        },
        {
          label: "Ratings and reviews",
          link: "ratings",
        },
        {
          label: "Explore the area",
          link: "explore",
        },
      ].map((item, i) => (
        <Tab
          key={i}
          LinkComponent={Link}
          to={`#${item.link}`}
          onClick={() => {
            let ele = document.getElementById(item.link);
            if (ele) {
              ele.scrollIntoView({
                block: "start",
                inline: "start",
                behavior: "smooth",
              });
            }
          }}
          label={item.label}
          disableRipple
          sx={{
            color: "#161616",
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 900,
            position: "relative",
            pb: "33px",
            "&.Mui-selected": { color: "#0062e3" },
            "&:hover::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "3px",
              backgroundColor: "#e0e4e9",
            },
          }}
        />
      ))}
    </Tabs>
  );
  const pricing = (
    <>
      <Typography
        variant='h4'
        sx={{ fontSize: "32px", fontWeight: 700, color: "#161616" }}
      >
        £{price}
      </Typography>
      <Button
        variant='contained'
        sx={{
          p: "6px 16px",
          backgroundColor: "#05203c",

          textTransform: "none",
          fontSize: "14px",
          fontWeight: 700,
          "&:hover": { backgroundColor: "#154679" },
        }}
      >
        View deals
      </Button>
    </>
  );

  const tabsPricing = (
    <Grid
      container
      alignItems='center'
      justifyContent='space-between'
      sx={{ pt: "17.5px" }}
    >
      <Grid item>{renderTabs}</Grid>
      <Grid
        item
        sx={{
          display: { md: "flex", xs: "none" },
          gap: "16px",
          alignItems: "center",
          pb: "23px",
        }}
      >
        {pricing}
      </Grid>
    </Grid>
  );
  return (
    <>
      {sticky ? (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
            backgroundColor: "#fff",
            boxShadow: "0 .0833333333rem .25rem #00000040",
          }}
        >
          <Box sx={{ width: "100%", backgroundColor: "common.blue" }}>
            {/* <Container className='container'>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px 310px",
                }}
              >
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
                  <Typography sx={{ textAlign: "center", paddingLeft: "20px" }}>
                    Search hotels
                  </Typography>
                  <ArrowForwardOutlinedIcon />
                </Box>
              </Box>
            </Container> */}
          </Box>
          <Container className='container'>{tabsPricing}</Container>
        </Box>
      ) : (
        <>
          <Container className='container' sx={{ mb: 4 }}>
            <Box
              sx={{
                borderBottom: "1px solid #d4d8de ",
                width: "100%",
              }}
            >
              {tabsPricing}
            </Box>

            <Grid
              container
              justifyContent='space-between'
              sx={{
                pt: { md: "40px", xs: "20px" },
                mb: "30px",
              }}
              spacing={{ md: 3, xs: 4 }}
            >
              <Grid item md={4} xs={12} sx={{ display: "flex", gap: "12px" }}>
                <SearchIcon />
                <Typography
                  variant='body2'
                  sx={{
                    textAlign: "left",
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
                    textAlign: "left",
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
                    textAlign: "left",

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
