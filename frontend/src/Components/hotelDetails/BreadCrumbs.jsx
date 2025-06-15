import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Container } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const BreadCrumbs = ({ hotel }) => {
  const params = useParams();

  return (
    <Container className='container' sx={{ pt: "16px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          alignItems: "center",
          color: "#626971",
        }}
      >
        <Typography variant='subtitle1' sx={{ color: "primary.main" }}>
          Home
        </Typography>
        <ArrowRightIcon disabled sx={{ padding: "0", color: "#0003" }} />
        <Typography variant='subtitle1' sx={{ color: "primary.main" }}>
          Hotels
        </Typography>
        <ArrowRightIcon disabled sx={{ padding: "0", color: "#0003" }} />
        <Typography variant='subtitle1' sx={{ color: "primary.main" }}>
          {hotel?.city?.countryCode || "Country"}
        </Typography>
        <ArrowRightIcon disabled sx={{ padding: "0", color: "#0003" }} />
        <Typography variant='subtitle1' sx={{ color: "primary.main" }}>
          {hotel?.city?.cityCode || "City"}
        </Typography>
        <ArrowRightIcon disabled sx={{ padding: "0" }} />
        <Typography variant='subtitle1'>
          {hotel.name || "Hotel name"}
        </Typography>
      </Box>
    </Container>
  );
};

export default BreadCrumbs;
