import React from "react";
import { Box, Typography, Rating, Paper, Grid, Container } from "@mui/material";

const HotelDetailsSection = () => {
  // Placeholder data
  const hotelName = "Kimpton – Fitzroy London, an IHG Hotel";
  const address =
    "1-8 Russell Square, Camden, London, WC1B 5BE, United Kingdom";
  const rating = 4.2;
  const reviews = 1885;
  const reviewBoxes = [
    // { text: "This hotel's location is rated 5/5", icon: "🌍" },
    // { text: "This hotel's service is rated 5/5", icon: "🛎️" },
    {
      text: 'Customer review: "We have just stayed at this magnificent hotel..."',
      icon: "📝",
    },
  ];

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
            {rating}
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
            Very good <br />
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
                borderRadius: "12px",
                boxShadow: "0 1px 3px 0 #25201f4d",
                color: "#161616",
                "&:hover": {
                  boxShadow: "0 1px 3px 0 #25201f4d",
                },
              }}
            >
              <Box sx={{ marginRight: "5px" }}>{box.icon}</Box>
              <Typography
                variant='body2'
                sx={{ color: "#161616", fontSize: "12px" }}
              >
                {box.text}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Grid>
    </Container>
  );
};

export default HotelDetailsSection;
