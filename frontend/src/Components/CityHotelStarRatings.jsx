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
import ThreeStarImage from "../Components/Assets/3StarImage.png";
import FourStarImage from "../Components/Assets/4StarImage.png";
import FiveStarImage from "../Components/Assets/5StarImage.png";

const StarRatingsData = [
  {
    image: ThreeStarImage,
    starRating: "3-star hotels",
    properties: "5",
    PPN: "50",
  },
  {
    image: FourStarImage,
    starRating: "4-star hotels",
    properties: "5",
    PPN: "50",
  },
  {
    image: FiveStarImage,
    starRating: "5-star hotels",
    properties: "5",
    PPN: "50",
  },
];

const CityHotelStarRatings = () => {
  return (
    <Container className='container' sx={{ mt: "96px" }}>
      <Box sx={{ paddingLeft: "10px" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
          Luxury stay or budget getaway?
        </Typography>

        <Typography sx={{ fontSize: "15px" }}>
          Whether you're after 5-star comfort or ease on your wallet, we do the
          searching so you can sleep easy during your stay in Amsterdam.
        </Typography>
      </Box>
      <Grid
        container
        justifyContent='space-between'
        spacing={1}
        sx={{ mt: "16px" }}
      >
        {StarRatingsData.map((rating, index) => (
          <Grid item md={4} xs={12}>
            <Card
              key={index}
              sx={{
                flex: 1,
                minHeight: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                boxShadow: "0 1px 3px 0 #25201f4d",
                borderRadius: "12px",
                "&:hover": {
                  boxShadow: "0 4px 14px 0 #25201f40",
                },
              }}
            >
              <CardMedia
                component='img'
                height='190px'
                image={rating.image}
                alt={rating.name}
              />
              <CardContent
                sx={{
                  p: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "19px",
                      fontWeight: "bold",
                    }}
                  >
                    {rating.starRating}
                  </Typography>

                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "11px",
                      marginBottom: "8px",
                    }}
                  >
                    5 properties
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography sx={{ color: "grey", fontSize: "11px" }}>
                    From
                  </Typography>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {rating.PPN}
                  </Typography>
                  <Typography sx={{ color: "grey", fontSize: "11px" }}>
                    per night
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CityHotelStarRatings;
