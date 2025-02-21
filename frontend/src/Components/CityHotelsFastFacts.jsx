import React from "react";
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
  Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const CityHotelsFastFacts = () => {
  return (
    <Container className='container' sx={{ mt: "96px" }}>
      <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
        Fast facts
      </Typography>

      <Typography sx={{ fontSize: "17px" }}>
        Sleep easy, armed with the stuff that's good to know before you go.
      </Typography>

      <Grid
        container
        spacing={2}
        vert
        sx={{
          mt: "40px",
          padding: "20px 0",
        }}
      >
        <Grid
          item
          md={4}
          sm={6}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: "30px",
          }}
        >
          <StarIcon sx={{ fontSize: 25, color: "black" }} />
          <Typography
            variant='body1'
            sx={{ fontWeight: "bold", marginTop: "10px" }}
          >
            Highest rated hotel
          </Typography>
          <Typography variant='h6' sx={{ color: "#1976d2" }}>
            Met Hotel Amsterdam – 5
          </Typography>
        </Grid>

        <Grid
          item
          md={4}
          sm={6}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: "30px",
          }}
        >
          <CalendarTodayIcon sx={{ fontSize: 25, color: "black" }} />
          <Typography
            variant='body1'
            sx={{ fontWeight: "bold", marginTop: "10px" }}
          >
            Cheapest month to book
          </Typography>
          <Typography variant='h6' sx={{ color: "#1976d2" }}>
            January
          </Typography>
        </Grid>

        <Grid
          item
          md={4}
          sm={6}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: "30px",
          }}
        >
          <LocalOfferIcon sx={{ fontSize: 25, color: "black" }} />
          <Typography
            variant='body1'
            sx={{ fontWeight: "bold", marginTop: "10px" }}
          >
            Average 4 star hotel price
          </Typography>
          <Typography variant='h6' sx={{ color: "#1976d2" }}>
            £127 per night
          </Typography>
        </Grid>

        <Grid
          item
          md={4}
          sm={6}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: "30px",
          }}
        >
          <LocalOfferIcon sx={{ fontSize: 25, color: "black" }} />
          <Typography
            variant='body1'
            sx={{ fontWeight: "bold", marginTop: "10px" }}
          >
            Average 5 star hotel price
          </Typography>
          <Typography variant='h6' sx={{ color: "#1976d2" }}>
            £278 per night
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CityHotelsFastFacts;
