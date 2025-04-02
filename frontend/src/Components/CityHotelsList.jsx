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
  Divider,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CardMedia,
  Alert,
  CircularProgress,
} from "@mui/material";
import IMG1 from "../Components/Assets/IMG1.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

const getMinPrice = (hotel) => {
  if (
    !hotel.deals ||
    hotel.deals.length === 0 ||
    hotel.deals.flatMap((deal) => deal.rooms).length === 0
  )
    return 0;
  return hotel.deals
    .flatMap((deal) => deal.rooms) // Flatten rooms from all deals
    .reduce((min, room) => Math.min(min, room.pricePerNight), Infinity);
};

const loadingUI = (
  <Box
    minHeight='80px'
    display='flex'
    justifyContent='center'
    alignItems='center'
  >
    <CircularProgress size='30px' />
  </Box>
);
const CityHotelsList = ({ loading, error, hotels }) => {
  return (
    <Container className='container' sx={{ mt: "96px" }}>
      {loading.active && loading.action === "page" ? (
        loadingUI
      ) : error.active && error.action === "page" ? (
        <Alert severity='error' sx={{ mt: "20px" }}>
          {error.message}
        </Alert>
      ) : (
        hotels.map((hotel, index) => (
          <Box
            sx={{
              width: "100%",
              boxShadow: "0 1px 3px 0 #25201f4d",
              minHeight: "17rem",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: { md: "row", xs: "column" },
              marginBottom: "16px",
              borderRadius: "8px",
              "&:hover": {
                boxShadow: "0 4px 14px 0 #25201f40",
              },
            }}
          >
            <CardMedia
              component="img"
              image={hotel.cover}
              alt='Hotel Image'
              sx={{
                minHeight: "inherit",
                width: { lg: "33%", md: "40%", xs: "100%" },
                borderRadius: {
                  md: "10px 0px 0px 10px",
                  xs: "10px 10px 0px 0px",
                },
              }}
            />
            {/* <Box
            sx={{
              width: { md: "33%", xs: "100%" },
              height: "100%",
              overflow: "hidden",
              borderRadius: {
                md: "10px 0px 0px 10px",
                xs: "10px 10px 0px 0px",
              },
            }}
          >
            <img
              src={city.hotelImage}
              alt='Hotel Image'
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box> */}

            <Box
              sx={{
                boxSizing: "border-box",
                width: { md: "47%", xs: "100%" },
                display: "flex",
                flexDirection: "column",
                px: { md: "25px", xs: "10px" },
                paddingTop: { md: "30px", xs: "8px" },
              }}
            >
              <Typography
                variant='subtitle1'
                sx={{
                  color: "#05203c",
                  fontWeight: 700,
                  fontSize: { md: "25px", xs: "16px" },
                }}
              >
                {hotel.name}
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  mt: { md: "10px", xs: "0px" },
                  color: "#626971",
                  display: "flex",
                }}
              >
                {/* <LocationOnIcon
                  sx={{
                    display: { md: "unset", xs: "none" },
                    fontSize: "20px",
                    paddingRight: { md: "8px", xs: "4px" },
                  }}
                /> */}
                {hotel.description}
              </Typography>
            </Box>

            <Divider
              orientation='vertical'
              flexItem
              sx={{ display: { md: "unset", xs: "none" } }}
            />

            <Box
              sx={{
                boxSizing: "border-box",
                width: { md: "20%", xs: "100%" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: { md: "flex-end", xs: "flex-start" },
                paddingTop: { md: "30px", xs: "5px" },
                px: { md: "25px", xs: "10px" },
              }}
            >
              <Typography
                align='right'
                sx={{
                  display: { md: "unset", xs: "none" },
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Lowest price
              </Typography>
              <Typography
                align='right'
                sx={{ display: { md: "unset", xs: "none" }, fontSize: "11px" }}
              >
                We found for this hotel
              </Typography>
              <Box
                sx={{
                  mt: { md: "50px", xs: "0px" },
                  display: "flex",
                  alignItems: { md: "flex-end", xs: "center" },
                  flexDirection: { md: "column", xs: "row" },
                  gap: { md: 0, xs: "6px" },
                }}
              >
                <Typography
                  variant='h6'
                  sx={{
                    fontSize: "35px",
                  }}
                >
                  £{getMinPrice(hotel)}
                </Typography>
                <Typography variant='subtitle1' sx={{ color: "grey" }}>
                  a night
                </Typography>
              </Box>

              <Link
                to={`/hotels/${hotel?.city?.countryCode}/${hotel?.city.cityCode}/${hotel.name}/${hotel._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant='outlined'
                  sx={{
                    width: { md: "unset", xs: "100%" },
                    color: "text.primary",
                    backgroundColor: "#05203c",
                    borderRadius: "10px",
                    mt: { md: "10px", xs: "5px" },
                    padding: "8px 10px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#154679" },
                    mb: "10px",
                  }}
                >
                  View hotels
                </Button>
              </Link>
            </Box>
          </Box>
        ))
      )}
    </Container>
  );
};

export default CityHotelsList;
