import React from "react";
import { Box, Typography, Rating, Paper, Grid, Container } from "@mui/material";
import { Star } from "@mui/icons-material";
const HotelDetailsSection = ({ hotel }) => {
  // Placeholder data
  const hotelName = hotel?.name;
  const address = hotel?.address;
  const rating =
    hotel.reviews.reduce((acc, review) => acc + review.rating, 0) /
    hotel.reviews?.length;
  const reviews = hotel.reviews?.length;
  const reviewBoxes = hotel.reviews
    .map((x) => {
      return {
        ...x,
      };
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 1);

  return (
    <Container
      className='container'
      sx={{ pt: "16px", mt: { md: "24px", xs: 0 }, mb: "16px" }}
    >
      <Grid
        container
        alignItems='center'
        sx={{
          gap: { sm: "16px", xs: "2px" },
        }}
      >
        <Typography
          variant='h1'
          sx={{
            color: "#161616",
            fontSize: { md: "48px", xs: "24px" },
            fontWeight: "900",
          }}
        >
          {hotelName}
        </Typography>
        <Rating
          value={rating}
          precision={0.5}
          readOnly
          sx={{ color: "#F55D42", borderColor: "#F55D42" }}
        />
      </Grid>

      <Typography variant='body1' color='black' sx={{ mt: "4px" }}>
        {address}
      </Typography>

      <Grid
        container
        alignItems='center'
        sx={{
          gap: { md: "40px", xs: "20px" },
          mt: "24px",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "flex-end",
            flexWrap: "nowrap",
            gap: "8px",
          }}
        >
          <Typography
            variant='h6'
            sx={{
              color: "#161616",
              fontSize: { md: "48px", xs: "48px" },
              fontWeight: "900",
              lineHeight: "24px",
            }}
          >
            {rating.toFixed(2)}
            <span
              style={{
                color: "#626971",
                fontSize: "16px",
                fontWeight: "400",
                marginLeft: "-2px",
              }}
            >
              /5
            </span>
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 700, pr: "8px", lineHeight: "24px" }}
          >
            {rating > 5 ? "Excellent" : rating > 4 ? "Very Good" : "Good"}{" "}
            <br />
            <span style={{ color: "#626971", fontWeight: 400 }}>
              {" "}
              {reviews} reviews
            </span>
          </Typography>
        </Grid>

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {reviewBoxes.map((box, index) => (
            <Paper
              key={index}
              sx={{
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                borderRadius: "12px",
                boxShadow: "0 1px 3px 0 #25201f4d",
                color: "#161616",
                "&:hover": {
                  boxShadow: "0 1px 3px 0 #25201f4d",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  marginRight: "5px",
                  fontWeight: "bold",
                }}
              >
                {Number.isInteger(box.rating)
                  ? box.rating
                  : box.rating.toFixed(2)}{" "}
                <Star sx={{ fill: "#F55D42" }} />
              </Box>
              <Typography
                variant='body2'
                sx={{ color: "#161616", fontSize: "12px" }}
              >
                {box.comment}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Grid>
    </Container>
  );
};

export default HotelDetailsSection;
