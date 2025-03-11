import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Icon,
  Tabs,
  Tab,
  Grid,
  Link,
  Container,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import HotelIcon from "@mui/icons-material/Hotel";
import { GlobalContext } from "../context/GlobalContext";

const FlightInfoSection = () => {
  const { locations, airlines } = useContext(GlobalContext);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const popularCities = [
    "Paris",
    "Athens",
    "Sydney",
    "Antalya",
    "Rome",
    "Cardiff",
    "Edinburgh",
    "Dublin",
    "Dubai",
    "Amsterdam",
    "Istanbul",
    "Bangkok",
  ];

  const popularCountries = [
    "France",
    "Greece",
    "Australia",
    "Turkey",
    "Italy",
    "Wales",
    "Scotland",
    "Ireland",
    "United Arab Emirates",
    "Netherlands",
    "Turkey",
    "Thailand",
  ];

  const popularFlightRoutes = [
    "London to Athens International",
    "London to Rome",
    "London to Sydney",
    "London to Dubai",
    "London to Amsterdam",
    "London to Istanbul",
    "London to Bangkok",
  ];

  const topAirlines = [
    "British Airways",
    "Emirates",
    "Qatar Airways",
    "Turkish Airlines",
    "Air France",
    "KLM",
    "Qantas",
  ];

  return (
    <Container className='container' sx={{ pt: "40px" }}>
      {/* Top Text and Icons */}
      <Box sx={{}}>
        <Typography
          sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Plan your journey with peace of mind
        </Typography>

        <Typography sx={{ marginBottom: { md: "60px", xs: "30px" } }}>
          We've made it our mission to help you travel with confidence and make
          your journey as smooth as possible.
        </Typography>
      </Box>
      <Grid container justifyContent='space-between' spacing={{ md: 1, xs: 4 }}>
        <Grid
          item
          md={5}
          xs={12}
          sx={{
            alignItems: { md: "flex-start", xs: "center" },
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: "12px",
          }}
        >
          <Icon component={ChangeCircleIcon} sx={{ fontSize: 30 }} />
          <Typography
            variant='body2'
            sx={{ textAlign: { md: "left", xs: "center" } }}
          >
            <span
              style={{
                fontWeight: "bold",
                display: "block",
                fontSize: "1.25rem",
              }}
            >
              Find flexible flight deals
            </span>
            Explore flexible flight ticket deals so you won't lose out if your
            flight is changed or cancelled.
          </Typography>
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
          sx={{
            display: "flex",
            alignItems: { md: "flex-start", xs: "center" },
            flexDirection: { md: "row", xs: "column" },
            gap: "12px",
          }}
        >
          <Icon component={HotelIcon} sx={{ fontSize: 30 }} />
          <Typography
            variant='body2'
            sx={{ textAlign: { md: "left", xs: "center" } }}
          >
            <span
              style={{
                fontWeight: "bold",
                display: "block",
                fontSize: "1.25rem",
              }}
            >
              Add hotels and car hire
            </span>
            Plan your journey with hotels and car hire, and keep your bookings
            all in one place.
          </Typography>
        </Grid>
      </Grid>

      {/* Tab Navigation */}

      <Typography
        variant='h5'
        sx={{ fontWeight: "bold", mt: "60px", marginBottom: 1 }}
      >
        Ready to start your adventure?
      </Typography>
      <Typography variant='body2' sx={{ marginBottom: 3 }}>
        Find the cheapest flight deals to some of the most popular destinations,
        or pick your favorite airline below.
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant='scrollable'
        scrollButtons='auto'
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .MuiTab-root": {
            padding: "5px 8px",
            minHeight: "auto",
            border: "1px solid grey",
            marginRight: "10px",
            borderRadius: "5px",
            color: "black",
            textTransform: "none",
          },
        }}
      >
        <Tab
          label='Popular cities'
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#05203c !important",
              color: "white !important",
            },
          }}
        />
        <Tab
          label='Popular countries'
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#05203c !important",
              color: "white !important",
            },
          }}
        />

        <Tab
          label='Top airlines'
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#05203c !important",
              color: "white !important",
            },
          }}
        />

        {/* <Tab
          label='Popular flight routes'
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#05203c !important",
              color: "white !important",
            },
          }}
        /> */}
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ paddingTop: 3 }}>
        {selectedTab === 0 && (
          <Grid container spacing={2}>
            {locations.map((loc) => (
              <Grid item xs={6} sm={4} key={loc._id}>
                <Link
                  href={`/flights/search?&originCountry=${loc?.countryCode}&originCity=${loc?.cityCode}`}
                  underline='hover'
                  sx={{ color: "#1868e5" }}
                >
                  Flights to {loc.cityName}
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid container spacing={2}>
            {locations.map((loc) => (
              <Grid item xs={6} sm={4} key={loc._id}>
                <Link
                  href={`/flights/search?&originCountry=${loc?.countryCode}`}
                  underline='hover'
                  sx={{ color: "#1868e5" }}
                >
                  Flights to {loc.countryName}
                </Link>
              </Grid>
            ))}
          </Grid>
        )}

        {selectedTab === 2 && (
          <Grid container spacing={2}>
            {airlines.map((airline) => (
              <Grid item xs={6} sm={4} key={airline._id}>
                <Link
                  href={`/flights/search?outboundAirline=${airline.name}`}
                  underline='hover'
                  sx={{ color: "#1868e5" }}
                >
                  {airline.name}
                </Link>
              </Grid>
            ))}
          </Grid>
        )}

        {/* {selectedTab === 3 && (
          <Grid container spacing={2}>
            {popularFlightRoutes.map((route, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Link href='#' underline='hover' sx={{ color: "#1868e5" }}>
                  {route}
                </Link>
              </Grid>
            ))}
          </Grid>
        )} */}
      </Box>
    </Container>
  );
};

export default FlightInfoSection;
