import React, { useEffect, useState } from "react";
import { Typography, Container, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { getHotelsStats } from "../../services/hotel";

function getMonthName(monthIndex) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthIndex - 1] || "Invalid Month";
}
const CityHotelsFastFacts = ({countryCode, cityCode}) => {
  const [funFacts, setFunFacts] = useState({
    highestRatedHotel: null,
    cheapestMonthToBook: {
      cheapestMonth: 1,
    },
    average4StarPrice: 127,
    average5StarPrice: 278,
  });
  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });
  const [error, setError] = useState({
    active: false,
    message: "",
    action: "",
  });
  const fetchHotelsFacts = async (filters, action) => {
    setLoading({
      active: true,
      action: action,
    });
    

    const hotelsData = await getHotelsStats({ countryCode, cityCode });
    
    if (hotelsData.success) {
      setFunFacts(hotelsData.data);
    } else {
      setError({
        active: true,
        message: hotelsData.error,
        action: action,
      });
    }
    setLoading({
      active: false,
      action: "",
    });
  };

  useEffect(() => {
    fetchHotelsFacts({}, "page");
  }, [countryCode, cityCode]);

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
          {funFacts?.highestRatedHotel?.name || "None"}
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
          {getMonthName(funFacts?.cheapestMonthToBook?.cheapestMonth || 1)}
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
          £{funFacts?.average4StarPrice ? funFacts.average4StarPrice.toFixed(0) : 0} per night
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
          £{funFacts?.average5StarPrice ? funFacts.average5StarPrice.toFixed(0) : 0} per night
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CityHotelsFastFacts;
